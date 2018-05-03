'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _errors = require('../../errors');

var Errors = _interopRequireWildcard(_errors);

var _config = require('../../config');

var Config = _interopRequireWildcard(_config);

var _Error = require('../../core/Error');

var _Error2 = _interopRequireDefault(_Error);

var _DataProvider2 = require('../../core/DataProvider');

var _DataProvider3 = _interopRequireDefault(_DataProvider2);

var _cache = require('../cache');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RestDataProvider = function (_DataProvider) {
  _inherits(RestDataProvider, _DataProvider);

  function RestDataProvider() {
    _classCallCheck(this, RestDataProvider);

    return _possibleConstructorReturn(this, (RestDataProvider.__proto__ || Object.getPrototypeOf(RestDataProvider)).apply(this, arguments));
  }

  _createClass(RestDataProvider, [{
    key: 'create',
    value: function create(_ref) {
      var nodes = _ref.nodes,
          options = _ref.options,
          props = _ref.props;

      // Let's see what kind of a resource we want to create
      var resource = nodes[0];

      if (!resource) {
        // We require a resource to be defined
        return Promise.reject(Errors.UNDEFINED_OPERATION());
      }

      // Construct the endpoint
      var endpoint = nodes.join('/');

      var request = {
        method: 'post',
        timeout: this.props.timeout,
        url: this.props.url + '/' + endpoint,
        headers: this.props.headers,
        body: props
      };

      return this._sendRequest(request);
    }
  }, {
    key: 'retrieve',
    value: function retrieve(_ref2) {
      var nodes = _ref2.nodes,
          options = _ref2.options,
          props = _ref2.props;

      // Let's see what kind of a resource we want to retrieve
      var resource = nodes[0];

      if (!resource) {
        // We require a resource to be defined
        return Promise.reject(Errors.UNDEFINED_OPERATION());
      }

      // Construct the endpoint
      var endpoint = nodes.join('/');

      var request = {
        method: 'get',
        timeout: this.props.timeout,
        url: this.props.url + '/' + endpoint,
        headers: this.props.headers
      };

      return this._sendRequest(request);
    }
  }, {
    key: '_prepareRequest',
    value: function _prepareRequest(_ref3) {
      var url = _ref3.url,
          method = _ref3.method,
          headers = _ref3.headers,
          body = _ref3.body;

      // Prepare the request properties
      var options = {
        method: method.toUpperCase(),
        headers: headers
      };

      if (body) {
        // Inject the body if found
        options.body = JSON.stringify(body);
      }

      return { url: url, options: options };
    }
  }, {
    key: '_timeout',
    value: function _timeout(ms, promise) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          reject(Errors.TIMEOUT_ERROR());
        }, ms);
        promise.then(resolve, reject);
      });
    }
  }, {
    key: '_sendRequest',
    value: function _sendRequest(request) {
      var requestParams = this._prepareRequest(request);
      return this._timeout(request.timeout, fetch(requestParams.url, requestParams.options)).then(function (response) {
        return response.json();
      });
    }
  }, {
    key: 'defaults',
    get: function get() {
      return {
        // Defaults
        timeout: 10000,
        headers: {
          'Content-Type': Config.API_JSON_CONTENT_TYPE,
          'Accept': Config.API_JSON_CONTENT_TYPE
        },
        url: Config.API_DEFAULT_SERVER_URL
      };
    }
  }]);

  return RestDataProvider;
}(_DataProvider3.default);

exports.default = RestDataProvider;