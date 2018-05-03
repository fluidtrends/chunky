'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _style = require('styled-jsx/style');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TransitionGroup = require('react-transition-group/TransitionGroup');

var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);

var _reactChunky = require('react-chunky');

var _reactRouter = require('react-router');

var _Component = require('./Component');

var _Component2 = _interopRequireDefault(_Component);

var _components = require('../components');

var DefaultComponents = _interopRequireWildcard(_components);

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _responsive = require('../utils/responsive');

var _Layout = require('./Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _detectBrowser = require('detect-browser');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Screen = function (_Core$Screen) {
  _inherits(Screen, _Core$Screen);

  function Screen(props) {
    _classCallCheck(this, Screen);

    var _this = _possibleConstructorReturn(this, (Screen.__proto__ || Object.getPrototypeOf(Screen)).call(this, props));

    _this.state = _extends({}, _this.state, {
      loading: true,
      height: 0,
      width: 0,
      scroll: 0
    });

    _this._updateScroll = _this.updateScroll.bind(_this);
    _this._updateWindowDimensions = _this.updateWindowDimensions.bind(_this);
    _this._onMenuItem = _this.onMenuItem.bind(_this);
    _this._sidebarMenuSelected = _this.sidebarMenuSelected.bind(_this);
    return _this;
  }

  _createClass(Screen, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(Screen.prototype.__proto__ || Object.getPrototypeOf(Screen.prototype), 'componentDidMount', this).call(this);
      this._updateWindowDimensions();
      this._sideMenu = [].concat(this.menu);

      window.addEventListener('resize', this._updateWindowDimensions);
      window.addEventListener('scroll', this._updateScroll);
      this.unsubscribeFromHistory = this.props.history.listen(this.handleLocationChange.bind(this));
      this._onEvent = this.onEvent.bind(this);
      this._browser = (0, _detectBrowser.detect)();

      this.triggerAnalyticsView(this.props.location.pathname);
      var account = this.isLoggedIn ? 'member' : 'guest';

      this.triggerAnalyticsEvent({
        category: '' + this.constructor.name,
        action: '' + this.props.location.pathname,
        label: account
      });

      if (this.props.restrict && !this.isLoggedIn) {
        this.triggerRedirect(this.props.restrict);
        return;
      }

      this._load(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.match.url !== nextProps.match.url) {
        this._load(nextProps);
        return;
      }
      _get(Screen.prototype.__proto__ || Object.getPrototypeOf(Screen.prototype), 'componentWillReceiveProps', this).call(this, nextProps);
    }
  }, {
    key: 'handleLocationChange',
    value: function handleLocationChange(location) {}
  }, {
    key: 'scrollToTop',
    value: function scrollToTop() {
      window.scrollTo(0, 0);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this._updateWindowDimensions);
      window.removeEventListener('scroll', this._updateScroll);
      this.unsubscribeFromHistory();
    }
  }, {
    key: 'onMenuItem',
    value: function onMenuItem(item) {
      if (item.action && this[item.action]) {
        this[item.action](item);
        return;
      }

      if (item.link) {
        this.triggerRawRedirect(item.link);
        return;
      }

      if (item.path) {
        this.triggerRedirect(item.path);
      }
    }
  }, {
    key: 'updateWindowDimensions',
    value: function updateWindowDimensions() {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
  }, {
    key: 'updateScroll',
    value: function updateScroll() {
      var scroll = window.scrollY;
      this.setState({ scroll: scroll });
    }
  }, {
    key: 'handleLocalEvent',
    value: function handleLocalEvent(fullPath) {
      this.triggerRedirect(fullPath);
    }
  }, {
    key: 'handleExternalEvent',
    value: function handleExternalEvent(fullPath) {
      this.triggerRawRedirect(fullPath);
    }
  }, {
    key: 'importData',
    value: function importData(name) {
      try {
        var parts = name.split('/');
        var chunkName = parts.length > 1 ? parts[0] : this.props.chunkName;
        var filename = parts.length > 1 ? parts[1] : name;

        if (this.props.desktop) {
          return require('../../../../chunks/' + chunkName + '/data/' + filename + '.json');
        }
        return require('chunks/' + chunkName + '/data/' + filename + '.json');
      } catch (e) {}
    }
  }, {
    key: 'importRemoteData',
    value: function importRemoteData(url) {
      return fetch(url).then(function (response) {
        return response.json();
      });
    }
  }, {
    key: '_loadVariants',
    value: function _loadVariants() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        if (_this2.props.variants.split('http://').length > 1 || _this2.props.variants.split('https://').length > 1) {
          fetch(_this2.props.variants).then(function (response) {
            return resolve(response.json());
          });
          return;
        }

        var data = _this2.importData('' + _this2.props.variants + (_this2.props.desktop ? '.desktop' : ''));

        if (!data || !Array.isArray(data) || data.length === 0) {
          resolve([]);
          return;
        }

        resolve(data);
      }).then(function (data) {
        _this2._variants = [].concat(data);
        return _this2.variants;
      });
    }
  }, {
    key: 'isSamePath',
    value: function isSamePath(first, second) {
      var firstClean = first.replace(/^\/|\/$/g, '');
      var secondClean = second.replace(/^\/|\/$/g, '');
      return firstClean === secondClean;
    }
  }, {
    key: '_updateVariants',
    value: function _updateVariants() {
      var _this3 = this;

      if (!this.hasVariants) {
        throw new Error('Missing expected variant');
      }

      var variantPath = this.path.substring(this.props.path.length + 1);

      this.variants.forEach(function (variant) {
        if (!_this3.isSamePath(variant.path, variantPath)) {
          return;
        }
        _this3._variant = Object.assign({}, variant);
      });

      if (!this.isVariantValid) {
        throw new Error('Invalid variant');
      }
    }
  }, {
    key: '_loadSections',
    value: function _loadSections() {
      if (!this.props.sections || this.props.sections.length === 0) {
        return;
      }

      this._sections = this.importData('sections');
      this._sideMenu = [].concat(this.menu);
    }
  }, {
    key: '_loadSection',
    value: function _loadSection() {
      var _this4 = this;

      if (!this.sections || this.sections.length === 0) {
        return;
      }

      var section = this.sections[0];

      if (this.isRootPath) {
        return section;
      }

      this.sections.forEach(function (s) {
        if (!_this4.isSamePath(_this4.path, '' + s.path)) {
          return;
        }
        section = Object.assign({}, s);
      });

      return section;
    }
  }, {
    key: '_load',
    value: function _load(props) {
      var _this5 = this;

      this.scrollToTop();
      this._path = props.location.pathname;

      this._loadSections();
      var section = this._loadSection();

      if (this.props.skipRootVariant && this.expectsVariants && this.isRootPath) {
        this.setState({ loading: false, skip: true, section: section });
        return;
      }

      if (!this.expectsVariants || this.isRootPath) {
        this.setState({ loading: false, section: section });
        return;
      }

      try {
        if (!this.hasVariants) {
          this._loadVariants().then(function () {
            _this5._updateVariants();
            _this5.setState({ loading: false, section: section });
          });
          return;
        }

        this._updateVariants();
        this.setState({ loading: false, section: section });
      } catch (e) {
        // Could not load variant path data
        this.stopWithError(e);
      }
    }
  }, {
    key: 'stopWithError',
    value: function stopWithError(e) {
      this.setState({ stopError: e, loading: false });
    }
  }, {
    key: 'pushTransition',
    value: function pushTransition(transition, data) {
      var pathname = transition.data.path.charAt(0) === ':' ? data[transition.data.path.substring(1)] || transition.data.path : transition.data.path;

      this.setState({ redirect: { transition: transition, data: data, push: true, pathname: pathname } });
    }
  }, {
    key: 'replaceTransition',
    value: function replaceTransition(transition, data) {
      var pathname = transition.data.path.charAt(0) === ':' ? data[transition.data.path.substring(1)] || transition.data.path : transition.data.path;

      this.setState({ redirect: { transition: transition, data: data, push: false, pathname: pathname } });
    }
  }, {
    key: 'components',
    value: function components() {
      if (this.props.components) {
        return Object.keys(this.props.components);
      }
      return [];
    }
  }, {
    key: 'logout',
    value: function logout() {
      this.props.onUserLogout && this.props.onUserLogout();
    }
  }, {
    key: 'loggedIn',
    value: function loggedIn(account) {
      this.props.onUserLoggedIn && this.props.onUserLoggedIn(account);
    }
  }, {
    key: 'loadCustomComponent',
    value: function loadCustomComponent() {}
  }, {
    key: 'loadSingleComponent',
    value: function loadSingleComponent(props) {
      var source = '' + props.source.charAt(0).toUpperCase() + props.source.toLowerCase().slice(1);
      var Component = DefaultComponents[source];

      if (!Component) {
        Component = this.loadCustomComponent();
      }

      if (!Component) {
        return _react2.default.createElement('div', null);
      }

      return _react2.default.createElement(Component, _extends({}, this.defaultComponentProps, props));
    }
  }, {
    key: 'loadComponent',
    value: function loadComponent(name, index) {
      var _this6 = this;

      if (!this.props.components || !this.props.components[name] || !(_typeof(this.props.components[name]) === 'object')) {
        return _react2.default.createElement('div', null);
      }

      if (!Array.isArray(this.props.components[name])) {
        return this.loadSingleComponent(Object.assign({}, this.props.components[name], { index: index }));
      }

      var subIndex = 0;
      return _react2.default.createElement(
        'div',
        null,
        this.props.components[name].map(function (props) {
          return _this6.loadSingleComponent(Object.assign({}, props, {
            key: 'component.' + subIndex++,
            index: index + '.' + subIndex
          }));
        })
      );
    }
  }, {
    key: 'renderComponent',
    value: function renderComponent(OriginalComponent, index) {
      var props = Object.assign({}, this.defaultComponentProps, { index: index });
      var ComponentContainer = _react2.default.cloneElement(OriginalComponent, Object.assign({}, this.defaultComponentProps, { index: index }));

      if (typeof OriginalComponent.type === 'string') {
        return _react2.default.createElement(
          _Component2.default,
          _extends({}, props, { key: '' + index, style: { alignSelf: 'stretch' } }),
          OriginalComponent
        );
      }

      if (typeof OriginalComponent === 'string') {
        ComponentContainer = this.loadComponent(OriginalComponent, index);
      }

      return _react2.default.createElement(
        _TransitionGroup2.default,
        { key: '' + index, style: { alignSelf: 'stretch' } },
        ComponentContainer
      );
    }
  }, {
    key: 'renderComponents',
    value: function renderComponents() {
      var _this7 = this;

      if (!this.components() || this.components().length === 0) {
        return;
      }

      var index = 1;
      return this.components().map(function (component) {
        index = index + 1;
        return _this7.renderComponent(component, index);
      });
    }
  }, {
    key: 'redirect',
    value: function redirect(pathname) {
      return _react2.default.createElement(_reactRouter.Redirect, {
        exact: true,
        push: true,
        to: {
          pathname: pathname
        }
      });
    }
  }, {
    key: 'triggerRedirect',
    value: function triggerRedirect(link) {
      if (this.isSamePath(this.path, link)) {
        return;
      }

      this.setState({ redirect: { push: true, pathname: link } });
    }
  }, {
    key: 'triggerRawRedirect',
    value: function triggerRawRedirect(link) {
      window.open(link, '_blank');
    }
  }, {
    key: 'renderScreenLayout',
    value: function renderScreenLayout() {
      var ScreenLayout = this.layout;
      return _react2.default.createElement(
        ScreenLayout,
        _extends({
          section: this.state.section,
          onMenuItem: this._onMenuItem,
          onEvent: this._onEvent,
          scroll: this.state.scroll,
          width: this.state.width,
          height: this.state.height,
          onSidebarMenuSelected: this._sidebarMenuSelected,
          isSmallScreen: this.isSmallScreen
        }, this._props, {
          cache: this.props.cache,
          sidebar: this.props.sidebar,
          sidebarIndex: this.props.sidebarIndex,
          'private': this.props.private,
          cover: this.cover }),
        this.renderComponents()
      );
    }
  }, {
    key: 'sidebarMenuSelected',
    value: function sidebarMenuSelected(item) {
      if (item.action && this[item.action]) {
        this[item.action]();
        return;
      }

      this.triggerRedirect('' + item.path);
    }
  }, {
    key: 'saveAuth',
    value: function saveAuth(account) {
      var _this8 = this;

      return _reactChunky.Data.Cache.cacheAuth(account).then(function () {
        _this8.loggedIn(account);
      });
    }
  }, {
    key: 'renderStopError',
    value: function renderStopError(e) {
      return _react2.default.createElement('div', null);
    }
  }, {
    key: 'renderLoading',
    value: function renderLoading() {
      return _react2.default.createElement(
        'div',
        { style: {} },
        _react2.default.createElement(DefaultComponents.Loading, { message: this.state.loadingMessage || 'Loading, just a sec please ...' })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.skip) {
        return _react2.default.createElement('div', null);
      }

      if (this.state.stopError) {
        return this.renderStopError(this.state.stopError);
      }

      if (this.state.height === 0) {
        return _react2.default.createElement('div', null);
      }

      if (this.state.redirect) {
        var _state$redirect = this.state.redirect,
            pathname = _state$redirect.pathname,
            push = _state$redirect.push;

        if (!this.isSamePath(this.path, pathname)) {
          return this.redirect(pathname, push);
        }
      }

      var height = this.height + 'px';

      return _react2.default.createElement(
        'div',
        { style: { height: height, width: '100vw', position: 'relative' }, className: _style2.default.dynamic([['3734241191', [this.props.backgroundColor]]]) + ' ' + (_style2.default.dynamic([['3734241191', [this.props.backgroundColor]]]) || '')
        },
        this.renderScreenLayout(),
        _react2.default.createElement(_style2.default, {
          styleId: '3734241191',
          css: 'body{background-color:' + this.props.backgroundColor + ';margin:0;padding:0;}',
          dynamic: [this.props.backgroundColor]
        })
      );
    }
  }, {
    key: 'sections',
    get: function get() {
      return this._sections;
    }
  }, {
    key: 'browser',
    get: function get() {
      return this._browser;
    }
  }, {
    key: 'menu',
    get: function get() {
      return (this.props.menu || []).concat([]);
    }
  }, {
    key: 'sideMenu',
    get: function get() {
      return this._sideMenu;
    }
  }, {
    key: 'isSmallScreen',
    get: function get() {
      return this.width < _responsive.breakpoints.main;
    }
  }, {
    key: 'layout',
    get: function get() {
      return _Layout2.default;
    }
  }, {
    key: 'expectsVariants',
    get: function get() {
      return this.props.variants !== undefined;
    }
  }, {
    key: 'variants',
    get: function get() {
      return this._variants;
    }
  }, {
    key: 'hasVariants',
    get: function get() {
      return this._variants !== undefined;
    }
  }, {
    key: 'isRootPath',
    get: function get() {
      return this.isSamePath(this.path, this.props.path);
    }
  }, {
    key: 'isVariantValid',
    get: function get() {
      return this.expectsVariants && this.variant;
    }
  }, {
    key: '_props',
    get: function get() {
      return Object.assign({}, this.variant ? _deepmerge2.default.all([this.props, this.variant]) : this.props, { menu: this.menu, sideMenu: this.sideMenu });
    }
  }, {
    key: 'variant',
    get: function get() {
      return this._variant;
    }
  }, {
    key: 'account',
    get: function get() {
      return this.props.account;
    }
  }, {
    key: 'isLoggedIn',
    get: function get() {
      return this.account;
    }
  }, {
    key: 'width',
    get: function get() {
      return this.state.width;
    }
  }, {
    key: 'height',
    get: function get() {
      return this.state.height;
    }
  }, {
    key: 'scroll',
    get: function get() {
      return this.state.scroll;
    }
  }, {
    key: 'path',
    get: function get() {
      return this._path;
    }
  }, {
    key: 'defaultComponentProps',
    get: function get() {
      return Object.assign({}, {
        cache: this.cache,
        onEvent: this._onEvent,
        width: this.state.width,
        importRemoteData: this.importRemoteData,
        height: this.state.height,
        isSmallScreen: this.isSmallScreen,
        smallScreenBreakPoint: this.smallScreenBreakPoint
      }, this.props);
    }
  }, {
    key: 'cover',
    get: function get() {
      return this._props.cover;
    }
  }]);

  return Screen;
}(_reactChunky.Core.Screen);

exports.default = Screen;