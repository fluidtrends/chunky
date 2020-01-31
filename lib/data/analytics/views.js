"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.view = view;

var _reactGa = _interopRequireDefault(require("react-ga"));

var _setup = require("./setup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function view(path) {
  if (!_setup.isInitialized || !_setup.isGoogle || !path) {
    return;
  }

  _reactGa["default"].pageview(path);
}