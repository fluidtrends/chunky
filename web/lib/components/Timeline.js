"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Component2 = _interopRequireDefault(require("../core/Component"));

var _Text = _interopRequireDefault(require("./Text"));

var _responsive = require("../utils/responsive");

var _linearProgress = require("@rmwc/linear-progress");

var _antd = require("antd");

var _typography = require("@rmwc/typography");

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

var ChunkyTimeline =
/*#__PURE__*/
function (_Component) {
  _inherits(ChunkyTimeline, _Component);

  function ChunkyTimeline(props) {
    var _this;

    _classCallCheck(this, ChunkyTimeline);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ChunkyTimeline).call(this, props));
    _this.state = _objectSpread({}, _this.state, {
      loading: false
    });
    return _this;
  }

  _createClass(ChunkyTimeline, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _get(_getPrototypeOf(ChunkyTimeline.prototype), "componentDidMount", this).call(this);
    }
  }, {
    key: "renderText",
    value: function renderText() {
      return (0, _responsive.renderResponsive)('text', _react["default"].createElement(_Text["default"], {
        source: this.state.period.text,
        style: {
          width: "90vw",
          padding: '10px'
        }
      }), _react["default"].createElement(_Text["default"], {
        source: this.state.period.text,
        style: {
          width: "70vw",
          paddingBottom: '10px'
        }
      }));
    }
  }, {
    key: "renderMilestone",
    value: function renderMilestone(item) {
      var _this$props = this.props,
          doneColor = _this$props.doneColor,
          progressColor = _this$props.progressColor,
          todoColor = _this$props.todoColor,
          doneIcon = _this$props.doneIcon,
          progressIcon = _this$props.progressIcon,
          todoIcon = _this$props.todoIcon;
      var iconColor, iconType;

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
      return _react["default"].createElement(_antd.Timeline.Item, {
        dot: _react["default"].createElement(_antd.Icon, {
          type: iconType,
          style: {
            fontSize: '20px',
            color: iconColor
          }
        })
      }, _react["default"].createElement("div", {
        style: {
          boxShadow: 'rgba(224,224,224,1) 0px 5px 20px 0px',
          display: 'flex',
          alignItems: 'center',
          padding: '15px',
          opacity: opacity,
          backgroundColor: backgroundColor
        }
      }, _react["default"].createElement(_typography.Typography, {
        use: "headline5",
        style: {
          paddingRight: '5px',
          paddingLeft: '5px',
          textDecoration: strikeStyle
        }
      }, item.title)));
    }
  }, {
    key: "renderTimeline",
    value: function renderTimeline() {
      var _this2 = this;

      if (!this.props.milestones) {
        return;
      }

      return _react["default"].createElement(_antd.Timeline, {
        mode: "alternate"
      }, this.props.milestones.map(function (milestone) {
        return _this2.renderMilestone(milestone);
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

      return _react["default"].createElement("div", {
        style: {
          color: this.props.textColor,
          backgroundColor: this.props.backgroundColor
        }
      }, this.renderTimeline(), _react["default"].createElement("div", {
        style: {
          display: 'flex',
          flex: 1,
          justifyContent: 'center'
        }
      }, _react["default"].createElement(_antd.Button, {
        style: {
          backgroundColor: '#009688',
          borderColor: '#009688',
          width: '50%'
        },
        type: "primary",
        href: 'https://github.com/fluidtrends/carmel/projects/1?fullscreen=true',
        target: '_blank'
      }, "Our progress so far", _react["default"].createElement(_antd.Icon, {
        type: "setting",
        spin: true
      }))));
    }
  }]);

  return ChunkyTimeline;
}(_Component2["default"]);

exports["default"] = ChunkyTimeline;