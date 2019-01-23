const coreutils = require('coreutils')
const status = require('../status')
const operation = require('../operation')
const input = require('../input')

function listChallenges(account, cache) {
  return operation.send({ target: "listings" }, account, cache)
                  .then((response) => {
                    if (!response.ok || !response.data) {
                      coreutils.logger.fail("Something went wrong, give it another shot")
                      return
                    }

                    if (!response.data.challenges || response.data.challenges.length === 0) {
                      coreutils.logger.info("You have no challenges yet. Wanna create one? Type:")
                      coreutils.logger.skip("chunky carmel create challenge")
                      return
                    }

                    coreutils.logger.info(`You have ${response.data.challenges.length} challenges`)
                  })
                  .catch((error) => {
                    coreutils.logger.fail(error.message)
                  })
}

function processCommand(account, cache, args) {
  return listChallenges(account, cache)
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
