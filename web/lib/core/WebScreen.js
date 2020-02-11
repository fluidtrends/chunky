"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _TransitionGroup = _interopRequireDefault(require("react-transition-group/TransitionGroup"));

var _reactChunky = require("react-chunky");

var _reactRouter = require("react-router");

var _Component = _interopRequireDefault(require("./Component"));

var DefaultComponents = _interopRequireWildcard(require("../components"));

var _deepmerge = _interopRequireDefault(require("deepmerge"));

var _responsive = require("../utils/responsive");

var _Layout = _interopRequireDefault(require("./Layout"));

var _detectBrowser = require("detect-browser");

var _platform = _interopRequireDefault(require("platform"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var WebScreen =
/*#__PURE__*/
function (_Core$Screen) {
  _inherits(WebScreen, _Core$Screen);

  function WebScreen(props) {
    var _this;

    _classCallCheck(this, WebScreen);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WebScreen).call(this, props));
    _this.state = _objectSpread({}, _this.state, {
      loading: true,
      height: window.innerHeight,
      width: window.innerWidth,
      scroll: 0,
      unCoveredHeader: false
    });
    _this._updateScroll = _this.updateScroll.bind(_assertThisInitialized(_this));
    _this._updateWindowDimensions = _this.updateWindowDimensions.bind(_assertThisInitialized(_this));
    _this._onMenuItem = _this.onMenuItem.bind(_assertThisInitialized(_this));
    _this._sidebarMenuSelected = _this.sidebarMenuSelected.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(WebScreen, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _get(_getPrototypeOf(WebScreen.prototype), "componentDidMount", this).call(this);

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
        category: "".concat(this.constructor.name),
        action: "".concat(this.props.location.pathname),
        label: account
      });

      if (this.props["private"] && !this.isLoggedIn) {
        this.triggerRedirect(this.props.permissions.publicRedirect);
        return;
      }

      if (!this.props["private"] && this.isLoggedIn && this.props.guestOnly) {
        this.triggerRedirect(this.props.privateRedirect || this.props.permissions.privateRedirect);
      }

      this._load(this.props);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.match.url === prevProps.match.url) {
        return;
      }

      this._load(this.props);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this._updateWindowDimensions);
      window.removeEventListener('scroll', this._updateScroll);
      this.unsubscribeFromHistory();
    }
  }, {
    key: "handleLocationChange",
    value: function handleLocationChange(location) {}
  }, {
    key: "scrollToTop",
    value: function scrollToTop() {
      window.scrollTo && window.scrollTo(0, 0);
    }
  }, {
    key: "onMenuItem",
    value: function onMenuItem(item) {
      if (!item) {
        return;
      }

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
    key: "updateWindowDimensions",
    value: function updateWindowDimensions() {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
  }, {
    key: "updateScroll",
    value: function updateScroll() {
      var scroll = window.scrollY;
      if (this.props.theme.keepNavigatorSticky) return;

      if (scroll > 10 && !this.state.unCoveredHeader) {
        this.setState({
          scroll: scroll,
          unCoveredHeader: true
        });
      } else if (scroll < 10) {
        this.setState({
          scroll: scroll,
          unCoveredHeader: false
        });
      }
    }
  }, {
    key: "handleLocalEvent",
    value: function handleLocalEvent(fullPath) {
      this.triggerRedirect(fullPath);
    }
  }, {
    key: "handleExternalEvent",
    value: function handleExternalEvent(fullPath) {
      this.triggerRawRedirect(fullPath);
    }
  }, {
    key: "importData",
    value: function importData(name) {
      try {
        var parts = name.split('/');
        var chunkName = parts.length > 1 ? parts[0] : this.props.chunkName;
        var filename = parts.length > 1 ? parts[1] : name;

        if (this.props.desktop) {
          return require("../../../../chunks/".concat(chunkName, "/data/").concat(filename, ".json"));
        }

        return require("chunks/".concat(chunkName, "/data/").concat(filename, ".json"));
      } catch (e) {}
    }
  }, {
    key: "importRemoteData",
    value: function importRemoteData(url) {
      return fetch(url).then(function (response) {
        return response.json();
      });
    }
  }, {
    key: "_loadVariants",
    value: function _loadVariants() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        if (_this2.props.variants && "boolean" === typeof _this2.props.variants) {
          _this2._dynamicVariant = _this2.props.location.pathname.substring(_this2.props.path.length);
          _this2._dynamicVariant = _this2._dynamicVariant[0] === '/' ? _this2._dynamicVariant.substring(1) : _this2._dynamicVariant;
          _this2._variants = [{
            path: "".concat(_this2.props.path).concat(_this2.props.path === '/' ? '' : '/').concat(_this2.dynamicVariant)
          }];
          _this2._variant = _this2.variants[0];
          resolve([]);
          return;
        }

        if (!_this2.props.variants || Array.isArray(_this2.props.variants) && _this2.props.variants.length === 0) {
          resolve([]);
          return;
        }

        if (_this2.props.variants.split('http://').length > 1 || _this2.props.variants.split('https://').length > 1) {
          fetch(_this2.props.variants).then(function (response) {
            return resolve(response.json());
          });
          return;
        }

        if (_this2.props.variants.split('github://').length > 1) {
          fetch("https://raw.githubusercontent.com/".concat(_this2.props.variants.substring(9))).then(function (response) {
            return resolve(response.json());
          });
          return;
        }

        var data = _this2.importData("".concat(_this2.props.variants).concat(_this2.props.desktop ? '.desktop' : ''));

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
    key: "isSamePath",
    value: function isSamePath() {
      var first = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var second = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var firstClean = first.replace(/^\/|\/$/g, '');
      var secondClean = second.replace(/^\/|\/$/g, '');
      return firstClean === secondClean;
    }
  }, {
    key: "_updateVariants",
    value: function _updateVariants() {
      var _this3 = this;

      if (!this.hasVariants) {
        throw new Error('Missing expected variant');
      }

      if (this.variants.length === 0) {
        return;
      }

      var variantPath = this.path.substring(this.props.path.length + 1);
      this.variants.forEach(function (variant) {
        if (!_this3.isSamePath(variant.path, variantPath)) {
          return;
        }

        _this3._variant = Object.assign({}, variant);
      });

      if (!this.isVariantValid) {
        this._variant = Object.assign({}, this.variants[0]);
      }
    }
  }, {
    key: "_loadSections",
    value: function _loadSections() {
      if (!this.props.sections || this.props.sections.length === 0) {
        return;
      }

      this._sections = this.importData('sections');
      this._sideMenu = [].concat(this.menu);
    }
  }, {
    key: "_loadSection",
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
        if (!_this4.isSamePath(_this4.path, "".concat(s.path))) {
          return;
        }

        section = Object.assign({}, s);
      });
      return section;
    }
  }, {
    key: "_load",
    value: function _load(props) {
      var _this5 = this;

      this.scrollToTop();
      this._path = props.location.pathname;

      this._loadSections();

      var section = this._loadSection();

      if (this.props.skipRootVariant && this.expectsVariants && this.isRootPath) {
        this.setState({
          loading: false,
          skip: true,
          section: section
        });
        return;
      }

      if (!this.expectsVariants) {
        this.setState({
          loading: false,
          section: section
        });
        return;
      }

      try {
        if (!this.hasVariants) {
          this._loadVariants().then(function () {
            _this5._updateVariants();

            _this5.setState({
              loading: false,
              section: section
            });
          });

          return;
        }

        this._updateVariants();

        this.setState({
          loading: false,
          section: section
        });
      } catch (e) {
        // Could not load variant path data
        this.stopWithError(e);
      }
    }
  }, {
    key: "stopWithError",
    value: function stopWithError(e) {
      this.setState({
        stopError: e,
        loading: false
      });
    }
  }, {
    key: "pushTransition",
    value: function pushTransition(transition, data) {
      var pathname = transition.data.path.charAt(0) === ':' ? data[transition.data.path.substring(1)] || transition.data.path : transition.data.path;
      this.setState({
        redirect: {
          transition: transition,
          data: data,
          push: true,
          pathname: pathname
        }
      });
    }
  }, {
    key: "replaceTransition",
    value: function replaceTransition(transition, data) {
      var pathname = transition.data.path.charAt(0) === ':' ? data[transition.data.path.substring(1)] || transition.data.path : transition.data.path;
      this.setState({
        redirect: {
          transition: transition,
          data: data,
          push: false,
          pathname: pathname
        }
      });
    }
  }, {
    key: "components",
    value: function components() {
      if (this.props.components) {
        return Object.keys(this.props.components);
      }

      return [];
    }
  }, {
    key: "loadCustomComponent",
    value: function loadCustomComponent() {}
  }, {
    key: "loadSingleComponent",
    value: function loadSingleComponent(props) {
      var source = "".concat(props.source.charAt(0).toUpperCase()).concat(props.source.toLowerCase().slice(1));
      var Component = DefaultComponents[source];

      if (!Component) {
        Component = this.loadCustomComponent();
      }

      if (!Component) {
        return _react["default"].createElement("div", null);
      }

      return _react["default"].createElement(Component, _extends({}, this.defaultComponentProps, props));
    }
  }, {
    key: "loadComponent",
    value: function loadComponent(name, index) {
      var _this6 = this;

      if (!this.props.components || !this.props.components[name] || !(_typeof(this.props.components[name]) === 'object')) {
        return _react["default"].createElement("div", null);
      }

      if (!Array.isArray(this.props.components[name])) {
        return this.loadSingleComponent(Object.assign({}, this.props.components[name], {
          index: index
        }));
      }

      var subIndex = 0;
      return _react["default"].createElement("div", null, this.props.components[name].map(function (props) {
        return _this6.loadSingleComponent(Object.assign({}, props, {
          key: "component.".concat(subIndex++),
          index: "".concat(index, ".").concat(subIndex)
        }));
      }));
    }
  }, {
    key: "renderComponent",
    value: function renderComponent(OriginalComponent, index) {
      var props = Object.assign({}, this.defaultComponentProps, {
        index: index
      });

      var ComponentContainer = _react["default"].cloneElement(OriginalComponent, Object.assign({}, this.defaultComponentProps, {
        index: index
      }));

      if (typeof OriginalComponent.type === 'string') {
        return _react["default"].createElement(_Component["default"], _extends({}, props, {
          key: "".concat(index),
          style: {
            alignSelf: 'stretch'
          }
        }), OriginalComponent);
      }

      if (typeof OriginalComponent === 'string') {
        ComponentContainer = this.loadComponent(OriginalComponent, index);
      }

      return _react["default"].createElement(_TransitionGroup["default"], {
        key: "".concat(index),
        style: {
          alignSelf: 'stretch'
        }
      }, ComponentContainer);
    }
  }, {
    key: "renderComponents",
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
    key: "redirect",
    value: function redirect(pathname) {
      this.setState({
        redirect: false
      });
      return _react["default"].createElement(_reactRouter.Redirect, {
        exact: true,
        push: true,
        to: {
          pathname: pathname
        }
      });
    }
  }, {
    key: "triggerRedirect",
    value: function triggerRedirect(link) {
      if (this.isSamePath(this.path, link)) {
        return;
      }

      this.setState({
        redirect: {
          push: true,
          pathname: link
        }
      });
    }
  }, {
    key: "triggerRawRedirect",
    value: function triggerRawRedirect(link) {
      window.open(link, '_blank');
    }
  }, {
    key: "renderScreenLayout",
    value: function renderScreenLayout() {
      if (this.state.loading) {
        return this.renderLoading();
      }

      var ScreenLayout = this.layout;
      return _react["default"].createElement(ScreenLayout, _extends({
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
        "private": this.props["private"],
        cover: this.cover
      }), this.renderComponents());
    }
  }, {
    key: "renderLoading",
    value: function renderLoading() {
      return _react["default"].createElement("div", null);
    }
  }, {
    key: "sidebarMenuSelected",
    value: function sidebarMenuSelected(item) {
      if (!item) {
        return;
      }

      if (item.action && this[item.action]) {
        this[item.action]();
        return;
      }

      this.triggerRedirect("".concat(item.path));
    }
  }, {
    key: "saveAuth",
    value: function saveAuth(account) {
      var _this8 = this;

      return _reactChunky.Data.Cache.cacheAuth(account).then(function () {
        _this8.loggedIn(account);
      });
    }
  }, {
    key: "renderStopError",
    value: function renderStopError(e) {
      return _react["default"].createElement("div", null);
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.skip) {
        return _react["default"].createElement("div", null);
      }

      if (this.state.stopError) {
        return this.renderStopError(this.state.stopError);
      }

      if (this.state.height === 0) {
        return _react["default"].createElement("div", null);
      }

      if (this.state.redirect) {
        var _this$state$redirect = this.state.redirect,
            pathname = _this$state$redirect.pathname,
            push = _this$state$redirect.push;

        if (!this.isSamePath(this.path, pathname)) {
          return this.redirect(pathname, push);
        }
      }

      var height = "".concat(this.height, "px");
      return _react["default"].createElement("div", {
        style: {
          height: height,
          width: '100vw',
          position: 'relative'
        }
      }, this.renderScreenLayout());
    }
  }, {
    key: "platformType",
    get: function get() {
      if (this.isMobile) {
        return this.platformOS;
      }

      return this.isWindows ? "windows" : this.isMac ? "mac" : "linux";
    }
  }, {
    key: "platformOS",
    get: function get() {
      return _platform["default"].os.family.toLowerCase();
    }
  }, {
    key: "isMobile",
    get: function get() {
      return ["ios", "android"].includes(this.platformOS === 'ios' || this.platformOS);
    }
  }, {
    key: "isMac",
    get: function get() {
      return "darwin" === this.platformOS;
    }
  }, {
    key: "isWindows",
    get: function get() {
      return this.platformOS.includes("windows");
    }
  }, {
    key: "sidebarWidth",
    get: function get() {
      return 200;
    }
  }, {
    key: "sections",
    get: function get() {
      return this._sections;
    }
  }, {
    key: "restUrl",
    get: function get() {
      if (!this.props.provisioning || !this.props.provisioning.rest || !this.props.provisioning.rest.url || !this.props.env) {
        return;
      }

      return "".concat(this.props.provisioning.rest.url, "/").concat(this.props.env === 'production' ? '' : this.props.env + '-');
    }
  }, {
    key: "browser",
    get: function get() {
      return this._browser;
    }
  }, {
    key: "menu",
    get: function get() {
      return (this.props.menu || []).concat([]);
    }
  }, {
    key: "sideMenu",
    get: function get() {
      return this._sideMenu;
    }
  }, {
    key: "isSmallScreen",
    get: function get() {
      return this.width < _responsive.breakpoints.main;
    }
  }, {
    key: "layout",
    get: function get() {
      return _Layout["default"];
    }
  }, {
    key: "expectsVariants",
    get: function get() {
      return this.props.variants !== undefined;
    }
  }, {
    key: "dynamicVariant",
    get: function get() {
      return this._dynamicVariant;
    }
  }, {
    key: "variants",
    get: function get() {
      return this._variants;
    }
  }, {
    key: "hasVariants",
    get: function get() {
      return this._variants !== undefined;
    }
  }, {
    key: "isRootPath",
    get: function get() {
      return this.isSamePath(this.path, this.props.path);
    }
  }, {
    key: "isVariantValid",
    get: function get() {
      return this.expectsVariants && this.variant;
    }
  }, {
    key: "_props",
    get: function get() {
      return Object.assign({}, this.variant ? _deepmerge["default"].all([this.props, this.variant]) : this.props, {
        menu: this.menu,
        sideMenu: this.sideMenu,
        sidebarWidth: this.sidebarWidth
      });
    }
  }, {
    key: "variant",
    get: function get() {
      return this._variant;
    }
  }, {
    key: "account",
    get: function get() {
      return this.props.account;
    }
  }, {
    key: "isLoggedIn",
    get: function get() {
      return this.account;
    }
  }, {
    key: "width",
    get: function get() {
      return this.state.width || window.innerWidth;
    }
  }, {
    key: "height",
    get: function get() {
      return this.state.height || window.innerHeight;
    }
  }, {
    key: "scroll",
    get: function get() {
      return this.state.scroll;
    }
  }, {
    key: "path",
    get: function get() {
      return this._path;
    }
  }, {
    key: "defaultComponentProps",
    get: function get() {
      return Object.assign({}, {
        cache: this.cache,
        onEvent: this._onEvent,
        width: this.state.width,
        theme: this.props.theme,
        importRemoteData: this.importRemoteData,
        height: this.state.height,
        isSmallScreen: this.isSmallScreen,
        smallScreenBreakPoint: this.smallScreenBreakPoint
      }, this.props);
    }
  }, {
    key: "cover",
    get: function get() {
      return this._props.cover;
    }
  }]);

  return WebScreen;
}(_reactChunky.Core.Screen);

exports["default"] = WebScreen;