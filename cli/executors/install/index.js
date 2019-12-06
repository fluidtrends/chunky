const coreutils = require('coreutils')
const setup = require('../carmel/setup')
const operation = require('../carmel/operation')

function parseCommand (command, account, cache) {
  coreutils.logger.info("Let's get those stubborn dependencies installed ... ")
  const startTime = Date.now()

  process.send && process.send(cache.saveEvent(Object.assign({}, { eventId: 'installDeps', installing: true, installed: false })))

  return cache.addDeps().then(() => {
        process.send && process.send(cache.saveEvent(Object.assign({}, { eventId: 'installDeps', installing: false, installed: true })))
        coreutils.logger.ok(`Wow, amazing! You're good to go!`)
  })
}

module.exports = function (command) {
    return setup().then(({ account, cache }) => parseCommand(command, account, cache))
}
