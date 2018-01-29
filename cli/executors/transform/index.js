const coreutils = require('coreutils')
const loaders = require('../../src/loaders')
const providers = require('../../src/providers')
const apply = require('./apply')

function parseCommand(command) {
    var config = loaders.loadSecureConfig()

    if (!config || !config.cloud[command.env]) {
        throw new Error(`Invalid secure cloud configuration or invalid cloud environment ${command.env}`)
    }

    // The environment-specific configuration
    config = config.cloud[command.env]

    coreutils.logger.header(`Transforming the ${command.env} cloud environment`)

    // Start by authenticating
    providers.authenticate(config).

    // First, load the transforms we care about
    then((providers) =>
      loaders.loadTransforms(providers, command.chunks ? command.chunks.filter(c => c) : [], command.transforms).
             then(transforms => ({ transforms, providers }))).

    then(({ transforms, providers }) => {
      if (!transforms || transforms.length === 0) {
          coreutils.logger.skip(`Skipping - no transforms to be applied`)
          return
      }

      // Next, apply them
      return apply(providers, transforms).then(() => {
        coreutils.logger.footer(`Successfully transformed the ${command.env} cloud environment`)
      })
    }).

    then(() => {
      process.exit(0)
    }).

    catch(e => {
        throw e
    })
}

module.exports = function(command) {
    try {
        parseCommand(command)
    } catch (error) {
        coreutils.logger.error(error)
    }
}
