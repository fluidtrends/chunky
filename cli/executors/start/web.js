const coreutils = require('coreutils')
const opn = require('opn')
const path = require('path')
const loaders = require('../../src/loaders')

module.exports = function (port) {
  const file = path.resolve(process.cwd(), 'node_modules', 'react-dom-chunky', 'bin', 'start.js')
  const start = require(file)

  coreutils.logger.info(`Starting the web packager on port ${port} ...`)

  const config = loaders.loadMainConfig()
  const chunks = loaders.loadChunkConfigs()

  var secure
  try {
    secure = loaders.loadSecureConfig()
  } catch (e) {
    coreutils.logger.skip(`This product is not provisioned. Continuing anyways.`)
  }
  start({ port, dir: process.cwd(), config, secure, chunks }).then(url => {
    coreutils.logger.ok(`Your web app is now available at ${url}`)
  }).catch(e => {
    coreutils.logger.fail(e)
  })
}
