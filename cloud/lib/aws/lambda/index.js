'use strict';

var handler = require('./handler');
var loader = require('./loader');

module.exports = Object.assign({}, handler, loader);