'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _errors = require('../errors');

var Errors = _interopRequireWildcard(_errors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataProvider = function () {
  function DataProvider(props) {
    _classCallCheck(this, DataProvider);

    this._props = Object.assign({}, this.defaults, props);
  }

  _createClass(DataProvider, [{
    key: 'operation',
    value: function operation(options) {
      if (!options || !options.type) {
        // We require a type for each operation
        return Promise.reject(Errors.UNDEFINED_OPERATION());
      }

      // Let's check the type of operation we want to execute
      var type = options.type.toLowerCase();
      var executor = this['' + type.toLowerCase()];

      if (!executor) {
        // Looks like we don't support such operation types
        return Promise.reject(Errors.UNDEFINED_OPERATION());
      }

      // Bind first
      executor = executor.bind(this);

      // Resolve the nodes
      var nodes = options.nodes ? options.nodes.map(function (node) {
        return node.charAt(0) === ':' ? options.props[node.substring(1)] || node : node;
      }) : [];

      options.props && delete options.props._route;

      // We should be able to execute it now
      return executor({ nodes: nodes, options: options.options || {}, props: options.props || {} });
    }
  }, {
    key: 'defaults',
    get: function get() {
      return {};
    }
  }, {
    key: 'props',
    get: function get() {
      return this._props;
    }
  }]);

  return DataProvider;
}();

exports.default = DataProvider;