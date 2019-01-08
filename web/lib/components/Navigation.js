'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _responsive = require('../utils/responsive');

var _toolbar = require('@rmwc/toolbar');

var _button = require('@rmwc/button');

var _select = require('@rmwc/select');

var _reactChunky = require('react-chunky');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navigation = function (_PureComponent) {
  _inherits(Navigation, _PureComponent);

  function Navigation(props) {
    _classCallCheck(this, Navigation);

    var _this = _possibleConstructorReturn(this, (Navigation.__proto__ || Object.getPrototypeOf(Navigation)).call(this, props));

    _this.state = {
      selectedLanguage: 'en',
      strings: null
    };
    _this._onMenuOpen = _this.onMenuOpen.bind(_this);
    _this._onMenuItem = function (item) {
      return _this.onMenuItem.bind(_this, item);
    };
    _this._changeLanguage = function (language) {
      return _this.changeLanguage.bind(_this, language);
    };
    return _this;
  }

  _createClass(Navigation, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props$theme = this.props.theme,
          theme = _props$theme === undefined ? {} : _props$theme;
      var _theme$translatedStri = theme.translatedStrings,
          translatedStrings = _theme$translatedStri === undefined ? 'en' : _theme$translatedStri;


      _reactChunky.Data.Cache.retrieveCachedItem('selectedLanguage').then(function (lang) {
        _this2.setState({ selectedLanguage: lang });
      }).catch(function () {
        return;
      });
      fetch(translatedStrings).then(function (response) {
        return response.json();
      }).then(function (translatedTexts) {
        _this2.setState({ strings: translatedTexts['navigation'] });
      }).catch(function () {
        return '';
      });
    }
  }, {
    key: 'onMenuItem',
    value: function onMenuItem(item) {
      this.props.onMenuItem && this.props.onMenuItem(item);
    }
  }, {
    key: 'changeLanguage',
    value: function changeLanguage(language) {
      _reactChunky.Data.Cache.cacheItem('selectedLanguage', language).then(function () {
        window.location.reload();
      });
    }
  }, {
    key: 'renderNavigationMenuItem',
    value: function renderNavigationMenuItem(item, index) {
      var _this3 = this;

      var translatedTitle = this.props.theme.headerTranslation && this.state.strings && this.state.selectedLanguage ? this.state.strings[this.state.selectedLanguage]['title' + index] : item.title;

      var MenuIcon = _react2.default.createElement(_toolbar.ToolbarMenuIcon, {
        onClick: this._onMenuItem(item),
        use: item.icon,
        style: {
          color: this.props.theme.navigationTintColor,
          marginRight: '0px'
        }
      });
      var buttonAdditionalStyle = this.props.theme.navigationButtonStyle ? this.props.theme.navigationButtonStyle : {};
      var MenuButton = _react2.default.createElement(
        _button.Button,
        {
          onClick: this._onMenuItem(item),
          style: _extends({
            color: this.props.theme.navigationTintColor,
            textShadow: this.props.theme.textShadow,
            marginRight: '0px'
          }, buttonAdditionalStyle)
        },
        translatedTitle
      );
      var actionButtonAdditionalStyle = this.props.theme.navigationActionButtonStyle ? this.props.theme.navigationActionButtonStyle : {};
      var MenuActionButton = _react2.default.createElement(
        _button.Button,
        {
          raised: true,
          theme: 'secondary-bg text-primary-on-secondary',
          onClick: this._onMenuItem(item),
          style: _extends({
            color: this.props.theme.navigationTextButton,
            marginRight: '0px'
          }, actionButtonAdditionalStyle)
        },
        '' + translatedTitle
      );
      var languages = this.props.theme.languages;

      var dropdownAdditionalStyle = this.props.theme.dropdownStyle ? this.props.theme.dropdownStyle : {};

      var MenuDropdown = _react2.default.createElement(_select.Select, {
        label: item.title,
        options: languages,
        onChange: function onChange(evt) {
          return _this3.changeLanguage(evt.target.value);
        },
        value: this.state.selectedLanguage,
        style: _extends({
          color: this.props.theme.navigationTextButton
        }, dropdownAdditionalStyle)
      });
      return (0, _responsive.renderResponsive)('menuItem' + index++, _react2.default.createElement('div', null), item.alwaysShowIcon ? MenuIcon : item.action ? MenuActionButton : item.id === 'translation' ? MenuDropdown : MenuButton);
    }
  }, {
    key: 'onMenuOpen',
    value: function onMenuOpen() {
      this.props.onMenuOpen && this.props.onMenuOpen();
    }
  }, {
    key: 'renderNavigationMenu',
    value: function renderNavigationMenu() {
      var _this4 = this;

      var index = 0;
      return this.props.menu.map(function (item) {
        return _this4.renderNavigationMenuItem(item, index++);
      });
    }
  }, {
    key: 'renderNavigationLogo',
    value: function renderNavigationLogo() {
      var image = this.props.navigationUncover ? this.props.theme.logoImage : this.props.theme.logoLightImage;
      var height = this.props.navigationUncover ? 64 : 64;
      var responsiveBurger = this.props.theme && this.props.theme.logoOnMobile ? [_react2.default.createElement(_toolbar.ToolbarMenuIcon, {
        use: 'menu',
        style: { color: this.props.theme.navigationTintColor },
        onClick: this._onMenuOpen
      }), _react2.default.createElement('img', {
        src: (this.props.desktop ? '../../../../' : '/') + 'assets/' + image,
        onClick: this.props.menu[0].navigationLogo ? this._onMenuItem(this.props.menu[0]) : false,
        style: {
          height: height + 'px',
          position: 'absolute',
          top: 0,
          left: '70px'
        }
      })] : [_react2.default.createElement(_toolbar.ToolbarMenuIcon, {
        use: 'menu',
        style: { color: this.props.theme.navigationTintColor },
        onClick: this._onMenuOpen
      })];

      return (0, _responsive.renderResponsive)('logo', responsiveBurger, _react2.default.createElement('img', {
        src: (this.props.desktop ? '../../../../' : '/') + 'assets/' + image,
        onClick: this.props.menu[0].navigationLogo ? this._onMenuItem(this.props.menu[0]) : false,
        style: {
          height: height + 'px',
          marginLeft: '20px',
          cursor: this.props.menu[0].navigationLogo ? 'pointer' : 'initial'
        }
      }));
    }
  }, {
    key: 'renderDefault',
    value: function renderDefault() {
      var wrapperAdditionalStyle = this.props.theme.navigationWrapperStyle ? this.props.theme.navigationWrapperStyle : {};
      return _react2.default.createElement(
        _toolbar.Toolbar,
        {
          waterfall: true,
          fixed: this.props.layout.fixed,
          style: _extends({
            backgroundColor: this.props.theme.navigationColor,
            zIndex: 10
          }, wrapperAdditionalStyle)
        },
        _react2.default.createElement(
          _toolbar.ToolbarRow,
          null,
          _react2.default.createElement(
            _toolbar.ToolbarSection,
            {
              alignStart: true,
              style: {
                flex: 1,
                display: 'flex',
                justifyContent: 'left',
                flexDirection: 'row',
                alignItems: 'center'
              }
            },
            this.renderNavigationLogo()
          ),
          _react2.default.createElement(
            _toolbar.ToolbarSection,
            {
              alignEnd: true,
              style: {
                flex: 4,
                display: 'flex',
                justifyContent: 'flex-end',
                flexDirection: 'row',
                alignItems: 'center'
              }
            },
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