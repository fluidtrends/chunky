const coreutils = require('coreutils')
const status = require('../status')
const operation = require('../operation')
const input = require('../input')
const inquirer = require('inquirer')

function processCommand(account, cache, args) {
  if (cache.vaults.master.isLocked) {
    coreutils.logger.skip("Your Carmel vault is already locked. No need to lock it again :)")
    return Promise.resolve()
  }

  return inquirer.prompt([{
    type: 'password',
    name: 'password',
    validate: (s) => s ? true : "C'mon, enter a password please :)",
    message: "Choose a password to lock your vault"
  }]).then(({ password }) => {
    coreutils.logger.info("Locking your Carmel vault ...")
    return cache.vaults.master.lock(password).then((vault) => {
      coreutils.logger.ok("Your Carmel vault is now locked")
      return vault
    })
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
