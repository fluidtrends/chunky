const coreutils = require('coreutils')
const operation = require('../../operation')
const input = require('../../input')
const inquirer = require('inquirer')
const got = require('got')
const chalk = require('chalk')
const awsome = require('awsome')
const configAws = require('../config/aws')
const providers = require('../../../../src/providers')
const functions = require('./functions')
const Serverless = require('../../../../src/Serverless')
const path = require('path')
const fs = require('fs-extra')
const cpy = require('cpy')

function ensureVaultIsUnlocked(cache) {
  if (cache.vaults.master.isLocked) {
    coreutils.logger.info(`Looks like your Carmel vault is locked. Let's unlock it first`)
    return utils.unlock(cache)
  }

  return Promise.resolve()
}

function chooseAWSUser(awsConfig) {
  let choices = []
  Object.keys(awsConfig).forEach(key => {
    choices.push({
      name: awsConfig[key].friendlyUsername, value: key
    })
  })

  return inquirer.prompt([{
    type: 'list',
    choices,
    name: 'user',
    message: "What AWS user do you want to use?"
  }])
}

function ensureAwsIsConfigured(cache, env, options) {
  const awsConfig = cache.vaults.master.read('aws')

  if (!awsConfig) {
    return configAws(cache, env).then(() => ensureAwsIsConfigured(cache, env, options))
  }

  const awsUsers = Object.keys(awsConfig)
  const awsUser = options['aws-user']
  // const findFriendlyUsername = Object.keys(awsConfig)
 
  if (awsUser) {
    let username = awsUsers[awsUser] || Object.keys(awsConfig).find(k => awsConfig[k].friendlyUsername === awsUser)
    if (!username) {
      coreutils.logger.skip(`The ${chalk.green.bold(awsUser)} AWS user does not exist`)
    }
  }

  if (awsUsers.length === 1) {
    return Promise.resolve(awsConfig[awsUsers.first])
  }

  return chooseAWSUser(awsConfig).then(({ user }) => awsConfig[user])
}

function awsProfile (awsConfig) {
  const apiDomain = "api.carmel.io"
  const apiVersion = "v1"
  const apiName = "carmel"
  const apiPermissions = ""
  const apiKeyId = ''
  const apiKeySecret = ''
  const key = awsConfig.accessKey
  const secret = awsConfig.secretKey 
  const region = 'us-east-1'

  return {
    apiName,
    apiPermissions,
    apiDomain,
    apiVersion,
    apiKeyId,
    apiKeySecret,
    key, 
    secret, 
    region 
  }
}

function initialize (awsConfig, options) {
  // Prepare the deploy path
  const id = coreutils.string.uuid()
  const date = new Date()
  const timestamp = date.getTime()

  const awsProfileData = awsProfile(awsConfig)

  const deployPath = path.resolve(process.cwd(), '.chunky', 'deployments', id)
 
  if (!fs.existsSync(deployPath)) {
    fs.mkdirsSync(deployPath)
  }

  
  // Create a fingerprint
  const fingerprint = Object.assign({}, {
    id,
    date,
    timestamp,
    env: options.env,
    chunks: options.chunks.filter(c => c)
  }, awsProfileData)

  fs.writeFileSync(path.resolve(deployPath, 'fingerprint.json'), JSON.stringify(fingerprint, null, 2))

  return Object.assign({ dir: deployPath }, fingerprint)
}

function publish(cache, awsConfig, env, options) {
  coreutils.logger.ok(`Using AWS admin user ${chalk.green.bold(awsConfig.friendlyUsername)} `)
  coreutils.logger.info(`Publishing your API to your AWS ${chalk.green.bold(env)} environment ... `)
  const awsProfileData = awsProfile(awsConfig)
  const config = Object.assign({}, { aws: awsProfileData })

  return providers.authenticate(config)
        .then(providers => {
          const deployment = initialize(providers, options)
          const secureManifest = Object.assign({}, { cloud: { [env]: { aws: awsProfileData }}})
          fs.writeFileSync(path.resolve(deployment.dir, '.chunky.json'), JSON.stringify(secureManifest, null, 2))
        
          return functions(providers, deployment)
        })
        .then(() => {
          coreutils.logger.info(`Congrats! Your fresh API is now live in your AWS ${chalk.green.bold(env)} environment.`)
          coreutils.logger.ok(`That wasn't so bad was it? Enjoy your new API :)`)
        })
}

module.exports = (account, cache, env, options) => {
  return ensureVaultIsUnlocked(cache)
          .then(() => ensureAwsIsConfigured(cache, env, options))
          .then((awsConfig) => publish(cache, awsConfig, env, options))
          .catch((e) => coreutils.logger.fail(e))
}
