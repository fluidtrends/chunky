'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactHotLoader = require('react-hot-loader');

var _reactDomChunky = require('react-dom-chunky');

var _reactChunky = require('react-chunky');

require('./global');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var render = function render(Component, config) {
  var appConfig = Object.assign({}, config);
  delete appConfig.chunks;
  _reactDom2.default.render(_react2.default.createElement(
    _reactHotLoader.AppContainer,
    null,
    _react2.default.createElement(
      _reactChunky.Core.AppContainer,
      _extends({}, config, { autoRefresh: true }),
      _react2.default.createElement(Component, _extends({}, appConfig, { autoRefresh: true }))
    )
  ), document.getElementById('chunky'));
};

if (module.hot) {
  require('./global');
  module.hot.accept();
  render(_reactDomChunky.App, Object.assign({}, chunky.config, { timestamp: '' + Date.now() }));
} else {
  render(_reactDomChunky.App, chunky.config);
}