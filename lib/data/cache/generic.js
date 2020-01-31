"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retrieveCachedItem = retrieveCachedItem;
exports.cacheItem = cacheItem;
exports.clearCachedItem = clearCachedItem;

var Config = _interopRequireWildcard(require("../../config"));

var Errors = _interopRequireWildcard(require("../../errors"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function retrieveCachedItem(key) {
  return new Promise(function (resolve, reject) {
    storage.getItem(key, function (error, value) {
      if (error || !value || value === undefined) {
        // The item was not found locally
        reject(Errors.COULD_NOT_RETRIEVE_CACHED_ITEM());
        return;
      } // Send back the parsed value


      resolve(JSON.parse(value));
    });
  });
}

function cacheItem(key, value) {
  return new Promise(function (resolve, reject) {
    storage.setItem(key, JSON.stringify(value), function (error) {
      if (error) {
        // Something went wrong when saving the item
        reject(Errors.COULD_NOT_CACHE_ITEM());
        return;
      } // We're good to go


      resolve(value);
    });
  });
}

function clearCachedItem(key) {
  return new Promise(function (resolve, reject) {
    storage.removeItem(key, function (error) {
      if (error) {
        // The item could not be removed
        reject(Errors.COULD_NOT_CLEAR_CACHED_ITEM());
        return;
      }

      resolve();
    });
  });
}