"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.event = event;

var _reactGa = _interopRequireDefault(require("react-ga"));

var _setup = require("./setup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function event(props) {
  if (!_setup.isInitialized || !_setup.isGoogle || !props) {
    return;
  }

  _reactGa["default"].event(props);
}