"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InfuraFactory = function () {
  function InfuraFactory(props) {
    _classCallCheck(this, InfuraFactory);

    this._props = props;
  }

  _createClass(InfuraFactory, [{
    key: "makeProvider",
    value: function makeProvider(url) {
      if (!url) {
        return;
      }

      return url;
    }
  }, {
    key: "props",
    get: function get() {
      return this._props;
    }
  }, {
    key: "hasKey",
    get: function get() {
      return this.props && this.props.key;
    }
  }, {
    key: "key",
    get: function get() {
      if (!this.hasKey) {
        return;
      }

      return this.props.key;
    }
  }, {
    key: "provider",
    get: function get() {
      if (!this.props || !this.hasKey) {
        return;
      }

      if (this.props.provider && this[this.props.provider]) {
        return this[this.props.provider];
      }

      return this.mainNet;
    }
  }, {
    key: "mainNet",
    get: function get() {
      return this.makeProvider("https://mainnet.infura.io/" + this.key);
    }
  }, {
    key: "ropsten",
    get: function get() {
      return this.makeProvider("https://ropsten.infura.io/" + this.key);
    }
  }, {
    key: "infuraNet",
    get: function get() {
      return this.makeProvider("https://infuranet.infura.io/" + this.key);
    }
  }, {
    key: "kovan",
    get: function get() {
      return this.makeProvider("https://kovan.infura.io/" + this.key);
    }
  }, {
    key: "rinkeby",
    get: function get() {
      return this.makeProvider("https://rinkeby.infura.io/" + this.key);
    }
  }, {
    key: "ipfs",
    get: function get() {
      return this.makeProvider("https://ipfs.infura.io");
    }
  }]);

  return InfuraFactory;
}();

exports.default = InfuraFactory;