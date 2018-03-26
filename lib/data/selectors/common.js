'use strict';

Object.defineProperty(exports, "__esModule", {
                         value: true
});
exports.isInProgress = exports.isDone = exports.getAction = exports.getError = exports.getData = exports.getTimestamp = exports.hasError = exports.hasData = exports.has = exports.get = undefined;

var _reselect = require('reselect');

var stateItem = function stateItem(name, flavor) {
                         return function (state, props) {
                                                  var value = state[name][flavor];
                                                  return value;
                         };
};

var get = exports.get = function get(name, flavor) {
                         return (0, _reselect.createSelector)(stateItem(name, flavor), function (data) {
                                                  return typeof data === 'function' ? data() : data;
                         });
};

var has = exports.has = function has(name, flavor) {
                         return (0, _reselect.createSelector)(stateItem(name, flavor), function (data) {
                                                  return data != null && data != undefined && data;
                         });
};

var hasData = exports.hasData = function hasData(name) {
                         return has(name, "data");
};
var hasError = exports.hasError = function hasError(name) {
                         return has(name, "error");
};

var getTimestamp = exports.getTimestamp = function getTimestamp(name) {
                         return get(name, "timestamp");
};
var getData = exports.getData = function getData(name) {
                         return get(name, "data");
};
var getError = exports.getError = function getError(name) {
                         return get(name, "error");
};
var getAction = exports.getAction = function getAction(name) {
                         return get(name, "action");
};

var isDone = exports.isDone = function isDone(name) {
                         return has(name, "done");
};
var isInProgress = exports.isInProgress = function isInProgress(name) {
                         return has(name, "inProgress");
};