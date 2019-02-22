const coreutils = require('coreutils')
const status = require('./status')
const actions = require('./actions')
const setup = require('./setup')

function performAction (command, account, c) {
  try {
    const action = command.actions.shift()
    if (!action || !actions[action]) {
      return status(account, c, true)
    }
    return actions[action](account, c, command.actions, command.env)

  } catch (e) {
    return status(account, c, true)
  }
}

function start(command) {
  coreutils.logger.header(`Carmel`)
  return setup()
   .then(({ account, cache }) => performAction(command, account, cache))
   .then(() => {
     coreutils.logger.footer(`Learn more at carmel.io`)
     process.exit(0)
   })
   .catch((error) => {
     coreutils.logger.fail(error.message)
     coreutils.logger.footer(`Learn more at carmel.io`)
   })
}

module.exports = start
