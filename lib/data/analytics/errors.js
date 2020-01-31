"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.error = error;

var _reactGa = _interopRequireDefault(require("react-ga"));

var _setup = require("./setup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function error(props) {
  if (!_setup.isInitialized || !_setup.isGoogle || !props) {
    return;
  }

  _reactGa["default"].exception(props);
}