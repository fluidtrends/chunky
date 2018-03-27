"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAuthTokenTimestamp = exports.getAuthToken = exports.getAuthTokenError = exports.hasAuthTokenError = exports.hasAuthToken = undefined;

var _common = require("./common");

var common = _interopRequireWildcard(_common);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var hasAuthToken = exports.hasAuthToken = common.hasData("auth");
var hasAuthTokenError = exports.hasAuthTokenError = common.hasError("auth");

var getAuthTokenError = exports.getAuthTokenError = common.getError("auth");
var getAuthToken = exports.getAuthToken = common.getData("auth");
var getAuthTokenTimestamp = exports.getAuthTokenTimestamp = common.getTimestamp("auth");