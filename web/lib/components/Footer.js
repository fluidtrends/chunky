"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Component2 = _interopRequireDefault(require("../core/Component"));

var _responsive = require("../utils/responsive");

var _SocialIcons = _interopRequireDefault(require("./SocialIcons"));

var _list = require("@rmwc/list");

var _icon = require("@rmwc/icon");

var _button = require("@rmwc/button");

var _typography = require("@rmwc/typography");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Footer =
/*#__PURE__*/
function (_Component) {
  _inherits(Footer, _Component);

  function Footer(props) {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, _getPrototypeOf(Footer).call(this, props));
  }

  _createClass(Footer, [{
    key: "renderFooterSectionElement",
    value: function renderFooterSectionElement(element) {
      return _react["default"].createElement(_list.ListItem, {
        key: element.id,
        style: {
          cursor: 'pointer'
        },
        onClick: this.triggerEvent(element.id, {
          handler: element.link
        })
      }, _react["default"].createElement(_button.Button, {
        onClick: this.triggerEvent(element.id, {
          handler: element.link
        }),
        style: {
          color: this.props.theme.footerTintColor,
          textAlign: 'left'
        }
      }, element.title));
    }
  }, {
    key: "renderFooterSection",
    value: function renderFooterSection(section) {
      var _this = this;

      return _react["default"].createElement("div", {
        key: "footerSection".concat(section.id),
        style: {
          marginRight: '20px'
        }
      }, _react["default"].createElement(_list.List, null, _react["default"].createElement(_list.ListItem, {
        style: {
          marginLeft: '15px'
        }
      }, _react["default"].createElement(_list.ListItemText, {
        style: {
          color: this.props.theme.footerHeaderColor
        }
      }, " ", section.title, " ")), section.elements.map(function (element) {
        return _this.renderFooterSectionElement(element);
      })));
    }
  }, {
    key: "renderFooterSections",
    value: function renderFooterSections() {
      var _this2 = this;

      return this.props.footer.sections.map(function (section) {
        return _this2.renderFooterSection(section);
      });
    }
  }, {
    key: "renderFooterLegal",
    value: function renderFooterLegal(compact) {
      return _react["default"].createElement("div", {
        style: {
          display: 'flex',
          flex: '1',
          cursor: 'pointer',
          alignSelf: 'center',
          justifyContent: 'center',
          width: '100vw',
          backgroundColor: this.props.theme.footerBottomColor,
          flexDirection: compact ? 'row' : 'column'
        },
        onClick: function onClick() {
          window.open('https://chunky.io');
        }
      }, _react["default"].createElement(_list.List, {
        style: {
          display: 'flex',
          flex: '1',
          alignSelf: 'centers',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center'
        }
      }, _react["default"].createElement(_list.ListItem, {
        style: {
          color: this.props.theme.footerHeaderColor,
          alignSelf: 'center'
        }
      }, _react["default"].createElement(_list.ListItemText, null, " ", this.props.info.watermark, " "))), _react["default"].createElement(_list.List, {
        style: {
          display: 'flex',
          flex: '1',
          alignSelf: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          textAlign: 'center'
        }
      }, _react["default"].createElement(_list.ListItem, {
        style: {
          marginRight: '20px',
          color: this.props.theme.footerHeaderColor,
          alignSelf: 'center'
        }
      }, _react["default"].createElement(_list.ListItemText, null, " ", this.props.info.copyright, " "))));
    }
  }, {
    key: "renderDefault",
    value: function renderDefault() {
      var isSmallScreen = this.props.width < 1224;
      var respFooterWrapper = isSmallScreen ? 'column' : 'row';
      return _react["default"].createElement("div", {
        style: {
          backgroundColor: this.props.theme.footerColor,
          minHeight: '80px',
          padding: '0px',
          display: 'flex',
          flexWrap: 'wrap',
          flex: 1,
          alignItems: 'flex-start',
          flexDirection: "".concat(respFooterWrapper),
          justifyContent: 'center',
          color: '#ECEFF1'
        }
      }, _react["default"].createElement("div", {
        style: {
          minHeight: '80px',
          padding: '10px',
          display: 'flex',
          alignSelf: 'center',
          flex: 1,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center'
        }
      }, _react["default"].createElement("img", {
        src: "assets/".concat(this.props.theme.logoLightImage),
        style: {
          width: '150px'
        }
      })), _react["default"].createElement("div", {
        style: {
          minHeight: '80px',
          padding: '10px',
          display: 'flex',
          alignSelf: 'center',
          flex: 1
        }
      }, _react["default"].createElement(_SocialIcons["default"], {
        iconColor: this.props.theme.footerSocialIconsColor,
        iconColorHover: this.props.theme.footerSocialIconsColorHover,
        isSmallScreen: isSmallScreen,
        socialMediaLinks: this.props.footer.socialMediaLinks
      })), _react["default"].createElement("div", {
        style: {
          backgroundColor: this.props.theme.footerColor,
          minHeight: '80px',
          padding: '10px',
          display: 'flex',
          flexWrap: 'wrap',
          alignSelf: isSmallScreen ? 'center' : 'flex-end',
          flex: 1,
          alignItems: 'start',
          flexDirection: 'row',
          justifyContent: 'center',
          color: '#ECEFF1'
        }
      }, this.renderFooterSections()), (0, _responsive.renderResponsive)('footer-bottom', this.renderFooterLegal(), this.renderFooterLegal(true)));
    }
  }, {
    key: "render",
    value: function render() {
      return this.renderDefault();
    }
  }]);

  return Footer;
}(_Component2["default"]);

exports["default"] = Footer;