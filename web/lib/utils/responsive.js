"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderResponsiveLarge = renderResponsiveLarge;
exports.renderResponsiveSmall = renderResponsiveSmall;
exports.renderResponsive = renderResponsive;
exports.breakpoints = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactResponsive = _interopRequireDefault(require("react-responsive"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var breakpoints = {
  main: 1224
};
exports.breakpoints = breakpoints;

function renderResponsiveLarge(component) {
  return _react["default"].createElement(_reactResponsive["default"], {
    minWidth: breakpoints.main
  }, component);
}

function renderResponsiveSmall(component) {
  return _react["default"].createElement(_reactResponsive["default"], {
    maxWidth: breakpoints.main
  }, component);
}

function renderResponsive(key, small, large) {
  return _react["default"].createElement("div", {
    key: key
  }, renderResponsiveSmall(small), renderResponsiveLarge(large));
}