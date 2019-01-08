'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactProgressiveImage = require('react-progressive-image');

var _reactProgressiveImage2 = _interopRequireDefault(_reactProgressiveImage);

var _reactPlayer = require('react-player');

var _reactPlayer2 = _interopRequireDefault(_reactPlayer);

var _responsive = require('../utils/responsive');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Media = function (_PureComponent) {
  _inherits(Media, _PureComponent);

  function Media(props) {
    _classCallCheck(this, Media);

    return _possibleConstructorReturn(this, (Media.__proto__ || Object.getPrototypeOf(Media)).call(this, props));
  }

  _createClass(Media, [{
    key: 'renderImage',
    value: function renderImage(name, src, placeholder) {
      var _this2 = this;

      return _react2.default.createElement(
        _reactProgressiveImage2.default,
        { src: src, placeholder: placeholder },
        function (src, loading) {
          var _props = _this2.props,
              innerHeight = _props.innerHeight,
              innerWidth = _props.innerWidth;

          var style = Object.assign({}, _this2.props.style, {
            opacity: _this2.props.style.opacity ? _this2.props.style.opacity : 1,
            height: _this2.props.style.height,
            width: innerWidth || '100vw'
          });
          if (!loading && innerHeight) {
            return _react2.default.createElement('img', { height: innerHeight, src: src, alt: name });
          }
          if (_this2.props.roundImg) {
            return _react2.default.createElement('img', { style: _this2.props.style, src: src, alt: name });
          }
          if (!loading && innerWidth) {
            return _react2.default.createElement('img', { width: innerWidth, src: src, alt: name });
          }
          return _react2.default.createElement('img', { style: style, src: src, alt: name });
        }
      );
    }
  }, {
    key: 'renderResponsiveImage',
    value: function renderResponsiveImage(image) {
      var placeholderImage = (this.props.desktop ? '../../../../' : '/') + 'assets/placeholder.jpg';

      if (!image) {
        return (0, _responsive.renderResponsive)('media', this.renderImage('', this.props.imageSmall ? this.props.imageSmall : this.props.image, placeholderImage), this.renderImage('', this.props.image, placeholderImage));
      }

      return (0, _responsive.renderResponsive)(image.id, this.renderImage(this.props.image, image.data.images[0].path, image.data.placeholder), this.renderImage(this.props.image, image.data.images[1].path, image.data.placeholder));
    }
  }, {
    key: 'onVideoPlayerEvent',
    value: function onVideoPlayerEvent(type, data) {
      this.props.onVideoPlayerEvent && this.props.onVideoPlayerEvent(type, data);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (this.props.video) {
        return _react2.default.createElement(_reactPlayer2.default, {
          className: 'video-wrapper',
          ref: function ref(player) {
            _this3.coverPlayer = player;
          },
          onReady: function onReady() {
            return _this3.onVideoPlayerEvent('ready', { player: _this3.coverPlayer });
          },
          onProgress: function onProgress(progress) {
            return _this3.onVideoPlayerEvent('progress', { progress: progress });
          },
          onEnded: function onEnded() {
            return _this3.onVideoPlayerEvent('done', {});
          },
          onError: function onError(error) {
            return _this3.onVideoPlayerEvent('error', { error: error });
          },
          url: this.props.video,
          playing: this.props.playing,
          width: this.props.width || '100vw',
          height: this.props.height || '100vh',
          style: this.props.style,
          loop: this.props.loop,
          muted: true,
          volume: 0,
          config: {
            file: {
              attributes: {
                autoPlay: true,
                muted: true
              }
            }
          }
        });
      }

      if (this.props.image.split('http://').length > 1 || this.props.image.split('https://').length > 1) {
        return this.renderResponsiveImage();
      }

      if (!this.props.image || !this.props.cache.image) {
        return _react2.default.createElement('div', null);
      }

      var i = this.props.cache.image('' + this.props.image);
      return this.renderResponsiveImage(i);
    }
  }]);

  return Media;
}(_react.PureComponent);

exports.default = Media;