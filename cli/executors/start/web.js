const coreutils = require('coreutils')
const opn = require('opn')
const path = require('path')
const loaders = require('../../src/loaders')

module.exports = function (port) {
  const file = path.resolve(process.cwd(), 'node_modules', 'react-dom-chunky', 'bin', 'start.js')
  const start = require(file)

  coreutils.logger.info(`Starting your web app ...`)

  const config = loaders.loadMainConfig()
  const chunks = loaders.loadChunkConfigs()

  var secure
  try {
    secure = loaders.loadSecureConfig()
  } catch (e) {
  }
  start({ port, dir: process.cwd(), config, secure, chunks })
  .then(url => {
    opn(`http://localhost:${port}`)
  }).catch(e => {
    coreutils.logger.fail(e)
  })
}
