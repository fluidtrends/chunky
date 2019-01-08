'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnimatedWrapper = function (_React$PureComponent) {
  _inherits(AnimatedWrapper, _React$PureComponent);

  function AnimatedWrapper(props) {
    _classCallCheck(this, AnimatedWrapper);

    return _possibleConstructorReturn(this, (AnimatedWrapper.__proto__ || Object.getPrototypeOf(AnimatedWrapper)).call(this, props));
  }

  _createClass(AnimatedWrapper, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          animationOptions = _props.animationOptions,
          animationType = _props.animationType,
          children = _props.children;

      if (animationType === 'zoom') {
        var Zoom = require('react-reveal/Zoom');

        return _react2.default.createElement(
          Zoom,
          animationOptions,
          children
        );
      } else if (this.props.animationType === 'bounce') {
        var Bounce = require('react-reveal/Bounce');
        return _react2.default.createElement(
          Bounce,
          animationOptions,
          children
        );
      } else if (this.props.animationType === 'fade') {
        var Fade = require('react-reveal/Fade');
        return _react2.default.createElement(
          Fade,
          animationOptions,
          children
        );
      } else if (this.props.animationType === 'flip') {
        var Flip = require('react-reveal/Flip');
        return _react2.default.createElement(
          Flip,
          animationOptions,
          children
        );
      } else if (this.props.animationType === 'rotate') {
        var Rotate = require('react-reveal/Rotate');
        return _react2.default.createElement(
          Rotate,
          animationOptions,
          children
        );
      } else if (this.props.animationType === 'slide') {
        var Slide = require('react-reveal/Slide');
        return _react2.default.createElement(
          Slide,
          animationOptions,
          children
        );
      } else if (this.props.animationType === 'roll') {
        var Roll = require('react-reveal/Roll');
        return _react2.default.createElement(
          Roll,
          animationOptions,
          children
        );
      } else if (this.props.animationType === 'lightspeed') {
        var LightSpeed = require('react-reveal/LightSpeed');
        return _react2.default.createElement(
          LightSpeed,
          animationOptions,
          children
        );
      }
    }
  }]);

  return AnimatedWrapper;
}(_react2.default.PureComponent);

exports.default = AnimatedWrapper;