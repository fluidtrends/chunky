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

var _isElementVisible = require('../utils/isElementVisible');

var _AnimatedSection = require('./AnimatedSection');

var _AnimatedSection2 = _interopRequireDefault(_AnimatedSection);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Summary = function (_Component) {
		_inherits(Summary, _Component);

		function Summary(props) {
				_classCallCheck(this, Summary);

				var _this = _possibleConstructorReturn(this, (Summary.__proto__ || Object.getPrototypeOf(Summary)).call(this, props));

				_this.state = _extends({}, _this.state, { startAnimation: false });
				_this.handleScrollToElement = _this.handleScrollToElement.bind(_this);
				return _this;
		}

		_createClass(Summary, [{
				key: 'componentDidMount',
				value: function componentDidMount() {
						_get(Summary.prototype.__proto__ || Object.getPrototypeOf(Summary.prototype), 'componentDidMount', this).call(this);
						window.addEventListener('scroll', this.handleScrollToElement);
				}
		}, {
				key: 'componentWillUnmount',
				value: function componentWillUnmount() {
						window.removeEventListener('scroll', this.handleScrollToElement);
				}
		}, {
				key: 'handleScrollToElement',
				value: function handleScrollToElement() {
						if ((0, _isElementVisible.isAnyPartOfElementInViewport)(this.previewRef) && !this.state.startAnimation) {
								this.setState({ startAnimation: true });
								window.removeEventListener('scroll', this.handleScrollToElement);
						}
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
				key: 'renderImage',
				value: function renderImage() {
						return (0, _responsive.renderResponsive)('image', _react2.default.createElement('img', { src: '/assets/' + this.props.image, style: {
										width: '80vw',
										opacity: 0.8,
										zIndex: 0,
										boxShadow: ' 0 5px 20px 0 rgba(0,0,0,.15)'
								} }), _react2.default.createElement('img', { src: '/assets/' + this.props.image, style: {
										width: '700px',
										opacity: 0.8,
										zIndex: 0,
										boxShadow: ' 0 5px 20px 0 rgba(0,0,0,.15)'
								} }));
				}
		}, {
				key: 'renderImgPreview',
				value: function renderImgPreview() {
						var fontSize = this.props.isSmallScreen ? 40 : 70;

						return _react2.default.createElement(
								_AnimatedSection2.default,
								{ animationType: 'opacity', startAnimation: this.state.startAnimation, config: { tension: 20, friction: 60 } },
								_react2.default.createElement(
										'div',
										{
												style: { width: '90vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }
										},
										this.renderImage(),
										_react2.default.createElement(
												_antd.Button,
												{ type: 'primary', className: 'icon', theme: 'filled', size: 'large', style: { fontSize: fontSize, position: 'absolute', background: 'transparent', color: '#00BCD4', border: 0, cursor: 'initial' } },
												'Coming Soon',
												_react2.default.createElement(_antd.Icon, { type: 'laptop', theme: 'outlined', spin: true })
										)
								)
						);
				}
		}, {
				key: 'renderComponent',
				value: function renderComponent() {
						var _this2 = this;

						return _react2.default.createElement(
								'div',
								{
										style: { display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center' },
										ref: function ref(_ref) {
												return _this2.previewRef = _ref;
										}
								},
								this.renderText(),
								this.renderImgPreview()
						);
				}
		}]);

		return Summary;
}(_Component3.default);

exports.default = Summary;