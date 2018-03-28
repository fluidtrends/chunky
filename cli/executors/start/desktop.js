const coreutils = require('coreutils')
const path = require('path')
const loaders = require('../../src/loaders')

module.exports = function (port) {
  const file = path.resolve(process.cwd(), 'node_modules', 'react-electron-chunky', 'bin', 'start.js')
  const start = require(file)

  coreutils.logger.info(`Starting the desktop packager ...`)

  const config = loaders.loadMainConfig()
  const chunks = loaders.loadChunkConfigs()

  var secure
  try {
    secure = loaders.loadSecureConfig()
  } catch (e) {
    coreutils.logger.skip(`This product is not provisioned. Continuing anyways.`)
  }

  start({ port, dir: process.cwd(), config, secure, chunks }).then(result => {
    coreutils.logger.info(`Your desktop app is now ready.`)
  }).catch(e => {
    coreutils.logger.fail(e)
  })
}
