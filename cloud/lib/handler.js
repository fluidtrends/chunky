'use strict';

var loader = require('./loader');
var path = require('path');

function validate(_ref) {
  var event = _ref.event,
      chunk = _ref.chunk,
      config = _ref.config,
      filename = _ref.filename,
      log = _ref.log;

  return new Promise(function (resolve, reject) {
    var functionName = path.basename(filename, '.js');
    var fields = chunk.service.requiredFields[functionName];

    fields.forEach(function (field) {
      if (!event.body[field]) {
        reject(new Error('Missing required field: ' + field));
      }
    });

    resolve({ chunk: chunk, config: config, log: log });
  });
}

function initialize(_ref2) {
  var context = _ref2.context;

  return new Promise(function (resolve, reject) {
    try {
      context.callbackWaitsForEmptyEventLoop = false;

      var log = {
        startedAt: Date.now()
      };

      var chunk = loader.loadChunk();
      var config = loader.loadSecureCloudConfig();

      resolve({ chunk: chunk, config: config, log: log });
    } catch (error) {
      reject(error);
    }
  });
}

function main(execute, filename) {
  return function (event, context) {
    return initialize({ context: context }).then(function (_ref3) {
      var chunk = _ref3.chunk,
          config = _ref3.config,
          log = _ref3.log;
      return validate({ event: event, chunk: chunk, config: config, filename: filename, log: log });
    }).then(function (_ref4) {
      var chunk = _ref4.chunk,
          config = _ref4.config,
          log = _ref4.log;
      return execute({ event: event, chunk: chunk, config: config, log: log });
    }).then(function (data, log) {
      var executedAt = Date.now();
      var executedIn = executedAt - log.startedAt;

      return Object.assign({}, { data: data }, log, {
        ok: true,
        executedAt: executedAt,
        executedIn: executedIn
      });
    }).catch(function (error) {
      return { error: error.message };
    });
  };
}

module.exports = main;