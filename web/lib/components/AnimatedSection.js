'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSpring = require('react-spring');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var animationChecker = ['opacity', 'slideFromLeft', 'slideFromRight'];
/**
 * Component for animating children.
 * For now it only supports opacity and slide form left or slide from right. More to be added
 * 
 * @param children -> JSX to Render inside the animation
 * @param animationType -> type of animations. For now only supports: ['opacity', 'slideFromLeft', 'slideFromRight']
 * @param startAnimation -> this is used only for slide-from-left or slide-from-right animations. When to start the animation
 * @param config -> React Spring config for the animation (refference: http://react-spring.surge.sh/spring#config)
 *
 * @export
 * @class AnimatedSection
 * @extends {Component}
 */

var AnimatedSection = function (_Component) {
  _inherits(AnimatedSection, _Component);

  function AnimatedSection(props) {
    _classCallCheck(this, AnimatedSection);

    return _possibleConstructorReturn(this, (AnimatedSection.__proto__ || Object.getPrototypeOf(AnimatedSection)).call(this, props));
  }

  _createClass(AnimatedSection, [{
    key: 'handleError',
    value: function handleError(propError) {
      throw new Error('The following prop\'s value doesn\'t have any context.\n    Prop to lookout for: ' + propError);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          animationType = _props.animationType,
          startAnimation = _props.startAnimation,
          config = _props.config;

      // if props were not what we expected return an error wrapper

      if (!animationChecker.includes(animationType)) this.handleError('animationType');
      if (!children) this.handleError('children');

      var xValue = animationType === 'slideFromLeft' ? '-100%' : '100%';

      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        startAnimation ? animationType === 'opacity' ? _react2.default.createElement(
          _reactSpring.Spring,
          {
            from: { opacity: 0 },
            to: { opacity: 1 },
            config: config ? config : { tension: 30, friction: 40 }
          },
          function (props) {
            return _react2.default.createElement(
              'div',
              { style: props },
              children
            );
          }
        ) : _react2.default.createElement(
          _reactSpring.Spring,
          {
            native: true,
            from: { x: xValue }, to: { x: '0' },
            config: config ? config : { tension: 30, friction: 40 }
          },
          function (_ref) {
            var x = _ref.x;
            return _react2.default.createElement(
              _reactSpring.animated.div,
              {
                style: {
                  transform: (0, _reactSpring.interpolate)([x], function (x) {
                    return 'translate(' + x;
                  })
                }
              },
              children
            );
          }
        ) : _react2.default.createElement('div', { style: { height: '400px' } })
      );
    }
  }]);

  return AnimatedSection;
}(_react.Component);

exports.default = AnimatedSection;