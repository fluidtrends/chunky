"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _drawer = require("@rmwc/drawer");

var _list = require("@rmwc/list");

var _select = require("@rmwc/select");

var _reactChunky = require("react-chunky");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 *  This is the Chunky Web Navigation Drawer that is usually used with a navigator
 *  to control opening and closing the drawer.
 *
 *  @see https://github.com/react-chunky/react-dom-chunky
 *
 *  @example
 *  // Render a closed drawer with the default style and one menu item
 *  <Drawer
 *    menu={[{title: "Home"}]}
 *    onClose={this._onDrawerClose}/>
 *  @example
 *  // Render an open drawer with three menu items and a light gray header
 *  <Drawer
 *    menu={[{title: "Home"}, {title: "About"}, {title: "Contact"}]}
 *    open={true}
 *    style={{headerStyle: '#eeeeee'}}
 *    onClose={this._onDrawerClose}/>
 */
var DrawerComponent =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DrawerComponent, _PureComponent);

  /**
   *  An instance of this class represents a Navigation Drawer element that
   *  is meant to be displayed as an overlay on top of the visible window. The drawer
   *  takes a list of menu items as input and displays them using a default
   *  style can be overwritten. It can also be closed and opened.
   *  @summary The Drawer element to be used in a navigation menu
   *  @author I. Dan Calinescu <http://github.com/idancali>
   *  @param {Object} props Drawer properties
   *  @param {Array<Object>} props.menu a list of menu items to display
   *  @param {String} props.menu.title the title of a menu item
   *  @param {String} props.headerStyle the Drawer header style
   *  @param {boolean} props.open whether the Drawer is open or closed
   *  @param {function} props.onClose called when the Drawer is closed
   */
  function DrawerComponent(props) {
    var _this;

    _classCallCheck(this, DrawerComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DrawerComponent).call(this, props));
    _this.state = {
      selectedLanguage: 'en',
      strings: null
    };
    /** Will be called when the drawer is closed **/

    _this._onClosePressed = _this._onClose.bind(_assertThisInitialized(_this));

    _this._onMenuItem = function (item) {
      return _this.onMenuItem.bind(_assertThisInitialized(_this), item);
    };

    _this._changeLanguage = function (language) {
      return _this.changeLanguage.bind(_assertThisInitialized(_this), language);
    };

    return _this;
  }

  _createClass(DrawerComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props$theme = this.props.theme,
          theme = _this$props$theme === void 0 ? {} : _this$props$theme;

      _reactChunky.Data.Cache.retrieveCachedItem('selectedLanguage').then(function (lang) {
        _this2.setState({
          selectedLanguage: lang
        });
      })["catch"](function (e) {
        return;
      });

      fetch(theme.translatedStrings || 'en').then(function (response) {
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
    key: "changeLanguage",
    value: function changeLanguage(language) {
      _reactChunky.Data.Cache.cacheItem('selectedLanguage', language).then(function () {
        window.location.reload();
      });
    }
    /**
     *  Renders this drawer
     */

  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement(_drawer.Drawer, {
        modal: true,
        open: this._open,
        onClose: this._onClosePressed
      }, _react["default"].createElement(_drawer.DrawerHeader, {
        style: this._headerStyle
      }, this.props.theme ? _react["default"].createElement("img", {
        src: "assets/".concat(this.props.theme.logoLightImage),
        style: {
          width: '120px',
          marginTop: 10
        }
      }) : _react["default"].createElement("div", null)), _react["default"].createElement(_drawer.DrawerContent, null, this.renderMenu()));
    }
    /**
     *  Whether the drawer is meant to be displayed as open or closed
     *
     *  @returns {boolean} whether the drawer is open or closed, false by default
     */

  }, {
    key: "_onClose",

    /**
     *  Called when the drawer is asked by the user to close
     */
    value: function _onClose() {
      this.props.onClose && this.props.onClose();
    }
  }, {
    key: "onMenuItem",
    value: function onMenuItem(item) {
      this.props.onMenuItem && this.props.onMenuItem(item);
    }
    /**
     *  Renders a list o menu items, as
     *
     *  @returns {Array<ListItem>} a list of {ListItem}
     */

  }, {
    key: "renderMenu",
    value: function renderMenu() {
      var _this3 = this;

      var index = 0;
      var _this$props$theme2 = this.props.theme,
          theme = _this$props$theme2 === void 0 ? {} : _this$props$theme2;
      var languages = theme.languages;
      return this._menu.map(function (item) {
        var translatedTitle = theme.headerTranslation && _this3.state.strings && _this3.state.selectedLanguage ? _this3.state.strings[_this3.state.selectedLanguage]["title".concat(index)] : item.title;
        return _react["default"].createElement(_list.ListItem, {
          onClick: _this3._onMenuItem(item),
          key: "menuItem".concat(index++)
        }, item.id === 'translation' ? _react["default"].createElement(_select.Select, {
          label: item.title,
          options: languages,
          onChange: function onChange(evt) {
            return _this3.changeLanguage(evt.target.value);
          },
          value: _this3.state.selectedLanguage,
          style: {
            color: theme.navigationTextButton
          }
        }) : _react["default"].createElement(_list.ListItemPrimaryText, null, translatedTitle));
      });
    }
  }, {
    key: "_open",
    get: function get() {
      return this.props.open || false;
    }
    /**
     *  Uses the given style or a default one if one wasn't passed through the properties.
     *  Override this if you want to completely take over the header style.
     */

  }, {
    key: "_headerStyle",
    get: function get() {
      return this.props.headerStyle || styles.header;
    }
    /**
     *  The list of menu items
     *
     *  @returns {Array<Object>} a list of passed menu objects, or an empty list
     **/

  }, {
    key: "_menu",
    get: function get() {
      return this.props.menu || [];
    }
  }]);

  return DrawerComponent;
}(_react.PureComponent);
/**
 * Default styles
 */


exports["default"] = DrawerComponent;
var styles = {
  header: {
    backgroundColor: '#eeeeee'
  }
};