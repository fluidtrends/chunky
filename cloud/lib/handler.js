'use strict';

var loader = require('./loader');
var path = require('path');

function validate(event, chunk, config, filename, log) {
  return new Promise(function (resolve, reject) {
    var functionName = path.basename(filename, '.js');
    var fields = chunk.service.requiredFields[functionName];

    fields.forEach(function (field) {
      if (!event.body[field]) {
        reject(new Error('Missing required field: ' + field));
      }
    });

    var validatedAt = Date.now();
    var validatedIn = log.validatedAt - log.initializedAt;

    var newLog = Object.assign({}, log, {
      validatedAt: validatedAt,
      validatedIn: validatedIn
    });

    resolve({ chunk: chunk, config: config, log: newLog });
  });
}

function initialize(context) {
  return new Promise(function (resolve, reject) {
    try {
      context.callbackWaitsForEmptyEventLoop = false;

      var log = {
        startedAt: Date.now()
      };

      var chunk = loader.loadChunk();
      var config = loader.loadSecureCloudConfig();

      log.initializedAt = Date.now();
      log.initializedIn = log.initializedAt - log.startedAt;

      resolve({ chunk: chunk, config: config, log: log });
    } catch (error) {
      reject(error);
    }
  });
}

function main(execute, filename) {
  return function (event, context) {
    return initialize(context).then(function (_ref) {
      var chunk = _ref.chunk,
          config = _ref.config,
          log = _ref.log;
      return validate(event, chunk, config, filename, log);
    }).then(function (_ref2) {
      var chunk = _ref2.chunk,
          config = _ref2.config,
          log = _ref2.log;
      return execute({ event: event, chunk: chunk, config: config, log: log });
    }).then(function (data, log) {
      var executedAt = Date.now();
      var executedIn = executedAt - log.validatedAt;
      var finishIn = executedAt - log.startedAt;

      return Object.assign({}, { data: data }, log, {
        ok: true,
        executedAt: executedAt,
        executedIn: executedIn,
        finishIn: finishIn
      });
    }).catch(function (error) {
      return { error: error.message };
    });
  };
}

module.exports = main;