"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('electron'),
    ipcMain = _require.ipcMain,
    BrowserWindow = _require.BrowserWindow,
    shell = _require.shell;

var Session =
/*#__PURE__*/
function () {
  function Session(_ref) {
    var window = _ref.window;

    _classCallCheck(this, Session);

    this._window = window;
  }

  _createClass(Session, [{
    key: "listen",
    value: function listen(key, cb) {
      ipcMain.on(key, function (event, data) {
        cb && cb(data);
      });
    }
  }, {
    key: "send",
    value: function send(key, data) {
      this._window.webContents.send(key, data);
    }
  }, {
    key: "start",
    value: function start() {
      var startTimestamp = "".concat(Date.now());
      var event = {};
      return Promise.resolve({
        startTimestamp: startTimestamp,
        event: event
      });
    }
  }, {
    key: "initialize",
    value: function initialize(cb) {
      var _this = this;

      this.listen('startSession', function () {
        _this.start().then(function (data) {
          _this.send('sessionStarted', data);
        })["catch"](function (error) {
          _this.send('sessionNotStarted', {
            error: error
          });
        });
      });
      return new Promise(function (resolve, reject) {
        resolve();
      });
    }
  }, {
    key: "window",
    get: function get() {
      return this._window;
    }
  }]);

  return Session;
}();

module.exports = Session;