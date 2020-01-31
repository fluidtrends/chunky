"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Component2 = _interopRequireDefault(require("../core/Component"));

var _Text = _interopRequireDefault(require("./Text"));

var _responsive = require("../utils/responsive");

var _typography = require("@rmwc/typography");

var _reactCountdownNow = _interopRequireDefault(require("react-countdown-now"));

var _elevation = require("@rmwc/elevation");

var _chip = require("@rmwc/chip");

var _button = require("@rmwc/button");

var _linearProgress = require("@rmwc/linear-progress");

var _moment = _interopRequireDefault(require("moment"));

var _card = require("@rmwc/card");

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

var Timer =
/*#__PURE__*/
function (_Component) {
  _inherits(Timer, _Component);

  function Timer(props) {
    var _this;

    _classCallCheck(this, Timer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Timer).call(this, props));
    _this.state = _objectSpread({}, _this.state, {
      loading: true
    });
    _this._clockRenderer = _this.clockRenderer.bind(_assertThisInitialized(_this));
    _this._onComplete = _this.onComplete.bind(_assertThisInitialized(_this));
    _this._clockTick = _this.clockTick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Timer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _get(_getPrototypeOf(Timer.prototype), "componentDidMount", this).call(this);

      this.refreshPeriods();
    }
  }, {
    key: "refreshPeriods",
    value: function refreshPeriods() {
      var period;
      var periods = this.props.periods;

      for (var i = 0; i < periods.length; i++) {
        if (!periods[i].until || !periods[i].text) {
          break;
        }

        if (i + 1 === periods.length) {
          period = periods[i];
          break;
        }

        if ((0, _moment["default"])().isBefore(periods[i].until)) {
          period = periods[i];
          break;
        }
      }

      if (!period) {
        this.setState({
          loading: false
        });
        return;
      }

      this.setState({
        period: period,
        loading: false
      });
    }
  }, {
    key: "renderText",
    value: function renderText() {
      return (0, _responsive.renderResponsive)('text', _react["default"].createElement(_Text["default"], {
        source: this.state.period.text,
        style: {
          width: "90vw",
          padding: '10px',
          color: 'white'
        }
      }), _react["default"].createElement(_Text["default"], {
        source: this.state.period.text,
        style: {
          width: "70vw",
          color: 'white',
          paddingBottom: '10px'
        }
      }));
    }
  }, {
    key: "renderSimpleText",
    value: function renderSimpleText() {
      return _react["default"].createElement(_typography.Typography, {
        use: "headline4",
        style: {
          margin: '10px',
          color: this.props.textColor
        }
      }, this.state.period.text);
    }
  }, {
    key: "renderInfo",
    value: function renderInfo() {
      return _react["default"].createElement(_typography.Typography, {
        use: "headline5",
        style: {
          marginBottom: '10px',
          color: this.props.textColor
        }
      }, this.state.period.info);
    }
  }, {
    key: "renderAction",
    value: function renderAction() {
      return _react["default"].createElement(_button.Button, {
        onClick: this.state.period.onAction || this.triggerEvent(),
        raised: true,
        style: {
          padding: '0 20px'
        },
        theme: "secondaryBg textPrimaryOnSecondary"
      }, this.state.period.actionTitle);
    }
  }, {
    key: "onComplete",
    value: function onComplete() {
      this._clockRenderer = this.clockRenderer.bind(this);
      this.refreshPeriods();
    }
  }, {
    key: "clockTick",
    value: function clockTick() {// this.refreshPeriods()
    }
  }, {
    key: "clockRenderer",
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
      var typographyStyle = {
        margin: "".concat(margin, "px"),
        color: '#fff'
      };
      var style = {
        border: '2px solid #4ebcd4',
        backgroundColor: '#fff',
        color: "#4ebcd4",
        padding: 2,
        width: width,
        height: 40
      };
      return _react["default"].createElement(_chip.ChipSet, null, _react["default"].createElement(_chip.Chip, {
        style: style
      }, _react["default"].createElement(_typography.Typography, {
        use: size,
        style: typographyStyle
      }, _react["default"].createElement(_chip.ChipText, {
        style: {
          marginLeft: 5,
          color: '#4ebcd4'
        }
      }, days, "d"))), _react["default"].createElement(_chip.Chip, {
        style: style
      }, _react["default"].createElement(_typography.Typography, {
        use: size,
        style: typographyStyle
      }, _react["default"].createElement(_chip.ChipText, {
        style: {
          color: '#4ebcd4'
        }
      }, hours, "h"))), _react["default"].createElement(_chip.Chip, {
        style: style
      }, _react["default"].createElement(_typography.Typography, {
        use: size,
        style: typographyStyle
      }, _react["default"].createElement(_chip.ChipText, {
        style: {
          color: '#4ebcd4'
        }
      }, minutes, "m"))), _react["default"].createElement(_chip.Chip, {
        style: style
      }, _react["default"].createElement(_typography.Typography, {
        use: size,
        style: typographyStyle
      }, _react["default"].createElement(_chip.ChipText, {
        style: {
          color: '#4ebcd4'
        }
      }, seconds, "s"))));
    }
  }, {
    key: "renderClock",
    value: function renderClock() {
      var size = this.props.isSmallScreen ? 'title' : 'headline';
      var margin = '20';
      return _react["default"].createElement(_typography.Typography, {
        use: size,
        style: {
          marginBottom: "".concat(margin, "px"),
          textAlign: 'center'
        }
      }, _react["default"].createElement(_reactCountdownNow["default"], {
        date: this.state.period.until,
        zeroPadLength: 3,
        onTick: this._clockTick,
        onComplete: this._onComplete,
        renderer: this._clockRenderer
      }));
    }
  }, {
    key: "renderComponent",
    value: function renderComponent() {
      if (this.state.loading) {
        return _react["default"].createElement("div", {
          style: {
            display: 'flex',
            flex: 1,
            margin: '10px',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
          }
        }, _react["default"].createElement(_card.Card, {
          style: {
            width: '80vw',
            margin: '20px',
            padding: '0px'
          }
        }, _react["default"].createElement(_linearProgress.LinearProgress, {
          determinate: false
        })));
      }

      if (!this.state.period) {
        return _react["default"].createElement("div", null);
      }

      return _react["default"].createElement("div", {
        style: {
          color: 'white',
          position: 'relative',
          display: 'flex',
          flex: 1,
          paddingTop: '20px',
          backgroundColor: this.props.backgroundColor,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }, this.renderSimpleText(), this.renderClock(), this.renderInfo());
    }
  }]);

  return Timer;
}(_Component2["default"]);

exports["default"] = Timer;