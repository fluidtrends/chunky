'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _errors = require('../../errors');

var Errors = _interopRequireWildcard(_errors);

var _config = require('../../config');

var Config = _interopRequireWildcard(_config);

var _Error = require('../../core/Error');

var _Error2 = _interopRequireDefault(_Error);

var _DataProvider2 = require('../../core/DataProvider');

var _DataProvider3 = _interopRequireDefault(_DataProvider2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LocalDataProvider = function (_DataProvider) {
  _inherits(LocalDataProvider, _DataProvider);

  function LocalDataProvider() {
    _classCallCheck(this, LocalDataProvider);

    return _possibleConstructorReturn(this, (LocalDataProvider.__proto__ || Object.getPrototypeOf(LocalDataProvider)).apply(this, arguments));
  }

  _createClass(LocalDataProvider, [{
    key: 'delete',
    value: function _delete(_ref) {
      var nodes = _ref.nodes,
          options = _ref.options,
          props = _ref.props;

      return Promise.resolve();
    }
  }, {
    key: 'retrieve',
    value: function retrieve(_ref2) {
      var nodes = _ref2.nodes,
          options = _ref2.options,
          props = _ref2.props;

      return Promise.resolve();
    }
  }]);

  return LocalDataProvider;
}(_DataProvider3.default);

exports.default = LocalDataProvider;