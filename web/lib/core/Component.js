'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _responsive = require('../utils/responsive');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = function (_PureComponent) {
  _inherits(Component, _PureComponent);

  function Component(props) {
    _classCallCheck(this, Component);

    var _this = _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this, props));

    _this._kind = '' + _this.constructor.name.toLowerCase();
    _this._name = props.name || _this.kind;
    _this._index = props.index || 0;
    _this._id = props.id || _this.name + '/' + _this.index; // `chunky-${uuid.v1()}`
    _this.triggerEvent = function (event, data) {
      return _this.onEvent.bind(_this, event, data);
    };
    return _this;
  }

  _createClass(Component, [{
    key: 'onEvent',
    value: function onEvent() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var data = arguments[1];

      this.props.onEvent && this.props.onEvent({
        component: { id: this.id, kind: this.kind, name: this.name, index: this.index },
        name: name,
        data: data,
        id: '' + this.id + (name ? '/' + name : '')
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillAppear',
    value: function componentWillAppear(callback) {
      callback();
    }
  }, {
    key: 'componentDidAppear',
    value: function componentDidAppear() {}
  }, {
    key: 'componentDidEnter',
    value: function componentDidEnter() {}
  }, {
    key: 'componentDidLeave',
    value: function componentDidLeave() {}
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {}
  }, {
    key: 'componentWillEnter',
    value: function componentWillEnter(callback) {
      var el = this.container;
      TweenMax.fromTo(el, 0.3, { y: 100, opacity: 0 }, { y: 0, opacity: 1, onComplete: callback });
    }
  }, {
    key: 'componentWillLeave',
    value: function componentWillLeave(callback) {
      var el = this.container;
      TweenMax.fromTo(el, 0.3, { y: 0, opacity: 1 }, { y: -100, opacity: 0, onComplete: callback });
    }
  }, {
    key: 'renderComponentCompact',
    value: function renderComponentCompact() {
      return this.renderComponent();
    }
  }, {
    key: 'renderComponent',
    value: function renderComponent() {
      return this.props.children;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { style: styles.container, ref: function ref(c) {
            return _this2.container = c;
          } },
        (0, _responsive.renderResponsive)(this.id, this.renderComponentCompact(), this.renderComponent())
      );
    }
  }, {
    key: 'index',
    get: function get() {
      return this._index;
    }
  }, {
    key: 'kind',
    get: function get() {
      return this._kind;
    }
  }, {
    key: 'name',
    get: function get() {
      return this._name;
    }
  }, {
    key: 'id',
    get: function get() {
      return this._id;
    }
  }, {
    key: 'width',
    get: function get() {
      return this.props.width;
    }
  }, {
    key: 'height',
    get: function get() {
      return this.props.height;
    }
  }]);

  return Component;
}(_react.PureComponent);

exports.default = Component;


var styles = {
  container: {}
};