'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _package = require('./package');

Object.keys(_package).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _package[key];
    }
  });
});

var _manifest = require('./manifest');

Object.keys(_manifest).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _manifest[key];
    }
  });
});

var _chunks = require('./chunks');

Object.keys(_chunks).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _chunks[key];
    }
  });
});

var _files = require('./files');

Object.keys(_files).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _files[key];
    }
  });
});

var _templates = require('./templates');

Object.keys(_templates).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _templates[key];
    }
  });
});