"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fadeIn = fadeIn;

var _react = _interopRequireDefault(require("react"));

var _reactAddonsCssTransitionGroup = _interopRequireDefault(require("react-addons-css-transition-group"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function fadeIn(Component, name) {
  return _react["default"].createElement(_reactAddonsCssTransitionGroup["default"], {
    transitionName: "animation-fadeIn",
    transitionAppear: true,
    transitionAppearTimeout: 700,
    transitionEnter: false,
    transitionLeave: false
  }, Component);
}