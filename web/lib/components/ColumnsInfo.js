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

var _typography = require('@rmwc/typography');

var _antd = require('antd');

var _icon = require('@rmwc/icon');

var _circularProgress = require('@rmwc/circular-progress');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColumnsInfo = function (_Component) {
	_inherits(ColumnsInfo, _Component);

	function ColumnsInfo(props) {
		_classCallCheck(this, ColumnsInfo);

		var _this = _possibleConstructorReturn(this, (ColumnsInfo.__proto__ || Object.getPrototypeOf(ColumnsInfo)).call(this, props));

		_this.state = _extends({}, _this.state, { tokenData: null });
		return _this;
	}

	_createClass(ColumnsInfo, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			_get(ColumnsInfo.prototype.__proto__ || Object.getPrototypeOf(ColumnsInfo.prototype), 'componentDidMount', this).call(this);
			fetch(this.props.data).then(function (response) {
				return response.json();
			}).then(function (tokenData) {
				_this2.setState({ tokenData: tokenData });
			}).catch(function (error) {
				return console.error(error);
			});
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
		key: 'renderRowsAndColumns',
		value: function renderRowsAndColumns() {
			var _this3 = this;

			var tokenData = this.state.tokenData;

			return tokenData && tokenData.rows.map(function (row) {
				return _this3.renderRow(row);
			});
		}
	}, {
		key: 'renderRow',
		value: function renderRow(row) {
			var _this4 = this;

			return _react2.default.createElement(
				_antd.Row,
				{ gutter: 96 },
				row && row.columns.map(function (column) {
					return _this4.renderColumn(column);
				})
			);
		}
	}, {
		key: 'renderColumn',
		value: function renderColumn(column) {
			return _react2.default.createElement(
				_antd.Col,
				{ md: 8, sm: 24, xs: 24 },
				_react2.default.createElement(
					'div',
					{ style: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', marginBottom: '20px', textAlign: 'center' } },
					_react2.default.createElement(_icon.Icon, { icon: column.icon, style: { fontSize: '60px' } }),
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							_typography.Typography,
							{ use: 'headline3', style: { padding: '15px', display: 'block' } },
							column.title
						)
					),
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							_typography.Typography,
							{ use: 'headline5', style: { padding: '15px', display: 'block' } },
							column.subtitle
						)
					)
				)
			);
		}
	}, {
		key: 'renderComponent',
		value: function renderComponent() {
			if (!this.state.tokenData) {
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(_circularProgress.CircularProgress, { size: 'large' })
				);
			}
			return _react2.default.createElement(
				'div',
				{
					style: { display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', margin: '100px 15px' }
				},
				this.renderText(),
				this.renderRowsAndColumns()
			);
		}
	}]);

	return ColumnsInfo;
}(_Component3.default);

exports.default = ColumnsInfo;