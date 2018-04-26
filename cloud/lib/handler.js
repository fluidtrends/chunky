'use strict';

var loader = require('./loader');
var path = require('path');

var now = Date.now();

var _context = {
  start: now,
  lastUpdate: now,
  sinceLastUpdate: 0,
  sinceStart: 0,
  burst: 0
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

function initialize() {
  return new Promise(function (resolve, reject) {
    try {
      var chunk = loader.loadChunk();
      var config = loader.loadSecureCloudConfig();

      resolve({ chunk: chunk, config: config });
    } catch (error) {
      reject(error);
    }
  });
}

function authorize(_ref2) {
  var context = _ref2.context,
      auth = _ref2.auth;

  return new Promise(function (resolve, reject) {
    var update = Date.now();
    var burstRate = 1000;

    _context.sinceLastUpdate = update - _context.lastUpdate;
    _context.sinceStart = update - _context.start;
    _context.lastUpdate = update;
    _context.burst = _context.sinceLastUpdate < burstRate ? _context.burst + 1 : 0;

    if (auth && auth.limit && _context.burst > auth.limit) {
      reject(new Error('Request limit reached'));
    }

    context.callbackWaitsForEmptyEventLoop = false;
    resolve();
  });
}

function main(_ref3) {
  var executor = _ref3.executor,
      filename = _ref3.filename,
      auth = _ref3.auth;

  return function (event, context) {
    return authorize({ auth: auth, context: context }).then(function () {
      return initialize();
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