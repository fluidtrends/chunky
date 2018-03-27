'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retrieveCachedItem = retrieveCachedItem;
exports.cacheItem = cacheItem;
exports.clearCachedItem = clearCachedItem;

var _config = require('../../config');

var Config = _interopRequireWildcard(_config);

var _errors = require('../../errors');

var Errors = _interopRequireWildcard(_errors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function retrieveCachedItem(key) {
  return new Promise(function (resolve, reject) {
    storage.getItem(key, function (error, value) {
      if (error || !value || value === undefined) {
        // The item was not found locally
        reject(Errors.COULD_NOT_RETRIEVE_CACHED_ITEM());
        return;
      }

      // Send back the parsed value
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
      }

      // We're good to go
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