const coreutils = require('coreutils')
const status = require('../status')
const operation = require('../operation')

function bringDown(account, cache, args) {
  coreutils.logger.info(`Disconnecting from your Carmel account ...`)
  return new Promise((resolve, reject) => {
    coreutils.logger.ok(`You are now disconnected`)
    resolve()
  })
}

function hello(account, cache, args) {
  if (!account) {
    return status(account, cache).then(() => {
      try {
        const a = cache.vaults.carmel.read('account')
        return bringDown(a, cache, args)
      } catch (e) {
        coreutils.logger.info(`Hey so how about you try this again :)`)
        return
      }
    })
  }

  return bringDown(account, cache, args)
}

module.exports = hello
