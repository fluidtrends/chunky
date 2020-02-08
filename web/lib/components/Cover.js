"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Component2 = _interopRequireDefault(require("../core/Component"));

var _Media = _interopRequireDefault(require("./Media"));

var _Timer = _interopRequireDefault(require("./Timer"));

var _antd = require("antd");

var _button = require("@rmwc/button");

var _typography = require("@rmwc/typography");

var _reactChunky = require("react-chunky");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var Cover =
/*#__PURE__*/
function (_Component) {
  _inherits(Cover, _Component);

  function Cover(props) {
    var _this;

    _classCallCheck(this, Cover);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Cover).call(this, props));
    _this.state = {
      strings: null,
      selectedLanguage: null
    };
    return _this;
  }

  _createClass(Cover, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      _get(_getPrototypeOf(Cover.prototype), "componentDidMount", this).call(this);

      if (this.props.theme && this.props.theme.translatedStrings) {
        this.getTranslations().then(function (strings) {
          _this2.getLanguage().then(function (selectedLanguage) {
            _this2.setState({
              selectedLanguage: selectedLanguage,
              strings: strings
            });
          });
        });
        return;
      }

      this.getLanguage().then(function (selectedLanguage) {
        selectedLanguage && _this2.setState({
          selectedLanguage: selectedLanguage
        });
      });
    }
  }, {
    key: "getTranslations",
    value: function getTranslations() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        fetch(_this3.props.theme.translatedStrings).then(function (response) {
          return response.json();
        }).then(function (translatedTexts) {
          resolve(translatedTexts[_this3.props.translationKey]);
        })["catch"](function () {
          return resolve();
        });
      });
    }
  }, {
    key: "getLanguage",
    value: function getLanguage() {
      return new Promise(function (resolve, reject) {
        _reactChunky.Data.Cache.retrieveCachedItem('selectedLanguage').then(function (selectedLanguage) {
          resolve(selectedLanguage);
        })["catch"](function () {
          resolve();
        });
      });
    }
  }, {
    key: "renderDefaultContent",
    value: function renderDefaultContent() {
      if (this.props.video) {
        return _react["default"].createElement("div", null);
      }

      return _react["default"].createElement("div", {
        style: {
          position: 'absolute',
          backgroundColor: "rgba(0,0,0,".concat(this.props.opacity, ")"),
          width: '100vw',
          height: '100%',
          top: 0,
          left: 0,
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }
      }, this.renderCoverTitle(), this.renderCoverSubtitle(), this.renderCoverAction());
    }
  }, {
    key: "renderSectionContent",
    value: function renderSectionContent() {
      if (this.props.video) {
        return _react["default"].createElement("div", null);
      }

      return _react["default"].createElement("div", {
        style: {
          position: 'absolute',
          backgroundColor: "rgba(0,0,0,".concat(this.props.opacity, ")"),
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }
      }, this.renderCoverTitle(), this.renderCoverSubtitle(), this.renderCoverAction());
    }
  }, {
    key: "onLinkClick",
    value: function onLinkClick(url) {
      window.open(url, '_blank');
    }
  }, {
    key: "renderCoverTitle",
    value: function renderCoverTitle() {
      if (!this.props.title) {
        return _react["default"].createElement("div", null);
      }

      var titleAdditionalStyle = this.props.titleStyle ? this.props.titleStyle : {};
      var translatedTitle = this.props.translation && this.state.strings && this.state.selectedLanguage ? this.state.strings[this.state.selectedLanguage].title : this.props.title;
      return _react["default"].createElement(_typography.Typography, {
        use: "headline4",
        style: _objectSpread({
          margin: '20px',
          color: this.props.color
        }, titleAdditionalStyle)
      }, ' ', translatedTitle);
    }
  }, {
    key: "renderCoverTimeline",
    value: function renderCoverTimeline() {
      var backgroundColor = '#00ACC1',
          textColor = '#ffffff';
      return _react["default"].createElement("div", {
        style: {
          maxWidth: 450,
          maxHeight: 300
        }
      }, _react["default"].createElement(_Timer["default"], {
        periods: this.props.timedPeriods,
        textColor: textColor,
        simple: true,
        actionTitle: "Buy tokens",
        onAction: this.triggerEvent()
      }));
    }
  }, {
    key: "renderCoverSubtitle",
    value: function renderCoverSubtitle() {
      if (!this.props.subtitle) {
        return _react["default"].createElement("div", null);
      }

      var subtitleAdditionalStyle = this.props.subtitleStyle ? this.props.subtitleStyle : {};
      var translatedSubtitle = this.props.translation && this.state.strings && this.state.selectedLanguage ? this.state.strings[this.state.selectedLanguage].subtitle : this.props.subtitle;
      return _react["default"].createElement(_typography.Typography, {
        use: "headline5",
        style: _objectSpread({
          margin: '20px',
          color: this.props.color
        }, subtitleAdditionalStyle)
      }, ' ', translatedSubtitle, ' ');
    }
  }, {
    key: "renderLogos",
    value: function renderLogos() {
      return _react["default"].createElement("div", {
        style: {
          position: 'absolute',
          left: '5%',
          top: '55%'
        }
      });
    }
  }, {
    key: "renderVideo",
    value: function renderVideo() {
      if (this.props.isSmallScreen) {
        return _react["default"].createElement("div", null);
      }

      var backgroundColor = '#00ACC1',
          textColor = '#ffffff';
      return _react["default"].createElement("div", {
        style: {
          padding: 20,
          width: 450,
          height: 300,
          position: 'relative'
        }
      }, _react["default"].createElement(_Media["default"], {
        video: this.props.introVideo,
        width: 450,
        height: 300,
        style: {
          position: 'absolute',
          top: 0,
          left: 0
        }
      }));
    }
  }, {
    key: "renderCoverAction",
    value: function renderCoverAction() {
      if (!this.props.primaryActionTitle) {
        return _react["default"].createElement("div", null);
      }

      return _react["default"].createElement(_button.Button, {
        onClick: this.triggerAction.bind(this),
        raised: true,
        theme: ["secondaryBg", "textPrimaryOnSecondary"],
        style: {
          margin: '20px',
          color: this.props.theme.mainActionTextColor || '#fff'
        }
      }, ' ', this.props.primaryActionTitle, ' ');
    }
  }, {
    key: "triggerAction",
    value: function triggerAction() {
      var link = this.props.cover.link;
      var localLink = this.props.cover.localLink;

      if (link) {
        this.onLinkClick(link);
      }

      if (localLink) {
        this.props.history.push(localLink);
      }

      this.triggerEvent();
    }
  }, {
    key: "renderSimpleContent",
    value: function renderSimpleContent(height, title) {
      return _react["default"].createElement("div", {
        style: {
          position: 'absolute',
          backgroundColor: "rgba(0,0,0,".concat(this.props.opacity, ")"),
          width: '100vw',
          height: "".concat(height, "px"),
          top: 0,
          left: 0,
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }
      }, _react["default"].createElement(_typography.Typography, {
        use: "headline3",
        style: {
          margin: '20px',
          color: this.props.color
        }
      }, ' ', title, ' '));
    }
  }, {
    key: "renderPresentationContent",
    value: function renderPresentationContent() {
      var _this$props = this.props,
          title = _this$props.title,
          subtitle = _this$props.subtitle;
      var titleAdditionalStyle = this.props.titleStyle ? this.props.titleStyle : {};
      var subtitleAdditionalStyle = this.props.subtitleStyle ? this.props.subtitleStyle : {};
      return _react["default"].createElement("div", {
        style: {
          position: 'absolute',
          width: '100vw',
          display: 'flex',
          top: "".concat(this.presentationHeight - this.menuHeight - 20),
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          flexDirection: 'column'
        }
      }, _react["default"].createElement(_typography.Typography, {
        use: "headline3",
        style: _objectSpread({
          margin: '20px',
          position: 'absolute',
          bottom: '-100px',
          color: this.props.color
        }, titleAdditionalStyle)
      }, ' ', title, ' '), subtitle && _react["default"].createElement(_typography.Typography, {
        use: "headline4",
        style: _objectSpread({
          margin: '20px',
          position: 'absolute',
          bottom: '-210px',
          color: this.props.color
        }, subtitleAdditionalStyle)
      }, subtitle));
    }
  }, {
    key: "renderMedia",
    value: function renderMedia(style, playing, innerHeight, loopVideo) {
      if (!this.props.image && !this.props.video) {
        return _react["default"].createElement("div", null);
      }

      return _react["default"].createElement(_Media["default"], {
        cache: this.props.cache,
        video: this.props.video,
        image: this.props.image,
        imageSmall: this.props.imageSmall,
        playing: playing,
        innerHeight: innerHeight,
        style: style,
        loop: loopVideo,
        height: this.props.additionalProps && this.props.additionalProps.height || null
      });
    }
  }, {
    key: "renderDefault",
    value: function renderDefault(title) {
      var height = this.props.height;
      var coverStyle = {
        width: '100%',
        height: "".concat(height, "px"),
        objectFit: 'cover',
        objectPosition: 'center center'
      };
      var coverPlaying = this.props.scroll < 200;
      return _react["default"].createElement("div", {
        style: {
          backgroundColor: this.props.backgroundColor,
          marginTop: "".concat(this.props.offset, "px"),
          height: "".concat(height, "px"),
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center'
        }
      }, this.renderMedia(coverStyle, coverPlaying), this.renderDefaultContent());
    }
  }, {
    key: "renderSimple",
    value: function renderSimple(height, title) {
      var coverStyle = {
        width: '100%',
        backgroundColor: this.props.backgroundColor,
        height: "".concat(height, "px"),
        objectFit: 'cover',
        objectPosition: 'center center'
      };
      var coverPlaying = this.props.scroll < 200;
      return _react["default"].createElement("div", {
        style: {
          backgroundColor: this.props.backgroundColor,
          marginTop: "".concat(this.props.offset, "px"),
          height: "".concat(height, "px"),
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center'
        }
      }, this.renderMedia(coverStyle, coverPlaying), this.renderSimpleContent(height, title));
    }
  }, {
    key: "renderPresentation",
    value: function renderPresentation() {
      var height = this.presentationHeight;
      var coverStyle = {
        width: '100%',
        height: "".concat(height, "px"),
        backgroundColor: this.props.backgroundColor,
        objectFit: 'cover',
        objectPosition: 'center center'
      };
      var coverPlaying = this.props.scroll < 200;
      var loopVideo = true;
      return _react["default"].createElement("div", {
        style: {
          backgroundColor: this.props.backgroundColor,
          marginTop: "".concat(this.props.offset, "px"),
          height: "".concat(height + 2, "px"),
          display: 'flex',
          overflow: 'hidden',
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center'
        }
      }, this.renderMedia(coverStyle, coverPlaying, "".concat(height - 100, "px"), loopVideo), this.renderPresentationContent());
    }
  }, {
    key: "renderSection",
    value: function renderSection() {
      var height = this.props.height;
      var coverStyle = {
        width: '100%',
        height: "".concat(height, "px"),
        objectFit: 'cover',
        opacity: 0.8,
        objectPosition: 'center center'
      };
      var coverPlaying = this.props.scroll < 200;
      return _react["default"].createElement("div", {
        style: {
          backgroundColor: this.props.backgroundColor,
          marginTop: "".concat(this.props.offset, "px"),
          height: "".concat(height, "px"),
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center'
        }
      }, this.renderMedia(coverStyle, coverPlaying), this.renderSectionContent());
    }
  }, {
    key: "renderMenu",
    value: function renderMenu() {
      return this.renderSimple(this.menuHeight);
    }
  }, {
    key: "render",
    value: function render() {
      switch (this.type) {
        case 'presentation':
          return this.renderPresentation();

        case 'simple':
          return this.renderSimple(this.simpleHeight, this.props.title);

        case 'menu':
          return this.renderMenu();

        case 'section':
          return this.renderSection();

        default:
          return this.renderDefault();
      }
    }
  }, {
    key: "presentationHeight",
    get: function get() {
      return this.props.presentationHeight || 500;
    }
  }, {
    key: "simpleHeight",
    get: function get() {
      return 300;
    }
  }, {
    key: "menuHeight",
    get: function get() {
      return 75;
    }
  }, {
    key: "type",
    get: function get() {
      return this.props.type || 'default';
    }
  }]);

  return Cover;
}(_Component2["default"]);

exports["default"] = Cover;