"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Component2 = _interopRequireDefault(require("../core/Component"));

var _Text = _interopRequireDefault(require("./Text"));

var _responsive = require("../utils/responsive");

var _menu = require("@rmwc/menu");

var _button = require("@rmwc/button");

var _icon = require("@rmwc/icon");

var _drawer = require("@rmwc/drawer");

var _list = require("@rmwc/list");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Dashboard =
/*#__PURE__*/
function (_Component) {
  _inherits(Dashboard, _Component);

  function Dashboard(props) {
    var _this;

    _classCallCheck(this, Dashboard);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dashboard).call(this, props));
    _this.state = _objectSpread({}, _this.state);

    _this._onSectionSelect = function (section) {
      return _this.onSectionSelect.bind(_assertThisInitialized(_this), section);
    };

    _this._onSectionNavigate = function (direction) {
      return _this.onSectionNavigate.bind(_assertThisInitialized(_this), direction);
    };

    _this._onCompactSectionSelect = _this.onCompactSectionSelect.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Dashboard, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _get(_getPrototypeOf(Dashboard.prototype), "componentDidMount", this).call(this);
    }
  }, {
    key: "onSectionSelect",
    value: function onSectionSelect(section) {
      this.props.onSectionSelect && this.props.onSectionSelect(section);
    }
  }, {
    key: "onSectionNavigate",
    value: function onSectionNavigate(direction) {
      this.props.onSectionNavigate && this.props.onSectionNavigate(direction);
    }
  }, {
    key: "onCompactSectionSelect",
    value: function onCompactSectionSelect(e) {
      this.onSectionSelect(this.props.sections[e.detail.index]);
    }
  }, {
    key: "renderSection",
    value: function renderSection(section, index) {
      var isSelected = section.path === this.props.section.path;
      return _react["default"].createElement(_list.ListItem, {
        key: "section".concat(index),
        onClick: this._onSectionSelect(section),
        style: {
          fontWeight: section.action ? 800 : 300,
          color: isSelected ? this.props.sectionSelectedColor : section.actionColor || this.props.sectionColor
        }
      }, _react["default"].createElement(_list.ListItemText, null, section.title));
    }
  }, {
    key: "renderCompactSection",
    value: function renderCompactSection(section, index) {
      return _react["default"].createElement(_menu.MenuItem, {
        key: "section".concat(index)
      }, section.menuTitle);
    }
  }, {
    key: "renderSections",
    value: function renderSections() {
      var _this2 = this;

      var index = 0;
      return _react["default"].createElement(_list.List, null, this.props.sections.map(function (section) {
        return _this2.renderSection(section, index++);
      }));
    }
  }, {
    key: "renderSidebar",
    value: function renderSidebar() {
      return _react["default"].createElement(_drawer.Drawer, {
        permanent: true,
        style: {
          alignSelf: 'stretch',
          paddingLeft: '10px',
          backgroundColor: this.props.sectionsBackgroundColor
        }
      }, _react["default"].createElement(_drawer.DrawerContent, null, this.renderSections()));
    }
  }, {
    key: "renderSectionBar",
    value: function renderSectionBar() {
      var _this3 = this;

      if (this.props.renderContent) {
        return _react["default"].createElement("div", null);
      }

      return _react["default"].createElement("div", {
        style: {
          alignSelf: 'stretch',
          backgroundColor: this.props.sectionsBackgroundColor,
          textAlign: 'left',
          paddingLeft: '20px'
        }
      }, _react["default"].createElement(_menu.MenuAnchor, {
        style: {
          padding: '10px'
        }
      }, _react["default"].createElement(_button.Button, {
        style: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          color: this.props.sectionSelectedColor
        },
        onClick: function onClick(evt) {
          return _this3.setState({
            'compactMenuIsOpen': !_this3.state.compactMenuIsOpen
          });
        }
      }, this.props.section.menuTitle, _react["default"].createElement(_icon.Icon, {
        use: "expand_more",
        style: {
          color: this.props.sectionSelectedColor
        }
      })), _react["default"].createElement(_menu.SimpleMenu, {
        onSelected: this._onCompactSectionSelect,
        open: this.state.compactMenuIsOpen,
        onClose: function onClose(evt) {
          return _this3.setState({
            compactMenuIsOpen: false
          });
        }
      }, this.compactSections)));
    }
  }, {
    key: "renderSectionContent",
    value: function renderSectionContent() {
      return _react["default"].createElement("div", {
        style: {
          flex: 1,
          minHeight: '100vh'
        }
      }, this.renderContentComponent());
    }
  }, {
    key: "renderNav",
    value: function renderNav() {
      return _react["default"].createElement("div", {
        style: {
          display: 'flex',
          flex: 1,
          marginBottom: 40,
          justifyContent: 'space-around'
        }
      }, _react["default"].createElement(_icon.Icon, {
        onClick: this._onSectionNavigate(-1),
        use: "navigate_before",
        style: {
          fontSize: 48,
          cursor: 'pointer',
          color: this.props.sectionSelectedColor
        }
      }), _react["default"].createElement(_icon.Icon, {
        onClick: this._onSectionNavigate(1),
        use: "navigate_next",
        style: {
          fontSize: 48,
          cursor: 'pointer',
          color: this.props.sectionSelectedColor
        }
      }));
    }
  }, {
    key: "renderCompactSectionContent",
    value: function renderCompactSectionContent() {
      return _react["default"].createElement("div", null, this.renderContentComponent(), this.props.nav && this.renderNav());
    }
  }, {
    key: "renderText",
    value: function renderText() {
      return (0, _responsive.renderResponsive)('text', _react["default"].createElement(_Text["default"], {
        source: this.props.section.text,
        style: {
          paddingBottom: '60px'
        }
      }), _react["default"].createElement(_Text["default"], {
        source: this.props.section.text,
        style: {
          paddingBottom: '60px'
        }
      }));
    }
  }, {
    key: "renderContentComponent",
    value: function renderContentComponent() {
      return this.props.renderContent ? this.props.renderContent() : this.renderText();
    }
  }, {
    key: "renderDefault",
    value: function renderDefault() {
      if (!this.props.section) {
        return _react["default"].createElement("div", null);
      }

      return (0, _responsive.renderResponsive)('reader', this.compactReader, this.defaultReader);
    }
  }, {
    key: "renderComponent",
    value: function renderComponent() {
      return this.renderDefault();
    }
  }, {
    key: "compactSections",
    get: function get() {
      var _this4 = this;

      var index = 0;
      return this.props.sections.map(function (section) {
        return _this4.renderCompactSection(section, index++);
      });
    }
  }, {
    key: "defaultReader",
    get: function get() {
      return _react["default"].createElement("div", {
        style: {
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'center'
        }
      }, this.renderSidebar(), this.renderSectionContent());
    }
  }, {
    key: "compactReader",
    get: function get() {
      return _react["default"].createElement("div", {
        style: {
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }, _react["default"].createElement("div", {
        style: {
          padding: '10px'
        }
      }, this.renderCompactSectionContent()));
    }
  }]);

  return Dashboard;
}(_Component2["default"]);

exports["default"] = Dashboard;