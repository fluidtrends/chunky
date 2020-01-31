"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Headline3 = exports.Headline2 = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  margin: ", ";\n  text-align: ", ";\n  color: ", ";\n  ", ";\n  @media (max-width: 546px) {\n    margin: 20px;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  margin: ", ";\n  text-align: ", ";\n  color: ", ";\n  ", ";\n  @media (max-width: 546px) {\n    margin: 100px 20px 20px;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Headline2 = _styledComponents["default"].h2(_templateObject(), function (props) {
  return props.margin;
}, function (props) {
  return props.textAlign ? props.textAlign : 'left';
}, function (props) {
  return props.color;
}, function (props) {
  return props.additionalStyle;
});

exports.Headline2 = Headline2;

var Headline3 = _styledComponents["default"].h3(_templateObject2(), function (props) {
  return props.margin;
}, function (props) {
  return props.textAlign ? props.textAlign : 'left';
}, function (props) {
  return props.color;
}, function (props) {
  return props.additionalStyle;
});

exports.Headline3 = Headline3;