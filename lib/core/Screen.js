'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

var _htmlEntities = require('html-entities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import { diff } from 'deep-diff'

var Screen = function (_Component) {
  _inherits(Screen, _Component);

  function Screen(props) {
    _classCallCheck(this, Screen);

    var _this = _possibleConstructorReturn(this, (Screen.__proto__ || Object.getPrototypeOf(Screen)).call(this, props));

    _this.state = { lastTransitionTimestamp: '', visible: true, progress: false };
    _this._entities = new _htmlEntities.AllHtmlEntities();
    _this._containerId = props['@'] ? props['@'].id : undefined;
    _this._onEvent = _this.onEvent.bind(_this);
    return _this;
  }

  _createClass(Screen, [{
    key: 'onEvent',
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
    key: 'handleEvent',
    value: function handleEvent(event, handler) {
      var handlerRef = new _urlParse2.default(handler);
      var handlerHash = handlerRef.hash ? handlerRef.hash.substring(1) : '';

      if (handlerHash) {
        // This is a function handler
        this[handlerHash] && this[handlerHash]();
        return;
      }

      var handlerType = handlerRef.protocol.slice(0, -1).toLowerCase();
      var fullPath = '' + handlerRef.hostname + (handlerRef.pathname ? handlerRef.pathname : '');

      switch (handlerType) {
        case 'local':
          return this.handleLocalEvent('/' + fullPath);
        case 'system':
          return this.handleSystemEvent('/' + fullPath);
        default:
          return this.handleExternalEvent(handlerType + '://' + fullPath);
      }
    }
  }, {
    key: 'handleSystemEvent',
    value: function handleSystemEvent(fullPath) {}
  }, {
    key: 'handleLocalEvent',
    value: function handleLocalEvent(fullPath) {}
  }, {
    key: 'handleExternalEvent',
    value: function handleExternalEvent(fullPath) {}
  }, {
    key: 'triggerAnalyticsView',
    value: function triggerAnalyticsView() {
      this.props.analytics && this.props.analytics.view(this.props.path);
    }
  }, {
    key: 'triggerAnalyticsEvent',
    value: function triggerAnalyticsEvent(event) {
      this.props.analytics && this.props.analytics.event(event);
    }
  }, {
    key: 'triggerAnalyticsError',
    value: function triggerAnalyticsError(error) {
      this.props.analytics && this.props.analytics.error(error);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Automatically attempt to retrieve the main data, if possible and if desired
      if (this.props.startOperationsOnMount && this.props.startOperation) {
        this.props.startOperation();
      }
    }
  }, {
    key: 'updateProgress',
    value: function updateProgress(progressTitle) {
      this.setState({ progressTitle: progressTitle });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      for (var transitionName in this.props.transitions) {
        // Inject all transitions into this screen
        this.injectTransition(this.props.transitions[transitionName]);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'injectTransition',
    value: function injectTransition(transition) {
      var _this2 = this;

      this.transitions = this.transitions || {};
      this.transitions[transition.name] = function (data) {
        _this2.transition(transition, data);
      };
    }
  }, {
    key: 'transition',
    value: function transition(_transition, data) {
      var timeSinceLastTransition = Date.now() - this.state.lastTransitionTimestamp;
      if (this.state.lastTransitionTimestamp && timeSinceLastTransition < 500) {
        // Ignore transition
        return;
      }

      // Turn off the progress
      if (this.state.progress) {
        this.setState({ progress: false });
      }

      // Timestamp this transition
      this.setState({ lastTransitionTimestamp: Date.now(), visible: false });
      this[_transition.type.toLowerCase() + 'Transition'] && this[_transition.type.toLowerCase() + 'Transition'](_transition, Object.assign({}, data, { transition: _transition }));
    }
  }, {
    key: '_operationDidFinish',
    value: function _operationDidFinish(name, data, operation, handler) {
      if (typeof operation[handler] !== 'string') {
        // We only handle simple handlers at the moment
        return;
      }

      // Let's see what we have as a handler
      var parts = operation[handler].split(':');

      if (parts && parts.length === 2) {
        // Perform the transition
        var transition = '' + parts[1].charAt(0).toUpperCase() + parts[1].substring(1);
        this.transitions['show' + transition] && this.transitions['show' + transition](_defineProperty({}, operation.flavor, data));
        return;
      }

      if (parts && parts.length === 1) {
        // Execute the specified operation
        this[operation[handler]] ? this[operation[handler]](data) : this.props[operation[handler]] && this.props[operation[handler]](data);
      }
    }
  }, {
    key: 'isForeignOperation',
    value: function isForeignOperation(operation) {
      var foreign = this.containerId !== operation.routeId;
      return foreign;
    }
  }, {
    key: 'operationDidFinish',
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
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return true;
    }
  }, {
    key: 'didLogout',
    value: function didLogout() {
      if (!this.props.permissions || !this.props.permissions.publicRedirect) {
        return;
      }

      this.triggerRedirect(this.props.permissions.publicRedirect);
    }
  }, {
    key: 'didLogin',
    value: function didLogin() {
      if (!this.props.permissions || !this.props.permissions.privateRedirect) {
        return;
      }

      this.triggerRedirect(this.props.permissions.privateRedirect);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.account && !nextProps.account) {
        this.didLogout();
      } else if (!this.props.account && nextProps.account) {
        this.didLogin();
      }

      var operation = nextProps.action ? this.props['@' + nextProps.action()] : undefined;

      if (operation && !this.isForeignOperation(operation) && this.props.isDataLoading() && nextProps.isDataLoaded()) {
        // Looks like an operation just finished, so let's trigger the callback
        this.operationDidFinish(nextProps.action(), nextProps.data(), nextProps.dataError(), operation);
      }
    }
  }, {
    key: 'renderDataError',
    value: function renderDataError(_ref) {
      var main = _ref.main;

      throw new Error('Chunky says: implement renderDataError in your route.');
    }
  }, {
    key: 'renderDataLoading',
    value: function renderDataLoading() {
      throw new Error('Chunky says: implement renderDataLoading in your route.');
    }
  }, {
    key: 'renderDataDefaults',
    value: function renderDataDefaults() {
      throw new Error('Chunky says: implement renderDataDefaults in your route.');
    }
  }, {
    key: 'renderData',
    value: function renderData() {
      throw new Error('Chunky says: implement renderData in your route.');
    }
  }, {
    key: 'renderDataChecks',
    value: function renderDataChecks() {}
  }, {
    key: 'render',
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
    }
  }, {
    key: 'entities',
    get: function get() {
      return this._entities;
    }
  }, {
    key: 'containerId',
    get: function get() {
      return this._containerId;
    }
  }, {
    key: 'isContainer',
    get: function get() {
      return this.containerId !== undefined;
    }
  }]);

  return Screen;
}(_react.Component);

exports.default = Screen;