"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateChunksIndex = updateChunksIndex;
exports.createChunkIndexFiles = createChunkIndexFiles;
exports.installChunk = installChunk;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _ = require("..");

var _deepmerge = _interopRequireDefault(require("deepmerge"));

var _cpy = _interopRequireDefault(require("cpy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MOBILE = 'js';
var WEB = 'web.js';
var DESKTOP = 'desktop.js';
var TYPES = [MOBILE, WEB, DESKTOP];
var IGNORES = ['.DS_Store'];
var HEADER = "// THIS IS AN AUTO-GENERATED FILE. PLEASE DO NOT MODIFY. CHUNKY WILL CRY. SERIOUSLY.";

function updateChunksIndex(dir) {
  var chunksDir = _path["default"].resolve(dir, 'chunks');

  if (!_fsExtra["default"].existsSync(chunksDir)) {
    _fsExtra["default"].mkdirsSync(chunksDir);
  }

  var indexFiles = TYPES.map(function (type) {
    return "index.".concat(type);
  });

  var chunks = _fsExtra["default"].readdirSync(chunksDir).filter(function (dir) {
    return dir && !IGNORES.includes(dir) && !indexFiles.includes(dir);
  });

  TYPES.map(function (type) {
    var indexFile = _path["default"].resolve(chunksDir, "index.".concat(type));

    var exports = '';
    chunks.map(function (chunk) {
      var chunkIndexFile = _path["default"].resolve(chunksDir, chunk, "index.".concat(type));

      if (_fsExtra["default"].existsSync(chunkIndexFile)) {
        exports = "".concat(exports, "export { default as ").concat(chunk, " } from './").concat(chunk, "/index.").concat(type, "'\n");
      }
    });

    _fsExtra["default"].writeFileSync(indexFile, "".concat(HEADER, "\n\n").concat(exports));
  });
}

function createChunkIndexFiles(dir) {
  var screensDir = _path["default"].resolve(dir, 'screens');

  var componentsDir = _path["default"].resolve(dir, 'components');

  _fsExtra["default"].existsSync(screensDir) || _fsExtra["default"].mkdirsSync(screensDir);
  _fsExtra["default"].existsSync(componentsDir) || _fsExtra["default"].mkdirsSync(componentsDir);
  TYPES.map(function (type) {
    var data = "import config from './chunk.json'\nimport * as screens from './screens/index.".concat(type, "'\n\nconst chunk = { screens, ...config }\nexport default chunk");
    (0, _.createFile)({
      root: dir,
      filepath: "index.".concat(type),
      data: data
    });
    (0, _.createFile)({
      root: screensDir,
      filepath: "index.".concat(type),
      data: ''
    });
  });
}

function installChunk(_ref) {
  var chunk = _ref.chunk,
      chunkName = _ref.chunkName,
      dir = _ref.dir,
      home = _ref.home,
      template = _ref.template;
  return new Promise(function (resolve, reject) {
    var chunkDir = _path["default"].resolve(dir, 'chunks', chunkName);

    if (_fsExtra["default"].existsSync(chunkDir)) {
      reject(new Error('Chunk already exists'));
      return;
    }

    _fsExtra["default"].mkdirsSync(chunkDir);

    var chunkTemplateDir = _path["default"].resolve(template.bundleDir, 'chunks', chunkName);

    if (!_fsExtra["default"].existsSync(chunkTemplateDir)) {
      reject(new Error('Chunk template does not exist'));
      return;
    }

    try {
      _fsExtra["default"].copySync(chunkTemplateDir, chunkDir);

      var chunkConfigFile = _path["default"].resolve(chunkDir, 'chunk.json');

      if (!_fsExtra["default"].existsSync(chunkConfigFile)) {
        reject(new Error('Chunk config file does not exist'));
        return;
      }

      var config = JSON.parse(_fsExtra["default"].readFileSync(chunkConfigFile, 'utf8'));

      var newConfig = _deepmerge["default"].all([config, chunk]);

      _fsExtra["default"].writeFileSync(chunkConfigFile, JSON.stringify(newConfig, null, 2));

      createChunkIndexFiles(chunkDir);
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}