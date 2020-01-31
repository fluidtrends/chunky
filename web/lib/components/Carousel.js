"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Component2 = _interopRequireDefault(require("../core/Component"));

var _Text = _interopRequireDefault(require("./Text"));

var _Media = _interopRequireDefault(require("./Media"));

var _responsive = require("../utils/responsive");

var _typography = require("@rmwc/typography");

var _antd = require("antd");

var _circularProgress = require("@rmwc/circular-progress");

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

var ChunkyCarousel =
/*#__PURE__*/
function (_Component) {
  _inherits(ChunkyCarousel, _Component);

  function ChunkyCarousel(props) {
    var _this;

    _classCallCheck(this, ChunkyCarousel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ChunkyCarousel).call(this, props));
    _this.state = _objectSpread({}, _this.state, {
      testimonialsData: null
    });
    return _this;
  }

  _createClass(ChunkyCarousel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      _get(_getPrototypeOf(ChunkyCarousel.prototype), "componentDidMount", this).call(this);

      fetch(this.props.data).then(function (response) {
        return response.json();
      }).then(function (testimonialsData) {
        _this2.setState({
          testimonialsData: testimonialsData
        });
      })["catch"](function () {
        return '';
      });
    }
  }, {
    key: "renderText",
    value: function renderText() {
      return (0, _responsive.renderResponsive)('text', _react["default"].createElement(_Text["default"], {
        source: this.props.text,
        style: {
          width: "90vw",
          padding: '10px',
          paddingBottom: '60px'
        }
      }), _react["default"].createElement(_Text["default"], {
        source: this.props.text,
        style: {
          width: "70vw",
          paddingBottom: '60px'
        }
      }));
    }
  }, {
    key: "renderSlider",
    value: function renderSlider() {
      var _this3 = this;

      var testimonialsData = this.state.testimonialsData;
      return _react["default"].createElement(_antd.Carousel, {
        effect: "fade",
        autoplay: true
      }, testimonialsData && testimonialsData.map(function (item) {
        return _this3.renderCarouselItem(item);
      }));
    }
  }, {
    key: "renderCarouselItem",
    value: function renderCarouselItem(item) {
      var style = {
        alignSelf: 'center',
        marginTop: '20px',
        objectFit: 'cover',
        height: 150,
        width: 150,
        borderRadius: '50%',
        objectPosition: 'center center'
      };
      return _react["default"].createElement("div", null, _react["default"].createElement("div", {
        style: {
          display: 'flex',
          flex: 3,
          justifyContent: 'space-evenly',
          alignItems: 'center',
          padding: 20,
          flexDirection: 'row',
          height: '300px'
        }
      }, _react["default"].createElement("div", {
        style: {
          display: 'flex',
          flex: 1,
          justifyContent: 'center'
        }
      }, _react["default"].createElement(_Media["default"], {
        cache: this.props.cache,
        roundImg: true,
        image: item.imageUrl,
        style: style
      })), _react["default"].createElement("div", {
        style: {
          display: 'flex',
          flex: 2,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }
      }, _react["default"].createElement(_typography.Typography, {
        use: "subtitle1",
        tag: "h2",
        style: {
          color: this.props.textColor
        }
      }, "\"", item.text, "\""), _react["default"].createElement(_typography.Typography, {
        use: "subtitle1",
        tag: "h3",
        style: {
          color: this.props.personNameColor,
          fontWeight: 'bold'
        }
      }, item.person), _react["default"].createElement(_typography.Typography, {
        use: "subtitle1",
        tag: "h4",
        style: {
          color: this.props.descriptionColor
        }
      }, item.description))));
    }
  }, {
    key: "renderComponent",
    value: function renderComponent() {
      if (!this.state.testimonialsData) {
        return _react["default"].createElement("div", null, _react["default"].createElement(_circularProgress.CircularProgress, {
          size: "large"
        }));
      }

      return _react["default"].createElement("div", {
        style: {
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          margin: '100px 15px'
        }
      }, this.renderText(), this.renderSlider());
    }
  }]);

  return ChunkyCarousel;
}(_Component2["default"]);

exports["default"] = ChunkyCarousel;