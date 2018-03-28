'use strict';

var _electron = require('electron');

var _electronDevtoolsInstaller = require('electron-devtools-installer');

var _electronDevtoolsInstaller2 = _interopRequireDefault(_electronDevtoolsInstaller);

var _electronCompile = require('electron-compile');

require('babel-polyfill');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = void 0;

var isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) (0, _electronCompile.enableLiveReload)({ strategy: 'react-hmr' });

var createWindow = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var entryFile;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Create the browser window.
            mainWindow = new _electron.BrowserWindow({
              width: 800,
              height: 600
            });

            // and load the index.html of the app.
            entryFile = _path2.default.join(_path2.default.dirname(__dirname), 'app', 'pages', 'default.html');

            mainWindow.loadURL('file://' + entryFile);

            // Open the DevTools.

            if (!isDevMode) {
              _context.next = 7;
              break;
            }

            _context.next = 6;
            return (0, _electronDevtoolsInstaller2.default)(_electronDevtoolsInstaller.REACT_DEVELOPER_TOOLS);

          case 6:
            mainWindow.webContents.openDevTools();

          case 7:

            // Emitted when the window is closed.
            mainWindow.on('closed', function () {
              // Dereference the window object, usually you would store windows
              // in an array if your app supports multi windows, this is the time
              // when you should delete the corresponding element.
              mainWindow = null;
            });

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function createWindow() {
    return _ref.apply(this, arguments);
  };
}();

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
_electron.app.on('ready', createWindow);

// Quit when all windows are closed.
_electron.app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    _electron.app.quit();
  }
});

_electron.app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.