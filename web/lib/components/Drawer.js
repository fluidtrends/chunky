'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _drawer = require('@rmwc/drawer');

var _list = require('@rmwc/list');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
var DrawerComponent = function (_PureComponent) {
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
    _classCallCheck(this, DrawerComponent);

    /** Will be called when the drawer is closed **/
    var _this = _possibleConstructorReturn(this, (DrawerComponent.__proto__ || Object.getPrototypeOf(DrawerComponent)).call(this, props));

    _this._onClosePressed = _this._onClose.bind(_this);

    _this._onMenuItem = function (item) {
      return _this.onMenuItem.bind(_this, item);
    };
    return _this;
  }

  _createClass(DrawerComponent, [{
    key: 'renderDrawerMenu',
    value: function renderDrawerMenu() {
      var index = 0;
      return this.props.menu.map(function (item) {
        return _react2.default.createElement(
          _list.ListItem,
          { key: 'menuItem' + index++ },
          _react2.default.createElement(
            ListItemText,
            null,
            item.title
          )
        );
      });
    }

    /**
     *  Renders this drawer
     */

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _drawer.Drawer,
        {
          modal: true,
          open: this._open,
          onClose: this._onClosePressed },
        _react2.default.createElement(_drawer.DrawerHeader, { style: this._headerStyle }),
        _react2.default.createElement(
          _drawer.DrawerContent,
          null,
          this.renderMenu()
        )
      );
    }

    /**
     *  Whether the drawer is meant to be displayed as open or closed
     *
     *  @returns {boolean} whether the drawer is open or closed, false by default
     */

  }, {
    key: '_onClose',


    /**
     *  Called when the drawer is asked by the user to close
     */
    value: function _onClose() {
      this.props.onClose && this.props.onClose();
    }
  }, {
    key: 'onMenuItem',
    value: function onMenuItem(item) {
      this.props.onMenuItem && this.props.onMenuItem(item);
    }

    /**
     *  Renders a list o menu items, as
     *
     *  @returns {Array<ListItem>} a list of {ListItem}
     */

  }, {
    key: 'renderMenu',
    value: function renderMenu() {
      var _this2 = this;

      var index = 0;
      return this._menu.map(function (item) {
        return _react2.default.createElement(
          _list.ListItem,
          {
            onClick: _this2._onMenuItem(item),
            key: 'menuItem' + index++ },
          _react2.default.createElement(
            _list.ListItemPrimaryText,
            null,
            item.title
          )
        );
      });
    }
  }, {
    key: '_open',
    get: function get() {
      return this.props.open || false;
    }

    /**
     *  Uses the given style or a default one if one wasn't passed through the properties.
     *  Override this if you want to completely take over the header style.
     */

  }, {
    key: '_headerStyle',
    get: function get() {
      return this.props.headerStyle || styles.header;
    }

    /**
     *  The list of menu items
     *
     *  @returns {Array<Object>} a list of passed menu objects, or an empty list
     **/

  }, {
    key: '_menu',
    get: function get() {
      return this.props.menu || [];
    }
  }]);

  return DrawerComponent;
}(_react.PureComponent);

/**
 * Default styles
 */


exports.default = DrawerComponent;
var styles = {
  header: {
    backgroundColor: '#eeeeee'
  }
};