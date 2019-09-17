const coreutils = require('coreutils')
const status = require('../../status')
const operation = require('../../operation')
const input = require('../../input')
const inquirer = require('inquirer')
const utils = require('../../utils')
const opn = require('opn')
const chalk = require('chalk')

const TYPES = ['custom', 'aws', 'domains']

function ensureVaultIsUnlocked(cache) {
  if (cache.vaults.master.isLocked) {
    coreutils.logger.info(`Looks like your Carmel vault is locked. Let's unlock it first`)
    return utils.unlock(cache)
  }

  return Promise.resolve()
}

function doConfig(account, cache, env, type, secondary) {
  return new Promise((resolve, reject) => {
    try {
      require(`./${type}`)(account, cache, env, secondary)
          .then((data) => resolve(data))
          .catch((error) => reject(error))
    } catch (e) {
      require(`./custom`)(account, cache, env, type, secondary)
          .then((data) => resolve(data))
          .catch((error) => reject(error))
    }
  })
}

function config(cache, env, account, t, secondary) {
  if (!t) {
    return inquirer.prompt([{
      type: 'list',
      choices: TYPES,
      default: "custom",
      name: 'type',
      message: "What do you want to configure?"
    }])
    .then(({ type }) => doConfig(account, cache, env, type, secondary))
  }

  return doConfig(account, cache, env, t, secondary)
}

function processCommand(account, cache, env, args) {
  return ensureVaultIsUnlocked(cache)
          .then(() => {
            if (!args || args.length === 0) {
              return config(cache, env)
            }

            // The type of config we want
            const type = args.shift()
            const secondary = args.shift()
            return config(cache, env, account, type, secondary)
          })
}

function main(account, cache, args, env) {
  if (!account) {
    return status(account, cache).then(() => {
      try {
        const a = cache.vaults.carmel.read('account')
        return processCommand(a, cache, env, args)
      } catch (e) {
        coreutils.logger.info(`Hey so how about you try this again :)`)
        return
      }
    })
  }

  return processCommand(account, cache, env, args)
}

module.exports = main
