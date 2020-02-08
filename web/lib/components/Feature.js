"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Component2 = _interopRequireDefault(require("../core/Component"));

var _Text = _interopRequireDefault(require("./Text"));

var _AnimatedSection = _interopRequireDefault(require("./AnimatedSection"));

var _responsive = require("../utils/responsive");

var _isElementVisible = require("../utils/isElementVisible");

var _button = require("@rmwc/button");

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

var Feature =
/*#__PURE__*/
function (_Component) {
  _inherits(Feature, _Component);

  function Feature(props) {
    var _this;

    _classCallCheck(this, Feature);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Feature).call(this, props));
    _this.state = _objectSpread({}, _this.state, {
      startAnimation: false
    });
    _this.handleScrollToElement = _this.handleScrollToElement.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Feature, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _get(_getPrototypeOf(Feature.prototype), "componentDidMount", this).call(this);

      window.addEventListener('scroll', this.handleScrollToElement, true);
    } // componentWillUnmount() {
    //   window.removeEventListener('scroll', this.handleScrollToElement, true)
    // }

  }, {
    key: "handleScrollToElement",
    value: function handleScrollToElement() {
      if ((0, _isElementVisible.isAnyPartOfElementInViewport)(this.blockRef) && !this.state.startAnimation) {
        this.setState({
          startAnimation: true
        });
        window.removeEventListener('scroll', this.handleScrollToElement, true);
      }
    }
  }, {
    key: "renderContent",
    value: function renderContent(compact) {
      var animationType = this.props.reversed ? 'slideFromLeft' : 'slideFromRight';

      if (this.props.animation) {
        return _react["default"].createElement(_AnimatedSection["default"], {
          animationType: window.innerWidth > 1224 ? animationType : 'slideFromLeft',
          startAnimation: this.state.startAnimation
        }, _react["default"].createElement("div", {
          style: {
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: "".concat(compact ? 100 : 0, "px")
          }
        }, this.text(), this.button()));
      } else {
        return _react["default"].createElement("div", {
          style: {
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: "".concat(compact ? 100 : 0, "px")
          }
        }, this.text(), this.button());
      }
    }
  }, {
    key: "text",
    value: function text() {
      return (0, _responsive.renderResponsive)('text', _react["default"].createElement(_Text["default"], {
        source: this.props.text,
        style: {
          width: "90vw",
          marginBottom: '20px',
          color: this.props.textColor
        }
      }), _react["default"].createElement(_Text["default"], {
        source: this.props.text,
        style: {
          width: "40vw",
          color: this.props.textColor
        }
      }));
    }
  }, {
    key: "button",
    value: function button() {
      if (!this.props.actionTitle) return null;
      return _react["default"].createElement(_button.Button, {
        style: {
          marginBottom: '30px'
        },
        onClick: this.triggerEvent(),
        raised: true,
        theme: "secondaryBg textPrimaryOnSecondary"
      }, this.props.actionTitle);
    }
  }, {
    key: "image",
    value: function image() {
      var animationType = this.props.reversed ? 'slideFromRight' : 'slideFromLeft';
      var boxShadow = this.props.noBoxShadow ? '' : '0 5px 20px 0 rgba(0,0,0,.15)';

      if (this.props.animation) {
        return _react["default"].createElement(_AnimatedSection["default"], {
          animationType: window.innerWidth > 1224 ? animationType : 'slideFromLeft',
          startAnimation: this.state.startAnimation
        }, (0, _responsive.renderResponsive)('image', _react["default"].createElement("img", {
          src: "/assets/".concat(this.props.image),
          style: {
            width: '90vw',
            marginTop: '60px',
            boxShadow: boxShadow,
            marginBottom: '10px'
          }
        }), _react["default"].createElement("img", {
          src: "/assets/".concat(this.props.image),
          style: {
            width: '40vw',
            marginTop: '60px',
            boxShadow: boxShadow,
            marginBottom: '60px'
          }
        })));
      } else {
        return (0, _responsive.renderResponsive)('image', _react["default"].createElement("img", {
          src: "/assets/".concat(this.props.image),
          style: {
            width: '90vw',
            marginTop: '60px',
            boxShadow: boxShadow,
            marginBottom: '10px'
          }
        }), _react["default"].createElement("img", {
          src: "/assets/".concat(this.props.image),
          style: {
            width: '40vw',
            marginTop: '60px',
            boxShadow: boxShadow,
            marginBottom: '60px'
          }
        }));
      }
    }
  }, {
    key: "renderBlock",
    value: function renderBlock(block, index) {
      var _this2 = this;

      return _react["default"].createElement("div", {
        key: "block".concat(index),
        ref: function ref(_ref) {
          return _this2.blockRef = _ref;
        },
        style: {
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }, block);
    }
  }, {
    key: "renderBlocks",
    value: function renderBlocks(blocks, compact) {
      var _this3 = this;

      var index = 0;
      return _react["default"].createElement("div", {
        style: {
          color: '#607D8B',
          position: 'relative',
          display: 'flex',
          flex: 1,
          flexDirection: compact ? 'column' : 'row',
          alignItems: 'center',
          backgroundColor: this.props.backgroundColor,
          justifyContent: 'center'
        }
      }, blocks.map(function (b) {
        return _this3.renderBlock(b, index++);
      }));
    }
  }, {
    key: "renderDefault",
    value: function renderDefault(compact) {
      return this.renderBlocks([this.image(), this.renderContentComponent(compact)], compact);
    }
  }, {
    key: "renderReversed",
    value: function renderReversed(compact) {
      return this.renderBlocks([this.renderContentComponent(compact), this.image()], compact);
    }
  }, {
    key: "renderContentComponent",
    value: function renderContentComponent() {
      return this.props.renderContent ? this.props.renderContent() : this.renderContent();
    }
  }, {
    key: "renderComponentCompact",
    value: function renderComponentCompact() {
      return this.renderDefault(true);
    }
  }, {
    key: "renderComponent",
    value: function renderComponent() {
      return this.props.reversed ? this.renderReversed() : this.renderDefault();
    }
  }]);

  return Feature;
}(_Component2["default"]);

exports["default"] = Feature;