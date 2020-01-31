"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extendChunk = extendChunk;
exports.Config = exports.Styles = exports.Errors = exports.Data = exports.Core = exports["default"] = void 0;

var Core = _interopRequireWildcard(require("./core"));

exports.Core = Core;

var Data = _interopRequireWildcard(require("./data"));

exports.Data = Data;

var Errors = _interopRequireWildcard(require("./errors"));

exports.Errors = Errors;

var Styles = _interopRequireWildcard(require("./styles"));

exports.Styles = Styles;

var Config = _interopRequireWildcard(require("./config"));

exports.Config = Config;

var _deepmerge = _interopRequireDefault(require("deepmerge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function extendChunk(original, another) {
  return _deepmerge["default"].all([original, another]);
}

var _default = {
  Core: Core,
  Data: Data,
  Errors: Errors,
  Styles: Styles,
  Config: Config,
  extendChunk: extendChunk
};
exports["default"] = _default;