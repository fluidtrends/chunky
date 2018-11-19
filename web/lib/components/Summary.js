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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Summary = function (_Component) {
  _inherits(Summary, _Component);

  function Summary(props) {
    _classCallCheck(this, Summary);

    var _this = _possibleConstructorReturn(this, (Summary.__proto__ || Object.getPrototypeOf(Summary)).call(this, props));

    _this.state = _extends({}, _this.state);
    return _this;
  }

  _createClass(Summary, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(Summary.prototype.__proto__ || Object.getPrototypeOf(Summary.prototype), 'componentDidMount', this).call(this);
    }
  }, {
    key: 'renderText',
    value: function renderText() {
      return (0, _responsive.renderResponsive)('text', _react2.default.createElement(_Text2.default, { source: this.props.text, style: {
          width: '90vw',
          padding: '10px',
          paddingBottom: '60px'
        } }), _react2.default.createElement(_Text2.default, { source: this.props.text, style: {
          width: '70vw',
          paddingBottom: '60px'
        } }));
    }
  }, {
    key: 'renderComponent',
    value: function renderComponent() {
      var _ref;

      return _react2.default.createElement(
        'div',
        { style: (_ref = {
            color: this.props.textColor,
            position: 'relative',
            padding: '60px 0',
            display: 'flex'
          }, _defineProperty(_ref, 'padding', '40px 0'), _defineProperty(_ref, 'flex', 1), _defineProperty(_ref, 'flexDirection', 'column'), _defineProperty(_ref, 'alignItems', 'center'), _defineProperty(_ref, 'justifyContent', 'center'), _ref) },
        _react2.default.createElement('img', { src: '/assets/' + this.props.image, style: {
            width: '200px',
            marginTop: '20px',
            marginBottom: '-20px'
          } }),
        this.renderText()
      );
    }
  }]);

  return Summary;
}(_Component3.default);

exports.default = Summary;