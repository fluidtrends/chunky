const coreutils = require('coreutils')
const status = require('../../status')
const operation = require('../../operation')
const input = require('../../input')
const inquirer = require('inquirer')
const utils = require('../../utils')
const opn = require('opn')
const chalk = require('chalk')

const TYPES = ['custom', 'aws']

function ensureVaultIsUnlocked(cache) {
  if (cache.vaults.master.isLocked) {
    coreutils.logger.info(`Looks like your Carmel vault is locked. Let's unlock it first`)
    return utils.unlock(cache)
  }

  return Promise.resolve()
}

function doConfig(cache, type) {
  return new Promise((resolve, reject) => {
    try {
      require(`./${type}`)(cache)
          .then((data) => resolve(data))
          .catch((error) => reject(error))
    } catch (e) {
      require(`./custom`)(cache, type)
          .then((data) => resolve(data))
          .catch((error) => reject(error))
    }
  })
}

function config(cache, t) {
  if (!t) {
    return inquirer.prompt([{
      type: 'list',
      choices: TYPES,
      default: "custom",
      name: 'type',
      message: "What do you want to configure?"
    }])
    .then(({ type }) => doConfig(cache, type))
  }

  return doConfig(cache, t)
}

function processCommand(account, cache, args) {
  return ensureVaultIsUnlocked(cache)
          .then(() => {
            if (!args || args.length === 0) {
              return config(cache)
            }

            // The type of config we want
            const type = args.shift()
            return config(cache, type)
          })
}

function main(account, cache, args) {
  if (!account) {
    return status(account, cache).then(() => {
      try {
        const a = cache.vaults.carmel.read('account')
        return processCommand(a, cache, args)
      } catch (e) {
        coreutils.logger.info(`Hey so how about you try this again :)`)
        return
      }
    })
  }

  return processCommand(account, cache, args)
}

module.exports = main
