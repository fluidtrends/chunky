const coreutils = require('coreutils')
const status = require('../status')
const operation = require('../operation')
const input = require('../input')

const ACTIONS = ["challenge"]

function createChallenge(account, cache, args) {
  coreutils.logger.info(`This is gonna be great, let's create a new challenge :)`)
  return input.getNewChallengeDetails()
              .then((challenge) => operation.send(Object.assign({}, {
                type: "create-challenge",
                target: "challenges",
              }, challenge), account, cache))
              .then((response) => {
                if (response.ok) {
                  coreutils.logger.ok(`Great stuff! Now make sure the code works. :)`)
                  return
                }
                coreutils.logger.fail("Oops, please try again")
              })
              .catch((error) => coreutils.logger.fail(error.message))
}

function processCommand(account, cache, args) {
  if (!args || args.length === 0) {
    coreutils.logger.fail(`What do you want to create? Choose one of: ${ACTIONS.join(", ")}`)
    return Promise.resolve()
  }

  // The action we want to create
  const action = args.shift()

  switch (action) {
    case "challenge":
      return createChallenge(account, cache, args)
    default:
  }

  coreutils.logger.fail(`What do you want to create? Choose one of: ${ACTIONS.join(", ")}`)
  return Promise.resolve()
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
