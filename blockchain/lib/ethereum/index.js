'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _infura = require('./infura');

var _infura2 = _interopRequireDefault(_infura);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ethereum = function () {
  function Ethereum(props) {
    _classCallCheck(this, Ethereum);

    this._accounts = [];
    this._props = props || {};
    this._infura = new _infura2.default(props.infura);
    this._provider = this.props.provider || this.infura.provider;
  }

  _createClass(Ethereum, [{
    key: 'contract',
    value: function contract(data) {
      if (!data || !data.abi || !data.address || !this.provider) {
        return;
      }

      return new this.provider.Contract(data.abi, data.address);
    }
  }, {
    key: 'refreshAccounts',
    value: function refreshAccounts() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (!_this.provider) {
          reject(new Error('Unknown Ethereum provider'));
          return;
        }

        _this.provider.getAccounts(function (error, accounts) {
          if (error || !accounts || accounts.length < 1) {
            reject(new Error('No Ethereum accounts available'));
            return;
          }
          _this._accounts = [].concat(accounts);
          resolve(accounts);
        });
      });
    }
  }, {
    key: 'infura',
    get: function get() {
      return this._infura;
    }
  }, {
    key: 'props',
    get: function get() {
      return this._props;
    }
  }, {
    key: 'accounts',
    get: function get() {
      return this._accounts;
    }
  }, {
    key: 'provider',
    get: function get() {
      return this._provider;
    }
  }]);

  return Ethereum;
}();

exports.default = Ethereum;