'use strict';

var loader = require('./loader');
var handler = require('./handler');
var firebase = require('./firebase');
var aws = require('./aws');

module.exports = {
  loader: loader,
  handler: handler,
  firebase: firebase,
  aws: aws
};