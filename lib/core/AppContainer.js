'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _store = require('../data/store');

var _store2 = _interopRequireDefault(_store);

var _errors = require('../errors');

var Errors = _interopRequireWildcard(_errors);

var _data = require('../data');

var _Generator = require('./Generator');

var _Generator2 = _interopRequireDefault(_Generator);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import TransitionGroup from 'react-transition-group/TransitionGroup'
// import ErrorStackParser from 'error-stack-parser'

var AppContainer = function (_Component) {
  _inherits(AppContainer, _Component);

  function AppContainer(props) {
    _classCallCheck(this, AppContainer);

    // Setup all the data providers
    var _this = _possibleConstructorReturn(this, (AppContainer.__proto__ || Object.getPrototypeOf(AppContainer)).call(this, props));

    _this._initializeDataProviders(Object.assign({}, _data.Providers, _this.props.providers), props.env);

    // Create a generator for data injection
    _this._generator = new _Generator2.default(Object.assign({ dataProviders: _this.dataProviders }, props));

    // Parse all the app chunks
    _this._parseChunks();

    // Initialize the store with custom app reducers
    _this.state = { store: (0, _store2.default)(_this.reducers, { logging: props.env !== 'production' })

      // Initialize the analytics engine
    };_this._initializeAnalytics();
    return _this;
  }

  _createClass(AppContainer, [{
    key: '_initializeAnalytics',
    value: function _initializeAnalytics() {
      // Initialize with the given props
      if (!this.props.info.analytics) {
        return;
      }

      _data.Analytics.initialize(this.props.info.analytics);
    }
  }, {
    key: '_initializeDataProviders',
    value: function _initializeDataProviders(pool, env) {
      var _this2 = this;

      if (!pool) {
        // Ignore empty provider pools
        return;
      }

      var supportedProviders = Object.keys(pool);
      this._dataProviders = this._dataProviders || {};
      supportedProviders.forEach(function (providerName) {
        // The providers initialization can be customized globally
        var providerOptions = _this2.provisioning[providerName.toLowerCase()] || {};
        var provider = new pool[providerName](Object.assign({}, providerOptions, { env: env }));
        _this2._dataProviders[providerName.toLowerCase()] = provider;
      });
    }
  }, {
    key: '_parseChunks',
    value: function _parseChunks() {
      this._reducers = {};

      if (!this.props.chunks) {
        return;
      }

      for (var chunkName in this.props.chunks) {
        var chunk = this.props.chunks[chunkName];
        this._reducers = Object.assign(this._reducers, _defineProperty({}, chunk.name, this.generator.generateReducer(chunk)));

        if (chunk.routes) {
          for (var routeName in chunk.routes) {
            var route = chunk.routes[routeName];
            chunk.routes[routeName].screen = chunk.screens[routeName];

            if (route.screen) {
              // Resolve containers
              var light = !route.operations && !route.selectors;
              chunk.routes[routeName].screen = this.generator.generateContainer(chunk, route, routeName, light);
            }

            // chunk.routes[routeName].screen = (
            //   <TransitionGroup>
            //     { chunk.routes[routeName].screen }
            //   <TransitionGroup/>)
          }
        }

        this._chunks = this._chunks || {};
        this._chunks[chunkName] = chunk;
      }
    }
  }, {
    key: 'enableGlobalErrorHandler',
    value: function enableGlobalErrorHandler() {
      // const self = this
      // ErrorUtils.setGlobalHandler((e, isFatal) => {
      //   // Extract a meaningful stack trace
      //   const stack = ErrorStackParser.parse(e)
      //
      //   // Notify the app that an error has occured
      //   self.setState({ error: e, isErrorFatal: isFatal, errorStack: stack })
      // })
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // this.enableGlobalErrorHandler()
    }
  }, {
    key: 'render',
    value: function render() {
      if (_react2.default.Children.count(this.props.children) !== 1) {
        throw new Errors.UNABLE_TO_LOAD_APP();
      }

      if (!this.chunks) {
        throw new Errors.UNABLE_TO_LOAD_CHUNKS();
      }

      return _react2.default.createElement(
        _reactRedux.Provider,
        { store: this.state.store },
        this.app
      );
    }
  }, {
    key: 'analytics',
    get: function get() {
      if (!_data.Analytics.isInitialized) {
        return;
      }

      return _data.Analytics;
    }
  }, {
    key: 'provisioning',
    get: function get() {
      return this.props.provisioning || {};
    }
  }, {
    key: 'dataProviders',
    get: function get() {
      return this._dataProviders;
    }
  }, {
    key: 'generator',
    get: function get() {
      return this._generator;
    }
  }, {
    key: 'app',
    get: function get() {
      return _react2.default.cloneElement(this.props.children, {
        chunks: this.chunks,
        env: this.props.env,
        provisioning: this.props.provisioning,
        analytics: this.analytics,
        strings: this.props.strings
      });
    }
  }, {
    key: 'chunks',
    get: function get() {
      return this._chunks;
    }
  }, {
    key: 'reducers',
    get: function get() {
      return this._reducers;
    }
  }]);

  return AppContainer;
}(_react.Component);

exports.default = AppContainer;