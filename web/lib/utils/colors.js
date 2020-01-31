"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isColorLight = isColorLight;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isColorLight(c) {
  var c = c.substring(1);
  var rgb = parseInt(c, 16);
  var r = rgb >> 16 & 0xff;
  var g = rgb >> 8 & 0xff;
  var b = rgb >> 0 & 0xff;
  var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luma > 210;
}