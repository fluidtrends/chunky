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

var _Button = require('rmwc/Button');

var _LinearProgress = require('rmwc/LinearProgress');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactVerticalTimelineComponent = require('react-vertical-timeline-component');

require('react-vertical-timeline-component/style.min.css');

var _Card = require('rmwc/Card');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Timeline = function (_Component) {
  _inherits(Timeline, _Component);

  function Timeline(props) {
    _classCallCheck(this, Timeline);

    var _this = _possibleConstructorReturn(this, (Timeline.__proto__ || Object.getPrototypeOf(Timeline)).call(this, props));

    _this.state = _extends({}, _this.state, { loading: false });
    return _this;
  }

  _createClass(Timeline, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(Timeline.prototype.__proto__ || Object.getPrototypeOf(Timeline.prototype), 'componentDidMount', this).call(this);
    }
  }, {
    key: 'renderText',
    value: function renderText() {
      return (0, _responsive.renderResponsive)('text', _react2.default.createElement(_Text2.default, {
        source: this.state.period.text,
        style: {
          width: '90vw',
          padding: '10px'
        }
      }), _react2.default.createElement(_Text2.default, {
        source: this.state.period.text,
        style: {
          width: '70vw',
          paddingBottom: '10px'
        }
      }));
    }
  }, {
    key: 'triggerRawRedirect',
    value: function triggerRawRedirect(url) {
      window.open(url, '_blank');
    }
  }, {
    key: 'renderMilestone',
    value: function renderMilestone(item, index) {
      var _this2 = this;

      var iconBackground = (0, _moment2.default)().isAfter(item.until) ? this.props.pastColor : this.props.inProgressColor;
      console.log(this);
      return _react2.default.createElement(
        _reactVerticalTimelineComponent.VerticalTimelineElement,
        {
          key: index,
          className: 'vertical-timeline-element--work',
          date: item.date,
          iconStyle: {
            background: iconBackground,
            color: item.color,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          },
          icon: _react2.default.createElement(_Icon.Icon, { use: item.icon })
        },
        _react2.default.createElement(
          'h3',
          { className: 'vertical-timeline-element-title' },
          item.title
        ),
        _react2.default.createElement(
          'h4',
          { className: 'vertical-timeline-element-subtitle' },
          item.subtitle
        ),
        _react2.default.createElement(
          'p',
          { className: 'vertical-timeline-element-subtitle' },
          item.text
        ),
        _react2.default.createElement(
          'div',
          { style: { display: 'flex', flex: 1, justifyContent: 'flex-end' } },
          _react2.default.createElement(
            _Button.Button,
            { onClick: function onClick() {
                return _this2.triggerRawRedirect(item.link);
              } },
            'More...'
          )
        )
      );
    }
  }, {
    key: 'renderTimeline',
    value: function renderTimeline() {
      var _this3 = this;

      if (!this.props.milestones) {
        return;
      }

      return _react2.default.createElement(
        _reactVerticalTimelineComponent.VerticalTimeline,
        { style: { marginTop: 0 } },
        this.props.milestones.map(function (milestone) {
          return _this3.renderMilestone(milestone);
        })
      );
    }
  }, {
    key: 'renderComponent',
    value: function renderComponent() {
      if (this.state.loading) {
        return _react2.default.createElement(
          'div',
          {
            style: {
              display: 'flex',
              flex: 1,
              margin: '10px',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center'
            }
          },
          _react2.default.createElement(
            _Card.Card,
            { style: { width: '80vw', margin: '20px', padding: '0px' } },
            _react2.default.createElement(_LinearProgress.LinearProgress, { determinate: false })
          )
        );
      }

      return _react2.default.createElement(
        'div',
        {
          style: {
            color: this.props.textColor,
            backgroundColor: this.props.backgroundColor
          }
        },
        this.renderTimeline()
      );
    }
  }]);

  return Timeline;
}(_Component3.default);

exports.default = Timeline;