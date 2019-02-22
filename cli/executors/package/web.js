const coreutils = require('coreutils')
const path = require('path')
const loaders = require('../../src/loaders')

module.exports = function(optimize) {
    coreutils.logger.info(`Packaging your Web app ...`)

    const file = path.resolve(process.cwd(), 'node_modules', 'react-dom-chunky', 'bin', 'build')
    const build = require(file)
    const config = loaders.loadMainConfig()
    const chunks = loaders.loadChunkConfigs()

    var secure
    try {
      secure = loaders.loadSecureConfig()
    } catch (e) {
      secure = ""
    }

    return build({ dir: process.cwd(), config, secure, chunks }).then(() => {
      coreutils.logger.ok(`Your Web app is now packaged`)
    }).catch(e => {
      coreutils.logger.fail(e)
    })
}
