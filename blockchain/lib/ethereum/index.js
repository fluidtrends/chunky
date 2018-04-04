'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

var _infura = require('./infura');

var _infura2 = _interopRequireDefault(_infura);

var _eos = require('./eos');

var _eos2 = _interopRequireDefault(_eos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ethereum = function () {
  function Ethereum(props) {
    _classCallCheck(this, Ethereum);

    this._accounts = [];
    this._props = props || {};
    this._infura = new _infura2.default(props.infura);
    this._provider = new _web2.default(this.props.provider || this.infura.provider);
    this._eos = new _eos2.default({ ethereum: this });
  }

  _createClass(Ethereum, [{
    key: 'contract',
    value: function contract(abi, address) {
      if (!abi || !address || !this.provider) {
        return;
      }

      return new this.provider.eth.Contract(abi, address);
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

        _this.provider.eth.getAccounts(function (error, accounts) {
          if (error || !accounts || accounts.length < 1) {
            reject(new Error('No Ethereum accounts available'));
            return;
          }
          _this._accounts = [].concat(accounts);
          _this._account = accounts[0];
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
    key: 'account',
    get: function get() {
      return this._account;
    }
  }, {
    key: 'provider',
    get: function get() {
      return this._provider;
    }
  }, {
    key: 'eos',
    get: function get() {
      return this._eos;
    }
  }]);

  return Ethereum;
}();

exports.default = Ethereum;