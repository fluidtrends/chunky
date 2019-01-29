const coreutils = require('coreutils')
const status = require('../status')
const operation = require('../operation')

function sayHello(account, cache, args) {
  if (!args || args.length == 0) {
    coreutils.logger.skip("Say something :)")
    return Promise.resolve()
  }

  const phrase = args.map(t => t.trim()).join(" ")

  return operation.send({ target: "journeys", type: "say", phrase }, account, cache)
         .then((response) => {
           if (!response || !response.ok || !response.data || !response.data.message || response.data.message.length === 0) {
             coreutils.logger.fail(`Something went wrong: ${response.data.error || 'unknown error'}`)
             return
           }

           coreutils.logger.info(response.data.message[0])

           if (response.data.message.length > 1) {
             coreutils.logger.info(`Chunky's pretty happy :)`)             
             coreutils.logger.ok(response.data.message[1])
           }
         })
}

function hello(account, cache, args) {
  if (!account) {
    return status(account, cache).then(() => {
      try {
        const a = cache.vaults.carmel.read('account')
        return sayHello(a, cache, args)
      } catch (e) {
        coreutils.logger.info(`Hey so how about you try saying hello again :)`)
        return
      }
    })
  }

  return sayHello(account, cache, args)
}

module.exports = hello
