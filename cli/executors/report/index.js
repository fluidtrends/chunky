const coreutils = require('coreutils')
const loaders = require('../../src/loaders')
const providers = require('../../src/providers')
const run = require('./run')

function parseCommand(command) {
    var config = loaders.loadSecureConfig()

    if (!config || !config.cloud[command.env]) {
        throw new Error(`Invalid secure cloud configuration or invalid cloud environment ${command.env}`)
    }

    // The environment-specific configuration
    config = config.cloud[command.env]

    coreutils.logger.header(`Reporting on the ${command.env} cloud environment`)

    // Start by authenticating
    providers.authenticate(config).

    // First, load the transforms we care about
    then((providers) =>
      loaders.loadReports(providers, command.chunks ? command.chunks.filter(c => c) : [], command.reports).
             then(reports => ({ reports, providers }))).

    then(({ reports, providers }) => {
      if (!reports || reports.length === 0) {
          coreutils.logger.skip(`Skipping - no reports to run`)
          return
      }

      // Next, run them
      return run(providers, reports).then(() => {
        coreutils.logger.footer(`Successfully reported on the ${command.env} cloud environment`)
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
