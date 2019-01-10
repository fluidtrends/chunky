const coreutils = require('coreutils')
const status = require('./status')

function sayHello(account, cache) {
  coreutils.logger.info(`Hello right back at ya, ${account.name} :)`)
  return Promise.resolve()
}

function hello(account, cache) {
  if (!account) {
    return status(account, cache).then(() => {
      try {
        const a = cache.vaults.carmel.read('account')
        return sayHello(a, cache)
      } catch (e) {
        console.log(e)
        coreutils.logger.info(`Hey so how about you try saying hello again :)`)
        return
      }
    })
  }

  return sayHello(account, cache)
}

module.exports = hello
