'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DataProvider2 = require('../../core/DataProvider');

var _DataProvider3 = _interopRequireDefault(_DataProvider2);

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _cache = require('../cache');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CacheDataProvider = function (_DataProvider) {
  _inherits(CacheDataProvider, _DataProvider);

  function CacheDataProvider() {
    _classCallCheck(this, CacheDataProvider);

    return _possibleConstructorReturn(this, (CacheDataProvider.__proto__ || Object.getPrototypeOf(CacheDataProvider)).apply(this, arguments));
  }

  _createClass(CacheDataProvider, [{
    key: 'create',
    value: function create(_ref) {
      var nodes = _ref.nodes,
          options = _ref.options,
          props = _ref.props;

      // Look up the token to fetch
      var itemKey = nodes[0];

      // Send back the value
      return (0, _cache.cacheItem)('chunky/' + itemKey, props);
    }
  }, {
    key: 'retrieve',
    value: function retrieve(_ref2) {
      var nodes = _ref2.nodes,
          options = _ref2.options,
          props = _ref2.props;

      // Look up the token to fetch
      var itemKey = nodes[0];

      // Send back the value
      return (0, _cache.retrieveCachedItem)('chunky/' + itemKey);
    }
  }, {
    key: 'update',
    value: function update(_ref3) {
      var nodes = _ref3.nodes,
          options = _ref3.options,
          props = _ref3.props;

      // Look up the token to fetch
      var itemKey = nodes[0];

      // First retrieve the old value
      return (0, _cache.clearCachedItem)('chunky/' + itemKey)

      // And then deep merge the new data
      .then(function () {
        return (0, _cache.cacheItem)('chunky/' + itemKey, props);
      });
    }
  }, {
    key: 'delete',
    value: function _delete(_ref4) {
      var nodes = _ref4.nodes,
          options = _ref4.options,
          props = _ref4.props;

      // Look up the token to remove
      var itemKey = nodes[0];

      // Send back the value
      return (0, _cache.clearCachedItem)('chunky/' + itemKey);
    }
  }]);

  return CacheDataProvider;
}(_DataProvider3.default);

exports.default = CacheDataProvider;