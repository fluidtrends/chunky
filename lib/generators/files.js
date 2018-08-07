'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFile = createFile;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// function _processTemplateFile (src, target, options) {
//   try {
//     // Parse the file
//     const templateContent = fs.readFileSync(src, 'utf8')
//     const templateCompiler = ejs.compile(templateContent)
//     const templateResult = templateCompiler(options)
//
//     // First copy the file
//     fs.copySync(src, target)
//
//     // Let's override its contents now
//     fs.writeFileSync(target, templateResult, 'utf8')
//
//     // Looks like this file made it
//     return true
//   } catch (e) {
//     return false
//   }
// }

function createFile(_ref) {
  var root = _ref.root,
      filepath = _ref.filepath,
      data = _ref.data,
      json = _ref.json;

  var file = _path2.default.resolve(root, filepath);
  var content = json ? JSON.stringify(data, null, 2) : data;
  _fsExtra2.default.writeFileSync(file, content, 'utf8');
}