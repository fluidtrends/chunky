'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.breakpoints = undefined;
exports.renderResponsiveLarge = renderResponsiveLarge;
exports.renderResponsiveSmall = renderResponsiveSmall;
exports.renderResponsive = renderResponsive;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactResponsive = require('react-responsive');

var _reactResponsive2 = _interopRequireDefault(_reactResponsive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var breakpoints = exports.breakpoints = {
  main: 768
};

function renderResponsiveLarge(component) {
  return _react2.default.createElement(
    _reactResponsive2.default,
    { minWidth: breakpoints.main },
    component
  );
}

function renderResponsiveSmall(component) {
  return _react2.default.createElement(
    _reactResponsive2.default,
    { maxWidth: breakpoints.main },
    component
  );
}

function renderResponsive(key, small, large) {
  return _react2.default.createElement(
    'div',
    { key: key },
    renderResponsiveSmall(small),
    renderResponsiveLarge(large)
  );
}