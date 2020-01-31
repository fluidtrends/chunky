"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Analytics = exports.Providers = exports.Model = exports.Cache = exports.Selectors = exports.Actions = exports.Reducers = void 0;

var Reducers = _interopRequireWildcard(require("./reducers"));

exports.Reducers = Reducers;

var Actions = _interopRequireWildcard(require("./actions"));

exports.Actions = Actions;

var Selectors = _interopRequireWildcard(require("./selectors"));

exports.Selectors = Selectors;

var Cache = _interopRequireWildcard(require("./cache"));

exports.Cache = Cache;

var Model = _interopRequireWildcard(require("./model"));

exports.Model = Model;

var Providers = _interopRequireWildcard(require("./providers"));

exports.Providers = Providers;

var Analytics = _interopRequireWildcard(require("./analytics"));

exports.Analytics = Analytics;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }