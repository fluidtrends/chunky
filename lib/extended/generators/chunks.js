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

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _cpy = require('cpy');

var _cpy2 = _interopRequireDefault(_cpy);

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
        exports = exports + 'export { default as ' + chunk + ' } from \'./' + chunk + '/index.' + type + '\'\n';
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
  var chunk = _ref.chunk,
      chunkName = _ref.chunkName,
      dir = _ref.dir,
      home = _ref.home,
      template = _ref.template;

  return new Promise(function (resolve, reject) {
    var chunkDir = _path2.default.resolve(dir, 'chunks', chunkName);

    if (_fsExtra2.default.existsSync(chunkDir)) {
      reject(new Error('Chunk already exists'));
      return;
    }

    _fsExtra2.default.mkdirsSync(chunkDir);

    var chunkTemplateDir = _path2.default.resolve(home, 'bundles', template.bundle, 'chunks', chunkName);

    if (!_fsExtra2.default.existsSync(chunkTemplateDir)) {
      reject(new Error('Chunk template does not exist'));
      return;
    }

    try {
      _fsExtra2.default.copySync(chunkTemplateDir, chunkDir);

      var chunkConfigFile = _path2.default.resolve(chunkDir, 'chunk.json');

      if (!_fsExtra2.default.existsSync(chunkConfigFile)) {
        reject(new Error('Chunk config file does not exist'));
        return;
      }

      var config = JSON.parse(_fsExtra2.default.readFileSync(chunkConfigFile, 'utf8'));
      var newConfig = _deepmerge2.default.all([config, chunk]);

      _fsExtra2.default.writeFileSync(chunkConfigFile, JSON.stringify(newConfig, null, 2));
      createChunkIndexFiles(chunkDir);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}