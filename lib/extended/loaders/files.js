'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadJsonFile = loadJsonFile;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadJsonFile(file) {
  if (!_fsExtra2.default.existsSync(file)) {
    // We can't continue without this file
    throw new Error('The file is missing');
  }

  // Load the content
  var config = _fsExtra2.default.readFileSync(file, 'utf8');

  if (!config) {
    throw new Error('The file is invalid');
  }

  // Parse the json content
  config = JSON.parse(config);

  if (!config) {
    throw new Error('The file is invalid');
  }

  return config;
}