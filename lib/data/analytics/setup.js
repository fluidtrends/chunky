'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isGoogle = exports.isInitialized = undefined;
exports.initialize = initialize;

var _reactGa = require('react-ga');

var _reactGa2 = _interopRequireDefault(_reactGa);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isInitialized = exports.isInitialized = false;
var isGoogle = exports.isGoogle = false;

function initialize(_ref) {
  var type = _ref.type,
      key = _ref.key;

  if (!type || !key || type.toLowerCase() !== 'google') {
    return;
  }

  _reactGa2.default.initialize(key);
  exports.isInitialized = isInitialized = true;
  exports.isGoogle = isGoogle = true;
}