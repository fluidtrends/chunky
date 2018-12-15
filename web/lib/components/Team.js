'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _typography = require('@rmwc/typography');

var _button = require('@rmwc/button');

var _card = require('@rmwc/card');

var _dialog = require('@rmwc/dialog');

var _Component2 = require('../core/Component');

var _Component3 = _interopRequireDefault(_Component2);

var _Text = require('./Text');

var _Text2 = _interopRequireDefault(_Text);

var _responsive = require('../utils/responsive');

var _Media = require('./Media');

var _Media2 = _interopRequireDefault(_Media);

var _reactChunky = require('react-chunky');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Team = function (_Component) {
  _inherits(Team, _Component);

  function Team(props) {
    _classCallCheck(this, Team);

    var _this = _possibleConstructorReturn(this, (Team.__proto__ || Object.getPrototypeOf(Team)).call(this, props));

    _this.state = _extends({}, _this.state, {
      detailDialogOpen: false,
      item: null,
      selectedLanguage: null,
      strings: null
    });
    return _this;
  }

  _createClass(Team, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      _get(Team.prototype.__proto__ || Object.getPrototypeOf(Team.prototype), 'componentDidMount', this).call(this);
      _reactChunky.Data.Cache.retrieveCachedItem('selectedLanguage').then(function (lang) {
        _this2.setState({ selectedLanguage: lang });
      }).catch(function () {
        return;
      });
      fetch(this.props.theme.translatedStrings).then(function (response) {
        return response.json();
      }).then(function (translatedTexts) {
        _this2.setState({ strings: translatedTexts['team'] });
      }).catch(function () {
        return '';
      });
    }
  }, {
    key: 'renderText',
    value: function renderText(text) {
      return (0, _responsive.renderResponsive)('text', _react2.default.createElement(_Text2.default, {
        source: text,
        style: {
          padding: '10px'
        }
      }), _react2.default.createElement(_Text2.default, {
        source: text,
        style: {
          paddingBottom: '10px'
        }
      }));
    }
  }, {
    key: 'renderCardMedia',
    value: function renderCardMedia(item) {
      var _this3 = this;

      var image = item.image;

      if (!image) {
        return _react2.default.createElement('div', null);
      }

      var width = this.props.small ? 100 : 220;
      var height = this.props.small ? 100 : 220;

      var style = {
        alignSelf: 'center',
        marginTop: '20px',
        objectFit: 'cover',
        height: height,
        width: width,
        borderRadius: '50%',
        objectPosition: 'center center'
      };
      var props = Object.assign({}, this.props);
      delete props.video;
      return _react2.default.createElement(
        _card.CardMedia,
        {
          style: {
            backgroundColor: item.backgroundColor,
            cursor: this.props.imageClickable && !this.state.detailDialogOpen ? 'pointer' : 'initial'
          },
          onClick: function onClick() {
            _this3.props.imageClickable ? _this3.setState({ detailDialogOpen: true, item: item }) : false;
          }
        },
        _react2.default.createElement(_Media2.default, { cache: this.props.cache, roundImg: true, image: image, style: style })
      );
    }
  }, {
    key: 'onLinkClick',
    value: function onLinkClick(url) {
      window.open(url, '_blank');
    }
  }, {
    key: 'renderCard',
    value: function renderCard(item, index) {
      var _this4 = this;

      var linkedIn = item.linkedIn,
          github = item.github,
          website = item.website,
          text = item.text;


      var width = this.props.small ? 230 : 320;
      var height = this.props.small ? 340 : 540;
      var translatedBtnSeeMoreText = this.props.translation && this.state.strings && this.state.selectedLanguage ? this.state.strings[this.state.selectedLanguage]['btnTextDetails'] : 'See more';
      return _react2.default.createElement(
        _card.Card,
        {
          style: {
            width: width,
            height: height,
            margin: 20,
            textAlign: 'center'
          },
          key: 'item' + index
        },
        this.renderCardMedia(item),
        _react2.default.createElement(
          'div',
          { style: { padding: '15px 1rem 1rem 1rem', textAlign: 'right' } },
          _react2.default.createElement(
            'div',
            {
              style: {
                height: 140
              }
            },
            _react2.default.createElement(
              _typography.Typography,
              {
                use: 'headline',
                tag: 'h2',
                style: {
                  textAlign: 'center',
                  fontWeight: 700,
                  paddingBottom: '10px'
                }
              },
              item.name
            ),
            _react2.default.createElement(
              _typography.Typography,
              { use: 'title', tag: 'h3', style: { textAlign: 'center' } },
              item.title
            )
          ),
          _react2.default.createElement(
            'div',
            { style: { textAlign: 'center' } },
            _react2.default.createElement(
              'div',
              { style: { display: 'flex', justifyContent: 'center' } },
              github && _react2.default.createElement(
                _button.ButtonIcon,
                {
                  style: { cursor: 'pointer' },
                  onClick: function onClick() {
                    _this4.onLinkClick(item.github);
                  }
                },
                _react2.default.createElement('img', { src: this.props.githubIcon })
              ),
              linkedIn && _react2.default.createElement(
                _button.ButtonIcon,
                {
                  style: { cursor: 'pointer' },
                  onClick: function onClick() {
                    _this4.onLinkClick(item.linkedIn);
                  }
                },
                _react2.default.createElement('img', { src: this.props.linkedinIcon })
              ),
              website && _react2.default.createElement(
                _button.ButtonIcon,
                {
                  style: { cursor: 'pointer' },
                  onClick: function onClick() {
                    _this4.onLinkClick(item.website);
                  }
                },
                _react2.default.createElement('img', { src: this.props.webIcon })
              )
            ),
            text && _react2.default.createElement(
              _button.Button,
              {
                style: { marginTop: 10 },
                onClick: function onClick() {
                  _this4.setState({ detailDialogOpen: true, item: item });
                }
              },
              translatedBtnSeeMoreText
            )
          )
        )
      );
    }
  }, {
    key: 'renderDetails',
    value: function renderDetails() {
      var item = this.state.item;

      if (!item) {
        return;
      }
      return this.renderText(item.text);
    }
  }, {
    key: 'renderDetailsTitle',
    value: function renderDetailsTitle() {
      var item = this.state.item;

      if (!item) {
        return;
      }

      return this.renderCardMedia(item);
    }
  }, {
    key: 'renderTeamMemebers',
    value: function renderTeamMemebers(members) {
      var _this5 = this;

      var index = 0;

      if (!members || members.length == 0) {
        return;
      }

      return members.map(function (member) {
        return _this5.renderCard(member, index++);
      });
    }
  }, {
    key: 'renderSection',
    value: function renderSection(section, index) {
      var style = this.props.small ? { color: 'white', textShadow: '2px 2px 5px #607D8B' } : { color: this.props.textColor ? this.props.textColor : '#000' };
      var translatedTitle = this.props.translation && this.state.strings && this.state.selectedLanguage ? this.state.strings[this.state.selectedLanguage]['section' + index]['title'] : section.title;
      return _react2.default.createElement(
        'div',
        {
          key: 'section' + index,
          style: { padding: '0 1rem 1rem 1rem', textAlign: 'right' }
        },
        _react2.default.createElement(
          _typography.Typography,
          { use: 'display1', tag: 'h1', style: style },
          translatedTitle
        ),
        _react2.default.createElement(
          'div',
          {
            style: {
              display: 'flex',
              flex: 1,
              flexWrap: 'wrap',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }
          },
          this.renderTeamMemebers(section.members)
        )
      );
    }
  }, {
    key: 'renderTeamSections',
    value: function renderTeamSections() {
      var _this6 = this;

      var index = 0;
      return this.props.sections.map(function (section, index) {
        return _this6.renderSection(section, index);
      });
    }
  }, {
    key: 'renderSections',
    value: function renderSections() {
      return _react2.default.createElement(
        'div',
        {
          style: {
            display: 'flex',
            flex: 1,
            flexWrap: 'wrap',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }
        },
        this.renderTeamSections()
      );
    }
  }, {
    key: 'renderDialog',
    value: function renderDialog() {
      var _this7 = this;

      var translatedBtnBackText = this.props.translation && this.state.strings && this.state.selectedLanguage ? this.state.strings[this.state.selectedLanguage]['btnTextGoBack'] : 'Back';
      return _react2.default.createElement(
        _dialog.Dialog,
        {
          open: this.state.detailDialogOpen,
          onClose: function onClose(evt) {
            _this7.setState({ detailDialogOpen: false });
          }
        },
        _react2.default.createElement(
          _dialog.DialogTitle,
          null,
          this.renderDetailsTitle()
        ),
        _react2.default.createElement(
          _dialog.DialogContent,
          null,
          this.renderDetails()
        ),
        _react2.default.createElement(
          _dialog.DialogActions,
          { style: { display: 'flex', justifyContent: 'center' } },
          _react2.default.createElement(
            _dialog.DialogButton,
            { action: 'close' },
            translatedBtnBackText
          )
        )
      );
    }
  }, {
    key: 'renderComponent',
    value: function renderComponent() {
      if (!this.props.sections) {
        return _react2.default.createElement('div', null);
      }

      return _react2.default.createElement(
        'div',
        {
          style: {
            color: this.props.textColor,
            backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : '#fff',
            position: 'relative',
            display: 'flex',
            flex: 1,
            paddingTop: '20px',
            paddingBottom: '50px',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }
        },
        this.renderSections(),
        this.renderDialog()
      );
    }
  }]);

  return Team;
}(_Component3.default);

exports.default = Team;