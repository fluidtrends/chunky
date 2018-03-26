'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

var _reactChunky = require('react-chunky');

var _Router = require('./Router');

var _reactRouter = require('react-router');

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _Cache = require('./Cache');

var _Cache2 = _interopRequireDefault(_Cache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_PureComponent) {
  _inherits(App, _PureComponent);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = { loading: true };
    _this._menu = [];
    _this._cache = new _Cache2.default();
    _this._userLogout = _this.userLogout.bind(_this);
    _this._userLoggedIn = _this.userLoggedIn.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.checkAuth();
    }
  }, {
    key: 'checkAuth',
    value: function checkAuth() {
      var _this2 = this;

      _reactChunky.Data.Cache.retrieveAuth().then(function (account) {
        _this2._resolve(account);
      }).catch(function (e) {
        _this2._resolve();
      });
    }
  }, {
    key: 'userLoggedIn',
    value: function userLoggedIn() {
      this.checkAuth();
    }
  }, {
    key: 'userLogout',
    value: function userLogout() {
      var _this3 = this;

      _reactChunky.Data.Cache.clearAuth().then(function (account) {
        _this3._resolve();
      });
    }
  }, {
    key: '_resolveTransitionFromURI',
    value: function _resolveTransitionFromURI(uri) {
      var url = new _urlParse2.default(uri, true);
      return {
        name: 'show' + url.hostname.charAt(0).toUpperCase() + url.hostname.substring(1).toLowerCase(),
        type: url.protocol.slice(0, -1).toLowerCase(),
        route: url.hostname
      };
    }
  }, {
    key: '_createSectionNavigatorRoutes',
    value: function _createSectionNavigatorRoutes(element, section) {
      var _this4 = this;

      // We want to look at a stack element and figure out its parent chunk;
      var _element$split = element.split('/'),
          _element$split2 = _slicedToArray(_element$split, 2),
          chunkName = _element$split2[0],
          chunkFlavorName = _element$split2[1];

      // This is our chunk, if it actually exists


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
      }

      // These routes will be the ones we want to parse out of the chunk, as necessary
      var routes = [];

      var rootRoute = {};

      // Let's build up global transitions, if any
      var globalTransitions = {};

      if (this.props.transitions) {
        this.props.transitions.forEach(function (transitionUri) {
          // Let's resolve global transitions
          var transition = _this4._resolveTransitionFromURI(transitionUri);
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

        if (Object.keys(rootRoute).length === 0) {
          route.root = true;
          route.menuTitle = route.title;
          rootRoute = Object.assign({}, route);

          // Construct a menu
          if (!route.skipMenu) {
            var link = '' + (this.menu.length === 0 ? '/' : route.path);
            this._menu.push({
              id: '' + this.menu.length,
              icon: route.icon.replace('-', '_'),
              title: route.menuTitle,
              alwaysShowIcon: route.alwaysShowIcon,
              action: route.action,
              path: link
            });
            if (route.extendedMenu) {
              this._menu = this._menu.concat(route.extendedMenu);
            }
          }
        } else {
          route.icon = rootRoute.icon;
          route.menuTitle = rootRoute.menuTitle;
        }

        // Let's build up the transitions, if any
        var transitions = {};

        if (chunk.transitions) {
          chunk.transitions.forEach(function (transitionUri) {
            // Parse this transition's URI
            var transition = _this4._resolveTransitionFromURI(transitionUri);
            var routeData = chunk.routes[transition.route];
            if (transition.route && routeData) {
              // This is a local transition, so let's resolve locally
              transition.data = Object.assign({}, routeData);
              transition.route = section.name + '/' + chunkName + '/' + transition.route;
              transitions[transition.name] = transition;
              return;
            }

            if (globalTransitions[transition.name]) {
              // Let's look through the global transitions, if any
              transitions[transition.name] = Object.assign({}, globalTransitions[transition.name]);
            }
          });
        }

        // Let's pass over the theme as well
        var theme = this.props.theme;

        // For each route, we want to compose its properties
        var screenProps = Object.assign({
          // Defaults
          cache: this.cache,
          strings: {},
          account: section.account,
          analytics: this.props.analytics,
          onUserLogout: this._userLogout,
          onUserLoggedIn: this._userLoggedIn,
          info: this.props.info,
          startOperationsOnMount: true
        }, _extends({ theme: theme, transitions: transitions }, route, { chunkName: chunkName, menu: this.menu }), this.props.web);

        // Resolve strings
        var resolvedStrings = {};
        for (var string in screenProps.strings) {
          resolvedStrings[string] = this.props.strings[screenProps.strings[string]] || '??' + screenProps.strings[string] + '??';
        }
        screenProps.strings = Object.assign({}, this.props.strings, resolvedStrings);

        var screenPath = route.path || '/' + routeName;
        var screenId = chunkName + '/' + routeName;

        var ScreenRoute = this._makeScreenRoute(screenPath, screenId, route, screenProps);
        routes.push(ScreenRoute);

        if (route.variants) {
          var ScreenVariantRoute = this._makeScreenRoute(screenPath + '/:variant', screenId, route, screenProps);
          routes.push(ScreenVariantRoute);
        }
      }

      // We've got ourselves some routes so we should be done with this
      return routes;
    }
  }, {
    key: '_makeScreenRoute',
    value: function _makeScreenRoute(screenPath, screenId, route, screenProps) {
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
        return skip ? _react2.default.createElement('div', null) : _react2.default.createElement(RouteScreen, _extends({}, props, screenProps));
      };

      return _react2.default.createElement(_reactRouterDom.Route, {
        exact: true,
        refresh: true,
        key: '' + screenId + screenPath,
        path: screenPath,
        render: Screen });
    }
  }, {
    key: '_createSectionNavigator',
    value: function _createSectionNavigator(section) {
      return (0, _Router.createSectionRoutes)(section, this._createSectionNavigatorRoutes.bind(this));
    }
  }, {
    key: '_resolve',
    value: function _resolve(account) {
      this._routes = [];
      this._sections = [];
      this._menu = [];

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

      this.setState({ loading: false, account: account || undefined, authstamp: '' + Date.now() });
    }
  }, {
    key: 'renderStatic',
    value: function renderStatic() {
      return _react2.default.createElement(
        _reactRouterDom.StaticRouter,
        { location: this.props.route.location, context: this.props.route },
        _react2.default.createElement(
          'div',
          null,
          this.routes
        )
      );
    }
  }, {
    key: 'renderRoutes',
    value: function renderRoutes() {
      return this.routes;
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.route && !this.props.redirect) {
        return this.renderStatic();
      }

      if (!this.routes || this.routes.length === 0) {
        return _react2.default.createElement('div', null);
      }

      return _react2.default.createElement(
        _reactRouterDom.BrowserRouter,
        null,
        _react2.default.createElement(
          'div',
          null,
          this.renderRoutes()
        )
      );
    }
  }, {
    key: 'cache',
    get: function get() {
      return this._cache;
    }
  }, {
    key: 'menu',
    get: function get() {
      return this._menu || {};
    }
  }, {
    key: 'routes',
    get: function get() {
      return this._routes || [];
    }
  }, {
    key: 'sections',
    get: function get() {
      return this._sections || [];
    }
  }]);

  return App;
}(_react.PureComponent);

exports.default = App;