"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SocialIcons =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(SocialIcons, _PureComponent);

  function SocialIcons(props) {
    _classCallCheck(this, SocialIcons);

    return _possibleConstructorReturn(this, _getPrototypeOf(SocialIcons).call(this, props));
  }

  _createClass(SocialIcons, [{
    key: "goto",
    value: function goto(url) {
      window.open(this.props.socialMediaLinks[url], '_blank');
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var socialNetworks = ['twitter', 'youtube', 'github', 'linkedin', 'facebook', 'medium', 'instagram'];
      var align = this.props.isSmallScreen ? 'center' : 'center';
      var overflow = this.props.isSmallScreen ? 'auto' : 'unset';
      var fontSize = this.props.isSmallScreen ? 20 : this.props.size || 36;
      var padding = this.props.isSmallScreen ? 6 : 10;
      var direction = this.props.vertical ? 'column' : 'row';
      return _react["default"].createElement("div", {
        style: {
          display: 'flex',
          flexDirection: window.outerWidth < 840 && this.props.socialMediaLinks.customItems && this.props.children ? 'column' : direction,
          alignItems: 'center',
          flexWrap: 'wrap',
          alignSelf: align,
          overflow: overflow
        }
      }, this.props && this.props.socialMediaLinks && socialNetworks.map(function (key) {
        if (!_this.props && !_this.props.socialMediaLinks[key]) return null;
        return _react["default"].createElement("div", {
          key: key
        }, _react["default"].createElement(_antd.Icon, {
          theme: "twoTone",
          type: key,
          twoToneColor: "#00bcd4",
          className: "icon",
          onClick: _this["goto"].bind(_this, key),
          style: {
            cursor: 'pointer',
            fontSize: fontSize,
            padding: padding
          }
        }));
      }), this.props && this.props.socialMediaLinks && this.props.socialMediaLinks.customItems && this.props.socialMediaLinks.customItems.map(function (item) {
        return _react["default"].createElement("div", null, _react["default"].createElement("a", {
          href: item.link,
          target: '_blank',
          className: "icon",
          style: {
            cursor: 'pointer',
            padding: 10,
            fontSize: 24,
            textDecoration: 'none'
          }
        }, item.title));
      }), this.props.children);
    }
  }]);

  return SocialIcons;
}(_react.PureComponent);

exports["default"] = SocialIcons;