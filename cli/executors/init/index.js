const coreutils = require('coreutils')
const product = require('./product')
const setup = require('../carmel/setup')

function parseCommand (command, account, cache) {
  if (!command.name) {
    return Promise.reject(new Error('Missing option: name'))
  }

  if (!command.template) {
    return Promise.reject(new Error('Missing option: template'))
  }

  if (!command.bundle) {
    return Promise.reject(new Error('Missing option: bundle'))
  }

  return product.create({ name: command.name, template: command.template, bundle: command.bundle }, account, cache)
}

module.exports = function (command) {
  return setup().then(({ account, cache }) => parseCommand(command, account, cache))
}