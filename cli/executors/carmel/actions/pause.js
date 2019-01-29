const coreutils = require('coreutils')
const chalk = require('chalk')
const status = require('../status')
const operation = require('../operation')
const input = require('../input')
const inquirer = require('inquirer')
const utils = require('../utils')

function processCommand(account, cache, args) {
  return utils.getChallenge(account, cache)
          .then((challenge) => {
            if (!challenge || !challenge.id) {
              coreutils.logger.skip(`Start a challenge first :)`)
              return
            }

            coreutils.logger.info(`You're currently taking the ${chalk.green.bold(challenge.name)} challenge`)

            return inquirer.prompt([{
              type: 'confirm',
              name: "pause",
              default: false,
              message: 'Are you sure you want to pause it?'
            }])
            .then(({ pause }) => {
              if (!pause) {
                coreutils.logger.skip(`Cool, keep going and have fun :)`)
                return
              }
              return operation.send(Object.assign({}, {
                target: "journeys",
                type: "pause"
              }), account, cache)
              .then(() => coreutils.logger.ok(`Alright, fair enough. Take a break and have a latte :)`))
            })

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
