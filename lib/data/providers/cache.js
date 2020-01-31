"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _DataProvider2 = _interopRequireDefault(require("../../core/DataProvider"));

var _deepmerge = _interopRequireDefault(require("deepmerge"));

var _cache = require("../cache");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CacheDataProvider =
/*#__PURE__*/
function (_DataProvider) {
  _inherits(CacheDataProvider, _DataProvider);

  function CacheDataProvider() {
    _classCallCheck(this, CacheDataProvider);

    return _possibleConstructorReturn(this, _getPrototypeOf(CacheDataProvider).apply(this, arguments));
  }

  _createClass(CacheDataProvider, [{
    key: "create",
    value: function create(_ref) {
      var nodes = _ref.nodes,
          options = _ref.options,
          props = _ref.props;
      // Look up the token to fetch
      var itemKey = nodes[0]; // Send back the value

      return (0, _cache.cacheItem)("chunky/".concat(itemKey), props);
    }
  }, {
    key: "retrieve",
    value: function retrieve(_ref2) {
      var nodes = _ref2.nodes,
          options = _ref2.options,
          props = _ref2.props;
      // Look up the token to fetch
      var itemKey = nodes[0]; // Send back the value

      return (0, _cache.retrieveCachedItem)("chunky/".concat(itemKey));
    }
  }, {
    key: "update",
    value: function update(_ref3) {
      var nodes = _ref3.nodes,
          options = _ref3.options,
          props = _ref3.props;
      // Look up the token to fetch
      var itemKey = nodes[0]; // First retrieve the old value

      return (0, _cache.clearCachedItem)("chunky/".concat(itemKey)) // And then deep merge the new data
      .then(function () {
        return (0, _cache.cacheItem)("chunky/".concat(itemKey), props);
      });
    }
  }, {
    key: "delete",
    value: function _delete(_ref4) {
      var nodes = _ref4.nodes,
          options = _ref4.options,
          props = _ref4.props;
      // Look up the token to remove
      var itemKey = nodes[0]; // Send back the value

      return (0, _cache.clearCachedItem)("chunky/".concat(itemKey));
    }
  }]);

  return CacheDataProvider;
}(_DataProvider2["default"]);

exports["default"] = CacheDataProvider;