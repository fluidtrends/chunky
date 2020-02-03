"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Text = _interopRequireDefault(require("./Text"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var NotFoundPage = function NotFoundPage(props) {
  return _react["default"].createElement("div", {
    style: {
      width: '100%',
      marginTop: '30px'
    }
  }, props && props.notFoundPageText ? _react["default"].createElement(_Text["default"], {
    source: props.notFoundPageText
  }) : _react["default"].createElement("div", null));
};

var _default = NotFoundPage;
exports["default"] = _default;