'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFile = createFile;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createFile(_ref) {
  var root = _ref.root,
      filepath = _ref.filepath,
      data = _ref.data,
      json = _ref.json;

  var file = _path2.default.resolve(root, filepath);
  if (_fsExtra2.default.existsSync(file)) {
    return;
  }

  var content = json ? JSON.stringify(data, null, 2) : data;
  _fsExtra2.default.writeFileSync(file, content, 'utf8');
}