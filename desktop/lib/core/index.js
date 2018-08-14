'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactHotLoader = require('react-hot-loader');

var _reactDomChunky = require('react-dom-chunky');

var _reactChunky = require('react-chunky');

var _electron = require('electron');

require('./global');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Main = function (_Component) {
  _inherits(Main, _Component);

  function Main(props) {
    _classCallCheck(this, Main);

    var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(Main, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      _electron.ipcRenderer.on('refresh', function (event, _ref) {
        var session = _ref.session;

        _this2.setState({ session: session });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var config = Object.assign({}, chunky.config, {
        session: this.session,
        timestamp: '' + Date.now()
      });

      var appConfig = Object.assign({}, config);
      delete appConfig.chunks;

      return _react2.default.createElement(
        _reactHotLoader.AppContainer,
        null,
        _react2.default.createElement(
          _reactChunky.Core.AppContainer,
          config,
          _react2.default.createElement(_reactDomChunky.App, appConfig)
        )
      );
    }
  }, {
    key: 'session',
    get: function get() {
      return this.state.session || this.props.session;
    }
  }]);

  return Main;
}(_react.Component);

var start = function start(session) {
  if (module.hot) {
    require('./global');
    module.hot.accept();
  }

  _reactDom2.default.render(_react2.default.createElement(Main, { session: session }), document.getElementById('chunky'));
};

_electron.ipcRenderer.on('start', function (event, _ref2) {
  var session = _ref2.session;

  start(session);
});