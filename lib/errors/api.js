"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WARNING_INVALID_RESPONSE = exports.WARNING_EMPTY_RESPONSE = exports.TIMEOUT_ERROR = void 0;

var _Error = _interopRequireDefault(require("../core/Error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Generic API Errors
var TIMEOUT_ERROR = function TIMEOUT_ERROR() {
  return new _Error["default"]('The operation timed out');
};

exports.TIMEOUT_ERROR = TIMEOUT_ERROR;
var WARNING_EMPTY_RESPONSE = 'The response returned with an empty response';
exports.WARNING_EMPTY_RESPONSE = WARNING_EMPTY_RESPONSE;
var WARNING_INVALID_RESPONSE = 'The response returned with an invalid response';
exports.WARNING_INVALID_RESPONSE = WARNING_INVALID_RESPONSE;