const coreutils = require('coreutils')
const status = require('../status')
const operation = require('../operation')
const input = require('../input')

function createChallenge(account, cache, args) {
  coreutils.logger.info(`This is gonna be great, let's create a new challenge :)`)
  return input.getNewChallengeDetails()
              .then((challenge) => operation.send(Object.assign({}, {
                type: "create-challenge",
                status: "created",
                target: "challenges",
              }, challenge), account, cache))
              .then((response) => {
                if (!response.ok) {
                  coreutils.logger.fail("Oops, please try again")
                  return
                }
                coreutils.logger.info(`Great stuff! Now write the challenge and make history!`)
                coreutils.logger.info(`When ready, just type:`)
                coreutils.logger.skip(`chunky carmel publish challenge`)
                coreutils.logger.info(`Take a look at this sample challenge and start writing your own :)`)
                coreutils.logger.skip(`https://github.com/fluidtrends/carmel/contrib/sample-challenge`)
              })
              .catch((error) => coreutils.logger.fail(error.message))
}

function processCommand(account, cache, args) {
  if (!args || args.length === 0) {
    return createChallenge(account, cache, args)
  }

  // The action we want to create
  const action = args.shift()

  switch (action) {
    case "challenge":
      return createChallenge(account, cache, args)
    default:
  }

  return createChallenge(account, cache, args)
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
