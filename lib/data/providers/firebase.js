"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var Errors = _interopRequireWildcard(require("../../errors"));

var Config = _interopRequireWildcard(require("../../config"));

var _Error = _interopRequireDefault(require("../../core/Error"));

var _DataProvider2 = _interopRequireDefault(require("../../core/DataProvider"));

var _firebaseline = require("firebaseline");

var _cache = require("../cache");

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

var FirebaseDataProvider =
/*#__PURE__*/
function (_DataProvider) {
  _inherits(FirebaseDataProvider, _DataProvider);

  function FirebaseDataProvider() {
    _classCallCheck(this, FirebaseDataProvider);

    return _possibleConstructorReturn(this, _getPrototypeOf(FirebaseDataProvider).apply(this, arguments));
  }

  _createClass(FirebaseDataProvider, [{
    key: "create",
    value: function create(_ref) {
      var nodes = _ref.nodes,
          options = _ref.options,
          props = _ref.props;
      // Let's see what kind of a resource we want to create
      var node = nodes[0];

      if (!node) {
        // We require a resource to be defined
        return Promise.reject(Errors.UNDEFINED_OPERATION());
      }

      var key = nodes.map(function (node) {
        return node === ':uid' ? firebase.auth().currentUser.uid : node;
      }).join('/');
      return _firebaseline.operations.create(firebase, Object.assign({
        node: node
      }, props));
    }
  }, {
    key: "login",
    value: function login(_ref2) {
      var nodes = _ref2.nodes,
          options = _ref2.options,
          props = _ref2.props;
      return new Promise(function (resolve, reject) {
        if (!props.email || !props.password || !_firebaseline.operations.login) {
          // We only support email logins for now
          reject(Errors.UNDEFINED_OPERATION());
          return;
        } // Let's take a look at the credentials


        var email = props.email;
        var password = props.password; // Attempt to sign in

        return _firebaseline.operations.login(firebase, {
          email: email,
          password: password
        }).then(function (account) {
          firebase.auth().onAuthStateChanged(function (user) {
            var combined = Object.assign({}, {
              uid: user.uid,
              emailVerified: user.emailVerified
            }, account);
            (0, _cache.cacheAuth)({
              user: combined
            }).then(function () {
              return resolve(combined);
            });
          });
        })["catch"](function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: "register",
    value: function register(_ref3) {
      var nodes = _ref3.nodes,
          options = _ref3.options,
          props = _ref3.props;
      return new Promise(function (resolve, reject) {
        if (!props.email || !props.password || !_firebaseline.operations.register) {
          // We only support email for now
          reject(Errors.UNDEFINED_OPERATION());
          return;
        } // Let's take a look at the credentials


        var name = props.name;
        var email = props.email;
        var password = props.password; // Attempt to register user

        return _firebaseline.operations.register(firebase, Object.assign({
          appAuth: true
        }, props)).then(function (account) {
          firebase.auth().onAuthStateChanged(function (user) {
            var combined = Object.assign({}, {
              uid: user.uid,
              emailVerified: user.emailVerified
            }, account);
            (0, _cache.cacheAuth)({
              user: combined
            }).then(function () {
              return firebase.auth().currentUser.sendEmailVerification();
            }).then(function () {
              return resolve(combined);
            });
          });
        })["catch"](function (error) {
          return reject(error);
        });
      });
    }
  }, {
    key: "reset",
    value: function reset(_ref4) {
      var nodes = _ref4.nodes,
          options = _ref4.options,
          props = _ref4.props;

      if (!props.email) {
        return Promise.reject(Errors.UNDEFINED_OPERATION());
      } // Let's take a look at the credentials


      var email = props.email; // Attempt to reset

      return _firebaseline.operations.reset(firebase, {
        email: email
      });
    }
  }, {
    key: "subscribe",
    value: function subscribe(_ref5) {
      var nodes = _ref5.nodes,
          options = _ref5.options,
          props = _ref5.props;
      // Let's see what kind of a resource we want to subscribe to
      var node = nodes[0];

      if (!node) {
        // We require a resource to be defined
        return Promise.reject(Errors.UNDEFINED_OPERATION());
      }

      var key = nodes.map(function (node) {
        return node === ':uid' ? firebase.auth().currentUser.uid : node;
      }).join('/');
      var params = {
        key: key
      };

      if (options.latest) {
        params.orderBy = 'timestamp';
        params.limitToLast = options.latest;
      }

      params.onStarted = props.onStarted;

      params.onReceivedData = function (data) {
        if (!options.resolve) {
          // Just a plain retrieval
          props.onReceivedData && props.onReceivedData(data);
          return;
        }

        var ops = [];

        for (var itemKey in data) {
          key = "".concat(options.resolve, "/").concat(itemKey);
          ops.push(_firebaseline.operations.retrieve(firebase, {
            key: key
          }));
        }

        return Promise.all(ops).then(function (all) {
          props.onReceivedData && props.onReceivedData(all);
        });
      };

      return _firebaseline.operations.subscribe(firebase, params);
    }
  }, {
    key: "update",
    value: function update(_ref6) {
      var nodes = _ref6.nodes,
          options = _ref6.options,
          props = _ref6.props;

      if (!nodes || nodes.length < 1) {
        // We require a resource to be defined
        return Promise.reject(Errors.UNDEFINED_OPERATION());
      }

      var key = nodes.map(function (node) {
        return node === ':uid' ? firebase.auth().currentUser.uid : node;
      }).join('/');
      var params = Object.assign({}, {
        key: key
      }, props);
      return _firebaseline.operations.update(firebase, params);
    }
  }, {
    key: "add",
    value: function add(_ref7) {
      var nodes = _ref7.nodes,
          options = _ref7.options,
          props = _ref7.props;

      if (!nodes || nodes.length < 1) {
        // We require a resource to be defined
        return Promise.reject(Errors.UNDEFINED_OPERATION());
      }

      var params = Object.assign({}, props, {
        node: nodes[0]
      });
      return _firebaseline.operations.add(firebase, params);
    }
  }, {
    key: "join",
    value: function join(_ref8) {
      var nodes = _ref8.nodes,
          options = _ref8.options,
          props = _ref8.props;

      if (!nodes) {
        // We require a resource to be defined
        return Promise.reject(Errors.UNDEFINED_OPERATION());
      }

      var params = Object.assign({}, props);
      return _firebaseline.operations.join(firebase, params);
    }
  }, {
    key: "remove",
    value: function remove(_ref9) {
      var nodes = _ref9.nodes,
          options = _ref9.options,
          props = _ref9.props;
      // Let's see what kind of a resource we want to remove
      var resource = nodes[0];

      if (!resource) {
        // We require a resource to be defined
        return Promise.reject(Errors.UNDEFINED_OPERATION());
      }

      if (!props.ids || props.ids.length === 0) {
        return Promise.resolve();
      }

      var key = nodes.map(function (node) {
        return node === ':uid' ? firebase.auth().currentUser.uid : node;
      }).join('/');
      return Promise.all(props.ids.map(function (id) {
        return _firebaseline.operations.remove(firebase, {
          key: "".concat(key, "/").concat(id)
        });
      }));
    }
  }, {
    key: "retrieve",
    value: function retrieve(_ref10) {
      var nodes = _ref10.nodes,
          options = _ref10.options,
          props = _ref10.props;
      // Let's see what kind of a resource we want to retrieve
      var resource = nodes[0];

      if (!resource) {
        // We require a resource to be defined
        return Promise.reject(Errors.UNDEFINED_OPERATION());
      }

      var key = nodes.map(function (node) {
        return node === ':uid' ? firebase.auth().currentUser.uid : node;
      }).join('/');
      var params = {
        key: key
      };

      if (options.latest) {
        params.orderBy = 'timestamp';
        params.limitToLast = options.latest;
      }

      if (props.before) {
        params.orderBy = 'timestamp';
        params.endAt = props.before;
      }

      if (options.indexKey && props.indexValue) {
        params.orderBy = options.indexKey;
        params.equalTo = props.indexValue;
      }

      var chain = Promise.resolve();

      if (options.cache) {
        // Check if this was cached
        chain = new Promise(function (resolve, reject) {
          return (0, _cache.retrieveCachedItem)("chunky_".concat(params.key)).then(function (data) {
            return resolve(data);
          })["catch"](function (error) {
            return resolve();
          });
        });
      }

      return chain.then(function (cachedData) {
        if (cachedData) {
          return cachedData;
        }

        return _firebaseline.operations.retrieve(firebase, params).then(function (data) {
          if (!options.resolve) {
            return data;
          } // Make sure we're dealing with a list


          data = Array.isArray(data) ? data : [data];

          if (params.orderBy === 'timestamp') {
            data = data.sort(function (a, b) {
              return Number.parseInt(b.timestamp) - Number.parseInt(a.timestamp);
            });
          }

          return Promise.all(data.map(function (item) {
            var path = "".concat(options.resolve, "/").concat(item._id);
            return _firebaseline.operations.retrieve(firebase, Object.assign({
              key: path
            }));
          }));
        }).then(function (dataToBeCached) {
          if (!options.cache) {
            return dataToBeCached;
          } // Cache this data


          return (0, _cache.cacheItem)("chunky_".concat(params.key), dataToBeCached);
        });
      });
    }
  }]);

  return FirebaseDataProvider;
}(_DataProvider2["default"]);

exports["default"] = FirebaseDataProvider;