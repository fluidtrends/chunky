'use strict';

var loader = require('./loader');
var handler = require('./handler');
var firebase = require('./firebase');
var aws = require('./aws');
var emailer = require('./emailer');

module.exports = {
  loader: loader,
  handler: handler,
  firebase: firebase,
  emailer: emailer,
  aws: aws
};