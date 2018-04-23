'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newShortId = newShortId;
exports.newRandomId = newRandomId;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _randomstring = require('randomstring');

var _randomstring2 = _interopRequireDefault(_randomstring);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function newShortId() {
  return _shortid2.default.generate();
}

function newRandomId(args) {
  return _randomstring2.default.generate(args);
}