"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newShortId = newShortId;
exports.newRandomId = newRandomId;

var _react = _interopRequireDefault(require("react"));

var _shortid = _interopRequireDefault(require("shortid"));

var _randomstring = _interopRequireDefault(require("randomstring"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function newShortId() {
  return _shortid["default"].generate();
}

function newRandomId(args) {
  return _randomstring["default"].generate(args);
}