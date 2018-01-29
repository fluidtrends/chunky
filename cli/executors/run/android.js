const coreutils = require('coreutils')

module.exports = function() {
    coreutils.logger.info(`Starting the Android app ...`)

    // if (command.options.release) {
    //     // Let's run it in release mode
    //     coreutils.logger.info("Bundling the Android app")
    //     coreutils.run.reactNative(['bundle', 
    //         '--platform', 'android', 
    //         '--dev', 'false', 
    //         '--entry-file', 'node_modules/react-native-chunky/app/index.android.js', 
    //         '--assets-dest', 'android/app/src/main/res/',
    //         '--bundle-output', 'android/app/src/main/assets/index.android.bundle']).
    //     then(() =>  coreutils.run.async('cd', ['android', '&&', './gradlew', 'assembleRelease', '&&', './gradlew', 'installRelease']))
    //     return
    // }
    
    coreutils.run.reactNativeRun("android")
}