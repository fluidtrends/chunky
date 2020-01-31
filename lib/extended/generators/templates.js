"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.installTemplate = installTemplate;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _cpy = _interopRequireDefault(require("cpy"));

var _deepmerge = _interopRequireDefault(require("deepmerge"));

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function installTemplate(_ref) {
  var dir = _ref.dir,
      home = _ref.home,
      template = _ref.template,
      fixture = _ref.fixture;
  return new Promise(function (resolve, reject) {
    try {
      var assetsDir = _path["default"].resolve(dir, 'assets');

      var assetsTextDir = _path["default"].resolve(assetsDir, 'text');

      _fsExtra["default"].mkdirsSync(assetsDir);

      _fsExtra["default"].mkdirsSync(assetsTextDir);

      var bundleImages = fixture.images.map(function (image) {
        return _path["default"].resolve(template.assetsDir, image);
      });
      var bundleText = fixture.text.map(function (t) {
        return _path["default"].resolve(template.assetsDir, 'text', t);
      });
      var chunkInstallers = Object.keys(fixture.chunks).map(function (chunkName) {
        var chunk = fixture.chunks[chunkName];
        return (0, _.installChunk)({
          chunk: chunk,
          chunkName: chunkName,
          dir: dir,
          home: home,
          template: template,
          fixture: fixture
        });
      });

      var copyImages = function copyImages() {
        return (0, _cpy["default"])(bundleImages, assetsDir);
      };

      var copyText = function copyText() {
        return (0, _cpy["default"])(bundleText, assetsTextDir);
      };

      Promise.all(chunkInstallers).then(function () {
        return copyImages();
      }).then(function () {
        return copyText();
      }).then(function () {
        (0, _.updateChunksIndex)(dir);

        var webRoot = _path["default"].resolve(dir, 'web');

        var webBuildRoot = _path["default"].resolve(dir, '.chunky', 'web');

        _fsExtra["default"].mkdirsSync(webRoot);

        _fsExtra["default"].mkdirsSync(webBuildRoot);

        (0, _.createFile)({
          root: webRoot,
          filepath: 'index.json',
          data: fixture.web,
          json: true
        });
        (0, _.createFile)({
          root: webRoot,
          filepath: 'firebase-config.json',
          data: {},
          json: true
        });
        (0, _.createFile)({
          root: dir,
          filepath: 'chunky.json',
          data: fixture.manifest,
          json: true
        });
        (0, _.createFile)({
          root: assetsDir,
          filepath: 'strings.json',
          data: fixture.strings || {},
          json: true
        });
        resolve();
      })["catch"](function (e) {
        console.log(e);
        reject(e);
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}