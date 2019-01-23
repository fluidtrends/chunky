const coreutils = require('coreutils')
const status = require('../status')
const operation = require('../operation')
const input = require('../input')
const inquirer = require('inquirer')
const got = require('got')

function findChallenge(account, cache, args) {
  coreutils.logger.info(`Let's look up your challenges, hold on ...`)

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

                    const challenges = Array.isArray(response.data.challenges) ? response.data.challenges : [response.data.challenges]

                    return inquirer.prompt([{
                      type: 'list',
                      choices: challenges.map(i => i._id),
                      name: 'id',
                      message: "What challenge do you want to publish?"
                    }])
                  })
                  .catch((error) => {
                    coreutils.logger.fail(error.message)
                  })
}

function getChallengePublishDetails(account, cache, challenge) {
  return new Promise((resolve, reject) => {
            input.getChallengePublishLocation()
                .then((details) => {
                  got.head(`https://raw.githubusercontent.com/${details.repo}/${details.hash}/${details.path == '/' ? '' : details.path}/index.json`)
                     .then(() => {
                       resolve(Object.assign({}, details))
                     })
                    .catch((e) => {
                      coreutils.logger.info(`Very funny, but this doesn't look like a real challenge repository.`)
                      getChallengePublishDetails(account, cache, challenge)
                      .then((data) => resolve(data))
                    })
                })
          })
}

function publishChallenge(account, cache, args) {
  return findChallenge(account, cache, args)
          .then((challenge) => {
            if (!challenge) {
              coreutils.logger.info(`Oh no, how about you try this again :)`)
              return
            }

            return getChallengePublishDetails(account, cache, challenge)
                        .then((details) => {
                          return operation.send(Object.assign({}, {
                            target: "challenges",
                            status: "submitted",
                            id: challenge.id
                          }, details), account, cache)
                        })
          })
          .then((done) => {
            if (!done || !done.ok) {
              coreutils.logger.info(`Opps, are you sure your challenge is ready ? :)`)
              return
            }
            coreutils.logger.ok(`Woohoo, you did it! Now wait until someone audits it for you :)`)
          })
          .catch((error) => coreutils.logger.fail(error.message))
}

function processCommand(account, cache, args) {
  if (!args || args.length === 0) {
    return publishChallenge(account, cache, args)
  }

  // The action we want
  const action = args.shift()

  switch (action) {
    case "challenge":
      return publishChallenge(account, cache, args)
    default:
  }

  return publishChallenge(account, cache, args)
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
