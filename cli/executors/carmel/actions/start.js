const coreutils = require('coreutils')
const chalk = require('chalk')
const status = require('../status')
const operation = require('../operation')
const input = require('../input')
const inquirer = require('inquirer')

function getChallenge(account, cache) {
  return operation.send({ target: "listings", all: true }, account, cache)
          .then((response) => {
            if (!response.ok || !response.data || !response.data.challenges) {
              coreutils.logger.fail("Something went wrong, give it another shot")
              return
            }

            const challenges = response.data.challenges

            if (challenges.length === 0) {
              throw new Error("There are no challenges available yet")
            }

            const published = response.data.challenges.filter(c => c.status === 'published')

            if (published.length === 0) {
              throw new Error(`There are no published challenges available yet`)
            }

            const choices = published.map(c => {
              return { name: `${c.name} (${c.level})`, value: c.id }
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

function findChallenge(account, cache) {
  coreutils.logger.info("Looking up available challenges")

  return operation.send({ target: "listings" }, account, cache)
          .then((response) => {
            if (!response.ok || !response.data || !response.data.journey) {
              coreutils.logger.fail("Something went wrong, give it another shot")
              return
            }

            if (response.data.journey.challenge) {
              coreutils.logger.info(`Finish the current challenge first :)`)
              coreutils.logger.skip(`Challenge ${chalk.green.bold(response.data.journey.challenge.challengeId)} is already in progress.`)
              return Promise.resolve()
            }

            return getChallenge(account, cache)
          })
          .catch((error) => {
             coreutils.logger.fail(error.message)
           })
}

function processCommand(account, cache, args) {
  return findChallenge(account, cache)
          .then((challenge) => {
            if (!challenge || !challenge.id) {
              return
            }

            return operation.send(Object.assign({}, {
              target: "journeys",
              type: "start",
              challengeId: challenge.id
            }), account, cache)
            .then(() => coreutils.logger.ok(`Alright, now. Go break something and have fun with it :)`))
          })
          .catch((error) => {
            coreutils.logger.fail(error.message)
          })
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
