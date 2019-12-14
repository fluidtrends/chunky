const coreutils = require('coreutils')
const status = require('../status')
const operation = require('../operation')
// const pm2 = require('pm2')

function bringUp(account, cache, args) {
  coreutils.logger.info(`Connecting to your Carmel account ...`)
  return new Promise((resolve, reject) => {
    coreutils.logger.ok(`You are now connected`)
  })
}

function hello(account, cache, args) {
  if (!account) {
    return status(account, cache).then(() => {
      try {
        const a = cache.vaults.carmel.read('account')
        return bringUp(a, cache, args)
      } catch (e) {
        coreutils.logger.info(`Hey so how about you try this again :)`)
        return
      }
    })
  }

  return bringUp(account, cache, args)
}

module.exports = hello
