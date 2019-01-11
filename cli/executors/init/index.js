const coreutils = require('coreutils')
const product = require('./product')
const setup = require('../carmel/setup')

function parseCommand (command, account, cache) {
  if (!command.name) {
    command.name = 'Chunky'
  }

  product.create({ name: command.name, template: command.template, bundle: command.bundle }, account, cache)
}

module.exports = function (command) {
  try {
    setup().then(({ account, cache }) => parseCommand(command, account, cache))
  } catch (error) {
    coreutils.logger.error(error)
  }
}
