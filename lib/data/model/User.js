"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var User =
/*#__PURE__*/
function () {
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
      return "".concat(this.firstName, " ").concat(this.lastName);
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

exports["default"] = User;