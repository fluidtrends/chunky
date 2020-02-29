"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _urlParse = _interopRequireDefault(require("url-parse"));

var _htmlEntities = require("html-entities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Screen = /*#__PURE__*/function (_Component) {
  _inherits(Screen, _Component);

  function Screen(props) {
    var _this;

    _classCallCheck(this, Screen);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Screen).call(this, props));
    _this.state = {
      lastTransitionTimestamp: '',
      visible: true,
      progress: false
    };
    _this._entities = new _htmlEntities.AllHtmlEntities();
    _this._containerId = props['@'] ? props['@'].id : undefined;
    _this._onEvent = _this.onEvent.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Screen, [{
    key: "onEvent",
    value: function onEvent(event) {
      if (!event || !event.id) {
        return;
      }

      if (event.data && event.data.handler) {
        this.handleEvent(event, event.data.handler);
        return;
      }

      if (!this.props.events || !this.props.events[event.id]) {
        return;
      }

      var handler = this.props.events[event.id];
      this.handleEvent(event, handler);
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(event, handler) {
      var handlerRef = new _urlParse["default"](handler);
      var handlerHash = handlerRef.hash ? handlerRef.hash.substring(1) : '';

      if (handlerHash) {
        // This is a function handler
        this[handlerHash] && this[handlerHash](event);
        return;
      }

      var handlerType = handlerRef.protocol.slice(0, -1).toLowerCase();
      var fullPath = "".concat(handlerRef.hostname).concat(handlerRef.pathname ? handlerRef.pathname : '');

      switch (handlerType) {
        case 'local':
          return this.handleLocalEvent("/".concat(fullPath));

        case 'system':
          return this.handleSystemEvent("/".concat(fullPath));

        default:
          return this.handleExternalEvent("".concat(handlerType, "://").concat(fullPath));
      }
    }
  }, {
    key: "handleSystemEvent",
    value: function handleSystemEvent(fullPath) {}
  }, {
    key: "handleLocalEvent",
    value: function handleLocalEvent(fullPath) {}
  }, {
    key: "handleExternalEvent",
    value: function handleExternalEvent(fullPath) {}
  }, {
    key: "triggerAnalyticsView",
    value: function triggerAnalyticsView() {
      this.props.analytics && this.props.analytics.view(this.props.path);
    }
  }, {
    key: "triggerAnalyticsEvent",
    value: function triggerAnalyticsEvent(event) {
      this.props.analytics && this.props.analytics.event(event);
    }
  }, {
    key: "triggerAnalyticsError",
    value: function triggerAnalyticsError(error) {
      this.props.analytics && this.props.analytics.error(error);
    }
  }, {
    key: "updateProgress",
    value: function updateProgress(progressTitle) {
      this.setState({
        progressTitle: progressTitle
      });
    } // UNSAFE_componentWillMount () {
    //   for (const transitionName in this.props.transitions) {
    //     // Inject all transitions into this screen
    //     this.injectTransition(this.props.transitions[transitionName])
    //   }
    // }
    // UNSAFE_componentWillUnmount () {
    //   this._stopSubscriptions()
    // }

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this._startSubscriptions(); // Automatically attempt to retrieve the main data, if possible and if desired


      if (this.props.startOperationsOnMount && this.props.startOperation) {
        this.props.startOperation();
      }
    }
  }, {
    key: "_stopSubscriptions",
    value: function _stopSubscriptions() {
      var _this2 = this;

      if (!this.props.subscriptions) {
        return;
      }

      this.props.subscriptions.forEach(function (subscription) {
        _this2.stopSubscription(subscription);
      });
    }
  }, {
    key: "_startSubscriptions",
    value: function _startSubscriptions() {
      var _this3 = this;

      if (!this.props.subscriptions) {
        return;
      }

      this.props.subscriptions.forEach(function (subscription) {
        _this3.startSubscription(subscription);
      });
    }
  }, {
    key: "stopSubscription",
    value: function stopSubscription(subscription) {
      this.state[["".concat(subscription, "Stream")]] && this.state["".concat(subscription, "Stream")].off();
    }
  }, {
    key: "subscriptionArgs",
    value: function subscriptionArgs(subscription) {
      return {};
    }
  }, {
    key: "startSubscription",
    value: function startSubscription(subscription) {
      var _this4 = this;

      var self = this;
      var args = this.subscriptionArgs(subscription);

      if (!this.props[subscription] || !self["".concat(subscription, "Success")]) {
        return;
      }

      setTimeout(function () {
        _this4.props[subscription](Object.assign({}, args, {
          onStarted: function onStarted(subscriptionStream) {
            self.setState(_defineProperty({}, "".concat(subscription, "Stream"), subscriptionStream));
          },
          onReceivedData: function onReceivedData(data) {
            self["".concat(subscription, "Success")](data || {});
          }
        }));
      }, 300);
    }
  }, {
    key: "injectTransition",
    value: function injectTransition(transition) {
      var _this5 = this;

      this.transitions = this.transitions || {};

      this.transitions[transition.name] = function (data) {
        _this5.transition(transition, data);
      };
    }
  }, {
    key: "transition",
    value: function transition(_transition, data) {
      var timeSinceLastTransition = Date.now() - this.state.lastTransitionTimestamp;

      if (this.state.lastTransitionTimestamp && timeSinceLastTransition < 500) {
        // Ignore transition
        return;
      } // Turn off the progress


      if (this.state.progress) {
        this.setState({
          progress: false
        });
      } // Timestamp this transition


      this.setState({
        lastTransitionTimestamp: Date.now(),
        visible: false
      });
      this["".concat(_transition.type.toLowerCase(), "Transition")] && this["".concat(_transition.type.toLowerCase(), "Transition")](_transition, Object.assign({}, data, {
        transition: _transition
      }));
    }
  }, {
    key: "_operationDidFinish",
    value: function _operationDidFinish(name, data, operation, handler) {
      if (typeof operation[handler] !== 'string') {
        // We only handle simple handlers at the moment
        return;
      } // Let's see what we have as a handler


      var parts = operation[handler].split(':');

      if (parts && parts.length === 2) {
        // Perform the transition
        var transition = "".concat(parts[1].charAt(0).toUpperCase()).concat(parts[1].substring(1));
        this.transitions["show".concat(transition)] && this.transitions["show".concat(transition)](_defineProperty({}, operation.flavor, data));
        return;
      }

      if (parts && parts.length === 1) {
        // Execute the specified operation
        this[operation[handler]] ? this[operation[handler]](data) : this.props[operation[handler]] && this.props[operation[handler]](data);
      }
    }
  }, {
    key: "isForeignOperation",
    value: function isForeignOperation(operation) {
      var foreign = this.containerId !== operation.routeId;
      return foreign;
    }
  }, {
    key: "operationDidFinish",
    value: function operationDidFinish(name, data, error, operation) {
      if (operation && operation.onError && error && error[operation.flavor]) {
        return this._operationDidFinish(name, error[operation.flavor], operation, 'onError');
      }

      if (operation && operation.onSuccess && (!error || !error[operation.flavor])) {
        // The operation response is successful
        return this._operationDidFinish(name, data ? data[operation.flavor] || {} : {}, operation, 'onSuccess');
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return true;
    }
  }, {
    key: "logout",
    value: function logout() {
      this.props.onUserLogout && this.props.onUserLogout();
    }
  }, {
    key: "login",
    value: function login(account) {
      this.props.onUserLoggedIn && this.props.onUserLoggedIn(account);
    }
  }, {
    key: "didLogout",
    value: function didLogout() {
      if (!this.props.permissions || !this.props.permissions.publicRedirect) {
        return;
      }

      this.triggerRedirect(this.props.permissions.publicRedirect);
    }
  }, {
    key: "didLogin",
    value: function didLogin() {
      if (!this.props.permissions || !this.props.permissions.privateRedirect) {
        return;
      }

      this.triggerRedirect(this.props.permissions.privateRedirect);
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (this.props.account && !nextProps.account) {
        this.didLogout();
      } else if (!this.props.account && nextProps.account) {
        this.didLogin();
      }

      var operation = nextProps.action ? this.props["@".concat(nextProps.action())] : undefined;

      if (operation && !this.isForeignOperation(operation) && this.props.isDataLoading() && nextProps.isDataLoaded()) {
        // Looks like an operation just finished, so let's trigger the callback
        this.operationDidFinish(nextProps.action(), nextProps.data(), nextProps.dataError(), operation);
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.progress && this.renderProgress) {
        return this.renderProgress();
      }

      if (this.props.isDataLoading && this.props.isDataLoading() && this.renderDataLoading) {
        // We're loading the data still
        return this.renderDataLoading();
      }

      if (this.props.hasDataError && this.props.hasDataError() && this.renderDataError) {
        // Looks like there's an error that we need to handle
        return this.renderDataError(this.props.dataError());
      }

      if (this.props.hasData && !this.props.hasData() && this.renderDataDefaults) {
        // This screen does not have any data to render
        return this.renderDataDefaults();
      }

      if (this.props.hasData && this.props.hasData() && this.renderData) {
        return this.renderData(this.props.data());
      }

      return _react["default"].createElement("div", null);
    }
  }, {
    key: "entities",
    get: function get() {
      return this._entities;
    }
  }, {
    key: "containerId",
    get: function get() {
      return this._containerId;
    }
  }, {
    key: "isContainer",
    get: function get() {
      return this.containerId !== undefined;
    }
  }]);

  return Screen;
}(_react.Component);

exports["default"] = Screen;