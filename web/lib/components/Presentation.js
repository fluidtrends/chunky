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

var _responsive = require('../utils/responsive');

var _typography = require('@rmwc/typography');

var _antd = require('antd');

var _Media = require('./Media');

var _Media2 = _interopRequireDefault(_Media);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Presentation = function (_Component) {
  _inherits(Presentation, _Component);

  function Presentation(props) {
    _classCallCheck(this, Presentation);

    var _this = _possibleConstructorReturn(this, (Presentation.__proto__ || Object.getPrototypeOf(Presentation)).call(this, props));

    _this.state = _extends({}, _this.state, { modalVisible: false, videoPlaying: false });

    _this._showModal = _this.showModal.bind(_this);
    _this._hideModal = _this.hideModal.bind(_this);
    return _this;
  }

  _createClass(Presentation, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(Presentation.prototype.__proto__ || Object.getPrototypeOf(Presentation.prototype), 'componentDidMount', this).call(this);
    }
  }, {
    key: 'showModal',
    value: function showModal() {
      this.setState({ modalVisible: true, videoPlaying: true });
    }
  }, {
    key: 'hideModal',
    value: function hideModal() {
      this.setState({ modalVisible: false, videoPlaying: false });
    }
  }, {
    key: 'renderImage',
    value: function renderImage() {

      return (0, _responsive.renderResponsive)('image', _react2.default.createElement('img', { src: '/assets/' + this.props.image, style: {
          width: '80vw',
          opacity: 0.5,
          boxShadow: ' 0 5px 20px 0 rgba(0,0,0,.15)'
        } }), _react2.default.createElement('img', { src: '/assets/' + this.props.image, style: {
          width: '700px',
          maxWidth: '90vw',
          opacity: 0.5,
          boxShadow: ' 0 5px 20px 0 rgba(0,0,0,.15)'
        } }));
    }
  }, {
    key: 'renderThumbnail',
    value: function renderThumbnail() {
      var fontSize = this.props.isSmallScreen ? 40 : 70;

      return _react2.default.createElement(
        'div',
        { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', padding: "80px 0" } },
        _react2.default.createElement(
          'div',
          { style: { width: '90vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }, className: _style2.default.dynamic([['2929084194', ['#546E7A', this.props.hoverColor ? this.props.hoverColor : '#00bcd4']]]) + ' ' + (_style2.default.dynamic([['2929084194', ['#546E7A', this.props.hoverColor ? this.props.hoverColor : '#00bcd4']]]) || '')
          },
          this.renderImage(),
          _react2.default.createElement(_antd.Icon, { onClick: this._showModal, type: 'play-circle', className: 'icon', theme: 'filled', style: { fontSize: fontSize, position: 'absolute', cursor: 'pointer', background: 'transparent' } }),
          _react2.default.createElement(_style2.default, {
            styleId: '2929084194',
            css: 'div.__jsx-style-dynamic-selector .icon{color:' + '#546E7A' + ';}div.__jsx-style-dynamic-selector .icon:hover{color:' + (this.props.hoverColor ? this.props.hoverColor : '#00bcd4') + ';}',
            dynamic: ['#546E7A', this.props.hoverColor ? this.props.hoverColor : '#00bcd4']
          })
        )
      );
    }
  }, {
    key: 'renderModal',
    value: function renderModal() {
      var width = this.props.isSmallScreen ? '80vw' : 1200;
      var marginTop = this.props.isSmallScreen ? 150 : 0;
      var paddingTop = '56.25%';

      return _react2.default.createElement(
        _antd.Modal,
        { centered: true, cancelButtonProps: { shape: 'circle', type: 'danger' }, onCancel: this._hideModal, width: width, bodyStyle: { paddingTop: paddingTop, marginTop: marginTop }, footer: null, visible: this.state.modalVisible },
        _react2.default.createElement(_Media2.default, { video: this.props.url, width: '100%', height: '100%', style: { position: 'absolute', top: 0, left: 0 }, playing: this.state.videoPlaying })
      );
    }
  }, {
    key: 'renderComponent',
    value: function renderComponent() {

      return _react2.default.createElement(
        'div',
        { style: { display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', padding: "50px", backgroundColor: this.props.backgroundColor }, className: _style2.default.dynamic([['2929084194', ['#546E7A', this.props.hoverColor ? this.props.hoverColor : '#00bcd4']]])
        },
        _react2.default.createElement(
          'div',
          { style: { textAlign: 'center' }, className: _style2.default.dynamic([['2929084194', ['#546E7A', this.props.hoverColor ? this.props.hoverColor : '#00bcd4']]])
          },
          this.props.title && _react2.default.createElement(
            _typography.Typography,
            {
              use: 'headline2',
              style: _extends({
                margin: '20px',
                color: this.props.textColor
              }, this.props.titleAdditionalStyle)
            },
            ' ',
            this.props.title
          ),
          this.renderThumbnail(),
          this.renderModal()
        )
      );
    }
  }]);

  return Presentation;
}(_Component3.default);

exports.default = Presentation;