'use strict'

const loader = require('./loader')
const firebase = require('../../firebase')

function validate(event, chunk) {
  // Look up the required fields for this function
  const fields = loader.loadRequiredFields(chunk)

  fields.forEach(req => {
    if (!event.body[req]) {
      throw new Error(`${req} field required`)
    }
  })
}

function done(callback, logs) {
  callback(null, { logs })
}

function doneWithError(callback, error) {
  callback(error)
}

function handleEvent(handler) {
  return (event, context, callback) => {
    try {
      // Make sure we wait until the event is processed
      context.callbackWaitsForEmptyEventLoop = false;

      // Look up the service chunk
      const chunk = loader.loadChunk()

      // Load the configuration
      const config = loader.loadSecureCloudConfig()

      // Validate the event first
      validate(event, chunk)

      // Handle the event
      handler(event, chunk, config).

      // The event finished successfully
      then(data => done(callback, data)).

      // The event finished with an error
      catch(error => { throw error })
    } catch (e) {
      // Something failed, either at validation,
      // before the handler could complete or during execution
      doneWithError(callback, e)
    }
  }
}

module.exports = {
  handleEvent
}
