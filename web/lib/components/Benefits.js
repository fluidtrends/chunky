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

var _AnimatedSvg = require('./AnimatedSvg');

var _AnimatedSvg2 = _interopRequireDefault(_AnimatedSvg);

var _responsive = require('../utils/responsive');

var _Zoom = require('react-reveal/Zoom');

var _Zoom2 = _interopRequireDefault(_Zoom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Benefits = function (_Component) {
  _inherits(Benefits, _Component);

  function Benefits(props) {
    _classCallCheck(this, Benefits);

    var _this = _possibleConstructorReturn(this, (Benefits.__proto__ || Object.getPrototypeOf(Benefits)).call(this, props));

    _this.state = _extends({}, _this.state);
    return _this;
  }

  _createClass(Benefits, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(Benefits.prototype.__proto__ || Object.getPrototypeOf(Benefits.prototype), 'componentDidMount', this).call(this);
    }
  }, {
    key: 'text',
    value: function text(name, index, total) {
      return (0, _responsive.renderResponsive)('text', _react2.default.createElement(_Text2.default, {
        source: name,
        style: {
          width: '90vw',
          color: this.props.textColor
        }
      }), _react2.default.createElement(_Text2.default, {
        source: name,
        style: {
          width: 80 / total + 'vw',
          color: this.props.textColor
        }
      }));
    }
  }, {
    key: 'button',
    value: function button() {
      return _react2.default.createElement('div', null);
    }
  }, {
    key: 'image',
    value: function image(_image, index, total) {
      var fileType = _image.split('.')[_image.split('.').length - 1];

      if (fileType === 'svg') {
        return (0, _responsive.renderResponsive)('image', _react2.default.createElement(_AnimatedSvg2.default, {
          id: '' + _image,
          src: '/assets/' + _image,
          duration: 200,
          style: {
            width: '90vw'
          }
        }), _react2.default.createElement(_AnimatedSvg2.default, {
          id: '' + _image,
          src: '/assets/' + _image,
          duration: 200,
          style: {
            width: 90 / total + 'vw'
          }
        }));
      } else {
        return (0, _responsive.renderResponsive)('image', _react2.default.createElement('img', {
          src: '/assets/' + _image,
          style: {
            width: '90vw'
          }
        }), _react2.default.createElement('img', {
          src: '/assets/' + _image,
          style: {
            width: 100 / total + 'vw'
          }
        }));
      }
    }
  }, {
    key: 'renderBlock',
    value: function renderBlock(block, index, total) {
      return _react2.default.createElement(
        'div',
        {
          key: 'block' + index,
          style: {
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }
        },
        this.image(block.image, index, total),
        this.text(block.text, index, total)
      );
    }
  }, {
    key: 'renderBlocks',
    value: function renderBlocks(benefits, compact) {
      var _this2 = this;

      var index = 0;
      var total = benefits.length;
      if (this.props.animation === 'zoom') {
        //TODO: ADD DYNAMICALLY OPTIONS FROM CHUNK.JSON
        return _react2.default.createElement(
          _Zoom2.default,
          { cascade: true, top: true },
          _react2.default.createElement(
            'div',
            {
              style: {
                color: this.props.textColor,
                position: 'relative',
                display: 'flex',
                flex: 1,
                flexDirection: compact ? 'column' : 'row',
                alignItems: compact ? 'center' : 'center',
                backgroundColor: this.props.backgroundColor,
                justifyContent: 'center'
              }
            },
            benefits.map(function (b) {
              return _this2.renderBlock(b, index++, total);
            })
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          {
            style: {
              color: this.props.textColor,
              position: 'relative',
              display: 'flex',
              flex: 1,
              flexDirection: compact ? 'column' : 'row',
              alignItems: compact ? 'center' : 'center',
              backgroundColor: this.props.backgroundColor,
              justifyContent: 'center'
            }
          },
          benefits.map(function (b) {
            return _this2.renderBlock(b, index++, total);
          })
        );
      }
    }
  }, {
    key: 'renderDefault',
    value: function renderDefault(compact) {
      return this.renderBlocks(this.props.benefits, compact);
    }
  }, {
    key: 'renderComponentCompact',
    value: function renderComponentCompact() {
      return this.renderDefault(true);
    }
  }, {
    key: 'renderComponent',
    value: function renderComponent() {
      return this.renderDefault();
    }
  }]);

  return Benefits;
}(_Component3.default);

exports.default = Benefits;