'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _crowdsaleAbi = require('./crowdsale.abi.js');

var _crowdsaleAbi2 = _interopRequireDefault(_crowdsaleAbi);

var _tokenAbi = require('./token.abi.js');

var _tokenAbi2 = _interopRequireDefault(_tokenAbi);

var _utilitiesAbi = require('./utilities.abi.js');

var _utilitiesAbi2 = _interopRequireDefault(_utilitiesAbi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EOS_CROWDSALE_ETH_ADDRESS = '0xd0a6e6c54dbc68db5db3a091b171a77407ff7ccf';
var EOS_TOKEN_ETH_ADDRESS = '0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0';
var EOS_UTILITIES_ETH_ADDRESS = '0x860fd485f533b0348e413e65151f7ee993f93c02';

var EOS = function () {
  function EOS(props) {
    _classCallCheck(this, EOS);

    this._props = props || {};
    this._ethereum = props.ethereum;
  }

  _createClass(EOS, [{
    key: 'getBalance',
    value: function getBalance() {
      var contract = this.tokenContract;

      if (!contract) {
        return Promise.reject(new Error('Missing EOS Token Contract'));
      }

      if (!this.ethereum.account) {
        return Promise.reject(new Error('Missing Ethereum account'));
      }

      return contract.methods.balanceOf(this.ethereum.account).call();
    }
  }, {
    key: 'props',
    get: function get() {
      return this._props;
    }
  }, {
    key: 'ethereum',
    get: function get() {
      return this._ethereum;
    }
  }, {
    key: 'crowdsaleContract',
    get: function get() {
      if (!this.ethereum) {
        return;
      }

      return this.ethereum.contract(_crowdsaleAbi2.default, EOS_CROWDSALE_ETH_ADDRESS);
    }
  }, {
    key: 'tokenContract',
    get: function get() {
      if (!this.ethereum) {
        return;
      }

      return this.ethereum.contract(_tokenAbi2.default, EOS_TOKEN_ETH_ADDRESS);
    }
  }]);

  return EOS;
}();

exports.default = EOS;