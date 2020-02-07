"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactProgressiveImage = _interopRequireDefault(require("react-progressive-image"));

var _reactPlayer = _interopRequireDefault(require("react-player"));

var _responsive = require("../utils/responsive");

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

var Media =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Media, _PureComponent);

  function Media(props) {
    _classCallCheck(this, Media);

    return _possibleConstructorReturn(this, _getPrototypeOf(Media).call(this, props));
  }

  _createClass(Media, [{
    key: "renderImage",
    value: function renderImage(name, src, placeholder) {
      var _this = this;

      return _react["default"].createElement(_reactProgressiveImage["default"], {
        src: src,
        placeholder: placeholder
      }, function (src, loading) {
        var _this$props = _this.props,
            innerHeight = _this$props.innerHeight,
            innerWidth = _this$props.innerWidth;
        var style = Object.assign({}, _this.props.style, {
          opacity: _this.props.style.opacity ? _this.props.style.opacity : 1,
          height: _this.props.style.height,
          top: 0,
          width: innerWidth || '100vw'
        });

        if (!loading && innerHeight) {
          return _react["default"].createElement("img", {
            height: innerHeight,
            src: src,
            alt: name
          });
        }

        if (_this.props.roundImg) {
          return _react["default"].createElement("img", {
            style: _this.props.style,
            src: src,
            alt: name
          });
        }

        if (!loading && innerWidth) {
          return _react["default"].createElement("img", {
            width: innerWidth,
            src: src,
            alt: name
          });
        }

        return _react["default"].createElement("img", {
          style: style,
          src: src,
          alt: name
        });
      });
    }
  }, {
    key: "renderResponsiveImage",
    value: function renderResponsiveImage(image) {
      var placeholderImage = "".concat(this.props.desktop ? '../../../../' : '/', "assets/placeholder.jpg");

      if (!image) {
        return (0, _responsive.renderResponsive)('media', this.renderImage('', this.props.imageSmall ? this.props.imageSmall : this.props.image, placeholderImage), this.renderImage('', this.props.image, placeholderImage));
      }

      return (0, _responsive.renderResponsive)(image.id, this.renderImage(this.props.image, image.data.images[0].path, image.data.placeholder), this.renderImage(this.props.image, image.data.images[1].path, image.data.placeholder));
    }
  }, {
    key: "onVideoPlayerEvent",
    value: function onVideoPlayerEvent(type, data) {
      this.props.onVideoPlayerEvent && this.props.onVideoPlayerEvent(type, data);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.props.video) {
        return _react["default"].createElement(_reactPlayer["default"], {
          className: 'video-wrapper',
          ref: function ref(player) {
            _this2.coverPlayer = player;
          },
          onReady: function onReady() {
            return _this2.onVideoPlayerEvent('ready', {
              player: _this2.coverPlayer
            });
          },
          onProgress: function onProgress(progress) {
            return _this2.onVideoPlayerEvent('progress', {
              progress: progress
            });
          },
          onEnded: function onEnded() {
            return _this2.onVideoPlayerEvent('done', {});
          },
          onError: function onError(error) {
            return _this2.onVideoPlayerEvent('error', {
              error: error
            });
          },
          url: this.props.video,
          playing: this.props.playing,
          width: this.props.width || '100vw',
          height: this.props.height || '100vh',
          style: this.props.style,
          loop: this.props.loop,
          muted: this.props.muted,
          volume: this.props.muted ? 0 : 1,
          config: {
            file: {
              attributes: {
                autoPlay: true,
                muted: this.props.muted
              }
            }
          }
        });
      }

      if (this.props.image.split('http://').length > 1 || this.props.image.split('https://').length > 1) {
        return this.renderResponsiveImage();
      }

      if (!this.props.image || !this.props.cache.image) {
        return _react["default"].createElement("div", null);
      }

      var i = this.props.cache.image("".concat(this.props.image));
      return this.renderResponsiveImage(i);
    }
  }]);

  return Media;
}(_react.PureComponent);

exports["default"] = Media;