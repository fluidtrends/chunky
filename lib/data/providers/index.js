"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Rest", {
  enumerable: true,
  get: function get() {
    return _rest["default"];
  }
});
Object.defineProperty(exports, "Firebase", {
  enumerable: true,
  get: function get() {
    return _firebase["default"];
  }
});
Object.defineProperty(exports, "Local", {
  enumerable: true,
  get: function get() {
    return _local["default"];
  }
});
Object.defineProperty(exports, "Cache", {
  enumerable: true,
  get: function get() {
    return _cache["default"];
  }
});

var _rest = _interopRequireDefault(require("./rest"));

var _firebase = _interopRequireDefault(require("./firebase"));

var _local = _interopRequireDefault(require("./local"));

var _cache = _interopRequireDefault(require("./cache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }