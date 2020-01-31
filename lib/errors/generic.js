"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UNDEFINED_OPERATION = exports.UNABLE_TO_LOAD_CHUNKS = exports.UNABLE_TO_LOAD_APP = exports.COULD_NOT_CACHE_ITEM = exports.COULD_NOT_CLEAR_CACHED_ITEM = exports.COULD_NOT_RETRIEVE_CACHED_ITEM = void 0;

var _Error = _interopRequireDefault(require("../core/Error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Generic Errors
var COULD_NOT_RETRIEVE_CACHED_ITEM = function COULD_NOT_RETRIEVE_CACHED_ITEM() {
  return new _Error["default"]('Unable to retrieve cached item');
};

exports.COULD_NOT_RETRIEVE_CACHED_ITEM = COULD_NOT_RETRIEVE_CACHED_ITEM;

var COULD_NOT_CLEAR_CACHED_ITEM = function COULD_NOT_CLEAR_CACHED_ITEM() {
  return new _Error["default"]('Unable to clean up the cached item');
};

exports.COULD_NOT_CLEAR_CACHED_ITEM = COULD_NOT_CLEAR_CACHED_ITEM;

var COULD_NOT_CACHE_ITEM = function COULD_NOT_CACHE_ITEM() {
  return new _Error["default"]('Unable to cache item');
};

exports.COULD_NOT_CACHE_ITEM = COULD_NOT_CACHE_ITEM;

var UNABLE_TO_LOAD_APP = function UNABLE_TO_LOAD_APP() {
  return new _Error["default"]('Unable to load the application');
};

exports.UNABLE_TO_LOAD_APP = UNABLE_TO_LOAD_APP;

var UNABLE_TO_LOAD_CHUNKS = function UNABLE_TO_LOAD_CHUNKS() {
  return new _Error["default"]('Unable to load chunks');
};

exports.UNABLE_TO_LOAD_CHUNKS = UNABLE_TO_LOAD_CHUNKS;

var UNDEFINED_OPERATION = function UNDEFINED_OPERATION() {
  return new _Error["default"]("Operation Is Not Defined");
};

exports.UNDEFINED_OPERATION = UNDEFINED_OPERATION;