'use strict';

var loader = require('./loader');
var firebase = require('./firebase');

function validate(event, chunk) {
  // Look up the required fields for this function
  var fields = loader.loadRequiredFields(chunk);

  fields.forEach(function (req) {
    if (!event.body[req]) {
      throw new Error(req + ' field required');
    }
  });
}

function done(callback, data) {
  callback(null, data);
}

function doneWithError(callback, error) {
  callback(error);
}

function handleEvent(handler) {
  return function (event, context, callback) {
    try {
      // Make sure we wait until the event is processed
      context.callbackWaitsForEmptyEventLoop = false;

      // Look up the service chunk
      var chunk = loader.loadChunk();

      // Load the configuration
      var config = loader.loadSecureCloudConfig();

      // Validate the event first
      validate(event, chunk);

      // Handle the event
      handler(event, chunk, config)

      // The event finished successfully
      .then(function (data) {
        return done(callback, data);
      })

      // The event finished with an error
      .catch(function (error) {
        throw error;
      });
    } catch (e) {
      // Something failed, either at validation,
      // before the handler could complete or during execution
      doneWithError(callback, e);
    }
  };
}

module.exports = {
  handleEvent: handleEvent
};