const coreutils = require('coreutils')
const status = require('../status')
const operation = require('../operation')
const input = require('../input')
const inquirer = require('inquirer')

function processCommand(account, cache, args) {
  if (!cache.vaults.master.isLocked) {
    coreutils.logger.skip("Your Carmel vault is already unlocked. No need to unlock it again :)")
    return Promise.resolve()
  }

  return new Promise((resolve, reject) => {
    inquirer.prompt([{
      type: 'password',
      name: 'password',
      validate: (s) => s ? true : "C'mon, enter a password please :)",
      message: "Enter the vault password"
    }]).then(({ password }) => {
      coreutils.logger.info("Unlocking your Carmel vault ...")
      cache.vaults.master.unlock(password).then((vault) => {
        coreutils.logger.ok("Your Carmel vault is now unlocked")
        resolve(vault)
      }).catch((e) => {
        coreutils.logger.fail("Looks like that is the wrong password")
        processCommand(account, cache, args).then((r) => resolve(r))
      })
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
