const loader = require('./loader')
const path = require('path')

const now = Date.now()

var _context = {
  start: now,
  lastUpdate: now,
  sinceLastUpdate: 0,
  sinceStart: 0,
  counter: 0
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

function initialize ({ context }) {
  return new Promise((resolve, reject) => {
    try {
      context.callbackWaitsForEmptyEventLoop = false

      const chunk = loader.loadChunk()
      const config = loader.loadSecureCloudConfig()

      resolve({ chunk, config })
    } catch (error) {
      reject(error)
    }
  })
}

function main (execute, filename) {
  const update = Date.now()

  _context.sinceLastUpdate = (update - _context.lastUpdate)
  _context.sinceStart = (update - _context.start)
  _context.lastUpdate = update

  return (event, context) => initialize({ context })
                              .then(({ chunk, config }) => validate({ event, chunk, config, filename }))
                              .then(({ chunk, config }) => execute({ event, chunk, config, context: _context }))
                              .then((data) => {
                                return Object.assign({}, { data }, {
                                  ok: true,
                                  timestamp: Date.now()
                                })
                              })
                              .catch(error => ({ error: error.message }))
}

module.exports = main
