'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chunky = require('../../../../chunky.json');

var _chunky2 = _interopRequireDefault(_chunky);

var _index = require('../../../../chunks/index.desktop');

var appChunks = _interopRequireWildcard(_index);

var _strings = require('../../../../assets/strings.json');

var _strings2 = _interopRequireDefault(_strings);

var _index2 = require('../../../../desktop/index.json');

var _index3 = _interopRequireDefault(_index2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chunky2.default.chunks = appChunks;
_chunky2.default.id = _chunky2.default.id || 'chunky';
_chunky2.default.strings = _strings2.default;
_chunky2.default.platform = 'desktop';
_chunky2.default.web = _index3.default;
_chunky2.default.desktop = _index3.default;

exports.default = _chunky2.default;