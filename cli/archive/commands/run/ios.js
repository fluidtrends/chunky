const coreutils = require('coreutils')

module.exports = function() {
    // if (command.options.release) {
    //     // Let's run it in release mode
    //     coreutils.logger.info("Bundling the iOS app")
    //     coreutils.run.reactNative(['bundle', 
    //         '--platform', 'ios', 
    //         '--dev', 'false', 
    //         '--assets-dest', './ios/',
    //         '--entry-file', 'node_modules/react-native-chunky/app/index.ios.js', 
    //         '--bundle-output', 'ios/main.jsbundle'])
    //     return
    // }

    // coreutils.logger.info("Starting the iOS app")

    coreutils.logger.info(`Starting the iOS app ...`)
    coreutils.run.reactNativeRun("ios")
}