const loader = require('./loader')
const path = require('path')

function validate ({ event, chunk, config, filename, log }) {
  return new Promise((resolve, reject) => {
    const functionName = path.basename(filename, '.js')
    const fields = chunk.service.requiredFields[functionName]

    fields.forEach(field => {
      if (!event.body[field]) {
        reject(new Error(`Missing required field: ${field}`))
      }
    })

    const validatedAt = Date.now()
    const validatedIn = (validatedAt - log.initializedAt)

    var newLog = Object.assign({}, log, {
      validatedAt,
      validatedIn
    })

    resolve({ chunk, config, log: newLog })
  })
}

function initialize ({ context }) {
  return new Promise((resolve, reject) => {
    try {
      context.callbackWaitsForEmptyEventLoop = false

      var log = {
        startedAt: Date.now()
      }

      const chunk = loader.loadChunk()
      const config = loader.loadSecureCloudConfig()

      log.initializedAt = Date.now()
      log.initializedIn = (log.initializedAt - log.startedAt)

      resolve({ chunk, config, log })
    } catch (error) {
      reject(error)
    }
  })
}

function main (execute, filename) {
  return (event, context) => initialize({ context })
                              .then(({ chunk, config, log }) => validate({ event, chunk, config, filename, log }))
                              .then(({ chunk, config, log }) => execute({ event, chunk, config, log }))
                              .then((data, log) => {
                                const executedAt = Date.now()
                                const executedIn = (executedAt - log.validatedAt)
                                const finishIn = (executedAt - log.startedAt)

                                return Object.assign({}, { data }, log, {
                                  ok: true,
                                  executedAt,
                                  executedIn,
                                  finishIn
                                })
                              })
                              .catch(error => ({ error: error.message }))
}

module.exports = main
