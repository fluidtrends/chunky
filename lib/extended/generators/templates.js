'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.installTemplate = installTemplate;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cpy = require('cpy');

var _cpy2 = _interopRequireDefault(_cpy);

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _ = require('..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function installTemplate(_ref) {
  var dir = _ref.dir,
      home = _ref.home,
      template = _ref.template;

  return new Promise(function (resolve, reject) {
    try {
      var assetsDir = _path2.default.resolve(dir, 'assets');
      var assetsTextDir = _path2.default.resolve(assetsDir, 'text');

      _fsExtra2.default.mkdirsSync(assetsDir);
      _fsExtra2.default.mkdirsSync(assetsTextDir);

      var bundleAssetsDir = _path2.default.resolve(home, 'bundles', template.bundle, 'assets');
      var bundleFixturesDir = _path2.default.resolve(home, 'bundles', template.bundle, 'fixtures');

      var fixture = require(_path2.default.resolve(bundleFixturesDir, template.fixture, 'index.js'))(template);
      var bundleImages = fixture.images.map(function (image) {
        return _path2.default.resolve(bundleAssetsDir, image);
      });
      var bundleText = fixture.text.map(function (t) {
        return _path2.default.resolve(bundleAssetsDir, 'text', t);
      });

      var chunkInstallers = Object.keys(fixture.chunks).map(function (chunkName) {
        var chunk = fixture.chunks[chunkName];
        return (0, _.installChunk)({ chunk: chunk, chunkName: chunkName, dir: dir, home: home, template: template, fixture: fixture });
      });

      var copyImages = function copyImages() {
        return (0, _cpy2.default)(bundleImages, assetsDir);
      };
      var copyText = function copyText() {
        return (0, _cpy2.default)(bundleText, assetsTextDir);
      };

      Promise.all(chunkInstallers).then(function () {
        return copyImages();
      }).then(function () {
        return copyText();
      }).then(function () {
        (0, _.updateChunksIndex)(dir);

        var webRoot = _path2.default.resolve(dir, 'web');
        var webBuildRoot = _path2.default.resolve(dir, '.chunky', 'web');

        _fsExtra2.default.mkdirsSync(webRoot);
        _fsExtra2.default.mkdirsSync(webBuildRoot);

        (0, _.createFile)({ root: webRoot, filepath: 'index.json', data: fixture.web, json: true });
        (0, _.createFile)({ root: webRoot, filepath: 'firebase-config.json', data: {}, json: true });
        (0, _.createFile)({ root: dir, filepath: 'chunky.json', data: fixture.manifest, json: true });
        (0, _.createFile)({ root: assetsDir, filepath: 'strings.json', data: fixture.strings || {}, json: true });

        resolve();
      }).catch(function (e) {
        reject(e);
      });
    } catch (e) {
      reject(e);
    }
  });
}