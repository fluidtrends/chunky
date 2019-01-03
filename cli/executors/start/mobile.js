const coreutils = require('coreutils')

module.exports = function(port) {
    coreutils.logger.info(`Starting your mobile app ...`)
    coreutils.run.async("node", ["node_modules/react-native-chunky/bin/start.js", port])
}
