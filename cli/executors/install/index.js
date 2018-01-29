const coreutils = require('coreutils')
const product = require('./product')

function parseCommand(command) {
    product.install()
}

module.exports = function(command) {
    try {
        parseCommand(command)
    } catch (error) {
        coreutils.logger.error(error)
    }
}
