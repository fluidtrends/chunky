'use strict';

var loader = require('./loader');
var path = require('path');

var now = Date.now();

var _context = {
  start: now,
  lastUpdate: now,
  sinceLastUpdate: 0,
  sinceStart: 0,
  counter: 0
};

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

function authorize(auth) {
  return new Promise(function (resolve, reject) {
    var update = Date.now();

    _context.sinceLastUpdate = update - _context.lastUpdate;
    _context.sinceStart = update - _context.start;
    _context.lastUpdate = update;
    _context.counter = _context.counter + 1;

    if (!auth || !auth.limit) {
      resolve();
    }

    reject(new Error('Request limit reached'));
  });
}

function main(_ref3) {
  var executor = _ref3.executor,
      filename = _ref3.filename,
      auth = _ref3.auth;

  return function (event, context) {
    return authorize(auth).then(function () {
      return initialize({ context: context });
    }).then(function (_ref4) {
      var chunk = _ref4.chunk,
          config = _ref4.config;
      return validate({ event: event, chunk: chunk, config: config, filename: filename });
    }).then(function (_ref5) {
      var chunk = _ref5.chunk,
          config = _ref5.config;
      return executor({ event: event, chunk: chunk, config: config });
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