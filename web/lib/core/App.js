"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var _reactRouterDom = require("react-router-dom");

var _urlParse = _interopRequireDefault(require("url-parse"));

var _reactChunky = require("react-chunky");

var _Router = require("./Router");

var _Cache = _interopRequireDefault(require("./Cache"));

var _ = _interopRequireDefault(require("../components/404"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var App =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(App, _PureComponent);

  function App(props) {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));
    _this.state = {
      loading: true
    };
    _this._menu = [];
    _this._sidebar = [];
    _this._cache = new _Cache["default"](props);
    _this._userLogout = _this.userLogout.bind(_assertThisInitialized(_this));
    _this._userLoggedIn = _this.userLoggedIn.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.checkAuth();
    }
  }, {
    key: "checkAuth",
    value: function checkAuth() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _reactChunky.Data.Cache.retrieveAuth().then(function (account) {
          _this2._resolve(account);

          resolve();
        })["catch"](function (e) {
          _this2._resolve();

          resolve();
        });
      });
    }
  }, {
    key: "userLoggedIn",
    value: function userLoggedIn(account) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var user = firebase.auth().currentUser;
        var combined = Object.assign({}, {
          uid: user.uid,
          emailVerified: user.emailVerified
        }, account);
        return _reactChunky.Data.Cache.cacheAuth({
          user: combined
        }).then(function () {
          return resolve(combined);
        });
      }).then(function () {
        return _this3.checkAuth();
      });
    }
  }, {
    key: "userLogout",
    value: function userLogout() {
      var _this4 = this;

      _reactChunky.Data.Cache.clearAuth().then(function () {
        _this4._resolve();

        firebase && firebase.auth().signOut();
      });
    }
  }, {
    key: "_resolveTransitionFromURI",
    value: function _resolveTransitionFromURI(uri) {
      var url = new _urlParse["default"](uri, true);
      return {
        name: "show".concat(url.hostname.charAt(0).toUpperCase()).concat(url.hostname.substring(1).toLowerCase()),
        type: url.protocol.slice(0, -1).toLowerCase(),
        route: url.hostname
      };
    }
  }, {
    key: "_createSectionNavigatorRoutes",
    value: function _createSectionNavigatorRoutes(element, section) {
      var _this5 = this;

      // We want to look at a stack element and figure out its parent chunk;
      // Note that chunks may also have flavours so this looks for the flavor, if any
      var _element$split = element.split('/'),
          _element$split2 = _slicedToArray(_element$split, 2),
          chunkName = _element$split2[0],
          chunkFlavorName = _element$split2[1]; // This is our chunk, if it actually exists


      var chunk = this.props.chunks[chunkName];

      if (!chunk) {
        // Let's verify that it actually points to a real chunk
        return;
      }

      if (chunkFlavorName && (!chunk.flavors || !chunk.flavors[chunkFlavorName])) {
        // Great, let's check the flavor now
        return;
      }

      if (!chunk.routes || chunk.routes.length === 0) {
        // One last thing, let's also make sure the chunk has routes
        return;
      } // These routes will be the ones we want to parse out of the chunk, as necessary


      var routes = [];
      var rootRoute = {}; // Let's build up global transitions, if any

      var globalTransitions = {};

      if (this.props.transitions) {
        this.props.transitions.forEach(function (transitionUri) {
          // Let's resolve global transitions
          var transition = _this5._resolveTransitionFromURI(transitionUri);

          globalTransitions[transition.name] = transition;
        });
      }

      for (var routeName in chunk.routes) {
        // Great, this chunk has routes, let's look through all of them
        var route = chunk.routes[routeName];

        if (!route.screen) {
          // This route has no screens
          continue;
        }

        if (route["private"] !== section["private"]) {
          continue;
        }

        var screenId = "".concat(chunkName, "/").concat(routeName);
        var screenPath = route.path || "/".concat(routeName);
        var routeKey = "".concat(screenId).concat(screenPath);
        var routeMenuTitle = this.props.desktop && route.desktopTitle ? route.desktopTitle : route.title;

        if (section["private"] && route["private"]) {
          route.sidebarIndex = this.sidebar.length;

          this._sidebar.push({
            routeKey: routeKey,
            id: "".concat(this.sidebar.length),
            icon: route.icon,
            title: routeMenuTitle,
            alwaysShowIcon: route.alwaysShowIcon,
            action: route.action,
            path: route.path
          });
        }

        if (Object.keys(rootRoute).length === 0) {
          route.root = true;
          route.menuTitle = routeMenuTitle;
          rootRoute = Object.assign({}, route); // Construct a menu

          if (!route.skipMenu && !route["private"] && !section["private"]) {
            var link = "".concat(this.menu.length === 0 ? '/' : route.path);

            this._menu.push({
              id: "".concat(this.menu.length),
              routeKey: routeKey,
              icon: route.icon.replace('-', '_'),
              title: route.menuTitle,
              alwaysShowIcon: route.alwaysShowIcon,
              navigationLogo: route.navigationLogo,
              action: route.action,
              path: link
            });

            if (route.extendedMenu && !(route.skipExtendedMenuOnDesktop && this.props.desktop)) {
              this._menu = this._menu.concat(route.extendedMenu);
            }
          }
        } else {} // route.icon = rootRoute.icon
        // route.menuTitle = rootRoute.menuTitle
        // Let's build up the transitions, if any


        var transitions = {};

        if (chunk.transitions) {
          chunk.transitions.forEach(function (transitionUri) {
            // Parse this transition's URI
            var transition = _this5._resolveTransitionFromURI(transitionUri);

            var routeData = chunk.routes[transition.route];

            if (transition.route && routeData) {
              // This is a local transition, so let's resolve locally
              transition.data = Object.assign({}, routeData);
              transition.route = "".concat(section.name, "/").concat(chunkName, "/").concat(transition.route);
              transitions[transition.name] = transition;
              return;
            }

            if (globalTransitions[transition.name]) {
              // Let's look through the global transitions, if any
              transitions[transition.name] = Object.assign({}, globalTransitions[transition.name]);
            }
          });
        } // Let's pass over the theme as well


        var theme = this.props.theme; // For each route, we want to compose its properties

        var screenProps = Object.assign({
          // Defaults
          cache: this.cache,
          strings: {},
          desktop: this.props.desktop,
          account: section.account,
          env: this.props.env,
          provisioning: this.props.provisioning,
          analytics: this.props.analytics,
          onUserLogout: this._userLogout,
          onUserLoggedIn: this._userLoggedIn,
          info: this.props.info,
          session: this.props.session,
          startOperationsOnMount: true
        }, _objectSpread({
          theme: theme,
          transitions: transitions
        }, route, {
          chunkName: chunkName,
          menu: this.menu,
          sidebar: this.sidebar,
          "private": route["private"],
          sidebarIndex: route.sidebarIndex
        }), this.props.web); // Resolve strings

        var resolvedStrings = {};

        for (var string in screenProps.strings) {
          resolvedStrings[string] = this.props.strings[screenProps.strings[string]] || "??".concat(screenProps.strings[string], "??");
        }

        screenProps.strings = Object.assign({}, this.props.strings, resolvedStrings);

        var ScreenRoute = this._makeScreenRoute(screenPath, screenId, route, screenProps);

        routes.push(ScreenRoute);

        if (route.variants) {
          var ScreenVariantRoute = this._makeScreenRoute("".concat(screenPath).concat(screenPath === '/' ? '' : '/', ":variant"), screenId, route, screenProps);

          routes.push(ScreenVariantRoute);
        }
      } // We've got ourselves some routes so we should be done with this


      return routes;
    }
  }, {
    key: "_makeScreenRoute",
    value: function _makeScreenRoute(screenPath, screenId, route, screenProps) {
      var _this6 = this;

      var RouteScreen = route.screen;

      var Screen = function Screen(props) {
        var skip = false;

        if (route.skipPaths) {
          route.skipPaths.forEach(function (r) {
            if (r === props.location.pathname.split('/')[1]) {
              skip = true;
            }
          });
        }

        var allProps = Object.assign({}, props, screenProps, {
          session: _this6.props.session
        });
        return skip ? _react["default"].createElement("div", null) : _react["default"].createElement(RouteScreen, allProps);
      };

      var routeKey = "".concat(screenId).concat(screenPath);
      return _react["default"].createElement(_reactRouterDom.Route, {
        exact: true,
        refresh: true,
        key: routeKey,
        path: screenPath,
        render: Screen
      });
    }
  }, {
    key: "_createSectionNavigator",
    value: function _createSectionNavigator(section) {
      return (0, _Router.createSectionRoutes)(section, this._createSectionNavigatorRoutes.bind(this));
    }
  }, {
    key: "_refreshRoutes",
    value: function _refreshRoutes(account) {
      this._routes = [];
      this._sections = [];
      this._menu = [];
      this._sidebar = [];

      for (var sectionName in this.props.sections) {
        // Look through all the app's sections and for each, build defaults if necessary
        var section = this.props.sections[sectionName];
        section.name = sectionName;
        section.account = account;
        section.layout = section.layout || 'default';
        section.navigator = this._createSectionNavigator(section);

        this._sections.push(section);

        this._routes = this._routes.concat(section.navigator.routes);
      }
    }
  }, {
    key: "_resolve",
    value: function _resolve(account) {
      this._refreshRoutes(account);

      this.setState({
        loading: false,
        account: account || undefined,
        authstamp: "".concat(Date.now())
      });
    }
  }, {
    key: "renderStatic",
    value: function renderStatic() {
      return _react["default"].createElement(_reactRouterDom.StaticRouter, {
        location: this.props.route.location,
        context: this.props.route
      }, _react["default"].createElement("div", null, this.routes));
    }
  }, {
    key: "renderRoutes",
    value: function renderRoutes() {
      var dynamicRoutes = this.routes.filter(function (r) {
        return r && r.key.split("/").includes(":variant");
      });
      var staticRoutes = this.routes.filter(function (r) {
        return r && !r.key.split("/").includes(":variant");
      });
      return staticRoutes.concat(dynamicRoutes);
    }
  }, {
    key: "renderRouting",
    value: function renderRouting() {
      var _this7 = this;

      return _react["default"].createElement(_reactRouterDom.BrowserRouter, null, _react["default"].createElement(_reactRouter.Switch, {
        style: {}
      }, this.renderRoutes(), this.props.theme && this.props.theme.notFoundPageText && _react["default"].createElement(_reactRouterDom.Route, {
        component: function component() {
          return _react["default"].createElement(_["default"], _this7.props.theme);
        }
      })));
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props.route && !this.props.redirect) {
        return this.renderStatic();
      }

      if (!this.routes || this.routes.length === 0) {
        return _react["default"].createElement("div", null);
      }

      if (this.props.autoRefresh) {
        this._refreshRoutes(this.state.account);
      }

      if (this.props.desktop) {
        return _react["default"].createElement(_reactRouterDom.HashRouter, null, _react["default"].createElement(_reactRouter.Switch, null, this.renderRoutes()));
      }

      return this.renderRouting();
    }
  }, {
    key: "cache",
    get: function get() {
      return this._cache;
    }
  }, {
    key: "menu",
    get: function get() {
      return this._menu || {};
    }
  }, {
    key: "routes",
    get: function get() {
      return this._routes || [];
    }
  }, {
    key: "sidebar",
    get: function get() {
      return this._sidebar || [];
    }
  }, {
    key: "sections",
    get: function get() {
      return this._sections || [];
    }
  }]);

  return App;
}(_react.PureComponent);

exports["default"] = App;