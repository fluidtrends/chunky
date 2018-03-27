'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.common = exports.auth = undefined;

var _redux = require('redux');

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _common = require('./common');

var common = _interopRequireWildcard(_common);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Load common reducers
var commonReducers = { auth: _auth2.default

  // Create the root reducer
};var reducers = function reducers(appReducers) {
  return (0, _redux.combineReducers)(Object.assign(commonReducers, appReducers));
};

exports.auth = _auth2.default;
exports.common = common;
exports.default = reducers;