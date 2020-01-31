"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _typography = require("@rmwc/typography");

var _button = require("@rmwc/button");

var _card = require("@rmwc/card");

var _dialog = require("@rmwc/dialog");

var _Component2 = _interopRequireDefault(require("../core/Component"));

var _Text = _interopRequireDefault(require("./Text"));

var _responsive = require("../utils/responsive");

var _Media = _interopRequireDefault(require("./Media"));

var _reactChunky = require("react-chunky");

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

var Team =
/*#__PURE__*/
function (_Component) {
  _inherits(Team, _Component);

  function Team(props) {
    var _this;

    _classCallCheck(this, Team);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Team).call(this, props));
    _this.state = _objectSpread({}, _this.state, {
      detailDialogOpen: false,
      item: null,
      selectedLanguage: null,
      strings: null
    });
    return _this;
  }

  _createClass(Team, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      _get(_getPrototypeOf(Team.prototype), "componentDidMount", this).call(this);

      _reactChunky.Data.Cache.retrieveCachedItem('selectedLanguage').then(function (lang) {
        _this2.setState({
          selectedLanguage: lang
        });
      })["catch"](function () {
        return;
      });

      fetch(this.props.theme.translatedStrings).then(function (response) {
        return response.json();
      }).then(function (translatedTexts) {
        _this2.setState({
          strings: translatedTexts['team']
        });
      })["catch"](function () {
        return '';
      });
    }
  }, {
    key: "renderText",
    value: function renderText(text) {
      return (0, _responsive.renderResponsive)('text', _react["default"].createElement(_Text["default"], {
        source: text,
        style: {
          padding: '10px'
        }
      }), _react["default"].createElement(_Text["default"], {
        source: text,
        style: {
          paddingBottom: '10px'
        }
      }));
    }
  }, {
    key: "renderCardMedia",
    value: function renderCardMedia(item) {
      var _this3 = this;

      var image = item.image;

      if (!image) {
        return _react["default"].createElement("div", null);
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
      return _react["default"].createElement(_card.CardMedia, {
        style: {
          backgroundColor: item.backgroundColor,
          cursor: this.props.imageClickable && !this.state.detailDialogOpen ? 'pointer' : 'initial'
        },
        onClick: function onClick() {
          _this3.props.imageClickable ? _this3.setState({
            detailDialogOpen: true,
            item: item
          }) : false;
        }
      }, _react["default"].createElement(_Media["default"], {
        cache: this.props.cache,
        roundImg: true,
        image: image,
        style: style
      }));
    }
  }, {
    key: "onLinkClick",
    value: function onLinkClick(url) {
      window.open(url, '_blank');
    }
  }, {
    key: "renderCard",
    value: function renderCard(item, index) {
      var _this4 = this;

      var linkedIn = item.linkedIn,
          github = item.github,
          website = item.website,
          text = item.text;
      var width = this.props.small ? 230 : 320;
      var height = this.props.small ? 340 : 540;
      var translatedBtnSeeMoreText = this.props.translation && this.state.strings && this.state.selectedLanguage ? this.state.strings[this.state.selectedLanguage]["btnTextDetails"] : 'See more';
      return _react["default"].createElement(_card.Card, {
        style: {
          width: width,
          height: height,
          margin: 20,
          textAlign: 'center'
        },
        key: "item".concat(index)
      }, this.renderCardMedia(item), _react["default"].createElement("div", {
        style: {
          padding: '15px 1rem 1rem 1rem',
          textAlign: 'right'
        }
      }, _react["default"].createElement("div", {
        style: {
          height: 140
        }
      }, _react["default"].createElement(_typography.Typography, {
        use: "headline",
        tag: "h2",
        style: {
          textAlign: 'center',
          fontWeight: 700,
          paddingBottom: '10px'
        }
      }, item.name), _react["default"].createElement(_typography.Typography, {
        use: "title",
        tag: "h3",
        style: {
          textAlign: 'center'
        }
      }, item.title)), _react["default"].createElement("div", {
        style: {
          textAlign: 'center'
        }
      }, _react["default"].createElement("div", {
        style: {
          display: 'flex',
          justifyContent: 'center'
        }
      }, github && _react["default"].createElement(_button.ButtonIcon, {
        style: {
          cursor: 'pointer'
        },
        onClick: function onClick() {
          _this4.onLinkClick(item.github);
        }
      }, _react["default"].createElement("img", {
        src: this.props.githubIcon
      })), linkedIn && _react["default"].createElement(_button.ButtonIcon, {
        style: {
          cursor: 'pointer'
        },
        onClick: function onClick() {
          _this4.onLinkClick(item.linkedIn);
        }
      }, _react["default"].createElement("img", {
        src: this.props.linkedinIcon
      })), website && _react["default"].createElement(_button.ButtonIcon, {
        style: {
          cursor: 'pointer'
        },
        onClick: function onClick() {
          _this4.onLinkClick(item.website);
        }
      }, _react["default"].createElement("img", {
        src: this.props.webIcon
      }))), text && _react["default"].createElement(_button.Button, {
        style: {
          marginTop: 10
        },
        onClick: function onClick() {
          _this4.setState({
            detailDialogOpen: true,
            item: item
          });
        }
      }, translatedBtnSeeMoreText))));
    }
  }, {
    key: "renderDetails",
    value: function renderDetails() {
      var item = this.state.item;

      if (!item) {
        return;
      }

      return this.renderText(item.text);
    }
  }, {
    key: "renderDetailsTitle",
    value: function renderDetailsTitle() {
      var item = this.state.item;

      if (!item) {
        return;
      }

      return this.renderCardMedia(item);
    }
  }, {
    key: "renderTeamMemebers",
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
    key: "renderSection",
    value: function renderSection(section, index) {
      var style = this.props.small ? {
        color: 'white',
        textShadow: '2px 2px 5px #607D8B'
      } : {
        color: this.props.textColor ? this.props.textColor : '#000'
      };
      var translatedTitle = this.props.translation && this.state.strings && this.state.selectedLanguage ? this.state.strings[this.state.selectedLanguage]["section".concat(index)]["title"] : section.title;
      return _react["default"].createElement("div", {
        key: 'section' + index,
        style: {
          padding: '0 1rem 1rem 1rem',
          textAlign: 'right'
        }
      }, _react["default"].createElement(_typography.Typography, {
        use: "display1",
        tag: "h1",
        style: style
      }, translatedTitle), _react["default"].createElement("div", {
        style: {
          display: 'flex',
          flex: 1,
          flexWrap: 'wrap',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }, this.renderTeamMemebers(section.members)));
    }
  }, {
    key: "renderTeamSections",
    value: function renderTeamSections() {
      var _this6 = this;

      var index = 0;
      return this.props.sections.map(function (section, index) {
        return _this6.renderSection(section, index);
      });
    }
  }, {
    key: "renderSections",
    value: function renderSections() {
      return _react["default"].createElement("div", {
        style: {
          display: 'flex',
          flex: 1,
          flexWrap: 'wrap',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }, this.renderTeamSections());
    }
  }, {
    key: "renderDialog",
    value: function renderDialog() {
      var _this7 = this;

      var translatedBtnBackText = this.props.translation && this.state.strings && this.state.selectedLanguage ? this.state.strings[this.state.selectedLanguage]["btnTextGoBack"] : 'Back';
      return _react["default"].createElement(_dialog.Dialog, {
        open: this.state.detailDialogOpen,
        onClose: function onClose(evt) {
          _this7.setState({
            detailDialogOpen: false
          });
        }
      }, _react["default"].createElement(_dialog.DialogTitle, null, this.renderDetailsTitle()), _react["default"].createElement(_dialog.DialogContent, null, this.renderDetails()), _react["default"].createElement(_dialog.DialogActions, {
        style: {
          display: 'flex',
          justifyContent: 'center'
        }
      }, _react["default"].createElement(_dialog.DialogButton, {
        action: "close"
      }, translatedBtnBackText)));
    }
  }, {
    key: "renderComponent",
    value: function renderComponent() {
      if (!this.props.sections) {
        return _react["default"].createElement("div", null);
      }

      return _react["default"].createElement("div", {
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
      }, this.renderSections(), this.renderDialog());
    }
  }]);

  return Team;
}(_Component2["default"]);

exports["default"] = Team;