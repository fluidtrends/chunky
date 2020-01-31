"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Component2 = _interopRequireDefault(require("../core/Component"));

var _Text = _interopRequireDefault(require("./Text"));

var _AnimatedSvg = _interopRequireDefault(require("./AnimatedSvg"));

var _responsive = require("../utils/responsive");

var _Zoom = _interopRequireDefault(require("react-reveal/Zoom"));

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

var Benefits =
/*#__PURE__*/
function (_Component) {
  _inherits(Benefits, _Component);

  function Benefits(props) {
    var _this;

    _classCallCheck(this, Benefits);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Benefits).call(this, props));
    _this.state = _objectSpread({}, _this.state);
    return _this;
  }

  _createClass(Benefits, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _get(_getPrototypeOf(Benefits.prototype), "componentDidMount", this).call(this);
    }
  }, {
    key: "text",
    value: function text(name, index, total) {
      return (0, _responsive.renderResponsive)('text', _react["default"].createElement(_Text["default"], {
        source: name,
        style: {
          width: "90vw",
          color: this.props.textColor
        }
      }), _react["default"].createElement(_Text["default"], {
        source: name,
        style: {
          width: "".concat(80 / total, "vw"),
          color: this.props.textColor
        }
      }));
    }
  }, {
    key: "button",
    value: function button() {
      return _react["default"].createElement("div", null);
    }
  }, {
    key: "image",
    value: function image(_image, index, total) {
      var fileType = _image.split('.')[_image.split('.').length - 1];

      if (fileType === 'svg') {
        return (0, _responsive.renderResponsive)('image', _react["default"].createElement(_AnimatedSvg["default"], {
          id: "".concat(_image),
          src: "/assets/".concat(_image),
          duration: 200,
          style: {
            width: '90vw'
          }
        }), _react["default"].createElement(_AnimatedSvg["default"], {
          id: "".concat(_image),
          src: "/assets/".concat(_image),
          duration: 200,
          style: {
            width: "".concat(90 / total, "vw")
          }
        }));
      } else {
        return (0, _responsive.renderResponsive)('image', _react["default"].createElement("img", {
          src: "/assets/".concat(_image),
          style: {
            width: '90vw'
          }
        }), _react["default"].createElement("img", {
          src: "/assets/".concat(_image),
          style: {
            width: "".concat(100 / total, "vw")
          }
        }));
      }
    }
  }, {
    key: "renderBlock",
    value: function renderBlock(block, index, total) {
      return _react["default"].createElement("div", {
        key: "block".concat(index),
        style: {
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }, this.image(block.image, index, total), this.text(block.text, index, total));
    }
  }, {
    key: "renderBlocks",
    value: function renderBlocks(benefits, compact) {
      var _this2 = this;

      var index = 0;
      var total = benefits.length;

      if (this.props.animation === 'zoom') {
        //TODO: ADD DYNAMICALLY OPTIONS FROM CHUNK.JSON
        return _react["default"].createElement(_Zoom["default"], {
          cascade: true,
          top: true
        }, _react["default"].createElement("div", {
          style: {
            color: this.props.textColor,
            position: 'relative',
            display: 'flex',
            flex: 1,
            flexDirection: compact ? 'column' : 'row',
            alignItems: compact ? 'center' : 'center',
            backgroundColor: this.props.backgroundColor,
            justifyContent: 'center'
          }
        }, benefits.map(function (b) {
          return _this2.renderBlock(b, index++, total);
        })));
      } else {
        return _react["default"].createElement("div", {
          style: {
            color: this.props.textColor,
            position: 'relative',
            display: 'flex',
            flex: 1,
            flexDirection: compact ? 'column' : 'row',
            alignItems: compact ? 'center' : 'center',
            backgroundColor: this.props.backgroundColor,
            justifyContent: 'center'
          }
        }, benefits.map(function (b) {
          return _this2.renderBlock(b, index++, total);
        }));
      }
    }
  }, {
    key: "renderDefault",
    value: function renderDefault(compact) {
      return this.renderBlocks(this.props.benefits, compact);
    }
  }, {
    key: "renderComponentCompact",
    value: function renderComponentCompact() {
      return this.renderDefault(true);
    }
  }, {
    key: "renderComponent",
    value: function renderComponent() {
      return this.renderDefault();
    }
  }]);

  return Benefits;
}(_Component2["default"]);

exports["default"] = Benefits;