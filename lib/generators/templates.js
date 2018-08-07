'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadTemplate = loadTemplate;
exports.installTemplate = installTemplate;

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _lali = require('lali');

var _lali2 = _interopRequireDefault(_lali);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bundlesDir = '/Users/dancali/dev/fluidtrends/chunky-bundles';

function loadTemplate(_ref) {
  var name = _ref.name;

  try {
    var templateFile = _path2.default.resolve(bundlesDir, name + '-bundle', 'templates', name, 'index.json');
    var templateContent = _fsExtra2.default.readFileSync(templateFile, 'utf8');
    var template = JSON.parse(templateContent);

    return template;
  } catch (e) {
    return false;
  }
}

function installTemplate(_ref2) {
  var root = _ref2.root,
      name = _ref2.name;

  var template = loadTemplate({ name: name });

  if (!template) {
    return;
  }

  console.log(chunks);
  // const chunks = template.chunks
}

// export function generateTemplate ({ bundle, name }) {
//   const template = loadTemplate({ bundle, name })
//   const chunks = template.
// try {

// const chunksRefUri = ''
// const chunksRef = new URL(chunksRefUri)
//
// console.log(chunksRef)

// const handlerHash = handlerRef.hash ? handlerRef.hash.substring(1) : ''
//
// if (handlerHash) {
//   // This is a function handler
//   this[handlerHash] && this[handlerHash](event)
//   return
// }
//
// const handlerType = handlerRef.protocol.slice(0, -1).toLowerCase()
// const fullPath = `${handlerRef.hostname}${handlerRef.pathname ? handlerRef.pathname : ''}`
//
// switch (handlerType) {
//   case 'local':
//     return this.handleLocalEvent(`/${fullPath}`)
//   case 'system':
//     return this.handleSystemEvent(`/${fullPath}`)
//   default:
//     return this.handleExternalEvent(`${handlerType}://${fullPath}`)
// }
// } catch (error) {

// }
// }