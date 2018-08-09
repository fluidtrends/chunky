'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateChunksIndex = updateChunksIndex;
exports.createChunkIndexFiles = createChunkIndexFiles;
exports.installChunk = installChunk;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ = require('..');

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
        exports = exports + 'export { default as ' + chunk + ' } from \'./index.' + type + '\'\n';
      }
    });

    _fsExtra2.default.writeFileSync(indexFile, HEADER + '\n\n' + exports);
  });
}

function createChunkIndexFiles(dir) {
  var screensDir = _path2.default.resolve(dir, 'screens');
  var componentsDir = _path2.default.resolve(dir, 'components');

  _fsExtra2.default.existsSync(screensDir) || _fsExtra2.default.mkdirsSync(screensDir);
  _fsExtra2.default.existsSync(componentsDir) || _fsExtra2.default.mkdirsSync(componentsDir);

  TYPES.map(function (type) {
    var data = 'import config from \'./chunk.json\'\nimport * as screens from \'./screens/index.' + type + '\'\n\nconst chunk = { screens, ...config }\nexport default chunk';
    (0, _.createFile)({ root: dir, filepath: 'index.' + type, data: data });
    (0, _.createFile)({ root: screensDir, filepath: 'index.' + type, data: '' });
  });
}

function installChunk(_ref) {
  var dir = _ref.dir,
      home = _ref.home,
      chunk = _ref.chunk;

  var chunkDir = _path2.default.resolve(dir, 'chunks', chunk.name);

  if (_fsExtra2.default.existsSync(chunkDir)) {
    return;
  }

  _fsExtra2.default.mkdirsSync(chunkDir);

  var bundle = 'bananas';
  var bundleId = '0';
  var name = chunk.name;

  var chunkTemplateDir = _path2.default.resolve(home, 'bundles', bundle, bundleId, 'chunks', name);

  if (!_fsExtra2.default.existsSync(chunkTemplateDir)) {
    return;
  }

  _fsExtra2.default.copySync(chunkTemplateDir, chunkDir);
  createChunkIndexFiles(chunkDir);

  // createFile({ root: chunkDir, filepath: 'chunk.json', data: chunk, json: true })
}