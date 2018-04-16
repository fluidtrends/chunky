'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _firebaseConfig = require('../../../../desktop/firebase-config.json');

var _firebaseConfig2 = _interopRequireDefault(_firebaseConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_config2.default.id = 'chunky';
_config2.default.firebase = _firebaseConfig2.default;

var appId = _config2.default.id + '-' + _config2.default.name + '-' + (_config2.default.domain || 'chunky.io');
global.chunky = Object.assign({}, global.chunky, { config: _config2.default });
global.appId = appId;

global.firebase = _firebase2.default;
global.storage = {
  setItem: function setItem(key, value, callback) {
    try {
      localStorage.setItem(appId + '-' + key, value);
      callback();
    } catch (e) {
      callback(e);
    }
  },
  getItem: function getItem(key, callback) {
    try {
      var value = localStorage.getItem(appId + '-' + key);
      callback(null, value);
    } catch (e) {
      callback(e);
    }
  },
  removeItem: function removeItem(key, callback) {
    try {
      localStorage.removeItem(appId + '-' + key);
      callback();
    } catch (e) {
      callback(e);
    }
  }
};

try {
  _firebase2.default.initializeApp(_config2.default.firebase);
} catch (e) {}