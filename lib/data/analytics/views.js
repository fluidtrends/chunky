'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.view = view;

var _reactGa = require('react-ga');

var _reactGa2 = _interopRequireDefault(_reactGa);

var _setup = require('./setup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function view(path) {
  if (!_setup.isInitialized || !_setup.isGoogle || !path) {
    return;
  }
  _reactGa2.default.pageview(path);
}