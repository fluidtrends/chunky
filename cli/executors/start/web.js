const coreutils = require('coreutils')
const opn = require('opn')
const path = require('path')
const loaders = require('../../src/loaders')
// const operation = require('../carmel/operation')
const runOp = require('../run/web')

const saveEvent = (type, value, cache) => {
  // const events = Object.assign({}, cache.vaults.carmel.read('events'))
  // events[type] = Object.assign({}, value, { timestamp: `${Date.now()}`})
  // cache.vaults.carmel.write('events', events)
}

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
      // saveEvent('compileWeb', compileEvent, cache)
      process.send && process.send(cache.saveEvent(Object.assign({}, { eventId: 'compileWeb' },  compileEvent )))
    })
    .then(url => {
      // saveEvent('startWeb', { port, pwd: process.cwd() }, cache)
      process.send && process.send(cache.saveEvent(Object.assign({}, { eventId: 'startWeb', port })))
      runOp(false, port)
    })
    .catch(e => {
      coreutils.logger.fail(e)
      // saveEvent('startWeb', { port, pwd: process.cwd(),  error: e.message }, cache)
      process.send && process.send(cache.saveEvent(Object.assign({}, { eventId: 'startWeb', port, error: e.message })))
    })
  } catch (e) {
    coreutils.logger.fail(e)
    // saveEvent('startWeb', { port, pwd: process.cwd(),  error: e.message }, cache)
    process.send && process.send(cache.saveEvent(Object.assign({}, { eventId: 'startWeb', port, error: e.message })))
  }
}
