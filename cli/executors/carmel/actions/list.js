const coreutils = require('coreutils')
const chalk = require('chalk')
const status = require('../status')
const operation = require('../operation')
const input = require('../input')

function listChallenges(account, cache) {
  return operation.send({ target: "listings" }, account, cache)
                  .then((response) => {
                    if (!response.ok || !response.data || !response.data.challenges) {
                      coreutils.logger.fail("Something went wrong, give it another shot")
                      return
                    }

                    if (response.data.challenges.length === 0) {
                      coreutils.logger.info("You have no challenges yet. Wanna create one? Type:")
                      coreutils.logger.skip("chunky carmel create challenge")
                      return
                    }
  
                    coreutils.logger.info(`You have created ${response.data.challenges.length} challenges`)
                    response.data.challenges.map(c => {
                      coreutils.logger.skip(`${chalk.bold.green(c.name)} (${c.type}) - ${chalk.bold.blue(c.status)} `)
                    })
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
