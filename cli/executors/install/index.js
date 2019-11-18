const coreutils = require('coreutils')
const setup = require('../carmel/setup')
const npm = require('npm')
const operation = require('../carmel/operation')

function parseCommand (command, account, cache) {
  coreutils.logger.info("Let's get those stubborn dependencies installed ... ")
  const startTime = Date.now()

  process.send && process.send(Object.assign({}, { eventId: 'installDeps', installing: true, installed: false }))

  return cache.addDeps().then(() => {
        process.send && process.send(Object.assign({}, { eventId: 'installDeps', installing: false, installed: true }))
        coreutils.logger.ok(`Wow, amazing! You're good to go!`)
  })

  return new Promise((resolve, reject) => {

    // npm.load(function(err, n) {
    //   npm.config.set('progress', false)
    //   npm.config.set('unsafe-perm', true)
    //   npm.config.set('loglevel', 'silent')
    //   npm.config.set('scripts-prepend-node-path', true)

    //   npm.commands.install((error, result) => {
    //     if (error) {
    //       console.log(error)
    //       coreutils.logger.fail("Something went wrong :(")
    //       process.send && process.send(Object.assign({}, { eventId: 'installDeps', installing: false, installed: false, error: error.message }))
    //       reject(error)
    //       return
    //     }

    //     const totalTime = (Date.now() - startTime)
    //     process.send && process.send(Object.assign({}, { eventId: 'installDeps', installing: false, installed: true }))
    //     coreutils.logger.ok(`Wow, amazing! You're good to go!`)
    //   })
    // })
  })
}

module.exports = function (command) {
    return setup().then(({ account, cache }) => parseCommand(command, account, cache))
}
