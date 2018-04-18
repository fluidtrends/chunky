'use strict';

var _electron = require('electron');

var _electronDevtoolsInstaller = require('electron-devtools-installer');

var _electronDevtoolsInstaller2 = _interopRequireDefault(_electronDevtoolsInstaller);

var _electronCompile = require('electron-compile');

require('babel-polyfill');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _blockchain = require('../../../blockchain');

var _blockchain2 = _interopRequireDefault(_blockchain);

var _nodeCmd = require('node-cmd');

var _nodeCmd2 = _interopRequireDefault(_nodeCmd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('fix-path')();

var mainWindow = void 0;
var deepLink = void 0;

var processDeepLink = function processDeepLink() {
  console.log(deepLink);
};

// Setup the custom Carmel protocol
_electron.protocol.registerStandardSchemes(['carmel']);

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
              width: 1280,
              height: 800,
              minWidth: 1024,
              minHeight: 600,
              show: false,
              backgroundColor: '#0bbcd4'
            });

            // The html entry points
            entryFile = _path2.default.join(_path2.default.dirname(__dirname), 'app', 'pages', 'default.html');

            // Load the main entry point

            mainWindow.loadURL('file://' + entryFile);

            if (!isDevMode) {
              _context.next = 7;
              break;
            }

            _context.next = 6;
            return (0, _electronDevtoolsInstaller2.default)(_electronDevtoolsInstaller.REACT_DEVELOPER_TOOLS);

          case 6:
            mainWindow.webContents.openDevTools();

          case 7:

            _electron.ipcMain.on('shell', function (event, arg) {
              _nodeCmd2.default.get(arg.command, function (error, data, stderr) {
                event.sender.send(arg.callId, { error: error, data: data });
              });
            });

            _electron.ipcMain.on('which', function (event, arg) {
              _nodeCmd2.default.get(arg.command + ' --help', function (error, data, stderr) {
                event.sender.send(arg.callId, { error: error, data: data });
              });
            });

            _blockchain2.default && (0, _blockchain2.default)();
            mainWindow.setTitle(_electron.app.getName());
            mainWindow.show();

            mainWindow.webContents.on('did-finish-load', function () {
              mainWindow.setTitle(_electron.app.getName());
            });

            mainWindow.on('closed', function () {
              mainWindow = null;
            });

          case 14:
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

var shouldQuit = _electron.app.makeSingleInstance(function (argv, workingDirectory) {
  if (process.platform === 'win32') {
    deepLink = argv.slice(1);
  }

  processDeepLink(deepLink);

  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

if (shouldQuit) {
  _electron.app.quit();
}

_electron.app.on('ready', createWindow);

_electron.app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    _electron.app.quit();
  }
});

_electron.app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

_electron.app.setAsDefaultProtocolClient('carmel');

_electron.app.on('will-finish-launching', function () {
  _electron.app.on('open-url', function (event, url) {
    event.preventDefault();
    deepLink = url;
    processDeepLink(deepLink);
  });
});