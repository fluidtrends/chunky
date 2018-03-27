'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _responsive = require('../utils/responsive');

var _Toolbar = require('rmwc/Toolbar');

var _Button = require('rmwc/Button');

var _Icon = require('rmwc/Icon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navigation = function (_PureComponent) {
  _inherits(Navigation, _PureComponent);

  function Navigation(props) {
    _classCallCheck(this, Navigation);

    var _this = _possibleConstructorReturn(this, (Navigation.__proto__ || Object.getPrototypeOf(Navigation)).call(this, props));

    _this._onMenuOpen = _this.onMenuOpen.bind(_this);
    _this._onMenuItem = function (item) {
      return _this.onMenuItem.bind(_this, item);
    };
    return _this;
  }

  _createClass(Navigation, [{
    key: 'onMenuItem',
    value: function onMenuItem(item) {
      this.props.onMenuItem && this.props.onMenuItem(item);
    }
  }, {
    key: 'renderNavigationMenuItem',
    value: function renderNavigationMenuItem(item, index) {
      var MenuIcon = _react2.default.createElement(_Toolbar.ToolbarMenuIcon, { onClick: this._onMenuItem(item), use: item.icon, style: {
          color: this.props.theme.navigationTintColor,
          marginRight: '0px' } });
      var MenuButton = _react2.default.createElement(
        _Button.Button,
        { onClick: this._onMenuItem(item),
          style: {
            color: this.props.theme.navigationTintColor,
            marginRight: '0px' } },
        item.title
      );
      var MenuActionButton = _react2.default.createElement(
        _Button.Button,
        { raised: true, theme: 'secondary-bg text-primary-on-secondary',
          onClick: this._onMenuItem(item),
          style: {
            color: this.props.theme.navigationTintColor,
            marginRight: '0px' } },
        '' + item.title
      );
      return (0, _responsive.renderResponsive)('menuItem' + index++, _react2.default.createElement('div', null), item.alwaysShowIcon ? MenuIcon : item.action ? MenuActionButton : MenuButton);
    }
  }, {
    key: 'onMenuOpen',
    value: function onMenuOpen() {
      this.props.onMenuOpen && this.props.onMenuOpen();
    }
  }, {
    key: 'renderNavigationMenu',
    value: function renderNavigationMenu() {
      var _this2 = this;

      var index = 0;
      return this.props.menu.map(function (item) {
        return _this2.renderNavigationMenuItem(item, index++);
      });
    }
  }, {
    key: 'renderNavigationLogo',
    value: function renderNavigationLogo() {
      var image = this.props.navigationUncover ? this.props.theme.logoImage : this.props.theme.logoLightImage;
      var height = this.props.navigationUncover ? 64 : 64;

      return (0, _responsive.renderResponsive)('logo', _react2.default.createElement(_Toolbar.ToolbarMenuIcon, { use: 'menu', style: { color: this.props.theme.navigationTintColor }, onClick: this._onMenuOpen }), _react2.default.createElement('img', { src: (this.props.layout.root || '/') + 'assets/' + image, style: { height: height + 'px', marginLeft: '20px' } }));
    }
  }, {
    key: 'renderDefault',
    value: function renderDefault() {
      return _react2.default.createElement(
        _Toolbar.Toolbar,
        { waterfall: true, fixed: this.props.layout.fixed, style: {
            backgroundColor: this.props.theme.navigationColor } },
        _react2.default.createElement(
          _Toolbar.ToolbarRow,
          null,
          _react2.default.createElement(
            _Toolbar.ToolbarSection,
            { alignStart: true, style: {
                flex: 1,
                display: 'flex',
                justifyContent: 'left',
                flexDirection: 'row',
                alignItems: 'center'
              } },
            this.renderNavigationLogo()
          ),
          _react2.default.createElement(
            _Toolbar.ToolbarSection,
            { alignEnd: true, style: {
                flex: 4,
                display: 'flex',
                justifyContent: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center'
              } },
            this.renderNavigationMenu()
          )
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return this.renderDefault();
    }
  }]);

  return Navigation;
}(_react.PureComponent);

exports.default = Navigation;