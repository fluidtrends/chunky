"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var Errors = _interopRequireWildcard(require("../../errors"));

var Config = _interopRequireWildcard(require("../../config"));

var _Error = _interopRequireDefault(require("../../core/Error"));

var _DataProvider2 = _interopRequireDefault(require("../../core/DataProvider"));

var _cache = require("../cache");

var _jsBase = require("js-base64");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var RestDataProvider = /*#__PURE__*/function (_DataProvider) {
  _inherits(RestDataProvider, _DataProvider);

  function RestDataProvider() {
    _classCallCheck(this, RestDataProvider);

    return _possibleConstructorReturn(this, _getPrototypeOf(RestDataProvider).apply(this, arguments));
  }

  _createClass(RestDataProvider, [{
    key: "create",
    value: function create(_ref) {
      var nodes = _ref.nodes,
          options = _ref.options,
          props = _ref.props;
      // Let's see what kind of a resource we want to create
      var resource = nodes[0];

      if (!resource) {
        // We require a resource to be defined
        return Promise.reject(Errors.UNDEFINED_OPERATION());
      } // Construct the endpoint


      var endpoint = nodes.join('/');
      var request = {
        method: 'post',
        timeout: this.props.timeout,
        url: "".concat(this.props.url, "/").concat(this.props.env === 'production' ? '' : this.props.env + '-').concat(endpoint),
        headers: this.props.headers,
        body: props
      };
      return this._sendRequest(request);
    }
  }, {
    key: "retrieve",
    value: function retrieve(_ref2) {
      var nodes = _ref2.nodes,
          options = _ref2.options,
          props = _ref2.props;
      // Let's see what kind of a resource we want to retrieve
      var resource = nodes[0];

      if (!resource) {
        // We require a resource to be defined
        return Promise.reject(Errors.UNDEFINED_OPERATION());
      } // Construct the endpoint


      var endpoint = nodes.join('/');
      var request = {
        method: 'get',
        timeout: this.props.timeout,
        url: "".concat(this.props.url, "/").concat(this.props.env === 'production' ? '' : this.props.env + '-').concat(endpoint),
        headers: this.props.headers
      };
      return this._sendRequest(request);
    }
  }, {
    key: "_prepareAuthHeaders",
    value: function _prepareAuthHeaders(auth) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        try {
          _this._firebaseToken.then(function (token) {
            resolve({
              Authorization: _jsBase.Base64.encode(token)
            });
          })["catch"](function (e) {
            resolve();
          });
        } catch (e) {
          resolve();
        }
      });
    }
  }, {
    key: "_prepareRequest",
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

        return {
          url: url,
          options: options
        };
      });
    }
  }, {
    key: "_timeout",
    value: function _timeout(ms, promise) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          reject(Errors.TIMEOUT_ERROR());
        }, ms);
        promise.then(resolve, reject);
      });
    }
  }, {
    key: "_sendAuthRequest",
    value: function _sendAuthRequest(request, auth) {
      var _this2 = this;

      return this._prepareRequest(request, auth).then(function (_ref4) {
        var url = _ref4.url,
            options = _ref4.options;
        return _this2._timeout(request.timeout, fetch(url, options));
      }).then(function (response) {
        return response ? response.json() : "";
      });
    }
  }, {
    key: "_sendRequest",
    value: function _sendRequest(request) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        (0, _cache.retrieveAuth)().then(function (auth) {
          _this3._sendAuthRequest(request, auth).then(function (response) {
            resolve(response);
          })["catch"](function (err) {
            reject(err);
          });
        })["catch"](function (err) {
          _this3._sendAuthRequest(request).then(function (response) {
            resolve(response);
          })["catch"](function (err) {
            reject(err);
          });
        });
      });
    }
  }, {
    key: "defaults",
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
    key: "_firebaseToken",
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
}(_DataProvider2["default"]);

exports["default"] = RestDataProvider;