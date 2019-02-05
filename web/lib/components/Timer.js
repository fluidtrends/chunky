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

var _typography = require('@rmwc/typography');

var _reactCountdownNow = require('react-countdown-now');

var _reactCountdownNow2 = _interopRequireDefault(_reactCountdownNow);

var _elevation = require('@rmwc/elevation');

var _chip = require('@rmwc/chip');

var _button = require('@rmwc/button');

var _linearProgress = require('@rmwc/linear-progress');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _card = require('@rmwc/card');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Timer = function (_Component) {
  _inherits(Timer, _Component);

  function Timer(props) {
    _classCallCheck(this, Timer);

    var _this = _possibleConstructorReturn(this, (Timer.__proto__ || Object.getPrototypeOf(Timer)).call(this, props));

    _this.state = _extends({}, _this.state, { loading: true });
    _this._clockRenderer = _this.clockRenderer.bind(_this);
    _this._onComplete = _this.onComplete.bind(_this);
    _this._clockTick = _this.clockTick.bind(_this);
    return _this;
  }

  _createClass(Timer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(Timer.prototype.__proto__ || Object.getPrototypeOf(Timer.prototype), 'componentDidMount', this).call(this);
      this.refreshPeriods();
    }
  }, {
    key: 'refreshPeriods',
    value: function refreshPeriods() {
      var period = void 0;

      var periods = this.props.periods;


      for (var i = 0; i < periods.length; i++) {
        if (!periods[i].until || !periods[i].text) {
          break;
        }
        if (i + 1 === periods.length) {
          period = periods[i];
          break;
        }

        if ((0, _moment2.default)().isBefore(periods[i].until)) {
          period = periods[i];
          break;
        }
      }

      if (!period) {
        this.setState({ loading: false });
        return;
      }

      this.setState({ period: period, loading: false });
    }
  }, {
    key: 'renderText',
    value: function renderText() {
      return (0, _responsive.renderResponsive)('text', _react2.default.createElement(_Text2.default, { source: this.state.period.text, style: {
          width: '90vw',
          padding: '10px',
          color: 'white'
        } }), _react2.default.createElement(_Text2.default, { source: this.state.period.text, style: {
          width: '70vw',
          color: 'white',
          paddingBottom: '10px'
        } }));
    }
  }, {
    key: 'renderSimpleText',
    value: function renderSimpleText() {
      return _react2.default.createElement(
        _typography.Typography,
        { use: 'headline4', style: { margin: '10px', color: this.props.textColor } },
        this.state.period.text
      );
    }
  }, {
    key: 'renderInfo',
    value: function renderInfo() {
      return _react2.default.createElement(
        _typography.Typography,
        { use: 'headline5', style: { marginBottom: '10px', color: this.props.textColor } },
        this.state.period.info
      );
    }
  }, {
    key: 'renderAction',
    value: function renderAction() {
      return _react2.default.createElement(
        _button.Button,
        { onClick: this.state.period.onAction || this.triggerEvent(), raised: true, style: { padding: '0 20px' }, theme: 'secondary-bg text-primary-on-secondary' },
        this.state.period.actionTitle
      );
    }
  }, {
    key: 'onComplete',
    value: function onComplete() {
      this._clockRenderer = this.clockRenderer.bind(this);
      this.refreshPeriods();
    }
  }, {
    key: 'clockTick',
    value: function clockTick() {
      // this.refreshPeriods()
    }
  }, {
    key: 'clockRenderer',
    value: function clockRenderer(_ref) {
      var days = _ref.days,
          hours = _ref.hours,
          minutes = _ref.minutes,
          seconds = _ref.seconds,
          completed = _ref.completed;

      var size = this.props.isSmallScreen ? 'headline6' : 'headline6';
      var margin = this.props.isSmallScreen ? '5' : '20';
      var width = this.props.isSmallScreen ? '30' : '50';
      var height = this.props.isSmallScreen ? '140' : '50';
      var typographyStyle = { margin: margin + 'px', color: '#fff' };

      var style = {
        border: '2px solid #4ebcd4',
        backgroundColor: '#fff',
        color: "#4ebcd4",
        padding: 2,
        width: width,
        height: 40
      };

      return _react2.default.createElement(
        _chip.ChipSet,
        null,
        _react2.default.createElement(
          _chip.Chip,
          { style: style },
          _react2.default.createElement(
            _typography.Typography,
            { use: size, style: typographyStyle },
            _react2.default.createElement(
              _chip.ChipText,
              { style: { marginLeft: 5, color: '#4ebcd4' } },
              days,
              'd'
            )
          )
        ),
        _react2.default.createElement(
          _chip.Chip,
          { style: style },
          _react2.default.createElement(
            _typography.Typography,
            { use: size, style: typographyStyle },
            _react2.default.createElement(
              _chip.ChipText,
              { style: { color: '#4ebcd4' } },
              hours,
              'h'
            )
          )
        ),
        _react2.default.createElement(
          _chip.Chip,
          { style: style },
          _react2.default.createElement(
            _typography.Typography,
            { use: size, style: typographyStyle },
            _react2.default.createElement(
              _chip.ChipText,
              { style: { color: '#4ebcd4' } },
              minutes,
              'm'
            )
          )
        ),
        _react2.default.createElement(
          _chip.Chip,
          { style: style },
          _react2.default.createElement(
            _typography.Typography,
            { use: size, style: typographyStyle },
            _react2.default.createElement(
              _chip.ChipText,
              { style: { color: '#4ebcd4' } },
              seconds,
              's'
            )
          )
        )
      );
    }
  }, {
    key: 'renderClock',
    value: function renderClock() {
      var size = this.props.isSmallScreen ? 'title' : 'headline';
      var margin = '20';

      return _react2.default.createElement(
        _typography.Typography,
        { use: size, style: { marginBottom: margin + 'px', textAlign: 'center' } },
        _react2.default.createElement(_reactCountdownNow2.default, {
          date: this.state.period.until,
          zeroPadLength: 3,
          onTick: this._clockTick,
          onComplete: this._onComplete,
          renderer: this._clockRenderer })
      );
    }
  }, {
    key: 'renderComponent',
    value: function renderComponent() {
      if (this.state.loading) {
        return _react2.default.createElement(
          'div',
          { style: { display: 'flex', flex: 1, margin: '10px', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' } },
          _react2.default.createElement(
            _card.Card,
            { style: { width: '80vw', margin: '20px', padding: '0px' } },
            _react2.default.createElement(_linearProgress.LinearProgress, { determinate: false })
          )
        );
      }

      if (!this.state.period) {
        return _react2.default.createElement('div', null);
      }

      return _react2.default.createElement(
        'div',
        { style: {
            color: 'white',
            position: 'relative',
            display: 'flex',
            flex: 1,
            paddingTop: '20px',
            backgroundColor: this.props.backgroundColor,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          } },
        this.renderSimpleText(),
        this.renderClock(),
        this.renderInfo()
      );
    }
  }]);

  return Timer;
}(_Component3.default);

exports.default = Timer;