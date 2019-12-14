const coreutils = require('coreutils')
const chalk = require('chalk')
const status = require('../status')
const operation = require('../operation')
const input = require('../input')
const next = require('./next')

function listChallenges(account, cache, args, env, cmd) {
  return operation.send(Object.assign({}, { target: "listings" }), cmd.service ? undefined : account, cache)
                  .then((response) => {
                    if (cmd.challengeId) {
                      if (!response.ok || !response.data ) {
                        process.send && process.send(cache.saveEvent(Object.assign({}, { eventId: 'listings' }, { error: "Something went wrong" })))
                        return 
                      }

                      return next(account, cache, { continueTask: true }).then((challenge) => {
                        process.send && process.send(cache.saveEvent(Object.assign({}, { eventId: 'listings' }, { challenge: Object.assign({}, challenge, response.data.challenge) })))
                      })
                    }

                    if (!response.ok || !response.data || !response.data.challenges) {
                      coreutils.logger.fail("Something went wrong, give it another shot")
                      process.send && process.send(cache.saveEvent(Object.assign({}, { eventId: 'listings' }, { error: "Something went wrong" })))
                      return
                    }

                    process.send && process.send(cache.saveEvent(Object.assign({}, { eventId: 'listings' }, { challenges: response.data.challenges })))

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

function processCommand(account, cache, args, env, cmd) {
  return listChallenges(account, cache, args, env, cmd)
}

function main(account, cache, args, env, cmd) {
  if (!account) {
    return status(account, cache, cmd).then(() => {
      try {
        const a = cache.vaults.carmel.read('account')
        return processCommand(a, cache, args, env, cmd)
      } catch (e) {
        coreutils.logger.info(`Hey so how about you try this again :)`)
        return
      }
    })
  }

  return processCommand(account, cache, args, env, cmd)
}

module.exports = main