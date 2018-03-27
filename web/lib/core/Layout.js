'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('styled-jsx/style');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _Cover = require('../components/Cover');

var _Cover2 = _interopRequireDefault(_Cover);

var _Drawer = require('../components/Drawer');

var _Drawer2 = _interopRequireDefault(_Drawer);

var _Footer = require('../components/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _Navigation = require('../components/Navigation');

var _Navigation2 = _interopRequireDefault(_Navigation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *
 */
var Layout = function (_PureComponent) {
  _inherits(Layout, _PureComponent);

  function Layout(props) {
    _classCallCheck(this, Layout);

    var _this = _possibleConstructorReturn(this, (Layout.__proto__ || Object.getPrototypeOf(Layout)).call(this, props));

    _this.state = { menuOpened: false, fixed: false };
    _this._onMenuItem = _this.onMenuItem.bind(_this);
    _this._onMenuOpen = _this.onMenuOpen.bind(_this);
    _this._onMenuClose = _this.onMenuClose.bind(_this);
    _this._onEvent = _this.onEvent.bind(_this);
    return _this;
  }

  _createClass(Layout, [{
    key: 'onMenuItem',
    value: function onMenuItem(item) {
      this.props.onMenuItem && this.props.onMenuItem(item);
    }
  }, {
    key: 'onEvent',
    value: function onEvent(event, data) {
      this.props.onEvent && this.props.onEvent(event, data);
    }
  }, {
    key: 'onMenuOpen',
    value: function onMenuOpen() {
      this.setState({ menuOpened: true });
    }
  }, {
    key: 'onMenuClose',
    value: function onMenuClose() {
      this.setState({ menuOpened: false });
    }
  }, {
    key: 'renderDrawer',
    value: function renderDrawer() {
      return _react2.default.createElement(_Drawer2.default, {
        index: -1,
        onClose: this._onMenuClose,
        open: this.state.menuOpened,
        onMenuItem: this._onMenuItem,
        onEvent: this._onEvent,
        menu: this.props.sideMenu
      });
    }
  }, {
    key: 'renderNavigation',
    value: function renderNavigation() {
      return _react2.default.createElement(_Navigation2.default, {
        index: 0,
        onMenuOpen: this._onMenuOpen,
        layout: this.props.layout,
        onMenuItem: this._onMenuItem,
        navigationUncover: this.navigationUncover,
        onEvent: this._onEvent,
        theme: this.theme,
        menu: this.props.menu
      });
    }
  }, {
    key: 'renderCover',
    value: function renderCover() {
      if (!this.hasCover) {
        return;
      }
      return _react2.default.createElement(_Cover2.default, _extends({
        index: 1
      }, this.props, this.props.cover, {
        id: 'cover',
        onEvent: this._onEvent,
        offset: this.coverOffset
      }));
    }
  }, {
    key: 'renderFooter',
    value: function renderFooter() {
      return _react2.default.createElement(_Footer2.default, _extends({
        index: 9999,
        id: 'footer'
      }, this.props, {
        onEvent: this._onEvent }));
    }
  }, {
    key: 'renderComponent',
    value: function renderComponent(component, index) {
      return _react2.default.createElement(
        'div',
        { key: 'component' + index, style: this.styles.component },
        component
      );
    }
  }, {
    key: 'renderComponents',
    value: function renderComponents() {
      var _this2 = this;

      var components = this.props.children || [];
      var index = 0;
      var marginTop = this.props.layout.fixed && !this.hasCover ? this.navigationHeight : 0;

      return _react2.default.createElement(
        'main',
        { style: {
            marginTop: marginTop + 'px'
          } },
        components.map(function (c) {
          return _this2.renderComponent(c, index++);
        })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { style: this.styles.container, ref: function ref(c) {
            _this3.container = c;
          }, className: _style2.default.dynamic([['3979917035', [this.props.theme.primaryColor, this.props.theme.secondaryColor]]]) + ' ' + (_style2.default.dynamic([['3979917035', [this.props.theme.primaryColor, this.props.theme.secondaryColor]]]) || '')
        },
        this.renderDrawer(),
        this.renderNavigation(),
        this.renderCover(),
        this.renderComponents(),
        this.renderFooter(),
        _react2.default.createElement(_style2.default, {
          styleId: '3979917035',
          css: ':root{--mdc-theme-primary:' + this.props.theme.primaryColor + ';--mdc-theme-secondary:' + this.props.theme.secondaryColor + ';}html{font-weight:300;font-family:Roboto Condensed,sans-serif;color:#ffffff;}pre{background-color:#F5F5F5;color:#455A64;text-align:left;padding:20px;width:90%;}.text{text-align:left;}a{text-decoration:none;}h1{font-weight:300;font-size:40px;text-align:center;}h2{font-weight:300;font-size:32px;text-align:center;}h3{font-weight:300;font-size:24px;text-align:left;}p{font-size:20px;text-align:left;}.animation-fadeIn-appear{opacity:0.01;}.animation-fadeIn-appear.animation-fadeIn-appear-active{opacity:1;-webkit-transition:opacity .5s ease-in;transition:opacity .5s ease-in;}',
          dynamic: [this.props.theme.primaryColor, this.props.theme.secondaryColor]
        })
      );
    }
  }, {
    key: 'styles',
    get: function get() {
      return styles;
    }
  }, {
    key: 'cover',
    get: function get() {
      return Object.assign({}, this.props.cover, {});
    }
  }, {
    key: 'hasCover',
    get: function get() {
      return this.props.cover !== undefined;
    }
  }, {
    key: 'navigationHeight',
    get: function get() {
      return this.isLargeScreen ? 64 : 56;
    }
  }, {
    key: 'coverOffset',
    get: function get() {
      if (this.hasCover && !this.cover.navigation && this.props.layout.fixed) {
        return this.navigationHeight;
      }

      if (this.hasCover && this.cover.navigation && !this.props.layout.fixed) {
        return -this.navigationHeight;
      }

      return 0;
    }
  }, {
    key: 'navigationUncover',
    get: function get() {
      if (this.hasCover && this.cover.navigation && !this.props.layout.fixed) {
        return true;
      }

      return this.hasCover && this.cover.navigation && this.props.scroll < 10;
    }
  }, {
    key: 'theme',
    get: function get() {
      var navigationColor = this.navigationUncover ? 'rgba(0,0,0,0)' : this.props.theme.navigationColor;
      var navigationTintColor = this.navigationUncover ? '#FFFFFF' : this.props.theme.navigationTintColor;

      return Object.assign({}, this.props.theme, {
        navigationColor: navigationColor, navigationTintColor: navigationTintColor
      });
    }
  }]);

  return Layout;
}(_react.PureComponent);

exports.default = Layout;


var styles = {
  container: {},
  component: {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    color: '#455A64'
  }
};