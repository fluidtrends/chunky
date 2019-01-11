const coreutils = require('coreutils')
const opn = require('opn')
const path = require('path')
const loaders = require('../../src/loaders')
const operation = require('../carmel/operation')

module.exports = function (port, account, cache) {
  const file = path.resolve(process.cwd(), 'node_modules', 'react-dom-chunky', 'bin', 'start.js')
  const start = require(file)

  coreutils.logger.info(`Starting your web app ...`)

  var secure, config, chunks

  try {
    try {
      secure = loaders.loadSecureConfig()
    } catch (e) {
    }
    config = loaders.loadMainConfig()
    chunks = loaders.loadChunkConfigs()

    start({ port, dir: process.cwd(), config, secure, chunks }, (event) => {
      const errors = event.errors
      errors && delete event.errors
      const compileEvent = Object.assign({}, event, errors && errors.length > 0 && { error: errors[0].message })
      operation.send(Object.assign({}, { type: "web-compile", port, pwd: process.cwd() }, compileEvent), account, cache)
    })
    .then(url => {
      opn(`http://localhost:${port}`)
      return operation.send({ type: "start-web", port, pwd: process.cwd() }, account, cache)
    })
    .catch(e => {
      coreutils.logger.fail(e)
      return operation.send({ type: "start-web", port, pwd: process.cwd(), error: e.message }, account, cache)
    })
  } catch (e) {
    coreutils.logger.fail(e)
    return operation.send({ type: "start-web", port, pwd: process.cwd(), error: e.message }, account, cache)
  }
}
