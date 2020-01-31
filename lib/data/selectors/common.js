"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isInProgress = exports.isDone = exports.getAction = exports.getError = exports.getData = exports.getTimestamp = exports.hasError = exports.hasData = exports.has = exports.get = void 0;

var _reselect = require("reselect");

var stateItem = function stateItem(name, flavor) {
  return function (state, props) {
    var value = state[name][flavor];
    return value;
  };
};

var get = function get(name, flavor) {
  return (0, _reselect.createSelector)(stateItem(name, flavor), function (data) {
    return typeof data === 'function' ? data() : data;
  });
};

exports.get = get;

var has = function has(name, flavor) {
  return (0, _reselect.createSelector)(stateItem(name, flavor), function (data) {
    return data != null && data != undefined && data;
  });
};

exports.has = has;

var hasData = function hasData(name) {
  return has(name, "data");
};

exports.hasData = hasData;

var hasError = function hasError(name) {
  return has(name, "error");
};

exports.hasError = hasError;

var getTimestamp = function getTimestamp(name) {
  return get(name, "timestamp");
};

exports.getTimestamp = getTimestamp;

var getData = function getData(name) {
  return get(name, "data");
};

exports.getData = getData;

var getError = function getError(name) {
  return get(name, "error");
};

exports.getError = getError;

var getAction = function getAction(name) {
  return get(name, "action");
};

exports.getAction = getAction;

var isDone = function isDone(name) {
  return has(name, "done");
};

exports.isDone = isDone;

var isInProgress = function isInProgress(name) {
  return has(name, "inProgress");
};

exports.isInProgress = isInProgress;