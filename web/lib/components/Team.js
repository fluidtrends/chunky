'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Component2 = require('../core/Component');

var _Component3 = _interopRequireDefault(_Component2);

var _Text = require('./Text');

var _Text2 = _interopRequireDefault(_Text);

var _responsive = require('../utils/responsive');

var _Typography = require('rmwc/Typography');

var _Icon = require('rmwc/Icon');

var _Chip = require('rmwc/Chip');

var _Button = require('rmwc/Button');

var _LinearProgress = require('rmwc/LinearProgress');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Card = require('rmwc/Card');

var _Dialog = require('rmwc/Dialog');

var _Media = require('./Media');

var _Media2 = _interopRequireDefault(_Media);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Team = function (_Component) {
  _inherits(Team, _Component);

  function Team(props) {
    _classCallCheck(this, Team);

    var _this = _possibleConstructorReturn(this, (Team.__proto__ || Object.getPrototypeOf(Team)).call(this, props));

    _this.state = _extends({}, _this.state, { detailDialogOpen: false, item: null });
    return _this;
  }

  _createClass(Team, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(Team.prototype.__proto__ || Object.getPrototypeOf(Team.prototype), 'componentDidMount', this).call(this);
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
      var image = item.image;

      if (!image) {
        return _react2.default.createElement('div', null);
      }

      var style = {
        alignSelf: 'center',
        marginTop: '20px',
        objectFit: 'cover',
        height: 220,
        width: 220,
        borderRadius: '50%',
        objectPosition: 'center center'
      };
      var props = Object.assign({}, this.props);
      delete props.video;
      return _react2.default.createElement(
        _Card.CardMedia,
        {
          style: {
            backgroundColor: item.backgroundColor
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
      var _this2 = this;

      var linkedIn = item.linkedIn,
          github = item.github,
          website = item.website,
          text = item.text;


      return _react2.default.createElement(
        _Card.Card,
        {
          style: {
            width: '320px',
            height: '540px',
            margin: 20,
            textAlign: 'center'
          },
          key: 'item' + index
        },
        this.renderCardMedia(item),
        _react2.default.createElement(
          'div',
          { style: { padding: '0 1rem 1rem 1rem', textAlign: 'right' } },
          _react2.default.createElement(
            'div',
            {
              style: {
                height: 140
              }
            },
            _react2.default.createElement(
              _Typography.Typography,
              {
                use: 'headline',
                tag: 'h2',
                style: { textAlign: 'center', fontWeight: 700 }
              },
              item.name
            ),
            _react2.default.createElement(
              _Typography.Typography,
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
                _Button.ButtonIcon,
                {
                  style: { cursor: 'pointer' },
                  onClick: function onClick() {
                    _this2.onLinkClick(item.github);
                  }
                },
                _react2.default.createElement('img', { src: this.props.githubIcon })
              ),
              linkedIn && _react2.default.createElement(
                _Button.ButtonIcon,
                {
                  style: { cursor: 'pointer' },
                  onClick: function onClick() {
                    _this2.onLinkClick(item.linkedIn);
                  }
                },
                _react2.default.createElement('img', { src: this.props.linkedinIcon })
              ),
              website && _react2.default.createElement(
                _Button.ButtonIcon,
                {
                  style: { cursor: 'pointer' },
                  onClick: function onClick() {
                    _this2.onLinkClick(item.website);
                  }
                },
                _react2.default.createElement('img', { src: this.props.webIcon })
              )
            ),
            text && _react2.default.createElement(
              _Button.Button,
              {
                style: { marginTop: 10 },
                onClick: function onClick() {
                  _this2.setState({ detailDialogOpen: true, item: item });
                }
              },
              'See More'
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
      var _this3 = this;

      var index = 0;

      if (!members || members.length == 0) {
        return;
      }

      return members.map(function (member) {
        return _this3.renderCard(member, index++);
      });
    }
  }, {
    key: 'renderSection',
    value: function renderSection(section, index) {
      return _react2.default.createElement(
        'div',
        {
          key: 'section' + index,
          style: { padding: '0 1rem 1rem 1rem', textAlign: 'right' }
        },
        _react2.default.createElement(
          _Typography.Typography,
          { use: 'display1', tag: 'h1' },
          section.title
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
      var _this4 = this;

      var index = 0;
      return this.props.sections.map(function (section, index) {
        return _this4.renderSection(section, index);
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
    key: 'renderComponent',
    value: function renderComponent() {
      var _this5 = this;

      if (!this.props.sections) {
        return _react2.default.createElement('div', null);
      }
      return _react2.default.createElement(
        'div',
        {
          style: {
            color: this.props.textColor,
            position: 'relative',
            display: 'flex',
            flex: 1,
            paddingTop: '20px',
            paddingBottom: '50px',
            backgroundColor: this.props.backgroundColor,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }
        },
        this.renderSections(),
        _react2.default.createElement(
          _Dialog.Dialog,
          {
            open: this.state.detailDialogOpen,
            onClose: function onClose(evt) {
              return _this5.setState({ detailDialogOpen: false, item: null });
            }
          },
          _react2.default.createElement(
            _Dialog.DialogSurface,
            { style: { maxHeight: '90vh' } },
            _react2.default.createElement(
              _Dialog.DialogHeader,
              null,
              _react2.default.createElement(
                _Dialog.DialogHeaderTitle,
                null,
                this.renderDetailsTitle()
              )
            ),
            _react2.default.createElement(
              _Dialog.DialogBody,
              {
                style: {
                  overflow: 'scroll',
                  overflowX: 'hidden',
                  overflowY: 'auto',
                  maxHeight: '60vh'
                }
              },
              this.renderDetails()
            ),
            _react2.default.createElement(
              _Dialog.DialogFooter,
              { style: { display: 'flex', justifyContent: 'center' } },
              _react2.default.createElement(
                _Dialog.DialogFooterButton,
                { cancel: true },
                'Back'
              )
            )
          ),
          _react2.default.createElement(_Dialog.DialogBackdrop, null)
        )
      );
    }
  }]);

  return Team;
}(_Component3.default);

exports.default = Team;