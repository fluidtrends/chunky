"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactAddonsTransitionGroup = require("react-addons-transition-group");

var _reactAddonsTransitionGroup2 = _interopRequireDefault(_reactAddonsTransitionGroup);

var _reactChunky = require("react-chunky");

var _reactRouter = require("react-router");

var _Component = require("./Component");

var _Component2 = _interopRequireDefault(_Component);

var _components = require("../components");

var DefaultComponents = _interopRequireWildcard(_components);

var _deepmerge = require("deepmerge");

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _responsive = require("../utils/responsive");

var _Layout = require("./Layout");

var _Layout2 = _interopRequireDefault(_Layout);

var _urlParse = require("url-parse");

var _urlParse2 = _interopRequireDefault(_urlParse);

var _detectBrowser = require("detect-browser");

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
      progress: true,
      progressTitle: _this.progressTitle,
      height: 0,
      width: 0,
      scroll: 0
    });
    _this._updateScroll = _this.updateScroll.bind(_this);
    _this._updateWindowDimensions = _this.updateWindowDimensions.bind(_this);
    _this._onMenuItem = _this.onMenuItem.bind(_this);
    return _this;
  }

  _createClass(Screen, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _get(Screen.prototype.__proto__ || Object.getPrototypeOf(Screen.prototype), "componentDidMount", this).call(this);
      this._updateWindowDimensions();
      window.addEventListener("resize", this._updateWindowDimensions);
      window.addEventListener("scroll", this._updateScroll);
      this.unsubscribeFromHistory = this.props.history.listen(this.handleLocationChange.bind(this));
      this._onEvent = this.onEvent.bind(this);
      this._browser = (0, _detectBrowser.detect)();
      this._load(this.props);

      this.triggerAnalyticsView(this.props.location.pathname);
      var account = this.isLoggedIn ? this.account.email : "guest";

      this.triggerAnalyticsEvent({
        category: "" + this.constructor.name,
        action: "" + this.props.location.pathname,
        label: account
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.match.url !== nextProps.match.url) {
        // this.setState({ progress: true })
        this._load(nextProps);
        return;
      }
      _get(Screen.prototype.__proto__ || Object.getPrototypeOf(Screen.prototype), "componentWillReceiveProps", this).call(this, nextProps);
    }
  }, {
    key: "handleLocationChange",
    value: function handleLocationChange(location) {
      // this.setState({ progress: true })
      // this._load()
    }
  }, {
    key: "scrollToTop",
    value: function scrollToTop() {
      window.scrollTo(0, 0);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("resize", this._updateWindowDimensions);
      window.removeEventListener("scroll", this._updateScroll);
      this.unsubscribeFromHistory();
    }
  }, {
    key: "onMenuItem",
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
    key: "updateWindowDimensions",
    value: function updateWindowDimensions() {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
  }, {
    key: "updateScroll",
    value: function updateScroll() {
      var scroll = window.scrollY;
      this.setState({ scroll: scroll });
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
        return require("chunks/" + this.props.chunkName + "/data/" + name + ".json");
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
        if (_this2.props.variants.split("http://").length > 1 || _this2.props.variants.split("https://").length > 1) {
          fetch(_this2.props.variants).then(function (response) {
            return resolve(response.json());
          });
          return;
        }

        var data = _this2.importData(_this2.props.variants);

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
    value: function isSamePath(first, second) {
      return first === second || second === "/" + first || second === "/" + first + "/" || second === first + "/";
    }
  }, {
    key: "_updateVariants",
    value: function _updateVariants() {
      var _this3 = this;

      if (!this.hasVariants) {
        throw new Error("Missing expected variant");
      }

      var variantPath = this.path.substring(this.props.path.length + 1);

      this.variants.forEach(function (variant) {
        if (!_this3.isSamePath(variant.path, variantPath)) {
          return;
        }
        _this3._variant = Object.assign({}, variant);
      });

      if (!this.isVariantValid) {
        throw new Error("Invalid variant");
      }

      // We've got a valid variant now
      this.setState({ progress: false });
    }
  }, {
    key: "_load",
    value: function _load(props) {
      var _this4 = this;

      this.scrollToTop();
      this._path = props.location.pathname;

      if (this.props.skipRootVariant && this.expectsVariants && this.isRootPath) {
        this.setState({ progress: false, skip: true });
        return;
      }

      if (!this.expectsVariants || this.isRootPath) {
        this.setState({ progress: false });
        return;
      }

      try {
        if (!this.hasVariants) {
          this._loadVariants().then(function () {
            _this4._updateVariants();
          });
          return;
        }

        this._updateVariants();
      } catch (e) {
        // Could not load variant path data
        this.stopWithError(e);
      }
    }
  }, {
    key: "stopWithError",
    value: function stopWithError(e) {
      this.setState({ stopError: e, progress: false });
    }
  }, {
    key: "pushTransition",
    value: function pushTransition(transition, data) {
      var pathname = transition.data.path.charAt(0) === ":" ? data[transition.data.path.substring(1)] || transition.data.path : transition.data.path;

      this.setState({ redirect: { transition: transition, data: data, push: true, pathname: pathname } });
    }
  }, {
    key: "replaceTransition",
    value: function replaceTransition(transition, data) {
      var pathname = transition.data.path.charAt(0) === ":" ? data[transition.data.path.substring(1)] || transition.data.path : transition.data.path;

      this.setState({ redirect: { transition: transition, data: data, push: false, pathname: pathname } });
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
    key: "logout",
    value: function logout() {
      this.props.onUserLogout && this.props.onUserLogout();
    }
  }, {
    key: "loggedIn",
    value: function loggedIn(account) {
      this.props.onUserLoggedIn && this.props.onUserLoggedIn(account);
    }
  }, {
    key: "loadCustomComponent",
    value: function loadCustomComponent() {}
  }, {
    key: "loadSingleComponent",
    value: function loadSingleComponent(props) {
      var source = "" + props.source.charAt(0).toUpperCase() + props.source.toLowerCase().slice(1);
      var Component = DefaultComponents[source];

      if (!Component) {
        Component = this.loadCustomComponent();
      }

      if (!Component) {
        return _react2.default.createElement("div", null);
      }

      return _react2.default.createElement(Component, _extends({}, this.defaultComponentProps, props));
    }
  }, {
    key: "loadComponent",
    value: function loadComponent(name, index) {
      var _this5 = this;

      if (!this.props.components || !this.props.components[name] || !(_typeof(this.props.components[name]) === "object")) {
        return _react2.default.createElement("div", null);
      }

      if (!Array.isArray(this.props.components[name])) {
        return this.loadSingleComponent(Object.assign({}, this.props.components[name], { index: index }));
      }

      var subIndex = 0;
      return _react2.default.createElement(
        "div",
        null,
        this.props.components[name].map(function (props) {
          return _this5.loadSingleComponent(Object.assign({}, props, {
            key: "component." + subIndex++,
            index: index + "." + subIndex
          }));
        })
      );
    }
  }, {
    key: "renderComponent",
    value: function renderComponent(OriginalComponent, index) {
      var props = Object.assign({}, this.defaultComponentProps, { index: index });
      var ComponentContainer = _react2.default.cloneElement(OriginalComponent, Object.assign({}, this.defaultComponentProps, { index: index }));

      if (typeof OriginalComponent.type === "string") {
        return _react2.default.createElement(
          _Component2.default,
          _extends({}, props, { key: "" + index, style: { alignSelf: "stretch" } }),
          OriginalComponent
        );
      }

      if (typeof OriginalComponent === "string") {
        ComponentContainer = this.loadComponent(OriginalComponent, index);
      }

      return _react2.default.createElement(
        _reactAddonsTransitionGroup2.default,
        { key: "" + index, style: { alignSelf: "stretch" } },
        ComponentContainer
      );
    }
  }, {
    key: "renderComponents",
    value: function renderComponents() {
      var _this6 = this;

      if (!this.components() || this.components().length === 0) {
        return;
      }

      var index = 1;
      return this.components().map(function (component) {
        index = index + 1;
        return _this6.renderComponent(component, index);
      });
    }
  }, {
    key: "redirect",
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
    key: "triggerRedirect",
    value: function triggerRedirect(link) {
      if (this.isSamePath(this.path, link)) {
        return;
      }

      this.setState({ redirect: { push: true, pathname: link } });
    }
  }, {
    key: "triggerRawRedirect",
    value: function triggerRawRedirect(link) {
      window.open(link, "_blank");
    }
  }, {
    key: "renderScreenLayout",
    value: function renderScreenLayout() {
      var ScreenLayout = this.layout;
      return _react2.default.createElement(
        ScreenLayout,
        _extends({
          onMenuItem: this._onMenuItem,
          onEvent: this._onEvent,
          scroll: this.state.scroll,
          width: this.state.width,
          height: this.state.height
        }, this._props, {
          cache: this.props.cache,
          cover: this.cover
        }),
        this.renderComponents()
      );
    }
  }, {
    key: "saveAuth",
    value: function saveAuth(account) {
      var _this7 = this;

      return _reactChunky.Data.Cache.cacheAuth(account).then(function () {
        _this7.loggedIn(account);
      });
    }
  }, {
    key: "renderStopError",
    value: function renderStopError(e) {
      return _react2.default.createElement("div", null);
    }
  }, {
    key: "renderProgress",
    value: function renderProgress() {
      return _react2.default.createElement("div", null);
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.skip) {
        return _react2.default.createElement("div", null);
      }

      if (this.state.progress) {
        return this.renderProgress();
      }

      if (this.state.stopError) {
        return this.renderStopError(this.state.stopError);
      }

      if (this.state.height === 0) {
        return _react2.default.createElement("div", null);
      }

      if (this.state.redirect) {
        var _state$redirect = this.state.redirect,
            pathname = _state$redirect.pathname,
            push = _state$redirect.push;

        if (!this.isSamePath(this.path, pathname)) {
          return this.redirect(pathname, push);
        }
      }

      var height = this.height + "px";

      return _react2.default.createElement(
        "div",
        { style: { height: height, width: "100vw", position: "relative" } },
        this.renderScreenLayout(),
        _react2.default.createElement(
          "style",
          { jsx: true },
          "{\n        :global(body){\n            background-color: " + this.props.backgroundColor + ";\n            margin: 0;\n            padding: 0;\n        }"
        )
      );
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
      return this.menu;
    }
  }, {
    key: "isSmallScreen",
    get: function get() {
      return this.width < _responsive.breakpoints.main;
    }
  }, {
    key: "layout",
    get: function get() {
      return _Layout2.default;
    }
  }, {
    key: "expectsVariants",
    get: function get() {
      return this.props.variants !== undefined;
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
      return Object.assign({}, this.variant ? _deepmerge2.default.all([this.props, this.variant]) : this.props, { menu: this.menu, sideMenu: this.sideMenu });
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
      return this.state.width;
    }
  }, {
    key: "height",
    get: function get() {
      return this.state.height;
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

  return Screen;
}(_reactChunky.Core.Screen);

exports.default = Screen;