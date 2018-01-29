const coreutils = require('coreutils')
const firebaseline = require('firebaseline')

module.exports = function(firebase) {
    coreutils.logger.info("Resetting data ...")

    return firebaseline.operations.remove(firebase, { key: '/' }).
    then(() => {
        coreutils.logger.done()
    })
}