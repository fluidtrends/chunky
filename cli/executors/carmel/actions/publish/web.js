const coreutils = require('coreutils')
const operation = require('../../operation')
const input = require('../../input')
const inquirer = require('inquirer')
const got = require('got')
const chalk = require('chalk')
const awsome = require('awsome')
const configAws = require('../config/aws')
const path = require('path')
const fs = require('fs-extra')
const recursive = require('recursive-readdir')
const webPackage = require('../../../package/web')
const utils = require('../../utils')

const IGNORES = ['.DS_Store']

function ensureIsPacked(awsConfig) {
  return new Promise((resolve, reject) => {
    const dir = path.resolve(process.cwd(), '.chunky', 'web')

    if (!fs.existsSync(dir)) {
       reject(new Error('Failed to deploy because it was not packaged yet'))
       return
    }

    recursive(dir, IGNORES, (err, files) => {
      if (err || !files || files.length === 0) {
        coreutils.logger.info(`Chunky has to first package your Web app`)
        webPackage().then(() => {
          ensureIsPacked(awsConfig).then(() => resolve({ files, awsConfig })).catch((e) => reject(e))
        })
        return
      }

      resolve({ files, awsConfig })
    })
 })
}

function deploy({ dir, bucket, bucketDomain, records, files }) {
  return new Promise((resolve, reject) => {
    bucket.exists().then(() => {
            bucket.update().then((data) => {
              coreutils.logger.ok('Congrats! Your Web app is now live')
              resolve()
            })
            .catch((e) => {
              reject(e)
            })
          })
         .catch((e) => {
           bucket.create().then((d) => {
              bucket.update().then((data) => {
                coreutils.logger.ok('Congrats! Your Web app is now live')
                resolve()
              })
           })
           .catch((e) => {
             reject(e)
           })
         })
   })
}

function ensureBucketExists(bucket) {
  return new Promise((resolve, reject) => {
    bucket.exists().then(() => resolve())
          .catch(() => bucket.create().then((d) => resolve())
                             .catch((e) => reject(e)))
  })
}

function ensureDomainIsHosted(domain) {
  return new Promise((resolve, reject) => {
    domain.isHosted().then(() => resolve())
          .catch(() => domain.host().then((d) => resolve())
                             .catch((e) => reject(e)))
  })
}

function ensureBucketIsLinked(domain) {
  return new Promise((resolve, reject) => {
    domain.isBucketLinked().then(() => resolve())
          .catch(() => domain.linkBucket().then((d) => resolve())
                             .catch((e) => reject(e)))
  })
}


function publish(cache, awsConfig, env, files) {
  const domain = "idancali.io"

  coreutils.logger.info(`Publishing your Web app to ${chalk.green.bold(domain)} (on your AWS ${chalk.green.bold(env)} environment)  ...`)

  const config = awsConfig[env]
  const dir = path.resolve(process.cwd(), '.chunky', 'web')

  process.env.AWS_ACCESS_KEY_ID = config.accessKey
  process.env.AWS_SECRET_ACCESS_KEY = config.secretKey

  const bucket = new awsome.Bucket({ name: `${domain}`, site: true, dir })
  const redirectBucket = new awsome.Bucket({ name: `www.${domain}`, site: { redirectTo: `${domain}` }, dir })
  const bucketDomain = new awsome.Domain({ name: domain })

  return Promise.all([
                      ensureBucketExists(bucket),
                      ensureBucketExists(redirectBucket),
                      ensureDomainIsHosted(bucketDomain),
                      ensureBucketIsLinked(bucketDomain)
                    ])
                    .then(() => bucketDomain.records({ type: "NS" }))
                    .then((records) => records[0].ResourceRecords.map(r => r.Value))
                    .then((records) => deploy({ bucket, bucketDomain, records, files, dir }))
                    .then(() => {
                      coreutils.logger.ok(`http://${domain}.s3-website-us-east-1.amazonaws.com`)
                    })
}

module.exports = (account, cache, env) => {
  return utils.ensureVaultIsUnlocked(cache)
          .then(() => utils.ensureAwsIsConfigured(cache, env))
          .then((awsConfig) => ensureIsPacked(awsConfig))
          .then(({ awsConfig, files }) => publish(cache, awsConfig, env, files))
          .catch((e) => coreutils.logger.fail(e))
}
