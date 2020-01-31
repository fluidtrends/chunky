"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retrieveAuth = retrieveAuth;
exports.cacheAuth = cacheAuth;
exports.clearAuth = clearAuth;
exports.retrieveContext = retrieveContext;
exports.cacheContext = cacheContext;
exports.clearContext = clearContext;

var Config = _interopRequireWildcard(require("../../config"));

var _generic = require("./generic");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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