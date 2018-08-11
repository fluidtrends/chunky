'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadChunks = loadChunks;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _ = require('..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadChunks(product) {
  var chunksDir = _path2.default.resolve(product.dir, 'chunks');
  var chunks = _fsExtra2.default.readdirSync(chunksDir).filter(function (dir) {
    return dir && dir !== 'index.js' && dir !== 'index.desktop.js' && dir !== 'index.web.js' && dir !== '.DS_Store';
  });

  if (!chunks || chunks.length === 0) {
    return;
  }

  return chunks.map(function (chunk) {
    return (0, _.loadJsonFile)(_path2.default.resolve(chunksDir, chunk, 'chunk.json'));
  });
}