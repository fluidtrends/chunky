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

var _jsBase = require('js-base64');

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
        url: this.props.url + '/' + (this.props.env === 'production' ? '' : this.props.env + '-') + endpoint,
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
        url: this.props.url + '/' + (this.props.env === 'production' ? '' : this.props.env + '-') + endpoint,
        headers: this.props.headers
      };

      return this._sendRequest(request);
    }
  }, {
    key: '_prepareAuthHeaders',
    value: function _prepareAuthHeaders(auth) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        try {
          _this2._firebaseToken.then(function (token) {
            resolve({ Authorization: _jsBase.Base64.encode(token) });
          }).catch(function (e) {
            resolve();
          });
        } catch (e) {
          resolve();
        }
      });
    }
  }, {
    key: '_prepareRequest',
    value: function _prepareRequest(_ref3, auth) {
      var url = _ref3.url,
          method = _ref3.method,
          headers = _ref3.headers,
          body = _ref3.body;

      return this._prepareAuthHeaders(auth).then(function (authHeaders) {
        // Prepare the request properties
        var options = {
          method: method.toUpperCase(),
          headers: Object.assign({}, headers, authHeaders)
        };

        if (body) {
          // Inject the body if found
          options.body = JSON.stringify(body);
        }

        return { url: url, options: options };
      });
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
    key: '_sendAuthRequest',
    value: function _sendAuthRequest(request, auth) {
      var _this3 = this;

      return this._prepareRequest(request, auth).then(function (_ref4) {
        var url = _ref4.url,
            options = _ref4.options;
        return _this3._timeout(request.timeout, fetch(url, options));
      }).then(function (response) {
        return response.json();
      });
    }
  }, {
    key: '_sendRequest',
    value: function _sendRequest(request) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        (0, _cache.retrieveAuth)().then(function (auth) {
          _this4._sendAuthRequest(request, auth).then(function (response) {
            resolve(response);
          });
        }).catch(function () {
          _this4._sendAuthRequest(request).then(function (response) {
            resolve(response);
          });
        });
      });
    }
  }, {
    key: 'defaults',
    get: function get() {
      return {
        // Defaults
        timeout: 60000,
        headers: {
          'Content-Type': Config.API_JSON_CONTENT_TYPE,
          'Accept': Config.API_JSON_CONTENT_TYPE
        },
        url: Config.API_DEFAULT_SERVER_URL
      };
    }
  }, {
    key: '_firebaseToken',
    get: function get() {
      return new Promise(function (resolve, reject) {
        if (!firebase.auth().currentUser) {
          firebase.auth().onAuthStateChanged(function (user) {
            if (!user) {
              resolve();
              return;
            }
            firebase.auth().currentUser.getIdToken().then(function (token) {
              resolve(token);
            });
          });
          return;
        }

        firebase.auth().currentUser.getIdToken().then(function (token) {
          return resolve(token);
        });
      });
    }
  }]);

  return RestDataProvider;
}(_DataProvider3.default);

exports.default = RestDataProvider;