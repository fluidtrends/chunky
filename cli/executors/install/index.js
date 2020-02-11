const coreutils = require('coreutils')
const setup = require('../../src/setup')

function parseCommand (command, account, cache) {
  coreutils.logger.info("Let's get those stubborn dependencies installed ... ")

  process.send && process.send(cache.saveEvent(Object.assign({}, { eventId: 'installDeps', installing: true, installed: false })))  

  return cache.addDeps(command.env).then(() => {
    process.send && process.send(cache.saveEvent(Object.assign({}, { eventId: 'installDeps', installing: false, installed: true })))
    coreutils.logger.ok(`Wow, amazing! You're good to go!`)
  })
}

module.exports = function (command) {
  return setup().then(({ account, cache }) => parseCommand(command, account, cache))
}
