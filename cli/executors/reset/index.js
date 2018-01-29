const coreutils = require('coreutils')
const loaders = require('../../src/loaders')
const providers = require('../../src/providers')
const users = require('./users')
const data = require('./data')

function resetChain(providers, index) {
    // If we want to reset the users layer, let's do that first
    var chain = (index.users ? users(providers.firebase.api) : Promise.resolve())

    // If we've got a data layer to reset, let's do that next
    return (index.data ? chain.then(() => data(providers.firebase.api)) : chain)
}

function parseCommand(command) {
    var config = loaders.loadSecureConfig()

     if (!config || !config.cloud[command.env]) {
        throw new Error(`Invalid secure cloud configuration or invalid cloud environment ${command.env}`)
    }

    // The environment-specific configuration
    config = config.cloud[command.env]

    // First, find the layers we care about
    if (command.layers.length == 0) {
        command.layers = ["users", "data"]
    }

    coreutils.logger.header(`Resetting the ${command.env} cloud environment`)

    providers.authenticate(config).

    then((providers) => {
      var index = {}
      command.layers.map(layer => (index[layer] = true))
      return resetChain(providers, index)
    }).

    then(() => {
      coreutils.logger.footer(`The ${command.env} cloud environment is now reset`)
      process.exit(0)
    }).

    catch(e => {
      coreutils.logger.error(e)
      process.exit(1)
    })
}

module.exports = function(command) {
    try {
        parseCommand(command)
    } catch (error) {
        coreutils.logger.error(error)
    }
}
