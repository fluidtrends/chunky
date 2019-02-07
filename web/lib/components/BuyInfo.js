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

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BuyInfo = function (_Component) {
  _inherits(BuyInfo, _Component);

  function BuyInfo(props) {
    _classCallCheck(this, BuyInfo);

    var _this = _possibleConstructorReturn(this, (BuyInfo.__proto__ || Object.getPrototypeOf(BuyInfo)).call(this, props));

    _this.state = _extends({}, _this.state, { hovered: false });
    return _this;
  }

  _createClass(BuyInfo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(BuyInfo.prototype.__proto__ || Object.getPrototypeOf(BuyInfo.prototype), 'componentDidMount', this).call(this);
    }
  }, {
    key: 'renderText',
    value: function renderText() {
      return (0, _responsive.renderResponsive)('text', _react2.default.createElement(_Text2.default, { source: this.props.text, style: {
          width: '90vw',
          padding: '10px',
          color: '#455A64',
          paddingBottom: '60px'
        } }), _react2.default.createElement(_Text2.default, { source: this.props.text, style: {
          width: '70vw',
          color: '#455A64',
          paddingBottom: '60px'
        } }));
    }
  }, {
    key: 'renderButton',
    value: function renderButton() {
      var _this2 = this;

      var _props$components$get = this.props.components.getAccess,
          path = _props$components$get.path,
          link = _props$components$get.link;

      return _react2.default.createElement(
        _antd.Button,
        {
          href: path ? path : link,
          type: 'primary',
          style: { backgroundColor: this.state.hovered ? this.props.hoveredButtonColor : this.props.buttonColor, border: 0, marginBottom: '30px', padding: '2px 15px' },
          onMouseEnter: function onMouseEnter() {
            _this2.setState({ hovered: true });
          },
          onMouseLeave: function onMouseLeave() {
            _this2.setState({ hovered: false });
          }
        },
        this.props.action,
        _react2.default.createElement(_antd.Icon, { type: 'arrow-right', style: { marginLeft: this.state.hovered ? '30px' : '5px' } })
      );
    }
  }, {
    key: 'renderComponent',
    value: function renderComponent() {
      return _react2.default.createElement(
        'div',
        {
          style: { display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', margin: '100px 15px', backgroundColor: '#FBFBFB' }
        },
        this.renderText(),
        this.renderButton()
      );
    }
  }]);

  return BuyInfo;
}(_Component3.default);

exports.default = BuyInfo;