const coreutils = require('coreutils')
const chalk = require('chalk')
const status = require('../status')
const operation = require('../operation')
const input = require('../input')
const inquirer = require('inquirer')
const utils = require('../utils')
const next = require('./next')

function getChallenge(account, cache) {
  return operation.send({ target: "listings", all: true }, account, cache)
          .then((response) => {
            if (!response.ok || !response.data || !response.data.challenges) {
              coreutils.logger.fail("Something went wrong, give it another shot")
              return
            }

            const challenges = Array.isArray(response.data.challenges) ? response.data.challenges : [response.data.challenges]

            if (challenges.length === 0) {
              throw new Error("There are no challenges available yet")
            }

            const published = challenges.filter(c => c.status === 'published')

            if (published.length === 0) {
              throw new Error(`There are no published challenges available yet`)
            }

            const choices = published.map(c => {
              return { name: `${c.title} (${c.level})`, value: c.id }
            })

            return inquirer.prompt([{
              type: 'list',
              choices,
              name: 'id',
              message: "What challenge do you want to start?"
            }])
          })
          .catch((error) => {
            coreutils.logger.fail(error.message)
          })
}

function findChallenge(account, cache, cmd) {
  if (cmd.service && cmd.challengeId) {
    return Promise.resolve({ id: cmd.challengeId, autoStart: true })
  }
  coreutils.logger.info("Looking up available challenges")

  return operation.send({ target: "listings" }, account, cache)
          .then((response) => {
            if (!response.ok || !response.data || !response.data.journey) {
              coreutils.logger.fail("Something went wrong, give it another shot")
              return
            }

            // if (response.data.journey.challenge) {
            //   coreutils.logger.info(`Finish the current challenge first :)`)
            //   coreutils.logger.skip(`Challenge ${chalk.green.bold(response.data.journey.challenge.challengeId)} is already in progress.`)
              return getChallenge(account, cache).then((challenge) => Object.assign({}, challenge, response.data.journey.challenge && { alreadyStarted: true }))
              // return Promise.resolve()
            // }

            // return getChallenge(account, cache)
          })
          .catch((error) => {
             coreutils.logger.fail(error.message)
           })
}

function processCommand(account, cache, args, env, cmd) {
  const productId = cmd.productId || false

  return findChallenge(account, cache, cmd)
          .then((challenge) => {
            if (!challenge || !challenge.id) {
              return
            }            

            if (challenge.alreadyStarted) {
              return next(account, cache, Object.assign({}, args, { alreadyStarted: true }))
            }

            return operation.send(Object.assign({}, {
              target: "journeys",
              type: "start",
              productId,
              challengeId: challenge.id
            }), account, cache)
            .then(() => {
              if (challenge.autoStart) {
                return next(account, cache, Object.assign({}, args, { startChallenge: true }))
              }

              utils.box('✓ Challenge started')
              coreutils.logger.info(`Alright, time to have some fun :) Ready for the first task?`)
              utils.box('chunky carmel next', 'code')
              process.send && process.send(cache.saveEvent(Object.assign({}, { eventId: 'challengeStarted' })))
            })
          })
          .catch((error) => {
            process.send && process.send(cache.saveEvent(Object.assign({}, { eventId: 'challengeStarted', error: error.message })))
            coreutils.logger.fail(error.message)
          })
}

function main(account, cache, args, env, cmd) {
  if (!account) {
    return status(account, cache).then(() => {
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
