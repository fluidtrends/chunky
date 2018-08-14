'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadManifest = loadManifest;

var _ = require('..');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadManifest(product) {
  var main = (0, _.loadJsonFile)(_path2.default.resolve(product.dir, 'chunky.json'));
  var web = (0, _.loadJsonFile)(_path2.default.resolve(product.dir, 'web', 'index.json'));

  return Object.assign({}, main, { web: web });
}