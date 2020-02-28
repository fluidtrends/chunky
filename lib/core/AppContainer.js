"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _store = _interopRequireDefault(require("../data/store"));

var Errors = _interopRequireWildcard(require("../errors"));

var _data = require("../data");

var _Generator = _interopRequireDefault(require("./Generator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// import TransitionGroup from 'react-transition-group/TransitionGroup'
// import ErrorStackParser from 'error-stack-parser'
var AppContainer =
/*#__PURE__*/
function (_Component) {
  _inherits(AppContainer, _Component);

  function AppContainer(props) {
    var _this;

    _classCallCheck(this, AppContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AppContainer).call(this, props)); // Setup all the data providers

    _this._initializeDataProviders(Object.assign({}, _data.Providers, _this.props.providers), props.env); // Create a generator for data injection


    _this._generator = new _Generator["default"](Object.assign({
      dataProviders: _this.dataProviders
    }, props)); // Parse all the app chunks

    _this._parseChunks(); // Initialize the store with custom app reducers


    _this.state = {
      store: (0, _store["default"])(_this.reducers, {
        logging: props.env !== 'production'
      })
    }; // Initialize the analytics engine

    _this._initializeAnalytics();

    return _this;
  }

  _createClass(AppContainer, [{
    key: "_initializeAnalytics",
    value: function _initializeAnalytics() {
      // Initialize with the given props
      if (!this.props.info.analytics) {
        return;
      }

      try {
        _data.Analytics.initialize(this.props.info.analytics);
      } catch (e) {// Absorb issues here but TODO make this better
      }
    }
  }, {
    key: "_initializeDataProviders",
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
        var provider = new pool[providerName](Object.assign({}, providerOptions, {
          env: env
        }));
        _this2._dataProviders[providerName.toLowerCase()] = provider;
      });
    }
  }, {
    key: "_parseChunks",
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
            } // chunk.routes[routeName].screen = (
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
    key: "enableGlobalErrorHandler",
    value: function enableGlobalErrorHandler() {} // const self = this
    // ErrorUtils.setGlobalHandler((e, isFatal) => {
    //   // Extract a meaningful stack trace
    //   const stack = ErrorStackParser.parse(e)
    //
    //   // Notify the app that an error has occured
    //   self.setState({ error: e, isErrorFatal: isFatal, errorStack: stack })
    // })
    // UNSAFE_componentDidMount () {
    //   // this.enableGlobalErrorHandler()
    // }

  }, {
    key: "render",
    value: function render() {
      if (_react["default"].Children.count(this.props.children) !== 1) {
        throw new Errors.UNABLE_TO_LOAD_APP();
      }

      if (!this.chunks) {
        throw new Errors.UNABLE_TO_LOAD_CHUNKS();
      }

      if (this.props.autoRefresh) {
        this._parseChunks();
      }

      return _react["default"].createElement(_reactRedux.Provider, {
        store: this.state.store
      }, this.app);
    }
  }, {
    key: "analytics",
    get: function get() {
      if (!_data.Analytics.isInitialized) {
        return;
      }

      return _data.Analytics;
    }
  }, {
    key: "provisioning",
    get: function get() {
      return this.props.provisioning || {};
    }
  }, {
    key: "dataProviders",
    get: function get() {
      return this._dataProviders;
    }
  }, {
    key: "generator",
    get: function get() {
      return this._generator;
    }
  }, {
    key: "app",
    get: function get() {
      return _react["default"].cloneElement(this.props.children, {
        chunks: this.chunks,
        env: this.props.env,
        provisioning: this.props.provisioning,
        analytics: this.analytics,
        strings: this.props.strings
      });
    }
  }, {
    key: "chunks",
    get: function get() {
      return this._chunks;
    }
  }, {
    key: "reducers",
    get: function get() {
      return this._reducers;
    }
  }]);

  return AppContainer;
}(_react.Component);

exports["default"] = AppContainer;