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

var _AnimatedSection = require('./AnimatedSection');

var _AnimatedSection2 = _interopRequireDefault(_AnimatedSection);

var _responsive = require('../utils/responsive');

var _isElementVisible = require('../utils/isElementVisible');

var _button = require('@rmwc/button');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Feature = function (_Component) {
  _inherits(Feature, _Component);

  function Feature(props) {
    _classCallCheck(this, Feature);

    var _this = _possibleConstructorReturn(this, (Feature.__proto__ || Object.getPrototypeOf(Feature)).call(this, props));

    _this.state = _extends({}, _this.state, { startAnimation: false });
    _this.handleScrollToElement = _this.handleScrollToElement.bind(_this);
    return _this;
  }

  _createClass(Feature, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(Feature.prototype.__proto__ || Object.getPrototypeOf(Feature.prototype), 'componentDidMount', this).call(this);
      window.addEventListener('scroll', this.handleScrollToElement);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScrollToElement);
    }
  }, {
    key: 'handleScrollToElement',
    value: function handleScrollToElement() {
      if ((0, _isElementVisible.isAnyPartOfElementInViewport)(this.blockRef) && !this.state.startAnimation) {
        this.setState({ startAnimation: true });
        window.removeEventListener('scroll', this.handleScrollToElement);
      }
    }
  }, {
    key: 'renderContent',
    value: function renderContent(compact) {
      var animationType = this.props.reversed ? 'slideFromLeft' : 'slideFromRight';

      if (this.props.animation) {
        return _react2.default.createElement(
          _AnimatedSection2.default,
          {
            animationType: window.innerWidth > 1224 ? animationType : 'slideFromLeft',
            startAnimation: this.state.startAnimation
          },
          _react2.default.createElement(
            'div',
            {
              style: {
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: (compact ? 100 : 0) + 'px'
              } },
            this.text(),
            this.button()
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          {
            style: {
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: (compact ? 100 : 0) + 'px'
            } },
          this.text(),
          this.button()
        );
      }
    }
  }, {
    key: 'text',
    value: function text() {
      return (0, _responsive.renderResponsive)('text', _react2.default.createElement(_Text2.default, { source: this.props.text, style: {
          width: '90vw',
          marginBottom: '20px',
          color: this.props.textColor
        } }), _react2.default.createElement(_Text2.default, { source: this.props.text, style: {
          width: '40vw',
          color: this.props.textColor
        } }));
    }
  }, {
    key: 'button',
    value: function button() {
      return _react2.default.createElement(
        _button.Button,
        { style: {
            marginBottom: '30px'
          },
          onClick: this.triggerEvent(),
          raised: true,
          theme: 'secondary-bg text-primary-on-secondary' },
        this.props.actionTitle
      );
    }
  }, {
    key: 'image',
    value: function image() {
      var animationType = this.props.reversed ? 'slideFromRight' : 'slideFromLeft';

      if (this.props.animation) {
        return _react2.default.createElement(
          _AnimatedSection2.default,
          {
            animationType: window.innerWidth > 1224 ? animationType : 'slideFromLeft',
            startAnimation: this.state.startAnimation
          },
          (0, _responsive.renderResponsive)('image', _react2.default.createElement('img', { src: '/assets/' + this.props.image, style: {
              width: '90vw',
              marginTop: '60px',
              boxShadow: ' 0 5px 20px 0 rgba(0,0,0,.15)',
              marginBottom: '10px'
            } }), _react2.default.createElement('img', { src: '/assets/' + this.props.image, style: {
              width: '40vw',
              marginTop: '60px',
              boxShadow: ' 0 5px 20px 0 rgba(0,0,0,.15)',
              marginBottom: '60px'
            } }))
        );
      } else {
        return (0, _responsive.renderResponsive)('image', _react2.default.createElement('img', { src: '/assets/' + this.props.image, style: {
            width: '90vw',
            marginTop: '60px',
            boxShadow: ' 0 5px 20px 0 rgba(0,0,0,.15)',
            marginBottom: '10px'
          } }), _react2.default.createElement('img', { src: '/assets/' + this.props.image, style: {
            width: '40vw',
            marginTop: '60px',
            boxShadow: ' 0 5px 20px 0 rgba(0,0,0,.15)',
            marginBottom: '60px'
          } }));
      }
    }
  }, {
    key: 'renderBlock',
    value: function renderBlock(block, index) {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        {
          key: 'block' + index,
          ref: function ref(_ref) {
            return _this2.blockRef = _ref;
          },
          style: {
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          } },
        block
      );
    }
  }, {
    key: 'renderBlocks',
    value: function renderBlocks(blocks, compact) {
      var _this3 = this;

      var index = 0;

      return _react2.default.createElement(
        'div',
        {
          style: {
            color: '#607D8B',
            position: 'relative',
            display: 'flex',
            flex: 1,
            flexDirection: compact ? 'column' : 'row',
            alignItems: 'center',
            backgroundColor: this.props.backgroundColor,
            justifyContent: 'center'
          }
        },
        blocks.map(function (b) {
          return _this3.renderBlock(b, index++);
        })
      );
    }
  }, {
    key: 'renderDefault',
    value: function renderDefault(compact) {
      return this.renderBlocks([this.image(), this.renderContentComponent(compact)], compact);
    }
  }, {
    key: 'renderReversed',
    value: function renderReversed(compact) {
      return this.renderBlocks([this.renderContentComponent(compact), this.image()], compact);
    }
  }, {
    key: 'renderContentComponent',
    value: function renderContentComponent() {
      return this.props.renderContent ? this.props.renderContent() : this.renderContent();
    }
  }, {
    key: 'renderComponentCompact',
    value: function renderComponentCompact() {
      return this.renderDefault(true);
    }
  }, {
    key: 'renderComponent',
    value: function renderComponent() {
      return this.props.reversed ? this.renderReversed() : this.renderDefault();
    }
  }]);

  return Feature;
}(_Component3.default);

exports.default = Feature;