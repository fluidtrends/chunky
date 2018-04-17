'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _data = require('./data');

Object.keys(_data).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _data[key];
    }
  });
});