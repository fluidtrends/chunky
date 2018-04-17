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

var _reactIonicons = require('react-ionicons');

var _reactIonicons2 = _interopRequireDefault(_reactIonicons);

var _Card = require('rmwc/Card');

var _Chip = require('rmwc/Chip');

var _Fab = require('rmwc/Fab');

var _Typography = require('rmwc/Typography');

var _Media = require('./Media');

var _Media2 = _interopRequireDefault(_Media);

var _Button = require('rmwc/Button');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var colors = {
  'Beginner': '#65bb6a',
  'Entry': '#F57C00',
  'Intermediate': '#FDD835',
  'Advanced': '#E64A19',
  'Expert': '#1565C0'
};

var Collection = function (_Component) {
  _inherits(Collection, _Component);

  function Collection(props) {
    _classCallCheck(this, Collection);

    var _this = _possibleConstructorReturn(this, (Collection.__proto__ || Object.getPrototypeOf(Collection)).call(this, props));

    _this.state = _extends({}, _this.state);
    return _this;
  }

  _createClass(Collection, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _get(Collection.prototype.__proto__ || Object.getPrototypeOf(Collection.prototype), 'componentDidMount', this).call(this);
    }
  }, {
    key: 'renderCardMedia',
    value: function renderCardMedia(item) {
      var image = item.thumbnail || item.imageSmall || item.image;

      if (!image) {
        return _react2.default.createElement('div', null);
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

      return _react2.default.createElement(
        _Card.CardMedia,
        { style: {
            backgroundColor: item.backgroundColor
          } },
        _react2.default.createElement(_Media2.default, {
          cache: this.props.cache,
          image: image,
          innerWidth: innerWidth,
          style: style })
      );
    }
  }, {
    key: 'renderCard',
    value: function renderCard(item, index) {
      var details = item.details.substring(0, 120);
      return _react2.default.createElement(
        _Card.Card,
        { style: { width: '320px' }, key: 'item' + index },
        _react2.default.createElement(
          _Button.Button,
          { onClick: this.triggerEvent(item.name || index, item.action), style: { padding: 0, height: '100%' } },
          this.renderCardMedia(item)
        ),
        _react2.default.createElement(
          'div',
          { style: { padding: '0 1rem 1rem 1rem' } },
          _react2.default.createElement(
            _Typography.Typography,
            { use: 'title', tag: 'h2' },
            item.title
          ),
          _react2.default.createElement(
            _Typography.Typography,
            {
              use: 'subheading1',
              tag: 'h3',
              theme: 'text-secondary-on-background',
              style: { marginTop: '1rem' } },
            details + ' ...'
          )
        ),
        this.renderCardTags(item),
        _react2.default.createElement(
          _Card.CardActions,
          { style: { justifyContent: 'center', marginBottom: '1rem' } },
          this.renderCardButtons(item, index)
        )
      );
    }
  }, {
    key: 'renderCardButtons',
    value: function renderCardButtons(item, index) {
      if (this.props.renderCardButtons) {
        return this.props.renderCardButtons(item, index);
      }

      return _react2.default.createElement(
        _Card.CardActionButtons,
        null,
        _react2.default.createElement(
          _Card.CardAction,
          { onClick: this.triggerEvent(item.name || index, Object.assign({}, item.action, { primary: true })) },
          ' ',
          item.actionTitle || 'Learn More',
          ' '
        ),
        this.renderSecondaryCardButton(item, index)
      );
    }
  }, {
    key: 'renderCardTag',
    value: function renderCardTag(tag) {
      return _react2.default.createElement(
        _Chip.Chip,
        { style: { background: 'red', color: 'white' } },
        _react2.default.createElement(
          _Chip.ChipText,
          null,
          _react2.default.createElement(
            _Typography.Typography,
            {
              use: 'caption' },
            'sdfasd'
          )
        )
      );
    }
  }, {
    key: 'renderCardTags',
    value: function renderCardTags(item) {
      var _this2 = this;

      if (!item.tags) {
        return _react2.default.createElement('div', null);
      }

      return _react2.default.createElement(
        'div',
        { style: { display: 'flex', alignItems: 'center' } },
        _react2.default.createElement(
          _Chip.ChipSet,
          { style: { flex: 2 } },
          item.tags.map(function (t) {
            return _this2.renderCardTag(t);
          })
        )
      );
    }
  }, {
    key: 'renderSecondaryCardButton',
    value: function renderSecondaryCardButton(item, index) {
      if (!item.actionTitleSecondary) {
        return _react2.default.createElement('div', null);
      }

      return _react2.default.createElement(
        _Card.CardAction,
        { onClick: this.triggerEvent(item.name || index, Object.assign({}, item.action, { secondary: true })) },
        ' ',
        item.actionTitleSecondary || 'Learn More',
        ' '
      );
    }
  }, {
    key: 'renderChallenge',
    value: function renderChallenge(item, index) {
      var details = item.details.substring(0, 50);
      return _react2.default.createElement(
        _Card.Card,
        { style: { width: '320px' }, key: 'item' + index },
        this.renderCardMedia(item),
        _react2.default.createElement(
          'div',
          { style: { padding: '0 1rem 1rem 1rem' } },
          _react2.default.createElement(
            _Typography.Typography,
            { use: 'title', tag: 'h2' },
            item.title
          ),
          _react2.default.createElement(
            _Typography.Typography,
            {
              use: 'subheading1',
              tag: 'h3',
              theme: 'text-secondary-on-background',
              style: { marginTop: '1rem' } },
            details,
            '...'
          ),
          _react2.default.createElement(
            'div',
            { style: { display: 'flex', alignItems: 'center' } },
            _react2.default.createElement(
              _Chip.ChipSet,
              { style: { flex: 2 } },
              _react2.default.createElement(
                _Chip.Chip,
                { style: { background: colors[item.category], color: 'white' } },
                _react2.default.createElement(
                  _Chip.ChipText,
                  null,
                  _react2.default.createElement(
                    _Typography.Typography,
                    {
                      use: 'caption'
                    },
                    item.category
                  )
                )
              ),
              _react2.default.createElement(
                _Chip.Chip,
                { style: { background: '#90A4AE', color: 'white' } },
                _react2.default.createElement(
                  _Chip.ChipText,
                  null,
                  _react2.default.createElement(
                    _Typography.Typography,
                    {
                      use: 'caption'
                    },
                    item.label
                  )
                )
              )
            ),
            _react2.default.createElement(
              _Fab.Fab,
              { mini: true },
              'star'
            ),
            _react2.default.createElement(
              _Typography.Typography,
              {
                use: 'title',
                style: { marginLeft: 5 }
              },
              item.xp
            )
          )
        ),
        _react2.default.createElement(
          _Card.CardActions,
          { style: { justifyContent: 'center', marginBottom: '1rem' } },
          _react2.default.createElement(
            _Card.CardActionButtons,
            null,
            _react2.default.createElement(
              _Card.CardAction,
              { onClick: this.triggerEvent(item.name || index, item.action) },
              ' ',
              item.actionTitle || 'Learn More',
              ' '
            )
          )
        )
      );
    }
  }, {
    key: 'renderItem',
    value: function renderItem(item, index) {
      return _react2.default.createElement(
        'div',
        { key: 'item-' + index, style: {
            padding: '20px'
          } },
        this.renderItemType(item, index)
      );
    }
  }, {
    key: 'renderItemType',
    value: function renderItemType(item, index) {
      switch (this.type) {
        case 'challenges':
          return this.renderChallenge(item, index);
        default:
          return this.renderCard(item, index);
      }
    }
  }, {
    key: 'renderItems',
    value: function renderItems() {
      var _this3 = this;

      var index = 0;
      return this.categories.map(function (item) {
        return _this3.renderItem(item, index++);
      });
    }
  }, {
    key: 'renderCollection',
    value: function renderCollection() {
      return _react2.default.createElement(
        'div',
        {
          style: {
            display: 'flex',
            flex: 1,
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'center'
          } },
        this.renderItems()
      );
    }
  }, {
    key: 'renderDefault',
    value: function renderDefault() {
      return this.renderCollection();
    }
  }, {
    key: 'renderComponent',
    value: function renderComponent() {
      return this.renderDefault();
    }
  }, {
    key: 'categories',
    get: function get() {
      return this.props.categories || [];
    }
  }, {
    key: 'type',
    get: function get() {
      return this.props.type || 'default';
    }
  }]);

  return Collection;
}(_Component3.default);

exports.default = Collection;