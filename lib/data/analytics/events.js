'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.event = event;

var _reactGa = require('react-ga');

var _reactGa2 = _interopRequireDefault(_reactGa);

var _setup = require('./setup');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function event(props) {
  if (!_setup.isInitialized || !_setup.isGoogle || !props) {
    return;
  }

  _reactGa2.default.event(props);
}