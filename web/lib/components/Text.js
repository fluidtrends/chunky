"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Component2 = _interopRequireDefault(require("../core/Component"));

var _reactPlaceholder = _interopRequireDefault(require("react-placeholder"));

var _placeholders = require("react-placeholder/lib/placeholders");

var _marked = _interopRequireDefault(require("marked"));

var _urlParse = _interopRequireDefault(require("url-parse"));

var _reactChunky = require("react-chunky");

var _handlebars = _interopRequireDefault(require("handlebars/dist/cjs/handlebars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Text =
/*#__PURE__*/
function (_Component) {
  _inherits(Text, _Component);

  function Text(props) {
    var _this;

    _classCallCheck(this, Text);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Text).call(this, props));
    _this.state = _objectSpread({}, _this.state, {
      loading: true,
      selectedLanguage: null
    });
    return _this;
  }

  _createClass(Text, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      _get(_getPrototypeOf(Text.prototype), "componentDidMount", this).call(this);

      _reactChunky.Data.Cache.retrieveCachedItem('selectedLanguage').then(function (lang) {
        _this2.setState({
          selectedLanguage: lang
        });
      })["catch"](function () {
        return;
      });

      this.loadContent();
    }
  }, {
    key: "parseUrl",
    value: function parseUrl(source) {
      var ref = new _urlParse["default"](source);
      var type = ref.protocol.slice(0, -1).toLowerCase();
      var fullPath = "".concat(ref.hostname).concat(ref.pathname ? ref.pathname : '');

      switch (type) {
        case 'local':
          return "".concat(this.isDesktop ? '../../../../' : '/', "assets/text/").concat(fullPath, ".md");

        case 'github':
          return "https://raw.githubusercontent.com/".concat(fullPath, ".md");

        case 'dropbox':
          return "https://dl.dropboxusercontent.com/s/".concat(fullPath, ".md?raw=1&dl=1");

        case 'https':
        case 'http':
          return source;

        default:
      }
    }
  }, {
    key: "loadFromUrl",
    value: function loadFromUrl(url) {
      var _this3 = this;

      var translatedUrl = this.state.selectedLanguage && !url.includes('json') ? url.replace('/text/', "/text/".concat(this.state.selectedLanguage, "/")) : url;
      return fetch(translatedUrl).then(function (response) {
        return response.text();
      }).then(function (response) {
        return _handlebars["default"].compile(response)(Object.assign({}, _this3.props.input));
      }).then(function (markdown) {
        return (0, _marked["default"])(markdown, {});
      });
    }
  }, {
    key: "loadContent",
    value: function loadContent() {
      var _this4 = this;

      if (this.props.textSource && !this.props.textSource.includes('github://') && !this.props.textSource.includes('local://')) {
        this.setState({
          text: this.props.textSource
        });
        return false;
      }

      var source = this.props.source === 'text' ? this.props.textSource : this.props.source;
      var url = this.parseUrl(source);

      if (!url) {
        return;
      }

      this.loadFromUrl(url).then(function (text) {
        _this4.setState({
          loading: false,
          text: text
        });
      })["catch"](function (error) {
        _this4.setState({
          error: error
        });
      });
    }
  }, {
    key: "renderComponentContent",
    value: function renderComponentContent(_ref) {
      var titleColor = _ref.titleColor,
          textColor = _ref.textColor;
      var className = "text";
      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        className: className,
        dangerouslySetInnerHTML: {
          __html: this.state.text
        }
      }));
    }
  }, {
    key: "renderComponent",
    value: function renderComponent() {
      this.loadContent();
      return _react["default"].createElement("div", {
        style: Object.assign({}, {
          textAlign: 'center',
          padding: '10px',
          maxWidth: '90vw',
          overflow: 'hidden'
        }, this.props.style)
      }, _react["default"].createElement(_reactPlaceholder["default"], {
        showLoadingAnimation: true,
        rows: 7,
        ready: !this.state.loading,
        customPlaceholder: this.placeholder
      }, this.renderComponentContent({
        titleColor: '#263238',
        textColor: '#455A64'
      })));
    }
  }, {
    key: "placeholder",
    get: function get() {
      return _react["default"].createElement("div", {
        style: {
          justifyContent: 'center'
        }
      }, _react["default"].createElement(_placeholders.RectShape, {
        color: "#CFD8DC",
        style: {
          height: 40,
          marginBottom: 10
        }
      }), _react["default"].createElement(_placeholders.TextBlock, {
        rows: 7,
        color: "#ECEFF1"
      }));
    }
  }]);

  return Text;
}(_Component2["default"]);

exports["default"] = Text;