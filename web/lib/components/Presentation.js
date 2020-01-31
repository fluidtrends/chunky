"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Component2 = _interopRequireDefault(require("../core/Component"));

var _responsive = require("../utils/responsive");

var _typography = require("@rmwc/typography");

var _antd = require("antd");

var _Media = _interopRequireDefault(require("./Media"));

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

var Presentation =
/*#__PURE__*/
function (_Component) {
  _inherits(Presentation, _Component);

  function Presentation(props) {
    var _this;

    _classCallCheck(this, Presentation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Presentation).call(this, props));
    _this.state = _objectSpread({}, _this.state, {
      modalVisible: false,
      videoPlaying: false
    });
    _this._showModal = _this.showModal.bind(_assertThisInitialized(_this));
    _this._hideModal = _this.hideModal.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Presentation, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _get(_getPrototypeOf(Presentation.prototype), "componentDidMount", this).call(this);
    }
  }, {
    key: "showModal",
    value: function showModal() {
      this.setState({
        modalVisible: true,
        videoPlaying: true
      });
    }
  }, {
    key: "hideModal",
    value: function hideModal() {
      this.setState({
        modalVisible: false,
        videoPlaying: false
      });
    }
  }, {
    key: "renderImage",
    value: function renderImage() {
      return (0, _responsive.renderResponsive)('image', _react["default"].createElement("img", {
        src: "/assets/".concat(this.props.image),
        style: {
          width: '80vw',
          opacity: 0.5,
          boxShadow: ' 0 5px 20px 0 rgba(0,0,0,.15)'
        }
      }), _react["default"].createElement("img", {
        src: "/assets/".concat(this.props.image),
        style: {
          width: '700px',
          maxWidth: '90vw',
          opacity: 0.5,
          boxShadow: ' 0 5px 20px 0 rgba(0,0,0,.15)'
        }
      }));
    }
  }, {
    key: "renderThumbnail",
    value: function renderThumbnail() {
      var fontSize = this.props.isSmallScreen ? 40 : 70;
      return _react["default"].createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: "80px 0"
        }
      }, _react["default"].createElement("div", {
        style: {
          width: '90vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }, this.renderImage(), _react["default"].createElement(_antd.Icon, {
        onClick: this._showModal,
        type: "play-circle",
        className: "icon",
        theme: "filled",
        style: {
          fontSize: fontSize,
          position: 'absolute',
          cursor: 'pointer',
          background: 'transparent'
        }
      })));
    }
  }, {
    key: "renderModal",
    value: function renderModal() {
      var width = this.props.isSmallScreen ? '80vw' : 1200;
      var marginTop = this.props.isSmallScreen ? 150 : 0;
      var paddingTop = '56.25%';
      return _react["default"].createElement(_antd.Modal, {
        centered: true,
        cancelButtonProps: {
          shape: 'circle',
          type: 'danger'
        },
        onCancel: this._hideModal,
        width: width,
        bodyStyle: {
          paddingTop: paddingTop,
          marginTop: marginTop
        },
        footer: null,
        visible: this.state.modalVisible
      }, _react["default"].createElement(_Media["default"], {
        video: this.props.url,
        width: "100%",
        height: "100%",
        style: {
          position: 'absolute',
          top: 0,
          left: 0
        },
        playing: this.state.videoPlaying
      }));
    }
  }, {
    key: "renderComponent",
    value: function renderComponent() {
      return _react["default"].createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: "50px",
          backgroundColor: this.props.backgroundColor
        }
      }, _react["default"].createElement("div", {
        style: {
          textAlign: 'center'
        }
      }, this.props.title && _react["default"].createElement(_typography.Typography, {
        use: "headline2",
        style: _objectSpread({
          margin: '20px',
          color: this.props.textColor
        }, this.props.titleAdditionalStyle)
      }, ' ', this.props.title), this.renderThumbnail(), this.renderModal()));
    }
  }]);

  return Presentation;
}(_Component2["default"]);

exports["default"] = Presentation;