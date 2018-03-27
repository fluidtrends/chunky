'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _style = require('styled-jsx/style');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Component2 = require('../core/Component');

var _Component3 = _interopRequireDefault(_Component2);

var _Text = require('./Text');

var _Text2 = _interopRequireDefault(_Text);

var _responsive = require('../utils/responsive');

var _Menu = require('rmwc/Menu');

var _Button = require('rmwc/Button');

var _Icon = require('rmwc/Icon');

var _Drawer = require('rmwc/Drawer');

var _List = require('rmwc/List');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dashboard = function (_Component) {
  _inherits(Dashboard, _Component);

  function Dashboard(props) {
    _classCallCheck(this, Dashboard);

    var _this = _possibleConstructorReturn(this, (Dashboard.__proto__ || Object.getPrototypeOf(Dashboard)).call(this, props));

    _this.state = _extends({}, _this.state);
    _this._onSectionSelect = function (section) {
      return _this.onSectionSelect.bind(_this, section);
    };
    _this._onSectionNavigate = function (direction) {
      return _this.onSectionNavigate.bind(_this, direction);
    };
    _this._onCompactSectionSelect = _this.onCompactSectionSelect.bind(_this);
    return _this;
  }

  _createClass(Dashboard, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(Dashboard.prototype.__proto__ || Object.getPrototypeOf(Dashboard.prototype), 'componentDidMount', this).call(this);
    }
  }, {
    key: 'onSectionSelect',
    value: function onSectionSelect(section) {
      this.props.onSectionSelect && this.props.onSectionSelect(section);
    }
  }, {
    key: 'onSectionNavigate',
    value: function onSectionNavigate(direction) {
      this.props.onSectionNavigate && this.props.onSectionNavigate(direction);
    }
  }, {
    key: 'onCompactSectionSelect',
    value: function onCompactSectionSelect(e) {
      this.onSectionSelect(this.props.sections[e.detail.index]);
    }
  }, {
    key: 'renderSection',
    value: function renderSection(section, index) {
      var isSelected = section.path === this.props.section.path;

      return _react2.default.createElement(
        _List.ListItem,
        {
          key: 'section' + index,
          onClick: this._onSectionSelect(section),
          style: {
            fontWeight: section.action ? 800 : 300,
            color: isSelected ? this.props.sectionSelectedColor : section.actionColor || this.props.sectionColor
          } },
        _react2.default.createElement(
          _List.ListItemText,
          null,
          section.title
        )
      );
    }
  }, {
    key: 'renderCompactSection',
    value: function renderCompactSection(section, index) {
      return _react2.default.createElement(
        _Menu.MenuItem,
        {
          key: 'section' + index },
        section.menuTitle
      );
    }
  }, {
    key: 'renderSections',
    value: function renderSections() {
      var _this2 = this;

      var index = 0;
      return _react2.default.createElement(
        _List.List,
        null,
        this.props.sections.map(function (section) {
          return _this2.renderSection(section, index++);
        })
      );
    }
  }, {
    key: 'renderSidebar',
    value: function renderSidebar() {
      return _react2.default.createElement(
        _Drawer.Drawer,
        { permanent: true, style: {
            alignSelf: 'stretch',
            paddingLeft: '10px',
            backgroundColor: this.props.sectionsBackgroundColor } },
        _react2.default.createElement(
          _Drawer.DrawerContent,
          null,
          this.renderSections()
        )
      );
    }
  }, {
    key: 'renderSectionBar',
    value: function renderSectionBar() {
      var _this3 = this;

      if (this.props.renderContent) {
        return _react2.default.createElement('div', null);
      }

      return _react2.default.createElement(
        'div',
        { style: {
            alignSelf: 'stretch',
            backgroundColor: this.props.sectionsBackgroundColor,
            textAlign: 'left',
            paddingLeft: '20px'
          } },
        _react2.default.createElement(
          _Menu.MenuAnchor,
          { style: {
              padding: '10px'
            } },
          _react2.default.createElement(
            _Button.Button,
            {
              style: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                color: this.props.sectionSelectedColor
              },
              onClick: function onClick(evt) {
                return _this3.setState({ 'compactMenuIsOpen': !_this3.state.compactMenuIsOpen });
              } },
            this.props.section.menuTitle,
            _react2.default.createElement(_Icon.Icon, { use: 'expand_more', style: {
                color: this.props.sectionSelectedColor
              } })
          ),
          _react2.default.createElement(
            _Menu.SimpleMenu,
            {
              onSelected: this._onCompactSectionSelect,
              open: this.state.compactMenuIsOpen,
              onClose: function onClose(evt) {
                return _this3.setState({ compactMenuIsOpen: false });
              } },
            this.compactSections
          )
        )
      );
    }
  }, {
    key: 'renderSectionContent',
    value: function renderSectionContent() {
      return _react2.default.createElement(
        'div',
        { style: {
            flex: 1,
            minHeight: '100vh'
          }, className: 'jsx-3157557023'
        },
        this.renderContentComponent(),
        _react2.default.createElement(
          'style',
          { jsx: true, global: true },
          '\n        .text h1 {\n          text-align: left;\n        }\n        .text h2 {\n          text-align: left;\n        }\n   '
        )
      );
    }
  }, {
    key: 'renderNav',
    value: function renderNav() {
      return _react2.default.createElement(
        'div',
        { style: {
            display: 'flex',
            flex: 1,
            marginBottom: 40,
            justifyContent: 'space-around'
          }, className: 'jsx-3157557023'
        },
        _react2.default.createElement(_Icon.Icon, { onClick: this._onSectionNavigate(-1), use: 'navigate_before', style: { fontSize: 48, cursor: 'pointer', color: this.props.sectionSelectedColor } }),
        _react2.default.createElement(_Icon.Icon, { onClick: this._onSectionNavigate(1), use: 'navigate_next', style: { fontSize: 48, cursor: 'pointer', color: this.props.sectionSelectedColor } })
      );
    }
  }, {
    key: 'renderCompactSectionContent',
    value: function renderCompactSectionContent() {
      return _react2.default.createElement(
        'div',
        {
          className: 'jsx-3157557023'
        },
        this.renderContentComponent(),
        this.props.nav && this.renderNav()
      );
    }
  }, {
    key: 'renderText',
    value: function renderText() {
      return (0, _responsive.renderResponsive)('text', _react2.default.createElement(_Text2.default, { source: this.props.section.text, style: {
          paddingBottom: '60px'
        } }), _react2.default.createElement(_Text2.default, { source: this.props.section.text, style: {
          paddingBottom: '60px'
        } }));
    }
  }, {
    key: 'renderContentComponent',
    value: function renderContentComponent() {
      return this.props.renderContent ? this.props.renderContent() : this.renderText();
    }
  }, {
    key: 'renderDefault',
    value: function renderDefault() {
      if (!this.props.section) {
        return _react2.default.createElement('div', {
          className: 'jsx-3157557023'
        });
      }

      return (0, _responsive.renderResponsive)('reader', this.compactReader, this.defaultReader);
    }
  }, {
    key: 'renderComponent',
    value: function renderComponent() {
      return this.renderDefault();
    }
  }, {
    key: 'compactSections',
    get: function get() {
      var _this4 = this;

      var index = 0;
      return this.props.sections.map(function (section) {
        return _this4.renderCompactSection(section, index++);
      });
    }
  }, {
    key: 'defaultReader',
    get: function get() {
      return _react2.default.createElement(
        'div',
        { style: {
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'center'
          }, className: 'jsx-3157557023'
        },
        this.renderSidebar(),
        this.renderSectionContent()
      );
    }
  }, {
    key: 'compactReader',
    get: function get() {
      return _react2.default.createElement(
        'div',
        { style: {
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }, className: 'jsx-3157557023'
        },
        _react2.default.createElement(
          'div',
          { style: { padding: '10px' }, className: 'jsx-3157557023'
          },
          this.renderCompactSectionContent()
        )
      );
    }
  }]);

  return Dashboard;
}(_Component3.default);

exports.default = Dashboard;