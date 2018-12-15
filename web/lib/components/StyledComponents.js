'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Headline3 = exports.Headline2 = undefined;

var _templateObject = _taggedTemplateLiteral(['\n  margin: ', ';\n  text-align: ', ';\n  color: ', ';\n  ', ';\n  @media (max-width: 546px) {\n    margin: 100px 20px 20px;\n  }\n'], ['\n  margin: ', ';\n  text-align: ', ';\n  color: ', ';\n  ', ';\n  @media (max-width: 546px) {\n    margin: 100px 20px 20px;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  margin: ', ';\n  text-align: ', ';\n  color: ', ';\n  ', ';\n  @media (max-width: 546px) {\n    margin: 20px;\n  }\n'], ['\n  margin: ', ';\n  text-align: ', ';\n  color: ', ';\n  ', ';\n  @media (max-width: 546px) {\n    margin: 20px;\n  }\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Headline2 = exports.Headline2 = _styledComponents2.default.h2(_templateObject, function (props) {
  return props.margin;
}, function (props) {
  return props.textAlign ? props.textAlign : 'left';
}, function (props) {
  return props.color;
}, function (props) {
  return props.additionalStyle;
});

var Headline3 = exports.Headline3 = _styledComponents2.default.h3(_templateObject2, function (props) {
  return props.margin;
}, function (props) {
  return props.textAlign ? props.textAlign : 'left';
}, function (props) {
  return props.color;
}, function (props) {
  return props.additionalStyle;
});