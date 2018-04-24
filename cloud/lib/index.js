'use strict';

var loader = require('./loader');
var handler = require('./handler');
var firebase = require('./firebase');

module.exports = {
  loader: loader,
  handler: handler,
  firebase: firebase
};