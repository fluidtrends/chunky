"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var Errors = _interopRequireWildcard(require("../errors"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DataProvider =
/*#__PURE__*/
function () {
  function DataProvider(props) {
    _classCallCheck(this, DataProvider);

    this._props = Object.assign({}, this.defaults, props);
  }

  _createClass(DataProvider, [{
    key: "operation",
    value: function operation(options) {
      if (!options || !options.type) {
        // We require a type for each operation
        return Promise.reject(Errors.UNDEFINED_OPERATION());
      } // Let's check the type of operation we want to execute


      var type = options.type.toLowerCase();
      var executor = this["".concat(type.toLowerCase())];

      if (!executor) {
        // Looks like we don't support such operation types
        return Promise.reject(Errors.UNDEFINED_OPERATION());
      } // Bind first


      executor = executor.bind(this); // Resolve the nodes

      var nodes = options.nodes ? options.nodes.map(function (node) {
        return node.charAt(0) === ':' ? options.props[node.substring(1)] || node : node;
      }) : [];
      options.props && delete options.props._route; // We should be able to execute it now

      return executor({
        nodes: nodes,
        options: options.options || {},
        props: options.props || {}
      });
    }
  }, {
    key: "defaults",
    get: function get() {
      return {};
    }
  }, {
    key: "props",
    get: function get() {
      return this._props;
    }
  }]);

  return DataProvider;
}();

exports["default"] = DataProvider;