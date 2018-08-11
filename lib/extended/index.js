'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Product = require('./Product');

Object.defineProperty(exports, 'Product', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Product).default;
  }
});

var _package = require('./generators/package');

Object.keys(_package).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _package[key];
    }
  });
});

var _manifest = require('./generators/manifest');

Object.keys(_manifest).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _manifest[key];
    }
  });
});

var _chunks = require('./generators/chunks');

Object.keys(_chunks).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _chunks[key];
    }
  });
});

var _files = require('./generators/files');

Object.keys(_files).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _files[key];
    }
  });
});

var _templates = require('./generators/templates');

Object.keys(_templates).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _templates[key];
    }
  });
});

var _files2 = require('./loaders/files');

Object.keys(_files2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _files2[key];
    }
  });
});

var _manifest2 = require('./loaders/manifest');

Object.keys(_manifest2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _manifest2[key];
    }
  });
});

var _chunks2 = require('./loaders/chunks');

Object.keys(_chunks2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _chunks2[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }