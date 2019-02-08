const coreutils = require('coreutils')
const status = require('../status')
const operation = require('../operation')
const input = require('../input')
const inquirer = require('inquirer')
const utils = require('../utils')

function getVault(cache) {
  if (!cache.vaults.master.isLocked) {
    return utils.unlock(cache)
  }

  return Promise.resolve(cache.vaults.master)
}

function getKey(args) {
  if (args && args.length > 0) {
    return Promise.resolve({ key: args[0] })
  }

  return inquirer.prompt([{
    type: 'input',
    validate: (s) => s ? true : "C'mon, enter a valid key please :)",
    name: 'key',
    message: "What do you wanna save?"
  }])
}

function getValue() {
  return inquirer.prompt([{
    type: 'password',
    validate: (s) => s ? true : "C'mon, enter a valid value please :)",
    name: 'value',
    message: "What's the value?"
  }])
}

function processCommand(account, cache, args) {
  return getVault(cache)
          .then((vault) => getKey(args).then(({ key }) => getValue().then(({ value }) => ({ key, value, vault }))))
          .then(({ vault, key, value }) => vault.write(key, value))
          .then(() => {
            coreutils.logger.ok(`Successfully saved`)
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
