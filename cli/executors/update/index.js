const coreutils = require('coreutils')
const setup = require('../carmel/setup')
const mainNpm = require('npm')
const operation = require('../carmel/operation')

function parseCommand (command, account, cache) {
  coreutils.logger.info("Let's get you updated ... ")
  const startTime = Date.now()

  return new Promise((resolve, reject) => {
    mainNpm.load({ loglevel: "silent" }, (err, npm) => {
      npm.config.set("loglevel", "silent")
      npm.config.set("global", true)
      npm.commands.install(["chunky-cli@latest"], (error, result) => {
        if (error) {
          coreutils.logger.fail("Something went wrong :(")
          reject(error)
          return
        }

        const totalTime = (Date.now() - startTime)
        coreutils.logger.ok(`Great stuff! You're all up to date!`)
        resolve()
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
