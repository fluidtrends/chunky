"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Cover = _interopRequireDefault(require("../components/Cover"));

var _Drawer = _interopRequireDefault(require("../components/Drawer"));

var _Footer = _interopRequireDefault(require("../components/Footer"));

var _Navigation = _interopRequireDefault(require("../components/Navigation"));

var _antd = require("antd");

var _Styles = _interopRequireDefault(require("./Styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Header = _antd.Layout.Header,
    Content = _antd.Layout.Content,
    Sider = _antd.Layout.Sider,
    Footer = _antd.Layout.Footer;
/**
 *
 */

var DefaultLayout =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DefaultLayout, _PureComponent);

  function DefaultLayout(props) {
    var _this;

    _classCallCheck(this, DefaultLayout);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DefaultLayout).call(this, props));
    _this.state = {
      menuOpened: false,
      fixed: false
    };
    _this._onMenuItem = _this.onMenuItem.bind(_assertThisInitialized(_this));
    _this._onMenuOpen = _this.onMenuOpen.bind(_assertThisInitialized(_this));
    _this._onMenuClose = _this.onMenuClose.bind(_assertThisInitialized(_this));
    _this._onEvent = _this.onEvent.bind(_assertThisInitialized(_this));
    _this._sidebarMenuSelected = _this.sidebarMenuSelected.bind(_assertThisInitialized(_this));
    _this._styles = (0, _Styles["default"])(_this.props.theme);
    return _this;
  }

  _createClass(DefaultLayout, [{
    key: "onMenuItem",
    value: function onMenuItem(item) {
      this.props.onMenuItem && this.props.onMenuItem(item);
    }
  }, {
    key: "onEvent",
    value: function onEvent(event, data) {
      this.props.onEvent && this.props.onEvent(event, data);
    }
  }, {
    key: "onMenuOpen",
    value: function onMenuOpen() {
      this.setState({
        menuOpened: true
      });
    }
  }, {
    key: "onMenuClose",
    value: function onMenuClose() {
      this.setState({
        menuOpened: false
      });
    }
  }, {
    key: "renderDrawer",
    value: function renderDrawer() {
      if (this.props.desktop) {
        return _react["default"].createElement("div", null);
      }

      return _react["default"].createElement(_Drawer["default"], {
        index: -1,
        onClose: this._onMenuClose,
        open: this.state.menuOpened,
        onMenuItem: this._onMenuItem,
        onEvent: this._onEvent,
        theme: this.theme,
        menu: this.props.sideMenu
      });
    }
  }, {
    key: "renderNavigation",
    value: function renderNavigation() {
      if (this.props.desktop) {
        return _react["default"].createElement("div", null);
      }

      return _react["default"].createElement(_Navigation["default"], {
        index: 0,
        onMenuOpen: this._onMenuOpen,
        layout: this.props.layout,
        onMenuItem: this._onMenuItem,
        navigationUncover: this.navigationUncover,
        onEvent: this._onEvent,
        theme: this.theme,
        desktop: this.props.desktop,
        menu: this.props.menu
      });
    }
  }, {
    key: "renderCover",
    value: function renderCover() {
      if (!this.hasCover || this.props.desktop) {
        return _react["default"].createElement("div", null);
      }

      return _react["default"].createElement(_Cover["default"], _extends({
        index: 1,
        color: "#ffffff"
      }, this.props, this.props.cover, {
        id: "cover",
        onEvent: this._onEvent,
        offset: this.coverOffset
      }));
    }
  }, {
    key: "renderFooter",
    value: function renderFooter() {
      if (this.props.desktop) {
        return _react["default"].createElement("div", null);
      }

      if (this.props.noFooter) {
        return _react["default"].createElement("div", null);
      }

      return _react["default"].createElement(_Footer["default"], _extends({
        index: 9999,
        id: "footer"
      }, this.props, {
        onEvent: this._onEvent
      }));
    }
  }, {
    key: "renderComponent",
    value: function renderComponent(component, index) {
      return _react["default"].createElement("div", {
        key: "component".concat(index),
        style: this.styles.main.component
      }, component);
    }
  }, {
    key: "renderPrimary",
    value: function renderPrimary() {
      if (this.props.sidebar && this.props["private"] && !this.props.isSmallScreen) {
        return this.renderWithSidebar();
      }

      return this.renderWithoutSidebar();
    }
  }, {
    key: "sidebarMenuSelected",
    value: function sidebarMenuSelected(selection) {
      var item = this.props.sidebar[selection.key];
      this.props.onSidebarMenuSelected && this.props.onSidebarMenuSelected(item);
    }
  }, {
    key: "renderSidebarItem",
    value: function renderSidebarItem(item) {
      return _react["default"].createElement(_antd.Menu.Item, {
        key: item.id
      }, _react["default"].createElement(_antd.Icon, {
        type: item.icon
      }), _react["default"].createElement("span", {
        className: "nav-text"
      }, " ", item.title));
    }
  }, {
    key: "renderWithSidebar",
    value: function renderWithSidebar() {
      var _this2 = this;

      var collapseSidebar = this.props.desktop ? false : this.props.isSmallScreen;
      var width = this.props.sidebarWidth;
      return _react["default"].createElement(_antd.Layout, null, _react["default"].createElement(Sider, {
        collapsible: false,
        defaultCollapsed: false,
        width: width,
        collapsed: collapseSidebar
      }, _react["default"].createElement(_antd.Menu, {
        theme: "light",
        mode: "inline",
        onClick: this._sidebarMenuSelected,
        defaultSelectedKeys: ["".concat(this.sidebarIndex)],
        style: {
          backgroundColor: '#FAFAFA',
          minHeight: '100%',
          color: '#90A4AE'
        }
      }, this.props.sidebar.map(function (item) {
        return _this2.renderSidebarItem(item);
      }))), _react["default"].createElement(_antd.Layout, {
        style: {
          backgroundColor: '#ffffff'
        }
      }, _react["default"].createElement(Content, {
        style: {
          minHeight: '100vh',
          backgroundColor: "".concat(this.props.layoutBackground || '#ffffff'),
          alignItems: 'top',
          width: '100%',
          marginLeft: "".concat(this.props.isSmallScreen ? '0px' : '0px'),
          justifyContent: 'center',
          flex: 1,
          display: 'flex'
        }
      }, this.renderComponents())));
    }
  }, {
    key: "renderWithoutSidebar",
    value: function renderWithoutSidebar() {
      return _react["default"].createElement(_antd.Layout, null, _react["default"].createElement(Content, {
        style: {
          margin: '0'
        }
      }, _react["default"].createElement("div", {
        style: {
          padding: 0,
          background: '#ffffff',
          minHeight: 360
        }
      }, this.renderComponents())), this.renderFooter());
    }
  }, {
    key: "renderComponents",
    value: function renderComponents() {
      var _this3 = this;

      var components = this.props.children || [];
      var index = 0;
      var marginTop;

      if (this.props.forceNavigation) {
        marginTop = 0;
      } else {
        marginTop = this.props.layout.fixed && !this.hasCover ? this.navigationHeight : 0;
      }

      if (this.props.desktop) {
        marginTop = 0;
      }

      return _react["default"].createElement("main", {
        style: {
          marginTop: "".concat(marginTop, "px")
        }
      }, components.map(function (c) {
        return _this3.renderComponent(c, index++);
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return _react["default"].createElement("div", null, this.renderDrawer(), _react["default"].createElement("div", {
        style: this.styles.main.container,
        ref: function ref(c) {
          _this4.container = c;
        }
      }, this.renderNavigation(), this.renderCover(), this.renderPrimary()), _react["default"].createElement("style", {
        jsx: true,
        global: true
      }, "\n        :root {\n          --mdc-theme-primary: red;\n          --mdc-theme-secondary: ".concat(this.theme.secondaryColor, ";\n        }     \n        h1 { font-size: ").concat(this.theme.titleTextSize, "px; }\n        h2 { font-size: ").concat(this.theme.subtitleTextSize, "px; }\n        h3 { font-size: ").concat(this.theme.summaryTextSize, "px; }\n        p { font-size: ").concat(this.theme.paragraphTextSize, "px; }      \n      ")));
    }
  }, {
    key: "styles",
    get: function get() {
      return this._styles;
    }
  }, {
    key: "cover",
    get: function get() {
      return Object.assign({}, this.props.cover, {});
    }
  }, {
    key: "hasCover",
    get: function get() {
      return this.props.cover !== undefined;
    }
  }, {
    key: "navigationHeight",
    get: function get() {
      return 64;
    }
  }, {
    key: "coverOffset",
    get: function get() {
      if (this.hasCover && !this.cover.navigation && this.props.layout.fixed) {
        return this.navigationHeight;
      }

      return -this.navigationHeight;
    }
  }, {
    key: "navigationUncover",
    get: function get() {
      if (this.hasCover && this.cover.navigation && !this.props.layout.fixed) {
        return true;
      }

      if (!this.hasCover && this.props.forceNavigation) {
        return this.props.scroll < 10;
      }

      return this.hasCover && this.cover.navigation && this.props.scroll < 10;
    }
  }, {
    key: "theme",
    get: function get() {
      var navigationColor = this.navigationUncover || this.props.forceNavigation && this.hasCover ? "rgba(0,0,0,0)" : this.props.theme.navigationColor;
      navigationColor = this.props.theme.stickyNavigation ? this.props.theme.navigationColor : navigationColor;
      var navigationTintColor = this.navigationUncover || this.props.forceNavigation && this.hasCover ? '#FFFFFF' : this.props.theme.navigationTintColor;
      return Object.assign({}, this.props.theme, {
        navigationColor: navigationColor,
        navigationTintColor: navigationTintColor
      });
    }
  }, {
    key: "sidebarIndex",
    get: function get() {
      if (!this.props.sidebar || this.props.sidebar.length === 0) {
        return 0;
      }

      return this.props.sidebarIndex;
    }
  }]);

  return DefaultLayout;
}(_react.PureComponent);

exports["default"] = DefaultLayout;