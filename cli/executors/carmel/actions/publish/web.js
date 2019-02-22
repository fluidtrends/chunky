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
const loaders = require('../../../../src/loaders')
const validator = require('validator')
const opn = require('opn')

const IGNORES = ['.DS_Store']

function ensureIsPacked(awsConfig) {
  return webPackage().then(() => awsConfig)
}

function findDomains() {
  return new Promise((resolve, reject) => awsome.aws.route53Domains('listDomains').then((data) => {
    if (!data || !data.Domains || data.Domains.length === 0) {
      resolve()
      return
    }

    resolve(data.Domains.map(d => d.DomainName))
  }))
}

function deploy({ dir, bucket, domain, records }) {
  return bucket.update().then((data) => findDomains().then((domains) => {
    if (domains && domains.length > 0 && domains.includes(domain.name)) {
      coreutils.logger.info(`Congrats! Your Web app is now live at ${chalk.green.bold(domain.name)}`)
      opn(`http://${domain.name}`)
      return
    }

    coreutils.logger.info(`Congrats! Your Web app is now live`)

    coreutils.logger.info(`Go to your Domain Registrar and set your ${chalk.green.bold(domain.name)} nameservers to the following:`)
    records.map(r => coreutils.logger.skip(r))

    coreutils.logger.info(`Until then, your web app is available here:`)
    coreutils.logger.ok(`http://${domain.name}.s3-website-us-east-1.amazonaws.com`)
    opn(`http://${domain.name}.s3-website-us-east-1.amazonaws.com`)
  }))
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

function getDomain() {
  const mainConfig = loaders.loadMainConfig()

  if (mainConfig.domain) {
    return Promise.resolve(new awsome.Domain({ name: `${mainConfig.domain}` }))
  }

  return inquirer.prompt([{
    type: 'input',
    name: 'domain',
    validate: (s) => validator.isURL(s) ? true : "C'mon, enter a valid domain please :)",
    message: "Enter a domain name: "
  }])
  .then(({ domain }) => {
    fs.writeFileSync(path.resolve(process.cwd(), 'chunky.json'), JSON.stringify(Object.assign({}, mainConfig, { domain }), null, 2))
    return new awsome.Domain({ name: domain })
  })
}

function publish(cache, awsConfig, env) {
  const config = awsConfig[env]
  const dir = path.resolve(process.cwd(), '.chunky', 'web')

  process.env.AWS_ACCESS_KEY_ID = config.accessKey
  process.env.AWS_SECRET_ACCESS_KEY = config.secretKey

  return getDomain()
        .then((domain) => {
          coreutils.logger.info(`Publishing your Web app to ${chalk.green.bold(domain.name)} ...`)
          const bucket = new awsome.Bucket({ name: `${domain.name}`, site: true, dir })
          const redirectBucket = new awsome.Bucket({ name: `www.${domain.name}`, site: { redirectTo: `${domain.name}` }, dir })

          return Promise.all([
                              ensureDomainIsHosted(domain),
                              ensureBucketExists(bucket),
                              ensureBucketExists(redirectBucket),
                              ensureBucketIsLinked(domain)
                            ])
                            .then(() => domain.records({ type: "NS" }))
                            .then((records) => records[0].ResourceRecords.map(r => r.Value))
                            .then((records) => deploy({ bucket, domain, records, dir }))
        })
}

module.exports = (account, cache, env) => {
  return utils.ensureVaultIsUnlocked(cache)
          .then(() => utils.ensureAwsIsConfigured(cache, env))
          .then((awsConfig) => ensureIsPacked(awsConfig))
          .then((awsConfig) => publish(cache, awsConfig, env))
          .catch((e) => coreutils.logger.fail(e))
}
