'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateChunksIndex = updateChunksIndex;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _lali = require('lali');

var _lali2 = _interopRequireDefault(_lali);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MOBILE = 'js';
var WEB = 'web.js';
var DESKTOP = 'desktop.js';

var TYPES = [MOBILE, WEB, DESKTOP];
var IGNORES = ['.DS_Store'];
var HEADER = '// THIS IS AN AUTO-GENERATED FILE. PLEASE DO NOT MODIFY. CHUNKY WILL CRY. SERIOUSLY.';

function updateChunksIndex(dir) {
  var chunksDir = _path2.default.resolve(dir, 'chunks');

  if (!_fsExtra2.default.existsSync(chunksDir)) {
    _fsExtra2.default.mkdirsSync(chunksDir);
  }

  var indexFiles = TYPES.map(function (type) {
    return 'index.' + type;
  });
  var chunks = _fsExtra2.default.readdirSync(chunksDir).filter(function (dir) {
    return dir && !IGNORES.includes(dir) && !indexFiles.includes(dir);
  });

  TYPES.map(function (type) {
    var indexFile = _path2.default.resolve(chunksDir, 'index.' + type);
    var exports = '';

    chunks.map(function (chunk) {
      var chunkIndexFile = _path2.default.resolve(chunksDir, chunk, 'index.' + type);
      if (_fsExtra2.default.existsSync(chunkIndexFile)) {
        exports = exports + 'export { default as ' + chunk + ' } from \'./index' + type + '\'\n';
      }
    });

    _fsExtra2.default.writeFileSync(indexFile, HEADER + '\n\n' + exports);
  });
}

// export function cacheChunksArchive (name, version, dir) {
//   const archiveUrl = `https://github.com/fluidtrends/chunky/archive/chunks-${name}-${version}.tar.gz`
//   const link = lali.link(archiveUrl)
//
//   return link.install(dir)
// }