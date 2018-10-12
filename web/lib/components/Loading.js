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

var _typography = require('@rmwc/typography');

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoadingComponent = function (_Component) {
  _inherits(LoadingComponent, _Component);

  function LoadingComponent(props) {
    _classCallCheck(this, LoadingComponent);

    var _this = _possibleConstructorReturn(this, (LoadingComponent.__proto__ || Object.getPrototypeOf(LoadingComponent)).call(this, props));

    _this.state = _extends({}, _get(LoadingComponent.prototype.__proto__ || Object.getPrototypeOf(LoadingComponent.prototype), 'state', _this));
    return _this;
  }

  _createClass(LoadingComponent, [{
    key: 'render',
    value: function render() {
      var indicator = _react2.default.createElement(_antd.Icon, { type: 'loading', style: { fontSize: 48, color: '#039BE5' }, spin: true });

      return _react2.default.createElement(
        'div',
        {
          style: {
            display: 'flex',
            flex: 1,
            height: '300px',
            margin: '10px',
            backgroundColor: '#ffffff',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
          }
        },
        _react2.default.createElement(_antd.Spin, { indicator: indicator, style: { padding: '40px' } }),
        _react2.default.createElement(
          _typography.Typography,
          { use: 'title', style: { color: '#B0BEC5' }, tag: 'h1' },
          this.props.message
        )
      );
    }
  }]);

  return LoadingComponent;
}(_Component3.default);

exports.default = LoadingComponent;