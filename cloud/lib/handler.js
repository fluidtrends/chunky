'use strict';

var loader = require('./loader');
var path = require('path');

function validate(event, chunk, config, filename) {
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

function initialize(context) {
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
  var startedAt = Date.now();
  return function (event, context) {
    return initialize(context).then(function (_ref) {
      var chunk = _ref.chunk,
          config = _ref.config;
      return validate(event, chunk, config, filename);
    }).then(function (_ref2) {
      var chunk = _ref2.chunk,
          config = _ref2.config;
      return execute(event, chunk, config);
    }).then(function (data) {
      return Object.assign({}, { data: data }, {
        ok: true,
        duration: Date.now() - startedAt
      });
    }).catch(function (error) {
      return { error: error.message };
    });
  };
}

module.exports = main;