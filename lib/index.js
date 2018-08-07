'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extendChunk = exports.Generators = exports.Config = exports.Styles = exports.Errors = exports.Data = exports.Core = undefined;

var _core = require('./core');

var Core = _interopRequireWildcard(_core);

var _data = require('./data');

var Data = _interopRequireWildcard(_data);

var _errors = require('./errors');

var Errors = _interopRequireWildcard(_errors);

var _generators = require('./generators');

var Generators = _interopRequireWildcard(_generators);

var _styles = require('./styles');

var Styles = _interopRequireWildcard(_styles);

var _config = require('./config');

var Config = _interopRequireWildcard(_config);

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function extendChunk(original, another) {
  return _deepmerge2.default.all([original, another]);
}

exports.Core = Core;
exports.Data = Data;
exports.Errors = Errors;
exports.Styles = Styles;
exports.Config = Config;
exports.Generators = Generators;
exports.extendChunk = extendChunk;
exports.default = { Core: Core, Data: Data, Errors: Errors, Generators: Generators, Styles: Styles, Config: Config, extendChunk: extendChunk };