'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rest = require('./rest');

Object.defineProperty(exports, 'Rest', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_rest).default;
  }
});

var _firebase = require('./firebase');

Object.defineProperty(exports, 'Firebase', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_firebase).default;
  }
});

var _local = require('./local');

Object.defineProperty(exports, 'Local', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_local).default;
  }
});

var _cache = require('./cache');

Object.defineProperty(exports, 'Cache', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_cache).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }