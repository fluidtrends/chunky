const coreutils = require('coreutils')
const start = require('./start')

function parseCommand (command) {
  start(command)
}

module.exports = function (command) {
  try {
    parseCommand(command)
  } catch (error) {
    coreutils.logger.error(error)
  }
}
