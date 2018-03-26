'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WARNING_INVALID_RESPONSE = exports.WARNING_EMPTY_RESPONSE = exports.TIMEOUT_ERROR = undefined;

var _Error = require('../core/Error');

var _Error2 = _interopRequireDefault(_Error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Generic API Errors
var TIMEOUT_ERROR = exports.TIMEOUT_ERROR = function TIMEOUT_ERROR() {
  return new _Error2.default('The operation timed out');
};
var WARNING_EMPTY_RESPONSE = exports.WARNING_EMPTY_RESPONSE = 'The response returned with an empty response';
var WARNING_INVALID_RESPONSE = exports.WARNING_INVALID_RESPONSE = 'The response returned with an invalid response';