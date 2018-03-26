"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
  function User(data) {
    _classCallCheck(this, User);

    this._data = data;
  }

  _createClass(User, [{
    key: "data",
    get: function get() {
      return this._data;
    }
  }, {
    key: "username",
    get: function get() {
      return this.data.username;
    }
  }, {
    key: "email",
    get: function get() {
      return this.data.email;
    }
  }, {
    key: "fullName",
    get: function get() {
      return this.firstName + " " + this.lastName;
    }
  }, {
    key: "firstName",
    get: function get() {
      return this.data.firstName;
    }
  }, {
    key: "lastName",
    get: function get() {
      return this.data.lastName;
    }
  }, {
    key: "phone",
    get: function get() {
      return this.data.phone;
    }
  }]);

  return User;
}();

exports.default = User;