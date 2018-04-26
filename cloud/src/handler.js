const loader = require('./loader')
const path = require('path')

const now = Date.now()

var _context = {
  start: now,
  lastUpdate: now,
  sinceLastUpdate: 0,
  sinceStart: 0,
  burst: 0
}

function validate ({ event, chunk, config, filename }) {
  return new Promise((resolve, reject) => {
    const functionName = path.basename(filename, '.js')
    const fields = chunk.service.requiredFields[functionName]

    fields.forEach(field => {
      if (!event.body[field]) {
        reject(new Error(`Missing required field: ${field}`))
      }
    })

    resolve({ chunk, config })
  })
}

function initialize () {
  return new Promise((resolve, reject) => {
    try {
      const chunk = loader.loadChunk()
      const config = loader.loadSecureCloudConfig()

      resolve({ chunk, config })
    } catch (error) {
      reject(error)
    }
  })
}

function authorize ({ context, auth }) {
  return new Promise((resolve, reject) => {
    const update = Date.now()
    const burstRate = 10000

    _context.sinceLastUpdate = (update - _context.lastUpdate)
    _context.sinceStart = (update - _context.start)
    _context.lastUpdate = update
    _context.burst = (_context.sinceLastUpdate < burstRate ? _context.burst + 1 : 0)

    if (auth && auth.limit && _context.burst < auth.limit) {
      reject(new Error(`Request limit reached - burst: ${_context.burst} / sinceLastUpdate: ${_context.sinceLastUpdate} / sinceStart: ${_context.sinceStart} `))
    }

    context.callbackWaitsForEmptyEventLoop = false
    resolve()
  })
}

function main ({ executor, filename, auth }) {
  return (event, context) => authorize({ auth, context })
                              .then(() => initialize())
                              .then(({ chunk, config }) => validate({ event, chunk, config, filename }))
                              .then(({ chunk, config }) => executor({ event, chunk, config }))
                              .then((data) => {
                                return Object.assign({}, { data }, {
                                  ok: true,
                                  timestamp: Date.now()
                                })
                              })
                              .catch(error => ({ error: error.message }))
}

module.exports = main
