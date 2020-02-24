module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/MainSession.js":
/*!****************************!*\
  !*** ./src/MainSession.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = __webpack_require__(/*! electron */ "electron"),
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

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

global.navigator = {
  userAgent: 'chunky'
};

var _require = __webpack_require__(/*! electron */ "electron"),
    app = _require.app,
    Tray = _require.Tray,
    Menu = _require.Menu,
    BrowserWindow = _require.BrowserWindow,
    globalShortcut = _require.globalShortcut;

var path = __webpack_require__(/*! path */ "path");

var Session = __webpack_require__(/*! ./MainSession */ "./src/MainSession.js");

var PORT = 13001;
var window;
var session;
var tray;
var loaded = false;
app.dock.hide();

var createWindow = function createWindow() {
  window = new BrowserWindow({
    width: 400,
    height: 600,
    show: false,
    frame: false,
    backgroundColor: '#ECEFF1',
    fullscreenable: false,
    resizable: false,
    transparent: false,
    webPreferences: {
      nodeIntegration: true,
      backgroundThrottling: false,
      webviewTag: true
    }
  });
  window.loadURL('http://localhost:3000/main_window');
  window.webContents.openDevTools();
  window.on('closed', function () {
    window = null;
  });
  window.on('blur', function () {
    if (!window.webContents.isDevToolsOpened()) {
      window.hide();
    }
  });
};

var createTray = function createTray() {
  tray = new Tray(( false ? undefined : "/Users/idancali/idancali/dev/chunky/desktop/.webpack/main") + '/native_modules/icon.png');
  var contextMenu = Menu.buildFromTemplate([{
    label: 'Toggle',
    click: function click() {
      toggleWindow();
    }
  }, {
    label: 'Quit',
    click: function click() {
      app.quit();
    }
  }]);
  tray.setContextMenu(contextMenu);
  tray.on('click', function (event) {
    toggleWindow();
  });
};

var getWindowPosition = function getWindowPosition() {
  var windowBounds = window.getBounds();
  var trayBounds = tray.getBounds();
  var x = Math.round(trayBounds.x + trayBounds.width / 2 - windowBounds.width / 2 - (loaded ? 0 : 18));
  var y = Math.round(trayBounds.y + trayBounds.height + 4);
  loaded = true;
  return {
    x: x,
    y: y
  };
};

var toggleWindow = function toggleWindow() {
  if (window.isVisible()) {
    window.hide();
    return;
  }

  tray.setImage(( false ? undefined : "/Users/idancali/idancali/dev/chunky/desktop/.webpack/main") + '/native_modules/icon.png');
  showWindow();
};

var showWindow = function showWindow() {
  var position = getWindowPosition();
  window.setPosition(position.x, position.y, false);
  window.show();
};

app.on('ready', function () {
  createWindow();
  session = new Session({
    window: window
  });
  session.initialize().then(function () {
    var ret = globalShortcut.register('CommandOrControl+1', function () {
      toggleWindow();
    });
    window.once('ready-to-show', function () {
      createTray();
      toggleWindow();
    });
  });
});
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map