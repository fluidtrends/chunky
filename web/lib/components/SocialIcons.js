'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('styled-jsx/style');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SocialIcons = function (_PureComponent) {
  _inherits(SocialIcons, _PureComponent);

  function SocialIcons(props) {
    _classCallCheck(this, SocialIcons);

    return _possibleConstructorReturn(this, (SocialIcons.__proto__ || Object.getPrototypeOf(SocialIcons)).call(this, props));
  }

  _createClass(SocialIcons, [{
    key: 'goto',
    value: function goto(url) {
      window.open(this.props.socialMediaLinks[url], '_blank');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var socialNetworks = ['twitter', 'youtube', 'github', 'linkedin', 'facebook', 'medium', 'instagram'];

      var align = this.props.isSmallScreen ? 'center' : 'center';
      var overflow = this.props.isSmallScreen ? 'auto' : 'unset';
      var fontSize = this.props.isSmallScreen ? 20 : 36;
      var padding = this.props.isSmallScreen ? 6 : 10;

      return _react2.default.createElement(
        'div',
        { style: { display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: align, overflow: overflow } },
        socialNetworks.map(function (key) {
          return _react2.default.createElement(
            'div',
            {
              className: _style2.default.dynamic([['1055089053', [_this2.props.iconColor, _this2.props.iconColorHover]]]) + ' ' + (_style2.default.dynamic([['1055089053', [_this2.props.iconColor, _this2.props.iconColorHover]]]) || '')
            },
            _react2.default.createElement(_antd.Icon, {
              key: key,
              theme: 'twoTone',
              type: key,
              twoToneColor: '#00bcd4',
              className: 'icon',
              onClick: _this2.goto.bind(_this2, key),
              style: {
                cursor: 'pointer',
                fontSize: fontSize,
                padding: padding
              } }),
            _react2.default.createElement(_style2.default, {
              styleId: '1055089053',
              css: 'div.__jsx-style-dynamic-selector .icon{color:' + _this2.props.iconColor + ';}div.__jsx-style-dynamic-selector .icon:hover{color:' + _this2.props.iconColorHover + ';}',
              dynamic: [_this2.props.iconColor, _this2.props.iconColorHover]
            })
          );
        })
      );
    }
  }]);

  return SocialIcons;
}(_react.PureComponent);

exports.default = SocialIcons;