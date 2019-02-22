const coreutils = require('coreutils')
const operation = require('../../operation')
const input = require('../../input')
const inquirer = require('inquirer')
const got = require('got')
const chalk = require('chalk')
const awsome = require('awsome')
const configAws = require('../config/aws')

function ensureVaultIsUnlocked(cache) {
  if (cache.vaults.master.isLocked) {
    coreutils.logger.info(`Looks like your Carmel vault is locked. Let's unlock it first`)
    return utils.unlock(cache)
  }

  return Promise.resolve()
}

function ensureAwsIsConfigured(cache, env) {
  const awsConfig = cache.vaults.master.read('aws')

  if (!awsConfig || !awsConfig[env]) {
    return configAws(cache, env).then(() => cache.vaults.master.read('aws')[env])
  }

  return Promise.resolve(awsConfig)
}

function publish(cache, awsConfig, env) {
  coreutils.logger.info(`Publishing your API to your AWS ${chalk.green.bold(env)} environment ...`)
  console.log(awsConfig)
  return new Promise((resolve, reject) => {
    coreutils.logger.ok('Congrats! Your API is now live')
    resolve()
  })
}

module.exports = (account, cache, env) => {
  return ensureVaultIsUnlocked(cache)
          .then(() => ensureAwsIsConfigured(cache, env))
          .then((awsConfig) => publish(cache, awsConfig, env))
          .catch((e) => coreutils.logger.fail(e))
}
