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

var _linearProgress = require('@rmwc/linear-progress');

var _antd = require('antd');

var _typography = require('@rmwc/typography');

var _Card = require('rmwc/Card');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChunkyTimeline = function (_Component) {
  _inherits(ChunkyTimeline, _Component);

  function ChunkyTimeline(props) {
    _classCallCheck(this, ChunkyTimeline);

    var _this = _possibleConstructorReturn(this, (ChunkyTimeline.__proto__ || Object.getPrototypeOf(ChunkyTimeline)).call(this, props));

    _this.state = _extends({}, _this.state, { loading: false });
    return _this;
  }

  _createClass(ChunkyTimeline, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(ChunkyTimeline.prototype.__proto__ || Object.getPrototypeOf(ChunkyTimeline.prototype), 'componentDidMount', this).call(this);
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
    key: 'renderMilestone',
    value: function renderMilestone(item) {
      var _props = this.props,
          doneColor = _props.doneColor,
          progressColor = _props.progressColor,
          todoColor = _props.todoColor,
          doneIcon = _props.doneIcon,
          progressIcon = _props.progressIcon,
          todoIcon = _props.todoIcon;

      var iconColor = void 0,
          iconType = void 0;

      switch (item.status) {
        case 'done':
          iconColor = doneColor;
          iconType = doneIcon;
          break;
        case 'progress':
          iconColor = progressColor;
          iconType = progressIcon;
          break;
        case 'todo':
          iconColor = todoColor;
          iconType = todoIcon;
          break;
        default:
          break;
      }

      var strikeStyle = item.status === 'done' ? 'line-through' : '',
          opacity = item.status === 'todo' ? 0.5 : 1,
          backgroundColor = item.status === 'progress' ? '#80CBC4' : '';

      return _react2.default.createElement(
        _antd.Timeline.Item,
        { dot: _react2.default.createElement(_antd.Icon, { type: iconType, style: { fontSize: '20px', color: iconColor } }) },
        _react2.default.createElement(
          'div',
          { style: { boxShadow: 'rgba(224,224,224,1) 0px 5px 20px 0px', display: 'flex', alignItems: 'center', padding: '15px', opacity: opacity, backgroundColor: backgroundColor } },
          _react2.default.createElement(
            _typography.Typography,
            { use: 'headline5', style: { paddingRight: '5px', paddingLeft: '5px', textDecoration: strikeStyle } },
            item.title
          )
        )
      );
    }
  }, {
    key: 'renderTimeline',
    value: function renderTimeline() {
      var _this2 = this;

      if (!this.props.milestones) {
        return;
      }

      return _react2.default.createElement(
        _antd.Timeline,
        { mode: 'alternate' },
        this.props.milestones.map(function (milestone) {
          return _this2.renderMilestone(milestone);
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
            _react2.default.createElement(_linearProgress.LinearProgress, { determinate: false })
          )
        );
      }

      return _react2.default.createElement(
        'div',
        {
          style: {
            color: this.props.textColor,
            backgroundColor: this.props.backgroundColor
          } },
        this.renderTimeline(),
        _react2.default.createElement(
          'div',
          { style: { display: 'flex', flex: 1, justifyContent: 'center' } },
          _react2.default.createElement(
            _antd.Button,
            { style: { backgroundColor: '#009688', borderColor: '#009688', width: '50%' }, type: 'primary', href: 'https://github.com/fluidtrends/carmel/projects/1?fullscreen=true', target: '_blank' },
            'Our progress so far',
            _react2.default.createElement(_antd.Icon, { type: 'setting', spin: true })
          )
        )
      );
    }
  }]);

  return ChunkyTimeline;
}(_Component3.default);

exports.default = ChunkyTimeline;