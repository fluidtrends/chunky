const coreutils = require('coreutils')
// const operation = require('../carmel/operation')

module.exports = function(port, account, cache) {
    coreutils.logger.info(`Starting your mobile app ...`)
    coreutils.run.async("node", ["node_modules/react-native-chunky/bin/start.js", port])
}
