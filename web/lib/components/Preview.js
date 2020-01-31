"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Component2 = _interopRequireDefault(require("../core/Component"));

var _Text = _interopRequireDefault(require("./Text"));

var _responsive = require("../utils/responsive");

var _isElementVisible = require("../utils/isElementVisible");

var _AnimatedSection = _interopRequireDefault(require("./AnimatedSection"));

var _antd = require("antd");

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

var Preview =
/*#__PURE__*/
function (_Component) {
  _inherits(Preview, _Component);

  function Preview(props) {
    var _this;

    _classCallCheck(this, Preview);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Preview).call(this, props));
    _this.state = _objectSpread({}, _this.state, {
      startAnimation: false
    });
    _this.handleScrollToElement = _this.handleScrollToElement.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Preview, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _get(_getPrototypeOf(Preview.prototype), "componentDidMount", this).call(this);

      window.addEventListener('scroll', this.handleScrollToElement, true);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScrollToElement, true);
    }
  }, {
    key: "handleScrollToElement",
    value: function handleScrollToElement() {
      if ((0, _isElementVisible.isAnyPartOfElementInViewport)(this.previewRef) && !this.state.startAnimation) {
        this.setState({
          startAnimation: true
        });
        window.removeEventListener('scroll', this.handleScrollToElement, true);
      }
    }
  }, {
    key: "renderText",
    value: function renderText() {
      return (0, _responsive.renderResponsive)('text', _react["default"].createElement(_Text["default"], {
        source: this.props.text,
        style: {
          width: "90vw",
          padding: '10px',
          paddingBottom: '60px'
        }
      }), _react["default"].createElement(_Text["default"], {
        source: this.props.text,
        style: {
          width: "70vw",
          paddingBottom: '60px'
        }
      }));
    }
  }, {
    key: "renderImage",
    value: function renderImage() {
      return (0, _responsive.renderResponsive)('image', _react["default"].createElement("img", {
        src: "/assets/".concat(this.props.image),
        style: {
          width: '80vw',
          opacity: 0.8,
          zIndex: 0,
          boxShadow: ' 0 5px 20px 0 rgba(0,0,0,.15)'
        }
      }), _react["default"].createElement("img", {
        src: "/assets/".concat(this.props.image),
        style: {
          width: '700px',
          opacity: 0.8,
          zIndex: 0,
          boxShadow: ' 0 5px 20px 0 rgba(0,0,0,.15)'
        }
      }));
    }
  }, {
    key: "renderImgPreview",
    value: function renderImgPreview() {
      var fontSize = this.props.isSmallScreen ? 40 : 70;
      return _react["default"].createElement(_AnimatedSection["default"], {
        animationType: 'opacity',
        startAnimation: this.state.startAnimation,
        config: {
          tension: 20,
          friction: 60
        }
      }, _react["default"].createElement("div", {
        style: {
          width: '90vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }, this.renderImage(), _react["default"].createElement(_antd.Button, {
        type: "primary",
        className: "icon",
        theme: "filled",
        size: "large",
        style: {
          fontSize: fontSize,
          position: 'absolute',
          background: 'transparent',
          color: '#00BCD4',
          border: 0,
          cursor: 'initial'
        }
      }, "Coming Soon", _react["default"].createElement(_antd.Icon, {
        type: "laptop",
        theme: "outlined",
        spin: true
      }))));
    }
  }, {
    key: "renderComponent",
    value: function renderComponent() {
      var _this2 = this;

      return _react["default"].createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        },
        ref: function ref(_ref) {
          return _this2.previewRef = _ref;
        }
      }, this.renderText(), this.renderImgPreview());
    }
  }]);

  return Preview;
}(_Component2["default"]);

exports["default"] = Preview;