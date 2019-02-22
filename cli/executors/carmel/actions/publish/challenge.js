const coreutils = require('coreutils')
const operation = require('../../operation')
const input = require('../../input')
const inquirer = require('inquirer')
const got = require('got')

function findChallenge(account, cache) {
  coreutils.logger.info(`Let's look up your unpublished challenges`)

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
                    const unpublished = challenges.filter(c => c.status !== 'published')

                    if (unpublished.length === 0) {
                      throw new Error('You have no pending unpublished challenges')
                    }

                    return inquirer.prompt([{
                      type: 'list',
                      choices: unpublished.map(i => i._id),
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
                  got(`https://raw.githubusercontent.com/${details.repo}/${details.hash}/${details.path == '/' ? '' : details.path}/index.json`, { json: true })
                     .then((response) => {
                       resolve(Object.assign({}, details, response.body))
                     })
                    .catch((e) => {
                      coreutils.logger.info(`Very funny, but this doesn't look like a real challenge repository.`)
                      getChallengePublishDetails(account, cache, challenge)
                      .then((data) => resolve(data))
                    })
                })
          })
}

module.exports = (account, cache) => {
  coreutils.logger.info('Publishing your Challenge ...')
  return findChallenge(account, cache)
          .then((challenge) => {
            if (!challenge) {
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
              return
            }
            coreutils.logger.ok(`Woohoo, you did it! Now wait until someone audits it for you :)`)
          })
          .catch((error) => coreutils.logger.fail(error.message))
}
