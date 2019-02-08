const coreutils = require('coreutils')
const status = require('../status')
const operation = require('../operation')
const input = require('../input')
const inquirer = require('inquirer')
const utils = require('../utils')

function processCommand(account, cache, args) {
  if (!cache.vaults.master.isLocked) {
    coreutils.logger.info(`It's already unlocked :)`)
    return Promise.resolve()
  }

  return utils.unlock(cache)
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
