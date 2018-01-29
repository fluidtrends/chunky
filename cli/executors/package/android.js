const coreutils = require('coreutils')
const path = require('path')
const fs = require('fs-extra')

module.exports = function(optimize) {
    coreutils.logger.info(`Packaging the Android app ...`)

    const initialBuildDir = path.resolve(process.cwd(), 'android', 'build')
    const appBuildDir = path.resolve(process.cwd(), 'android', 'app', 'build')

    if (fs.existsSync(initialBuildDir)) {
      fs.removeSync(initialBuildDir)
      coreutils.logger.ok(`Cleaned previous build`)
    }

    if (fs.existsSync(appBuildDir)) {
      fs.removeSync(appBuildDir)
      coreutils.logger.ok(`Cleaned previous app build`)
    }

    return coreutils.run.reactNative(['bundle',
              '--platform', 'android',
              '--dev', 'false',
              '--entry-file', 'node_modules/react-native-chunky/app/index.android.js',
              '--assets-dest', 'android/app/src/main/res/',
              '--bundle-output', 'android/app/src/main/assets/index.android.bundle']).
          then(() =>  process.chdir('android')).
          then(() =>  coreutils.run.async('./gradlew', ['assembleRelease']))
}
