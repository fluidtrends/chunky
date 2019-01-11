const coreutils = require('coreutils')
const status = require('./status')
const operation = require('./operation')

function sayHello(account, cache) {
  coreutils.logger.info(`Hello right back at ya :)`)
  return operation.send({ type: "hello" }, account, cache)
}

function hello(account, cache) {
  if (!account) {
    return status(account, cache).then(() => {
      try {
        const a = cache.vaults.carmel.read('account')
        return sayHello(a, cache)
      } catch (e) {
        coreutils.logger.info(`Hey so how about you try saying hello again :)`)
        return
      }
    })
  }

  return sayHello(account, cache)
}

module.exports = hello
