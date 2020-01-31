"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Component", {
  enumerable: true,
  get: function get() {
    return _Component["default"];
  }
});
Object.defineProperty(exports, "Router", {
  enumerable: true,
  get: function get() {
    return _Router["default"];
  }
});
Object.defineProperty(exports, "Screen", {
  enumerable: true,
  get: function get() {
    return _Screen["default"];
  }
});
Object.defineProperty(exports, "App", {
  enumerable: true,
  get: function get() {
    return _App["default"];
  }
});
exports.Utils = exports.Components = void 0;

var _Component = _interopRequireDefault(require("./core/Component"));

var _Router = _interopRequireDefault(require("./core/Router"));

var _Screen = _interopRequireDefault(require("./core/Screen"));

var _App = _interopRequireDefault(require("./core/App"));

var Components = _interopRequireWildcard(require("./components"));

exports.Components = Components;

var Utils = _interopRequireWildcard(require("./utils"));

exports.Utils = Utils;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }