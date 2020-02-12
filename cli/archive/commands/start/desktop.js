const coreutils = require('coreutils')
const path = require('path')
const loaders = require('../../src/loaders')
// const operation = require('../carmel/operation')

module.exports = function (port, account, cache) {
  const file = path.resolve(process.cwd(), 'node_modules', 'react-electron-chunky', 'bin', 'start.js')
  const start = require(file)

  coreutils.logger.info(`Starting your desktop app ...`)

  const config = loaders.loadMainConfig()
  const chunks = loaders.loadChunkConfigs()

  var secure
  try {
    secure = loaders.loadSecureConfig()
  } catch (e) {
  }

  start({ port, dir: process.cwd(), config, secure, chunks }).then(result => {
    coreutils.logger.info(`Your desktop app is now ready.`)
  }).catch(e => {
    coreutils.logger.fail(e)
  })
}
