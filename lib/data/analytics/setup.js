"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialize = initialize;
exports.isGoogle = exports.isInitialized = void 0;

var _reactGa = _interopRequireDefault(require("react-ga"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isInitialized = false;
exports.isInitialized = isInitialized;
var isGoogle = false;
exports.isGoogle = isGoogle;

function initialize(_ref) {
  var type = _ref.type,
      key = _ref.key;

  if (!type || !key || type.toLowerCase() !== 'google') {
    return;
  }

  _reactGa["default"].initialize(key);

  exports.isInitialized = isInitialized = true;
  exports.isGoogle = isGoogle = true;
}