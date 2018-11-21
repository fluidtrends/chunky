'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactVivus = require('react-vivus');

var _reactVivus2 = _interopRequireDefault(_reactVivus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  Animates a svg based on vivus.js
 * style -> style of the image ( CSS IN JS )
 * path -> the path to the SVG
 * type -> Defines what kind of animation will be used: delayed, sync, oneByOne, scenario. [Default: delayed]
 * duration -> Animation duration, in frames. [Default: 200]
 * Timing animation function for the complete SVG. Options are: EASE, EASE_IN, EASE_OUT and EASE_OUT_BOUNCE
 * id -> an id must be provided in order for the react wrapper to work
 * 
 * All params should be string instead of duration which is an integer! 
 *
 * @param {*} { style, path, type, duration, animTimingFunction, id }
 */

var animatedTimingFunctions = ['EASE_OUT_BOUNCE', 'EASE', 'EASE_IN', 'EASE_OUT'];
var typeOfAnimation = ['delayed', 'sync', 'oneByOne', 'scenario'];

var AnimatedSvg = function AnimatedSvg(_ref) {
  var style = _ref.style,
      src = _ref.src,
      type = _ref.type,
      duration = _ref.duration,
      animTimingFunction = _ref.animTimingFunction,
      id = _ref.id;

  var randomTimingFunction = animatedTimingFunctions[Math.floor(Math.random() * animatedTimingFunctions.length)];
  var randomType = typeOfAnimation[Math.floor(Math.random() * typeOfAnimation.length)];

  return _react2.default.createElement(_reactVivus2.default, {
    id: id,
    option: {
      file: src,
      type: type ? type : randomType,
      animTimingFunction: animTimingFunction ? animTimingFunction : randomTimingFunction,
      duration: duration
    },
    style: style
  });
};

exports.default = AnimatedSvg;