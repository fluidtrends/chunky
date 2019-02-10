const coreutils = require('coreutils')
const setup = require('../carmel/setup')
const npm = require('npm')
const operation = require('../carmel/operation')

function parseCommand (command, account, cache) {
  coreutils.logger.info("Let's get those stubborn dependencies installed ... ")
  const startTime = Date.now()

  return new Promise((resolve, reject) => {
    npm.load(function(err, npm){
      npm.config.set('loglevel', 'silent')
      npm.commands.install((error, result) => {
        if (error) {
          coreutils.logger.fail("Something went wrong :(")
          reject(error)
          return
        }

        const totalTime = (Date.now() - startTime)
        coreutils.logger.ok(`Wow, amazing! You're good to go!`)
      })
    })
  })
}

module.exports = function (command) {
  try {
    setup().then(({ account, cache }) => parseCommand(command, account, cache))
  } catch (error) {
    coreutils.logger.error(error)
  }
}
