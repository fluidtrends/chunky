"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AnimatedWrapper =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(AnimatedWrapper, _React$PureComponent);

  function AnimatedWrapper(props) {
    _classCallCheck(this, AnimatedWrapper);

    return _possibleConstructorReturn(this, _getPrototypeOf(AnimatedWrapper).call(this, props));
  }

  _createClass(AnimatedWrapper, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          animationOptions = _this$props.animationOptions,
          animationType = _this$props.animationType,
          children = _this$props.children;

      if (animationType === 'zoom') {
        var Zoom = require('react-reveal/Zoom');

        return _react["default"].createElement(Zoom, animationOptions, children);
      } else if (this.props.animationType === 'bounce') {
        var Bounce = require('react-reveal/Bounce');

        return _react["default"].createElement(Bounce, animationOptions, children);
      } else if (this.props.animationType === 'fade') {
        var Fade = require('react-reveal/Fade');

        return _react["default"].createElement(Fade, animationOptions, children);
      } else if (this.props.animationType === 'flip') {
        var Flip = require('react-reveal/Flip');

        return _react["default"].createElement(Flip, animationOptions, children);
      } else if (this.props.animationType === 'rotate') {
        var Rotate = require('react-reveal/Rotate');

        return _react["default"].createElement(Rotate, animationOptions, children);
      } else if (this.props.animationType === 'slide') {
        var Slide = require('react-reveal/Slide');

        return _react["default"].createElement(Slide, animationOptions, children);
      } else if (this.props.animationType === 'roll') {
        var Roll = require('react-reveal/Roll');

        return _react["default"].createElement(Roll, animationOptions, children);
      } else if (this.props.animationType === 'lightspeed') {
        var LightSpeed = require('react-reveal/LightSpeed');

        return _react["default"].createElement(LightSpeed, animationOptions, children);
      }
    }
  }]);

  return AnimatedWrapper;
}(_react["default"].PureComponent);

exports["default"] = AnimatedWrapper;