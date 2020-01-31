"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderResponsive = renderResponsive;
exports.breakpoints = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactResponsive = require("react-responsive");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var breakpoints = {
  main: 1224
};
exports.breakpoints = breakpoints;

function renderResponsive(key, small, large) {
  // const isDesktopOrLaptop = () => useMediaQuery({ query: `(min-device-width: ${breakpoints.main}px)` })
  // const isTabletOrMobileDevice = () => useMediaQuery({ query: `(max-device-width: ${breakpoints.main}px)` })
  // {isDesktopOrLaptop() && large }
  // {isTabletOrMobileDevice() && small }
  return _react["default"].createElement("div", {
    key: key
  }, large || small);
}