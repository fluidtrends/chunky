'use strict';

var loader = require('./loader');
var path = require('path');

function validate(_ref) {
  var event = _ref.event,
      chunk = _ref.chunk,
      config = _ref.config,
      filename = _ref.filename;

  return new Promise(function (resolve, reject) {
    var functionName = path.basename(filename, '.js');
    var fields = chunk.service.requiredFields[functionName];

    fields.forEach(function (field) {
      if (!event.body[field]) {
        reject(new Error('Missing required field: ' + field));
      }
    });

    resolve({ chunk: chunk, config: config });
  });
}

function initialize(_ref2) {
  var context = _ref2.context;

  return new Promise(function (resolve, reject) {
    try {
      context.callbackWaitsForEmptyEventLoop = false;

      var chunk = loader.loadChunk();
      var config = loader.loadSecureCloudConfig();

      resolve({ chunk: chunk, config: config });
    } catch (error) {
      reject(error);
    }
  });
}

function main(execute, filename) {
  return function (event, context) {
    return initialize({ context: context }).then(function (_ref3) {
      var chunk = _ref3.chunk,
          config = _ref3.config;
      return validate({ event: event, chunk: chunk, config: config, filename: filename });
    }).then(function (_ref4) {
      var chunk = _ref4.chunk,
          config = _ref4.config;
      return execute({ event: event, chunk: chunk, config: config });
    }).then(function (data) {
      return Object.assign({}, { data: data }, {
        ok: true,
        timestamp: Date.now()
      });
    }).catch(function (error) {
      return { error: error.message };
    });
  };
}

module.exports = main;