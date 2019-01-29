const inquirer = require('inquirer')
const coreutils = require('coreutils')
const input = require('./input')
const login = require('./actions/login')
const register = require('./actions/register')
const operation = require('./operation')
const moment = require('moment')
const chalk = require('chalk')
const utils = require('./utils')

function printChallengesStatus(challenges) {
  if (!challenges) {
    coreutils.logger.info(`You did not create any challenges yet`)
    return
  }

  coreutils.logger.info(`You created ${challenges.length} challenges so far:`)
  challenges.map(c => {
    coreutils.logger.ok(`${chalk.green.bold(c.name)} (${c.status})`)
  })
}

function printProductsStatus(products) {
  if (!products) {
    coreutils.logger.info(`You did not create any products yet`)
    return
  }

  coreutils.logger.info(`You created ${products.length} products so far:`)
  products.map(p => {
    coreutils.logger.ok(`${chalk.green.bold(p.name)} (template: ${p.template})`)
  })
}

function printPausedChallengesStatus(challenges) {
  if (!challenges || Object.keys(challenges).filter(c => !c).length === 0) {
    coreutils.logger.info(`You do not have any paused challenges`)
    return
  }

  coreutils.logger.info(`You have ${Object.keys(challenges).filter(c => !c).length} paused challenges`)
}

function printCompletedChallengesStatus(challenges) {
  if (!challenges || challenges.length === 0) {
    coreutils.logger.info(`You did not complete any challenges yet`)
    return
  }

  coreutils.logger.info(`You completed ${challenges.length} challenges so far:`)
  challenges.map(c => {
    coreutils.logger.ok(`${chalk.green.bold(c.challengeId)} (total time: ${parseFloat(c.totalTime / 3600).toFixed(4)} minutes)`)
  })
}

function printMachinesStatus(machines) {
  if (!machines) {
    coreutils.logger.info(`You did not setup any development machines yet`)
    return
  }

  coreutils.logger.info(`Your development machines:`)

  Object.keys(machines).map(m => {
    coreutils.logger.ok(`${chalk.green.bold(m)} (${machines[m].platform})`)
  })
}

function printJourneyChallengeStatus(challenge, account, cache) {
  if (!challenge) {
    coreutils.logger.info("You don't have a challenge in progress")
    return Promise.resolve()
  }

  return operation.send({ target: "listings", challengeId: challenge.challengeId }, account, cache)
                  .then((result) => Object.assign({}, result.data.challenge, { state: challenge }))
                  .then((c) => {
                    coreutils.logger.info(`You are currently taking a challenge:`)
                    coreutils.logger.ok(`Challenge: ${chalk.green.bold(c.name)}`)
                    coreutils.logger.ok(`Completed tasks: ${chalk.green.bold(c.state.taskIndex)}`)
                    coreutils.logger.ok(`Last activity: ${chalk.green.bold(moment(parseInt(c.state.timestamp)).format('LLL'))}`)
                    return c
                  })
}

function printJourneyStatus(journey, account, cache) {
  printProductsStatus(journey.products)
  printMachinesStatus(journey.machines)
  printPausedChallengesStatus(journey.pausedChallenges)
  printCompletedChallengesStatus(journey.completedChallenges)

  return printJourneyChallengeStatus(journey.challenge, account, cache)
}

function accountStatus(account, cache) {
  coreutils.logger.info(`You are logged in as:`)
  coreutils.logger.ok(`Name: ${chalk.green.bold(account.name)}`)
  coreutils.logger.ok(`Email: ${chalk.green.bold(account.email)}`)
  coreutils.logger.ok(`Username: ${chalk.green.bold(account.username)}`)
  return operation.send({ target: "listings" }, account, cache)
        .then((response) => {
            if (!response.ok || !response.data) {
              coreutils.logger.fail("Something went wrong, give it another shot")
              return
            }

            printChallengesStatus(response.data.challenges)
            return printJourneyStatus(response.data.journey, account, cache)
        })
}

function main(account, cache, help) {
  if (account) {
    return accountStatus(account, cache)
  }

  coreutils.logger.info(`Hey you, welcome to Carmel!`)
  coreutils.logger.info(`Carmel is a Decentralized Platform that helps you grow your tech skills`)
  coreutils.logger.info(`Get a free account right now or sign if you're already part of the family`)

  return inquirer.prompt([{
    type: 'confirm',
    name: "hasAccount",
    message: 'Do you have a Carmel account?'
  }])
  .then(({ hasAccount }) => hasAccount ? login(account, cache) : register(account, cache))
}

module.exports = main
