"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _uuid = _interopRequireDefault(require("uuid"));

var _responsive = require("../utils/responsive");

var _reactTransitionGroup = require("react-transition-group");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Component =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Component, _PureComponent);

  function Component(props) {
    var _this;

    _classCallCheck(this, Component);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Component).call(this, props));
    _this._kind = "".concat(_this.constructor.name.toLowerCase());
    _this._name = props.name || _this.kind;
    _this._index = props.index || 0;
    _this._id = props.id || "".concat(_this.name, "/").concat(_this.index); // `chunky-${uuid.v1()}`

    _this.triggerEvent = function (event, data) {
      return _this.onEvent.bind(_assertThisInitialized(_this), event, data);
    };

    return _this;
  }

  _createClass(Component, [{
    key: "onEvent",
    value: function onEvent() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var data = arguments.length > 1 ? arguments[1] : undefined;
      this.props.onEvent && this.props.onEvent({
        component: {
          id: this.id,
          kind: this.kind,
          name: this.name,
          index: this.index
        },
        name: name,
        data: data,
        id: "".concat(this.id).concat(name ? '/' + name : '')
      });
    }
  }, {
    key: "componentWillEnter",
    value: function componentWillEnter(callback) {
      callback();
    }
  }, {
    key: "componentWillLeave",
    value: function componentWillLeave(callback) {}
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "componentDidEnter",
    value: function componentDidEnter() {}
  }, {
    key: "componentDidLeave",
    value: function componentDidLeave() {}
  }, {
    key: "componentWillAppear",
    value: function componentWillAppear(callback) {
      callback();
    }
  }, {
    key: "componentDidAppear",
    value: function componentDidAppear() {}
  }, {
    key: "renderComponentCompact",
    value: function renderComponentCompact() {
      return this.renderComponent();
    }
  }, {
    key: "renderFade",
    value: function renderFade() {
      return _react["default"].createElement(_reactTransitionGroup.CSSTransition, {
        timeout: 500,
        classNames: "fade"
      }, this.props.children);
    }
  }, {
    key: "renderComponent",
    value: function renderComponent() {
      return this.props.children;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react["default"].createElement("div", {
        style: styles.container,
        ref: function ref(c) {
          return _this2.container = c;
        }
      }, (0, _responsive.renderResponsive)(this.id, this.renderComponentCompact(), this.renderComponent()));
    }
  }, {
    key: "index",
    get: function get() {
      return this._index;
    }
  }, {
    key: "kind",
    get: function get() {
      return this._kind;
    }
  }, {
    key: "name",
    get: function get() {
      return this._name;
    }
  }, {
    key: "id",
    get: function get() {
      return this._id;
    }
  }, {
    key: "width",
    get: function get() {
      return this.props.width;
    }
  }, {
    key: "height",
    get: function get() {
      return this.props.height;
    }
  }]);

  return Component;
}(_react.PureComponent);

exports["default"] = Component;
var styles = {
  container: {}
};