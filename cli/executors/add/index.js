const coreutils = require('coreutils')
const loaders = require('../../src/loaders')
const providers = require('../../src/providers')
const chunk = require('./chunk')
const path = require('path')
const fs = require('fs-extra')

function parseCommand(command) {
    // First, find the artifacts we care about
    if (command.artifacts.length == 0) {
        coreutils.logger.skip(`Skipping - no valid artifacts requested`)
        process.exit(0)
    }

    // The artifact we want to create
    var artifact = command.artifacts[0]

    if (artifact !== 'chunk') {
        coreutils.logger.skip(`Skipping - unrecognized artifact requested`)
        process.exit(0)
    }

    coreutils.logger.header(`Adding ${artifact}`)

    // Create the chunk
    chunk.create(command.name, command.template).

    then(() => {
      coreutils.logger.footer(`Your new ${artifact} is now ready`)
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
