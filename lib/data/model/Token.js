"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Token = function () {
  function Token(data) {
    _classCallCheck(this, Token);

    this._data = data;
  }

  _createClass(Token, [{
    key: "data",
    get: function get() {
      return this._data;
    }
  }, {
    key: "key",
    get: function get() {
      return this.data.access_token;
    }
  }, {
    key: "type",
    get: function get() {
      return this.data.token_type;
    }
  }, {
    key: "expiration",
    get: function get() {
      return this.data.expires_in;
    }
  }, {
    key: "scope",
    get: function get() {
      return this.data.scope;
    }
  }]);

  return Token;
}();

exports.default = Token;