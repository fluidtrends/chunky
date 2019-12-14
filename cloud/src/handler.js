const loader = require('./loader')
const firebase = require('./firebase')
const path = require('path')

const now = Date.now()

var _context = {
  start: now,
  lastUpdate: now,
  sinceLastUpdate: 0,
  sinceStart: 0,
  burst: 0
}

function validate ({ event, chunk, config, filename, account }) {
  return new Promise((resolve, reject) => {
    if (!chunk.service.requiredFields) {
      resolve({ chunk, config })
      return
    }

    const functionName = path.basename(filename, '.js')
    const fields = chunk.service.requiredFields[functionName] || []

    fields.forEach(field => {
      if (!event.body[field]) {
        reject(new Error(`Missing required field: ${field}`))
      }
    })

    resolve({ chunk, config, account })
  })
}

function authorize ({ context, auth, event }) {
  return new Promise((resolve, reject) => {
    const update = Date.now()
    const burstRate = 1000

    _context.sinceLastUpdate = (update - _context.lastUpdate)
    _context.sinceStart = (update - _context.start)
    _context.lastUpdate = update
    _context.burst = (_context.sinceLastUpdate < burstRate ? _context.burst + 1 : 0)

    if (auth && auth.limit && _context.burst > auth.limit) {
      // reject(new Error(`Request limit reached: burst=${_context.burst}`))
    }

    context.callbackWaitsForEmptyEventLoop = false

    const chunk = loader.loadChunk()
    const config = loader.loadSecureCloudConfig()

    firebase.verify({ event, config })
            .then((account) => {
              if (auth.private && !account) {
                reject(new Error('Unauthorized access'))
                return
              }
              resolve({ chunk, config, account })
            })
  })
}

const handler = ({ executor, filename, auth }) => async (event, context) => {
  return authorize({ auth, context, event })
      .then(({ chunk, config, account }) => validate({ event, chunk, config, account, filename }))
      .then(({ chunk, config, account }) => executor({ event, chunk, config, account }))
      .then((data) => {
        return Object.assign({}, { data }, {
          ok: true,
          timestamp: Date.now()
        })
      })
      .catch(error => ({ data: { error: error.message } }))
}


module.exports = handler
