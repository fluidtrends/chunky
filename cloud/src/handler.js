const loader = require('./loader')
const path = require('path')

function validate (event, chunk, config, filename) {
  return new Promise((resolve, reject) => {
    // Look up the required fields for the given function
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

function initialize (context) {
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
  return (event, context) => initialize(context)
                              .then(({ chunk, config }) => validate(event, chunk, config, filename))
                              .then(({ chunk, config }) => execute(event, chunk, config))
                              .catch(error => ({ error: error.message }))
}

module.exports = main
