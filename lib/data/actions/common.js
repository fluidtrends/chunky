"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asyncAction = asyncAction;
exports.ok = exports.error = exports.start = exports.timestamp = exports.type = void 0;

var type = function type(name, state) {
  return "@@Chunky/".concat(state.toUpperCase(), "/").concat(name);
};

exports.type = type;

var timestamp = function timestamp() {
  return Date.now();
};

exports.timestamp = timestamp;

var start = function start(name, options) {
  return {
    type: type(name, "start"),
    timestamp: timestamp(),
    flavor: options.flavor,
    provider: options.provider
  };
};

exports.start = start;

var error = function error(name, _error, options) {
  return {
    type: type(name, "error"),
    flavor: options.flavor,
    provider: options.provider,
    error: _error,
    timestamp: timestamp()
  };
};

exports.error = error;

var ok = function ok(name, data, options) {
  return {
    type: type(name, "ok"),
    data: data,
    flavor: options.flavor,
    provider: options.provider,
    timestamp: timestamp()
  };
};

exports.ok = ok;

function asyncAction(name, operation, options) {
  if (options.flavor) {
    // Let's resolve the inner flavor, if necessary
    var flavor = options.flavor.split('/');

    if (flavor.length > 0 && options.props[flavor[1]]) {
      options.flavor = [flavor[0], options.props[flavor[1]]].join('/');
    }
  }

  return function (dispatch) {
    dispatch(start(name, options));
    operation().then(function (data) {
      return dispatch(ok(name, data, options));
    })["catch"](function (err) {
      return dispatch(error(name, err, options));
    });
  };
}