const coreutils = require('coreutils')
const status = require('./status')

function parseCommand (command) {
  status.check(command)
}

module.exports = function (command) {
  try {
    parseCommand(command)
  } catch (error) {
    coreutils.logger.error(error)
  }
}
