'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _style = require('styled-jsx/style');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Component2 = require('../core/Component');

var _Component3 = _interopRequireDefault(_Component2);

var _Media = require('./Media');

var _Media2 = _interopRequireDefault(_Media);

var _Timer = require('./Timer');

var _Timer2 = _interopRequireDefault(_Timer);

var _antd = require('antd');

var _button = require('@rmwc/button');

var _typography = require('@rmwc/typography');

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
    key: 'renderIcons',
    value: function renderIcons() {
      var _this2 = this;

      if (!this.props.social) {
        return;
      }

      var margin = this.props.isSmallScreen ? '0 0 5px 0' : '0 95px 35px 0';
      var align = this.props.isSmallScreen ? 'center' : 'flex-end';
      var social = this.props.social;

      return _react2.default.createElement(
        'div',
        { style: { display: 'flex', flexDirection: 'row', alignItems: 'flex-end', alignSelf: align, margin: margin } },
        Object.keys(social).map(function (key) {
          return _this2.renderIcon(social[key], key);
        })
      );
    }
  }, {
    key: 'renderIcon',
    value: function renderIcon(props, key) {
      var size = this.props.isSmallScreen ? 20 : 28;

      return _react2.default.createElement(
        'div',
        {
          className: 'jsx-3069546275' + ' ' + 'jsx-3069546275'
        },
        _react2.default.createElement(_antd.Icon, {
          type: key,
          onClick: this.onLinkClick.bind(this, props.url),
          className: 'icon',
          style: {
            cursor: 'pointer',
            fontSize: size,
            padding: '10px'
          }
        }),
        _react2.default.createElement(_style2.default, {
          styleId: '3069546275',
          css: 'div.jsx-3069546275 .icon{color:' + '#CFD8DC' + ';}div.jsx-3069546275 .icon:hover{color:' + '#00bcd4' + ';}'
        })
      );
    }
  }, {
    key: 'onLinkClick',
    value: function onLinkClick(url) {
      window.open(url, '_blank');
    }
  }, {
    key: 'renderIcoContent',
    value: function renderIcoContent() {
      if (this.props.video) {
        return _react2.default.createElement('div', {
          className: 'jsx-3069546275'
        });
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
            justifyContent: 'space-around',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }, className: 'jsx-3069546275'
        },
        _react2.default.createElement('div', { style: { display: 'flex', flex: 1 }, className: 'jsx-3069546275'
        }),
        _react2.default.createElement(
          'div',
          { style: {
              display: 'flex',
              flex: 3,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column'
            }, className: 'jsx-3069546275'
          },
          this.renderCoverTitle(),
          this.renderCoverSubtitle()
        ),
        _react2.default.createElement(
          'div',
          { style: { display: 'flex', flexDirection: 'row', flex: 2, justifyContent: 'space-around', width: '100%', padding: '0 50px' }, className: 'jsx-3069546275'
          },
          this.renderLogos(),
          this.renderCoverTimeline()
        ),
        this.renderIcons()
      );
    }
  }, {
    key: 'renderCoverTitle',
    value: function renderCoverTitle() {
      if (!this.props.title) {
        return _react2.default.createElement('div', {
          className: 'jsx-3069546275'
        });
      }
      return _react2.default.createElement(
        _typography.Typography,
        { use: 'headline4', style: { margin: '20px', color: this.props.color } },
        ' ',
        this.props.title
      );
    }
  }, {
    key: 'renderCoverTimeline',
    value: function renderCoverTimeline() {
      var backgroundColor = '#00ACC1',
          textColor = '#ffffff';

      return _react2.default.createElement(
        'div',
        { style: { maxWidth: 450, maxHeight: 300 }, className: 'jsx-3069546275'
        },
        _react2.default.createElement(_Timer2.default, { periods: this.props.timedPeriods, textColor: textColor, simple: true, actionTitle: 'Buy tokens', onAction: this.triggerEvent() })
      );
    }
  }, {
    key: 'renderIcoCoverTitle',
    value: function renderIcoCoverTitle() {
      if (!this.props.title) {
        return _react2.default.createElement('div', {
          className: 'jsx-3069546275'
        });
      }
      return _react2.default.createElement(
        _typography.Typography,
        { use: 'headline4', style: { margin: '20px', color: this.props.color } },
        ' ',
        this.props.title
      );
    }
  }, {
    key: 'renderCoverSubtitle',
    value: function renderCoverSubtitle() {
      if (!this.props.subtitle) {
        return _react2.default.createElement('div', {
          className: 'jsx-3069546275'
        });
      }
      return _react2.default.createElement(
        _typography.Typography,
        { use: 'headline5', style: { margin: '20px', color: this.props.color } },
        ' ',
        this.props.subtitle,
        ' '
      );
    }
  }, {
    key: 'renderLogos',
    value: function renderLogos() {
      return _react2.default.createElement('div', { style: { position: 'absolute', left: '5%', top: '55%' }, className: 'jsx-3069546275'
      });
    }
  }, {
    key: 'renderVideo',
    value: function renderVideo() {
      if (this.props.isSmallScreen) {
        return _react2.default.createElement('div', {
          className: 'jsx-3069546275'
        });
      }

      var backgroundColor = '#00ACC1',
          textColor = '#ffffff';

      return _react2.default.createElement(
        'div',
        { style: { padding: 20, width: 450, height: 300, position: 'relative' }, className: 'jsx-3069546275'
        },
        _react2.default.createElement(_Media2.default, { video: this.props.introVideo, width: 450, height: 300, style: { position: 'absolute', top: 0, left: 0 } })
      );
    }
  }, {
    key: 'renderCoverAction',
    value: function renderCoverAction() {
      if (!this.props.primaryActionTitle) {
        return _react2.default.createElement('div', {
          className: 'jsx-3069546275'
        });
      }
      return _react2.default.createElement(
        _button.Button,
        { onClick: this.triggerEvent(), raised: true, theme: 'secondary-bg text-primary-on-secondary',
          style: { margin: '20px' } },
        ' ',
        this.props.primaryActionTitle,
        ' '
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
          }, className: 'jsx-3069546275'
        },
        _react2.default.createElement(
          _typography.Typography,
          { use: 'headline3', style: { margin: '20px', color: this.props.color } },
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
          }, className: 'jsx-3069546275'
        },
        _react2.default.createElement(
          _typography.Typography,
          { use: 'headline4', style: { margin: '20px', position: 'absolute', bottom: '-100px', color: this.props.color } },
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
        return _react2.default.createElement('div', {
          className: 'jsx-3069546275'
        });
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
          }, className: 'jsx-3069546275'
        },
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
        objectPosition: 'center center'
      };
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
          }, className: 'jsx-3069546275'
        },
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
        objectPosition: 'center center'
      };
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
          }, className: 'jsx-3069546275'
        },
        this.renderMedia(coverStyle, coverPlaying, height - 100 + 'px'),
        this.renderPresentationContent()
      );
    }
  }, {
    key: 'renderIco',
    value: function renderIco(title) {
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
          }, className: 'jsx-3069546275'
        },
        this.renderMedia(coverStyle, coverPlaying),
        this.renderIcoContent()
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
        case 'ico':
          return this.renderIco(this.props.title);
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