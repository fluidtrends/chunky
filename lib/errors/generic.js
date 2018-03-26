'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UNDEFINED_OPERATION = exports.UNABLE_TO_LOAD_CHUNKS = exports.UNABLE_TO_LOAD_APP = exports.COULD_NOT_CACHE_ITEM = exports.COULD_NOT_CLEAR_CACHED_ITEM = exports.COULD_NOT_RETRIEVE_CACHED_ITEM = undefined;

var _Error = require('../core/Error');

var _Error2 = _interopRequireDefault(_Error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Generic Errors
var COULD_NOT_RETRIEVE_CACHED_ITEM = exports.COULD_NOT_RETRIEVE_CACHED_ITEM = function COULD_NOT_RETRIEVE_CACHED_ITEM() {
  return new _Error2.default('Unable to retrieve cached item');
};
var COULD_NOT_CLEAR_CACHED_ITEM = exports.COULD_NOT_CLEAR_CACHED_ITEM = function COULD_NOT_CLEAR_CACHED_ITEM() {
  return new _Error2.default('Unable to clean up the cached item');
};
var COULD_NOT_CACHE_ITEM = exports.COULD_NOT_CACHE_ITEM = function COULD_NOT_CACHE_ITEM() {
  return new _Error2.default('Unable to cache item');
};
var UNABLE_TO_LOAD_APP = exports.UNABLE_TO_LOAD_APP = function UNABLE_TO_LOAD_APP() {
  return new _Error2.default('Unable to load the application');
};
var UNABLE_TO_LOAD_CHUNKS = exports.UNABLE_TO_LOAD_CHUNKS = function UNABLE_TO_LOAD_CHUNKS() {
  return new _Error2.default('Unable to load chunks');
};
var UNDEFINED_OPERATION = exports.UNDEFINED_OPERATION = function UNDEFINED_OPERATION() {
  return new _Error2.default('Operation Is Not Defined');
};