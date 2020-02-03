"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _responsive = require("../utils/responsive");

var _topAppBar = require("@rmwc/top-app-bar");

var _button = require("@rmwc/button");

var _select = require("@rmwc/select");

var _reactChunky = require("react-chunky");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Navigation =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Navigation, _PureComponent);

  function Navigation(props) {
    var _this;

    _classCallCheck(this, Navigation);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Navigation).call(this, props));
    _this.state = {
      selectedLanguage: 'en',
      strings: null
    };
    _this._onMenuOpen = _this.onMenuOpen.bind(_assertThisInitialized(_this));

    _this._onMenuItem = function (item) {
      return _this.onMenuItem.bind(_assertThisInitialized(_this), item);
    };

    _this._changeLanguage = function (language) {
      return _this.changeLanguage.bind(_assertThisInitialized(_this), language);
    };

    return _this;
  }

  _createClass(Navigation, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props$theme = this.props.theme,
          theme = _this$props$theme === void 0 ? {} : _this$props$theme;
      var _theme$translatedStri = theme.translatedStrings,
          translatedStrings = _theme$translatedStri === void 0 ? 'en' : _theme$translatedStri;

      _reactChunky.Data.Cache.retrieveCachedItem('selectedLanguage').then(function (lang) {
        _this2.setState({
          selectedLanguage: lang
        });
      })["catch"](function () {
        return;
      });

      fetch(translatedStrings).then(function (response) {
        return response.json();
      }).then(function (translatedTexts) {
        _this2.setState({
          strings: translatedTexts['navigation']
        });
      })["catch"](function () {
        return '';
      });
    }
  }, {
    key: "onMenuItem",
    value: function onMenuItem(item) {
      this.props.onMenuItem && this.props.onMenuItem(item);
    }
  }, {
    key: "changeLanguage",
    value: function changeLanguage(language) {
      _reactChunky.Data.Cache.cacheItem('selectedLanguage', language).then(function () {
        window.location.reload();
      });
    }
  }, {
    key: "renderNavigationMenuItem",
    value: function renderNavigationMenuItem(item, index) {
      var _this3 = this;

      var translatedTitle = this.props.theme.headerTranslation && this.state.strings && this.state.selectedLanguage ? this.state.strings[this.state.selectedLanguage]["title".concat(index)] : item.title;

      var MenuIcon = _react["default"].createElement(_topAppBar.TopAppBarActionItem, {
        key: index,
        onClick: this._onMenuItem(item),
        icon: item.icon,
        style: {
          color: this.props.theme.navigationTintColor,
          marginRight: '0px'
        }
      });

      var buttonAdditionalStyle = this.props.theme.navigationButtonStyle ? this.props.theme.navigationButtonStyle : {};

      var MenuButton = _react["default"].createElement(_button.Button, {
        onClick: this._onMenuItem(item),
        style: _objectSpread({
          color: this.props.theme.navigationTintColor,
          textShadow: this.props.theme.textShadow,
          marginRight: '0px'
        }, buttonAdditionalStyle)
      }, translatedTitle);

      var actionButtonAdditionalStyle = this.props.theme.navigationActionButtonStyle ? this.props.theme.navigationActionButtonStyle : {};

      var MenuActionButton = _react["default"].createElement(_button.Button, {
        raised: true,
        theme: ["secondaryBg", "textPrimaryOnSecondary"],
        onClick: this._onMenuItem(item),
        style: _objectSpread({
          color: this.props.theme.navigationTextButton,
          marginRight: '0px'
        }, actionButtonAdditionalStyle)
      }, "".concat(translatedTitle));

      var languages = this.props.theme.languages;
      var dropdownAdditionalStyle = this.props.theme.dropdownStyle ? this.props.theme.dropdownStyle : {};

      var MenuDropdown = _react["default"].createElement(_select.Select, {
        label: item.title,
        options: languages,
        onChange: function onChange(evt) {
          return _this3.changeLanguage(evt.target.value);
        },
        value: this.state.selectedLanguage,
        style: _objectSpread({
          color: this.props.theme.navigationTextButton
        }, dropdownAdditionalStyle)
      });

      return (0, _responsive.renderResponsive)("menuItem".concat(index++), _react["default"].createElement("div", {
        key: index
      }), item.alwaysShowIcon ? MenuIcon : item.action ? MenuActionButton : item.id === 'translation' ? MenuDropdown : MenuButton);
    }
  }, {
    key: "onMenuOpen",
    value: function onMenuOpen() {
      this.props.onMenuOpen && this.props.onMenuOpen();
    }
  }, {
    key: "renderNavigationMenu",
    value: function renderNavigationMenu() {
      var _this4 = this;

      var index = 0;
      return this.props.menu.map(function (item) {
        return _this4.renderNavigationMenuItem(item, index++);
      });
    }
  }, {
    key: "renderNavigationLogo",
    value: function renderNavigationLogo() {
      var image = this.props.navigationUncover ? this.props.theme.logoImage : this.props.theme.logoLightImage;
      var height = this.props.navigationUncover ? 64 : 64;
      var responsiveBurger = this.props.theme && this.props.theme.logoOnMobile ? [_react["default"].createElement(_topAppBar.TopAppBarActionItem, {
        key: "logo",
        icon: "menu",
        style: {
          color: this.props.theme.navigationTintColor
        },
        onClick: this._onMenuOpen
      }), _react["default"].createElement("img", {
        key: "logoImage",
        src: "".concat(this.props.desktop ? '../../../../' : '/', "assets/").concat(image),
        onClick: this.props.menu[0].navigationLogo ? this._onMenuItem(this.props.menu[0]) : function () {},
        style: {
          height: "".concat(height, "px"),
          position: 'absolute',
          top: 0,
          left: '70px'
        }
      })] : [_react["default"].createElement(_topAppBar.TopAppBarActionItem, {
        key: "menu",
        icon: "menu",
        style: {
          color: this.props.theme.navigationTintColor
        },
        onClick: this._onMenuOpen
      })];
      return (0, _responsive.renderResponsive)('logo', responsiveBurger, _react["default"].createElement("img", {
        src: "".concat(this.props.desktop ? '../../../../' : '/', "assets/").concat(image),
        onClick: this.props.menu[0].navigationLogo ? this._onMenuItem(this.props.menu[0]) : function () {},
        style: {
          height: "".concat(height, "px"),
          marginLeft: '20px',
          cursor: this.props.menu[0].navigationLogo ? 'pointer' : 'initial'
        }
      }));
    }
  }, {
    key: "renderDefault",
    value: function renderDefault() {
      var wrapperAdditionalStyle = this.props.theme.navigationWrapperStyle ? this.props.theme.navigationWrapperStyle : {};
      return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_topAppBar.TopAppBar, {
        fixed: this.props.layout.fixed,
        style: _objectSpread({
          backgroundColor: this.props.theme.navigationColor,
          zIndex: 10
        }, wrapperAdditionalStyle)
      }, _react["default"].createElement(_topAppBar.TopAppBarRow, null, _react["default"].createElement(_topAppBar.TopAppBarSection, null, this.renderNavigationLogo()), _react["default"].createElement(_topAppBar.TopAppBarSection, {
        style: {
          flex: 4,
          display: 'flex',
          justifyContent: 'flex-end',
          flexDirection: 'row',
          alignItems: 'center'
        }
      }, this.renderNavigationMenu()))), _react["default"].createElement(_topAppBar.TopAppBarFixedAdjust, null));
    }
  }, {
    key: "render",
    value: function render() {
      return this.renderDefault();
    }
  }]);

  return Navigation;
}(_react.PureComponent);

exports["default"] = Navigation;