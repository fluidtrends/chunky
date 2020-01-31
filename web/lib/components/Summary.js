"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Component2 = _interopRequireDefault(require("../core/Component"));

var _Text = _interopRequireDefault(require("./Text"));

var _responsive = require("../utils/responsive");

var _AnimatedWrapper = _interopRequireDefault(require("./AnimatedWrapper"));

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

var Summary =
/*#__PURE__*/
function (_Component) {
  _inherits(Summary, _Component);

  function Summary(props) {
    var _this;

    _classCallCheck(this, Summary);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Summary).call(this, props));
    _this.state = _objectSpread({}, _this.state);
    return _this;
  }

  _createClass(Summary, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _get(_getPrototypeOf(Summary.prototype), "componentDidMount", this).call(this);
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
    key: "renderImg",
    value: function renderImg() {
      if (!this.props.image) return null;
      var imageAdditionalStyle = this.props.imageStyle ? this.props.imageStyle : {};
      return _react["default"].createElement("img", {
        src: "/assets/".concat(this.props.image),
        style: _objectSpread({
          width: '200px',
          marginTop: '20px',
          marginBottom: '-20px'
        }, imageAdditionalStyle)
      });
    }
  }, {
    key: "renderAnimation",
    value: function renderAnimation() {
      var _ref;

      return _react["default"].createElement(_AnimatedWrapper["default"], this.props, _react["default"].createElement("div", {
        style: (_ref = {
          color: this.props.textColor,
          position: 'relative',
          padding: '60px 0',
          display: 'flex'
        }, _defineProperty(_ref, "padding", '40px 0'), _defineProperty(_ref, "flex", 1), _defineProperty(_ref, "flexDirection", 'column'), _defineProperty(_ref, "alignItems", 'center'), _defineProperty(_ref, "justifyContent", 'center'), _ref)
      }, this.renderImg(), this.renderText()));
    }
  }, {
    key: "renderWrapper",
    value: function renderWrapper() {
      var _ref2;

      return _react["default"].createElement("div", {
        style: (_ref2 = {
          color: this.props.textColor,
          position: 'relative',
          padding: '60px 0',
          display: 'flex'
        }, _defineProperty(_ref2, "padding", '40px 0'), _defineProperty(_ref2, "flex", 1), _defineProperty(_ref2, "flexDirection", 'column'), _defineProperty(_ref2, "alignItems", 'center'), _defineProperty(_ref2, "justifyContent", 'center'), _ref2)
      }, this.renderImg(), this.renderText());
    }
  }, {
    key: "renderComponent",
    value: function renderComponent() {
      var _ref3;

      if (this.props.animation) {
        return this.renderAnimation();
      }

      return _react["default"].createElement("div", {
        style: (_ref3 = {
          color: this.props.textColor,
          position: 'relative',
          padding: '60px 0',
          display: 'flex'
        }, _defineProperty(_ref3, "padding", '40px 0'), _defineProperty(_ref3, "flex", 1), _defineProperty(_ref3, "flexDirection", 'column'), _defineProperty(_ref3, "alignItems", 'center'), _defineProperty(_ref3, "justifyContent", 'center'), _ref3)
      }, this.renderImg(), this.renderText());
    }
  }]);

  return Summary;
}(_Component2["default"]);

exports["default"] = Summary;