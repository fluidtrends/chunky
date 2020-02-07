"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactSpring = require("react-spring");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var animationChecker = ['opacity', 'slideFromLeft', 'slideFromRight'];

var AnimatedSection =
/*#__PURE__*/
function (_Component) {
  _inherits(AnimatedSection, _Component);

  function AnimatedSection(props) {
    _classCallCheck(this, AnimatedSection);

    return _possibleConstructorReturn(this, _getPrototypeOf(AnimatedSection).call(this, props));
  }

  _createClass(AnimatedSection, [{
    key: "handleError",
    value: function handleError(propError) {
      return _react["default"].createElement("div", null);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          animationType = _this$props.animationType,
          startAnimation = _this$props.startAnimation,
          config = _this$props.config; // if props were not what we expected return an error wrapper

      if (!animationChecker.includes(animationType)) return this.handleError('animationType');
      if (!children) return this.handleError('children');
      var xValue = animationType === 'slideFromLeft' ? '-100%' : '100%';
      return _react["default"].createElement(_react["default"].Fragment, null, startAnimation ? animationType === 'opacity' ? _react["default"].createElement(_reactSpring.Spring, {
        from: {
          opacity: 0
        },
        to: {
          opacity: 1
        },
        config: config ? config : {
          tension: 30,
          friction: 40
        }
      }, function (props) {
        return _react["default"].createElement("div", {
          style: props
        }, children);
      }) : _react["default"].createElement(_reactSpring.Spring, {
        "native": true,
        from: {
          x: xValue
        },
        to: {
          x: '0'
        },
        config: config ? config : {
          tension: 30,
          friction: 40
        }
      }, function (_ref) {
        var x = _ref.x;
        return _react["default"].createElement(_reactSpring.animated.div, {
          style: {
            transform: (0, _reactSpring.interpolate)([x], function (x) {
              return "translate(".concat(x);
            })
          }
        }, children);
      }) : _react["default"].createElement("div", {
        style: {
          height: '400px'
        }
      }));
    }
  }]);

  return AnimatedSection;
}(_react.Component);

exports["default"] = AnimatedSection;