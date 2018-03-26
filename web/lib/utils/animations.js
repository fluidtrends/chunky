'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fadeIn = fadeIn;

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fadeIn(Component, name) {
  return React.createElement(
    _reactAddonsCssTransitionGroup2.default,
    {
      transitionName: 'animation-fadeIn',
      transitionAppear: true,
      transitionAppearTimeout: 700,
      transitionEnter: false,
      transitionLeave: false },
    Component
  );
}