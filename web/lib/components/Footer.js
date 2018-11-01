'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Component2 = require('../core/Component');

var _Component3 = _interopRequireDefault(_Component2);

var _responsive = require('../utils/responsive');

var _SocialIcons = require('./SocialIcons');

var _SocialIcons2 = _interopRequireDefault(_SocialIcons);

var _list = require('@rmwc/list');

var _icon = require('@rmwc/icon');

var _button = require('@rmwc/button');

var _typography = require('@rmwc/typography');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Footer = function (_Component) {
  _inherits(Footer, _Component);

  function Footer(props) {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props));
  }

  _createClass(Footer, [{
    key: 'renderFooterSectionElement',
    value: function renderFooterSectionElement(element) {
      return _react2.default.createElement(
        _list.ListItem,
        { key: element.id, style: {} },
        _react2.default.createElement(
          _button.Button,
          { onClick: this.triggerEvent(element.id, { handler: element.link }), style: { color: this.props.theme.footerTintColor, textAlign: 'left' } },
          element.title
        )
      );
    }
  }, {
    key: 'renderFooterSection',
    value: function renderFooterSection(section) {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { key: 'footerSection' + section.id, style: {
            marginRight: '20px'
          } },
        _react2.default.createElement(
          _list.List,
          null,
          _react2.default.createElement(
            _list.ListItem,
            { style: { marginLeft: '15px' } },
            _react2.default.createElement(
              _list.ListItemText,
              { style: { color: this.props.theme.footerHeaderColor } },
              ' ',
              section.title,
              ' '
            )
          ),
          section.elements.map(function (element) {
            return _this2.renderFooterSectionElement(element);
          })
        )
      );
    }
  }, {
    key: 'renderFooterSections',
    value: function renderFooterSections() {
      var _this3 = this;

      return this.props.footer.sections.map(function (section) {
        return _this3.renderFooterSection(section);
      });
    }
  }, {
    key: 'renderFooterLegal',
    value: function renderFooterLegal(compact) {
      return _react2.default.createElement(
        'div',
        { style: { display: 'flex',
            flex: '1',
            alignSelf: 'center',
            justifyContent: 'center',
            width: '100vw',
            backgroundColor: this.props.theme.footerBottomColor,
            flexDirection: compact ? 'row' : 'column' } },
        _react2.default.createElement(
          _list.List,
          { style: {
              display: 'flex',
              flex: '1',
              alignSelf: 'centers',
              justifyContent: 'center',
              flexDirection: 'column',
              textAlign: 'center'
            } },
          _react2.default.createElement(
            _list.ListItem,
            { style: { color: this.props.theme.footerHeaderColor,
                alignSelf: 'center'
              } },
            _react2.default.createElement(
              _list.ListItemText,
              null,
              ' ',
              this.props.info.watermark,
              ' '
            )
          )
        ),
        _react2.default.createElement(
          _list.List,
          { style: {
              display: 'flex',
              flex: '1',
              alignSelf: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              textAlign: 'center'
            } },
          _react2.default.createElement(
            _list.ListItem,
            { style: { marginRight: '20px', color: this.props.theme.footerHeaderColor,
                alignSelf: 'center'
              } },
            _react2.default.createElement(
              _list.ListItemText,
              null,
              ' ',
              this.props.info.copyright,
              ' '
            )
          )
        )
      );
    }
  }, {
    key: 'renderDefault',
    value: function renderDefault() {
      var isSmallScreen = this.props.width < 1224;
      var respFooterWrapper = isSmallScreen ? 'column' : 'row';

      return _react2.default.createElement(
        'div',
        { style: { backgroundColor: this.props.theme.footerColor,
            minHeight: '80px',
            padding: '0px',
            display: 'flex',
            flexWrap: 'wrap',
            flex: 1,
            alignItems: 'flex-start',
            flexDirection: '' + respFooterWrapper,
            justifyContent: 'center',
            color: '#ECEFF1' } },
        _react2.default.createElement(
          'div',
          { style: {
              minHeight: '80px',
              padding: '10px',
              display: 'flex',
              alignSelf: 'center',
              flex: 1,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center'
            } },
          _react2.default.createElement('img', { src: 'assets/' + this.props.theme.logoLightImage, style: { width: '150px' } })
        ),
        _react2.default.createElement(
          'div',
          { style: {
              minHeight: '80px',
              padding: '10px',
              display: 'flex',
              alignSelf: 'center',
              flex: 1
            } },
          _react2.default.createElement(_SocialIcons2.default, { isSmallScreen: isSmallScreen, socialMediaLinks: this.props.socialMediaLinks })
        ),
        _react2.default.createElement(
          'div',
          { style: {
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
            } },
          this.renderFooterSections()
        ),
        (0, _responsive.renderResponsive)('footer-bottom', this.renderFooterLegal(), this.renderFooterLegal(true))
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return this.renderDefault();
    }
  }]);

  return Footer;
}(_Component3.default);

exports.default = Footer;