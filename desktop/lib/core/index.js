'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

require('require-context/register');

var _reactHotLoader = require('react-hot-loader');

var _reactDomChunky = require('react-dom-chunky');

var _reactChunky = require('react-chunky');

require('./global');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var render = function render() {
  _reactDom2.default.render(_react2.default.createElement(
    _reactHotLoader.AppContainer,
    null,
    _react2.default.createElement(
      _reactChunky.Core.AppContainer,
      chunky.config,
      _react2.default.createElement(_reactDomChunky.App, chunky.config)
    )
  ), document.getElementById('chunky'));
};

render();

if (module.hot) {
  module.hot.accept(render);
}