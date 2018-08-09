'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.installTemplate = installTemplate;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _ = require('..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadTemplate(_ref) {
  var home = _ref.home,
      template = _ref.template;

  if (!home || !template || !template.from) {
    return;
  }

  var bundle = 'bananas';
  var bundleId = '0';
  var name = template.from;

  var parts = name.split('/');

  if (parts.length === 3) {
    bundle = parts[0];
    bundleId = parts[1];
    name = parts[2];
  } else if (parts.length === 2) {
    bundle = parts[0];
    name = parts[1];
  }

  var bundleDir = _path2.default.resolve(home, 'bundles', bundle, bundleId);
  var templateDir = _path2.default.resolve(bundleDir, 'templates', name);
  var templateIndex = _path2.default.resolve(templateDir, 'index.json');

  if (!_fsExtra2.default.existsSync(templateIndex)) {
    return;
  }

  try {
    var templateContent = _fsExtra2.default.readFileSync(templateIndex, 'utf8');
    var templateData = JSON.parse(templateContent);

    return templateData;
  } catch (e) {
    return;
  }
}

function installTemplate(_ref2) {
  var dir = _ref2.dir,
      home = _ref2.home,
      template = _ref2.template;

  var t = loadTemplate({ home: home, template: template });

  if (!t || !t.chunks) {
    return;
  }

  t.chunks.map(function (chunk) {
    return (0, _.installChunk)({ chunk: chunk, dir: dir, home: home });
  });

  var webRoot = _path2.default.resolve(dir, 'web');
  var webBuildRoot = _path2.default.resolve(dir, '.chunky', 'web');

  _fsExtra2.default.mkdirsSync(webRoot);
  _fsExtra2.default.mkdirsSync(webBuildRoot);

  (0, _.createFile)({ root: webRoot, filepath: 'index.json', data: {}, json: true });
}