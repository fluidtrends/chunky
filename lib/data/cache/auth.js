'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retrieveAuth = retrieveAuth;
exports.cacheAuth = cacheAuth;
exports.clearAuth = clearAuth;
exports.retrieveContext = retrieveContext;
exports.cacheContext = cacheContext;
exports.clearContext = clearContext;

var _config = require('../../config');

var Config = _interopRequireWildcard(_config);

var _generic = require('./generic');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function retrieveAuth() {
  return (0, _generic.retrieveCachedItem)(Config.AUTH_CACHE_KEY);
}

function cacheAuth(data) {
  return (0, _generic.cacheItem)(Config.AUTH_CACHE_KEY, data);
}

function clearAuth() {
  return (0, _generic.clearCachedItem)(Config.AUTH_CACHE_KEY);
}

function retrieveContext() {
  return (0, _generic.retrieveCachedItem)(Config.AUTH_CONTEXT_KEY);
}

function cacheContext(data) {
  return (0, _generic.cacheItem)(Config.AUTH_CONTEXT_KEY, data);
}

function clearContext() {
  return (0, _generic.clearCachedItem)(Config.AUTH_CONTEXT_KEY);
}