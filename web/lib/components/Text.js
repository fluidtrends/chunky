'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Component2 = require('../core/Component');

var _Component3 = _interopRequireDefault(_Component2);

var _reactPlaceholder = require('react-placeholder');

var _reactPlaceholder2 = _interopRequireDefault(_reactPlaceholder);

var _placeholders = require('react-placeholder/lib/placeholders');

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = function (_Component) {
  _inherits(Text, _Component);

  function Text(props) {
    _classCallCheck(this, Text);

    var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, props));

    _this.state = _extends({}, _this.state, { loading: true });
    return _this;
  }

  _createClass(Text, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(Text.prototype.__proto__ || Object.getPrototypeOf(Text.prototype), 'componentDidMount', this).call(this);
      this.loadContent();
    }
  }, {
    key: 'parseUrl',
    value: function parseUrl(source) {
      var ref = new _urlParse2.default(source);
      var type = ref.protocol.slice(0, -1).toLowerCase();
      var fullPath = '' + ref.hostname + (ref.pathname ? ref.pathname : '');

      switch (type) {
        case 'local':
          return (this.isDesktop ? '../../../../' : '/') + 'assets/text/' + fullPath + '.md';
        case 'github':
          return 'https://raw.githubusercontent.com/' + fullPath + '.md';
        case 'dropbox':
          return 'https://dl.dropboxusercontent.com/s/' + fullPath + '.md?raw=1&dl=1';
        case 'https':
        case 'http':
          return source;
        default:
      }
    }
  }, {
    key: 'loadFromUrl',
    value: function loadFromUrl(url) {
      return fetch(url).then(function (response) {
        return response.text();
      }).then(function (markdown) {
        return (0, _marked2.default)(markdown, {});
      });
    }
  }, {
    key: 'loadContent',
    value: function loadContent() {
      var _this2 = this;

      var url = this.parseUrl(this.props.source);

      if (!url) {
        return;
      }

      this.loadFromUrl(url).then(function (text) {
        _this2.setState({ loading: false, text: text });
      }).catch(function (error) {
        _this2.setState({ error: error });
      });
    }
  }, {
    key: 'renderComponentContent',
    value: function renderComponentContent(_ref) {
      var titleColor = _ref.titleColor,
          textColor = _ref.textColor;

      var className = 'text';
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('div', { className: className, dangerouslySetInnerHTML: { __html: this.state.text } })
      );
    }
  }, {
    key: 'renderComponent',
    value: function renderComponent() {
      this.loadContent();
      return _react2.default.createElement(
        'div',
        { style: Object.assign({}, {
            textAlign: 'center',
            padding: '20px',
            maxWidth: '90vw',
            overflow: 'hidden'
          }, this.props.style) },
        _react2.default.createElement(
          _reactPlaceholder2.default,
          {
            showLoadingAnimation: true,
            rows: 7,
            ready: !this.state.loading,
            customPlaceholder: this.placeholder },
          this.renderComponentContent({ titleColor: '#263238', textColor: '#455A64' })
        )
      );
    }
  }, {
    key: 'placeholder',
    get: function get() {
      return _react2.default.createElement(
        'div',
        { style: { justifyContent: 'center' } },
        _react2.default.createElement(_placeholders.RectShape, { color: '#CFD8DC', style: { height: 40, marginBottom: 10 } }),
        _react2.default.createElement(_placeholders.TextBlock, { rows: 7, color: '#ECEFF1' })
      );
    }
  }]);

  return Text;
}(_Component3.default);

exports.default = Text;