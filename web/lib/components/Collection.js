"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Component2 = _interopRequireDefault(require("../core/Component"));

var _button = require("@rmwc/button");

var _typography = require("@rmwc/typography");

var _chip = require("@rmwc/chip");

var _fab = require("@rmwc/fab");

var _card = require("@rmwc/card");

var _Media = _interopRequireDefault(require("./Media"));

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

var colors = {
  'Beginner': '#65bb6a',
  'Entry': '#F57C00',
  'Intermediate': '#FDD835',
  'Advanced': '#E64A19',
  'Expert': '#1565C0'
};

var Collection =
/*#__PURE__*/
function (_Component) {
  _inherits(Collection, _Component);

  function Collection(props) {
    var _this;

    _classCallCheck(this, Collection);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Collection).call(this, props));
    _this.state = _objectSpread({}, _this.state);
    return _this;
  }

  _createClass(Collection, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _get(_getPrototypeOf(Collection.prototype), "componentDidMount", this).call(this);
    }
  }, {
    key: "renderCardMedia",
    value: function renderCardMedia(item) {
      var image = item.thumbnail || item.imageSmall || item.image;

      if (!image) {
        return _react["default"].createElement("div", null);
      }

      var style = {
        alignSelf: 'center',
        width: '320px',
        height: '170px',
        objectFit: 'cover',
        objectPosition: 'center center'
      };
      var innerWidth = '320px';
      var props = Object.assign({}, this.props);
      delete props.video;
      return _react["default"].createElement(_card.CardMedia, {
        style: {
          backgroundColor: item.backgroundColor
        }
      }, _react["default"].createElement(_Media["default"], {
        cache: this.props.cache,
        image: image,
        desktop: this.props.desktop,
        innerWidth: innerWidth,
        style: style
      }));
    }
  }, {
    key: "renderCard",
    value: function renderCard(item, index) {
      var details = item.details.substring(0, 120);
      return _react["default"].createElement(_card.Card, {
        style: {
          width: '320px'
        },
        key: "item".concat(index)
      }, _react["default"].createElement(_button.Button, {
        onClick: this.triggerEvent(item.name || index, item.action),
        style: {
          padding: 0,
          height: '100%'
        }
      }, this.renderCardMedia(item)), _react["default"].createElement("div", {
        style: {
          padding: '0 1rem 1rem 1rem'
        }
      }, _react["default"].createElement(_typography.Typography, {
        use: "title",
        tag: "h2"
      }, item.title), _react["default"].createElement(_typography.Typography, {
        use: "subheading1",
        tag: "h3",
        theme: "text-secondary-on-background",
        style: {
          marginTop: '1rem'
        }
      }, "".concat(details, " ..."))), this.renderCardTags(item), _react["default"].createElement(_card.CardActions, {
        style: {
          justifyContent: 'center',
          marginBottom: '1rem'
        }
      }, this.renderCardButtons(item, index)));
    }
  }, {
    key: "renderCardButtons",
    value: function renderCardButtons(item, index) {
      if (this.props.renderCardButtons) {
        return this.props.renderCardButtons(item, index);
      }

      return _react["default"].createElement(_card.CardActionButtons, null, _react["default"].createElement(_card.CardAction, {
        onClick: this.triggerEvent(item.name || index, Object.assign({}, item.action, {
          primary: true
        }))
      }, " ", item.actionTitle || 'Learn More', " "), this.renderSecondaryCardButton(item, index));
    }
  }, {
    key: "renderCardTag",
    value: function renderCardTag(tag, index) {
      return _react["default"].createElement(_chip.Chip, {
        key: index,
        style: {
          background: 'red',
          color: 'white'
        }
      }, _react["default"].createElement("div", null));
    }
  }, {
    key: "renderCardTags",
    value: function renderCardTags(item) {
      var _this2 = this;

      if (!item.tags) {
        return _react["default"].createElement("div", null);
      }

      var index = 0;
      return _react["default"].createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center'
        }
      }, _react["default"].createElement(_chip.ChipSet, {
        style: {
          flex: 2
        }
      }, item.tags.map(function (t) {
        return _this2.renderCardTag(t, index++);
      })));
    }
  }, {
    key: "renderSecondaryCardButton",
    value: function renderSecondaryCardButton(item, index) {
      if (!item.actionTitleSecondary) {
        return _react["default"].createElement("div", null);
      }

      return _react["default"].createElement(_card.CardAction, {
        onClick: this.triggerEvent(item.name || index, Object.assign({}, item.action, {
          secondary: true
        }))
      }, " ", item.actionTitleSecondary || 'Learn More', " ");
    }
  }, {
    key: "renderChipset",
    value: function renderChipset(item, index) {
      return _react["default"].createElement(_chip.ChipSet, {
        style: {
          flex: 2
        }
      }, _react["default"].createElement(_chip.Chip, {
        style: {
          background: colors[item.category],
          color: 'white'
        }
      }, _react["default"].createElement(_typography.Typography, {
        use: "caption"
      }, item.category)), _react["default"].createElement(_chip.Chip, {
        style: {
          background: '#90A4AE',
          color: 'white'
        }
      }, _react["default"].createElement(_typography.Typography, {
        use: "caption"
      }, item.label)));
    }
  }, {
    key: "renderChallenge",
    value: function renderChallenge(item, index) {
      var details = item.details.substring(0, 50);
      return _react["default"].createElement(_card.Card, {
        style: {
          width: '320px'
        },
        key: "item".concat(index)
      }, this.renderCardMedia(item), _react["default"].createElement("div", {
        style: {
          padding: '0 1rem 1rem 1rem'
        }
      }, _react["default"].createElement(_typography.Typography, {
        use: "title",
        tag: "h2"
      }, item.title), _react["default"].createElement(_typography.Typography, {
        use: "subheading1",
        tag: "h3",
        theme: "text-secondary-on-background",
        style: {
          marginTop: '1rem'
        }
      }, details, "..."), _react["default"].createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center'
        }
      }, this.renderChipset(item, index), _react["default"].createElement(_fab.Fab, {
        mini: true
      }, "star"), _react["default"].createElement(_typography.Typography, {
        use: "title",
        style: {
          marginLeft: 5
        }
      }, item.xp))), _react["default"].createElement(_card.CardActions, {
        style: {
          justifyContent: 'center',
          marginBottom: '1rem'
        }
      }, _react["default"].createElement(_card.CardActionButtons, null, _react["default"].createElement(_card.CardAction, {
        onClick: this.triggerEvent(item.name || index, item.action)
      }, " ", item.actionTitle || 'Learn More', " "))));
    }
  }, {
    key: "renderItem",
    value: function renderItem(item, index) {
      return _react["default"].createElement("div", {
        key: "item-".concat(index),
        style: {
          padding: '20px'
        }
      }, this.renderItemType(item, index));
    }
  }, {
    key: "renderItemType",
    value: function renderItemType(item, index) {
      switch (this.type) {
        case 'challenges':
          return this.renderChallenge(item, index);

        default:
          return this.renderCard(item, index);
      }
    }
  }, {
    key: "renderItems",
    value: function renderItems() {
      var _this3 = this;

      var index = 0;
      return this.categories.map(function (item) {
        return _this3.renderItem(item, index++);
      });
    }
  }, {
    key: "renderCollection",
    value: function renderCollection() {
      return _react["default"].createElement("div", {
        style: {
          display: 'flex',
          flex: 1,
          flexWrap: 'wrap',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'center'
        }
      }, this.renderItems());
    }
  }, {
    key: "renderDefault",
    value: function renderDefault() {
      return this.renderCollection();
    }
  }, {
    key: "renderComponent",
    value: function renderComponent() {
      return this.renderDefault();
    }
  }, {
    key: "render",
    value: function render() {
      return _get(_getPrototypeOf(Collection.prototype), "render", this).call(this);
    }
  }, {
    key: "categories",
    get: function get() {
      return this.props.categories || [];
    }
  }, {
    key: "type",
    get: function get() {
      return this.props.type || 'default';
    }
  }]);

  return Collection;
}(_Component2["default"]);

exports["default"] = Collection;