const coreutils = require('coreutils')
const path = require('path')
const fs = require('fs-extra')

module.exports = function(optimize) {
    coreutils.logger.info(`Packaging the iOS app ...`)

    const appBuildDir = path.resolve(process.cwd(), 'ios', 'build')

    if (fs.existsSync(appBuildDir)) {
      fs.removeSync(appBuildDir)
      coreutils.logger.ok(`Cleaned previous app build`)
    }

    return coreutils.run.reactNative(['bundle',
          '--platform', 'ios',
          '--dev', 'false',
          '--assets-dest', './ios/',
          '--entry-file', 'node_modules/react-native-chunky/app/index.ios.js',
          '--bundle-output', 'ios/main.jsbundle'])
}
