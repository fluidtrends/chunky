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

var _firebaseline = require('firebaseline');

var _cache = require('../cache');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FirebaseDataProvider = function (_DataProvider) {
  _inherits(FirebaseDataProvider, _DataProvider);

  function FirebaseDataProvider() {
    _classCallCheck(this, FirebaseDataProvider);

    return _possibleConstructorReturn(this, (FirebaseDataProvider.__proto__ || Object.getPrototypeOf(FirebaseDataProvider)).apply(this, arguments));
  }

  _createClass(FirebaseDataProvider, [{
    key: 'create',
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
      return _firebaseline.operations.create(firebase, Object.assign({ node: node }, props));
    }
  }, {
    key: 'login',
    value: function login(_ref2) {
      var nodes = _ref2.nodes,
          options = _ref2.options,
          props = _ref2.props;

      if (!props.email || !props.password || !_firebaseline.operations.login) {
        // We only support email logins for now
        return Promise.reject(Errors.UNDEFINED_OPERATION());
      }

      // Let's take a look at the credentials
      var email = props.email;
      var password = props.password;

      // Attempt to sign in
      return _firebaseline.operations.login(firebase, { email: email, password: password })

      // Let's keep track of the user locally
      .then(function (user) {
        return (0, _cache.cacheAuth)({ user: user.toJSON() });
      });
    }
  }, {
    key: 'reset',
    value: function reset(_ref3) {
      var nodes = _ref3.nodes,
          options = _ref3.options,
          props = _ref3.props;

      if (!props.email) {
        return Promise.reject(Errors.UNDEFINED_OPERATION());
      }

      // Let's take a look at the credentials
      var email = props.email;

      // Attempt to reset
      return _firebaseline.operations.reset(firebase, { email: email });
    }
  }, {
    key: 'register',
    value: function register(_ref4) {
      var nodes = _ref4.nodes,
          options = _ref4.options,
          props = _ref4.props;

      if (!props.email || !props.password || !_firebaseline.operations.register) {
        // We only support email for now
        return Promise.reject(Errors.UNDEFINED_OPERATION());
      }

      // Let's take a look at the credentials
      var name = props.name;
      var email = props.email;
      var password = props.password;

      // Attempt to register user
      return _firebaseline.operations.register(firebase, Object.assign({ appAuth: true }, props))

      // Login immediately
      .then(function () {
        return _firebaseline.operations.login(firebase, { email: email, password: password });
      })

      // Let's keep track of the user locally
      .then(function (user) {
        return (0, _cache.cacheAuth)({ user: user.toJSON() });
      });
    }
  }, {
    key: 'subscribe',
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
      var params = { key: key };

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
          key = options.resolve + '/' + itemKey;
          ops.push(_firebaseline.operations.retrieve(firebase, { key: key }));
        }
        return Promise.all(ops).then(function (all) {
          props.onReceivedData && props.onReceivedData(all);
        });
      };

      return _firebaseline.operations.subscribe(firebase, params);
    }
  }, {
    key: 'update',
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
      var params = Object.assign({}, { key: key }, props);
      return _firebaseline.operations.update(firebase, params);
    }
  }, {
    key: 'add',
    value: function add(_ref7) {
      var nodes = _ref7.nodes,
          options = _ref7.options,
          props = _ref7.props;

      if (!nodes || nodes.length < 1) {
        // We require a resource to be defined
        return Promise.reject(Errors.UNDEFINED_OPERATION());
      }

      var params = Object.assign({}, props, { node: nodes[0] });
      return _firebaseline.operations.add(firebase, params);
    }
  }, {
    key: 'join',
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
    key: 'remove',
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
        return _firebaseline.operations.remove(firebase, { key: key + '/' + id });
      }));
    }
  }, {
    key: 'retrieve',
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
      var params = { key: key };

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
          return (0, _cache.retrieveCachedItem)('chunky_' + params.key).then(function (data) {
            return resolve(data);
          }).catch(function (error) {
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
          }

          // Make sure we're dealing with a list
          data = Array.isArray(data) ? data : [data];

          if (params.orderBy === 'timestamp') {
            data = data.sort(function (a, b) {
              return Number.parseInt(b.timestamp) - Number.parseInt(a.timestamp);
            });
          }

          return Promise.all(data.map(function (item) {
            var path = options.resolve + '/' + item._id;
            return _firebaseline.operations.retrieve(firebase, Object.assign({ key: path }));
          }));
        }).then(function (dataToBeCached) {
          if (!options.cache) {
            return dataToBeCached;
          }
          // Cache this data
          return (0, _cache.cacheItem)('chunky_' + params.key, dataToBeCached);
        });
      });
    }
  }]);

  return FirebaseDataProvider;
}(_DataProvider3.default);

exports.default = FirebaseDataProvider;