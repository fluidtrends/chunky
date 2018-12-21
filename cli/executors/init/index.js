const coreutils = require('coreutils')
const product = require('./product')

function setup () {
}

function parseCommand (command) {
  if (!command.name) {
    command.name = 'Chunky'
  }

  product.create({ name: command.name, template: command.template, bundle: command.bundle })
}

module.exports = function (command) {
  try {
    parseCommand(command)
  } catch (error) {
    coreutils.logger.error(error)
  }
}
