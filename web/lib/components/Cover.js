'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Component2 = require('../core/Component');

var _Component3 = _interopRequireDefault(_Component2);

var _Text = require('./Text');

var _Text2 = _interopRequireDefault(_Text);

var _Media = require('./Media');

var _Media2 = _interopRequireDefault(_Media);

var _Icon = require('rmwc/Icon');

var _Button = require('rmwc/Button');

var _Typography = require('rmwc/Typography');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cover = function (_Component) {
  _inherits(Cover, _Component);

  function Cover(props) {
    _classCallCheck(this, Cover);

    return _possibleConstructorReturn(this, (Cover.__proto__ || Object.getPrototypeOf(Cover)).call(this, props));
  }

  _createClass(Cover, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(Cover.prototype.__proto__ || Object.getPrototypeOf(Cover.prototype), 'componentDidMount', this).call(this);
    }
  }, {
    key: 'renderDefaultContent',
    value: function renderDefaultContent() {
      if (this.props.video) {
        return _react2.default.createElement('div', null);
      }

      return _react2.default.createElement(
        'div',
        { style: {
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,' + this.props.opacity + ')',
            width: '100vw',
            height: '100vh',
            top: 0,
            left: 0,
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          } },
        this.renderCoverTitle(),
        this.renderCoverSubtitle(),
        this.renderCoverAction()
      );
    }
  }, {
    key: 'renderCoverTitle',
    value: function renderCoverTitle() {
      if (!this.props.title) {
        return _react2.default.createElement('div', null);
      }
      return _react2.default.createElement(
        _Typography.Typography,
        { use: 'display2', style: { margin: '20px', color: this.props.color } },
        ' ',
        this.props.title,
        ' '
      );
    }
  }, {
    key: 'renderCoverSubtitle',
    value: function renderCoverSubtitle() {
      if (!this.props.subtitle) {
        return _react2.default.createElement('div', null);
      }
      return _react2.default.createElement(
        _Typography.Typography,
        { use: 'display1', style: { margin: '20px', color: this.props.color } },
        ' ',
        this.props.subtitle,
        ' '
      );
    }
  }, {
    key: 'renderCoverAction',
    value: function renderCoverAction() {
      if (!this.props.primaryActionTitle) {
        return _react2.default.createElement('div', null);
      }
      return _react2.default.createElement(
        _Button.Button,
        { onClick: this.triggerEvent(), raised: true, theme: 'secondary-bg text-primary-on-secondary',
          style: { margin: '20px' } },
        ' ',
        this.props.primaryActionTitle,
        ' '
      );
    }
  }, {
    key: 'renderDownArrow',
    value: function renderDownArrow() {
      return _react2.default.createElement(
        'div',
        { style: {
            bottom: '10px',
            position: 'absolute',
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          } },
        _react2.default.createElement(_Icon.Icon, { style: { fontSize: '30px' }, use: 'keyboard_arrow_down' })
      );
    }
  }, {
    key: 'renderSimpleContent',
    value: function renderSimpleContent(height, title) {
      return _react2.default.createElement(
        'div',
        { style: {
            position: 'absolute',
            backgroundColor: 'rgba(0,0,0,' + this.props.opacity + ')',
            width: '100vw',
            height: height + 'px',
            top: 0,
            left: 0,
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          } },
        _react2.default.createElement(
          _Typography.Typography,
          { use: 'display1', style: { margin: '20px', color: this.props.color } },
          ' ',
          title,
          ' '
        )
      );
    }
  }, {
    key: 'renderPresentationContent',
    value: function renderPresentationContent() {
      var title = this.props.title;
      return _react2.default.createElement(
        'div',
        { style: {
            position: 'absolute',
            width: '100vw',
            display: 'flex',
            top: '' + (this.presentationHeight - this.menuHeight - 20),
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            flexDirection: 'column'
          } },
        _react2.default.createElement(
          _Typography.Typography,
          { use: 'display2', style: { margin: '20px', position: 'absolute', bottom: '-100px', color: this.props.color } },
          ' ',
          title,
          ' '
        )
      );
    }
  }, {
    key: 'renderMedia',
    value: function renderMedia(style, playing, innerHeight) {
      if (!this.props.image && !this.props.video) {
        return _react2.default.createElement('div', null);
      }

      return _react2.default.createElement(_Media2.default, {
        cache: this.props.cache,
        video: this.props.video,
        image: this.props.image,
        imageSmall: this.props.imageSmall,
        playing: playing,
        innerHeight: innerHeight,
        style: style });
    }
  }, {
    key: 'renderDefault',
    value: function renderDefault(title) {
      var height = this.props.height;
      var coverStyle = { width: '100%', height: height + 'px', objectFit: 'cover', objectPosition: 'center center' };
      var coverPlaying = this.props.scroll < 200;

      return _react2.default.createElement(
        'div',
        { style: {
            backgroundColor: this.props.backgroundColor,
            marginTop: this.props.offset + 'px',
            height: height + 'px',
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center'
          } },
        this.renderMedia(coverStyle, coverPlaying),
        this.renderDefaultContent()
      );
    }
  }, {
    key: 'renderSimple',
    value: function renderSimple(height, title) {
      var coverStyle = {
        width: '100%',
        backgroundColor: this.props.backgroundColor,
        height: height + 'px',
        objectFit: 'cover',
        objectPosition: 'center center' };
      var coverPlaying = this.props.scroll < 200;

      return _react2.default.createElement(
        'div',
        { style: {
            backgroundColor: this.props.backgroundColor,
            marginTop: this.props.offset + 'px',
            height: height + 'px',
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center'
          } },
        this.renderMedia(coverStyle, coverPlaying),
        this.renderSimpleContent(height, title)
      );
    }
  }, {
    key: 'renderPresentation',
    value: function renderPresentation() {
      var height = this.presentationHeight;
      var coverStyle = {
        width: '100%',
        height: height + 'px',
        backgroundColor: this.props.backgroundColor,
        objectFit: 'cover',
        objectPosition: 'center center' };
      var coverPlaying = this.props.scroll < 200;

      return _react2.default.createElement(
        'div',
        { style: {
            backgroundColor: this.props.backgroundColor,
            marginTop: this.props.offset + 'px',
            height: height + 2 + 'px',
            display: 'flex',
            overflow: 'hidden',
            flex: 1,
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center'
          } },
        this.renderMedia(coverStyle, coverPlaying, height - 100 + 'px'),
        this.renderPresentationContent()
      );
    }
  }, {
    key: 'renderMenu',
    value: function renderMenu() {
      return this.renderSimple(this.menuHeight);
    }
  }, {
    key: 'render',
    value: function render() {
      switch (this.type) {
        case 'presentation':
          return this.renderPresentation();
        case 'simple':
          return this.renderSimple(this.simpleHeight, this.props.title);
        case 'menu':
          return this.renderMenu();
        default:
          return this.renderDefault();
      }
    }
  }, {
    key: 'presentationHeight',
    get: function get() {
      return 500;
    }
  }, {
    key: 'simpleHeight',
    get: function get() {
      return 300;
    }
  }, {
    key: 'menuHeight',
    get: function get() {
      return 68;
    }
  }, {
    key: 'type',
    get: function get() {
      return this.props.type || 'default';
    }
  }]);

  return Cover;
}(_Component3.default);

exports.default = Cover;