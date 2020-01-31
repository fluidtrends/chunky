"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFile = createFile;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function createFile(_ref) {
  var root = _ref.root,
      filepath = _ref.filepath,
      data = _ref.data,
      json = _ref.json;

  var file = _path["default"].resolve(root, filepath);

  if (_fsExtra["default"].existsSync(file)) {
    return;
  }

  var content = json ? JSON.stringify(data, null, 2) : data;

  _fsExtra["default"].writeFileSync(file, content, 'utf8');
}