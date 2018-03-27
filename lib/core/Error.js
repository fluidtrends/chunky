'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChunkyError = function (_Error) {
  _inherits(ChunkyError, _Error);

  function ChunkyError(message) {
    _classCallCheck(this, ChunkyError);

    var _this = _possibleConstructorReturn(this, (ChunkyError.__proto__ || Object.getPrototypeOf(ChunkyError)).call(this));

    _this.message = '' + message;
    _this.stack = new Error().stack;
    _this.name = 'Chunky';
    return _this;
  }

  return ChunkyError;
}(Error);

exports.default = ChunkyError;