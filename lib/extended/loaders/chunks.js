"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadChunks = loadChunks;

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function loadChunks(product) {
  var chunksDir = _path["default"].resolve(product.dir, 'chunks');

  var chunks = _fsExtra["default"].readdirSync(chunksDir).filter(function (dir) {
    return dir && dir !== 'index.js' && dir !== 'index.desktop.js' && dir !== 'index.web.js' && dir !== '.DS_Store';
  });

  if (!chunks || chunks.length === 0) {
    return;
  }

  return chunks.map(function (chunk) {
    return (0, _.loadJsonFile)(_path["default"].resolve(chunksDir, chunk, 'chunk.json'));
  });
}