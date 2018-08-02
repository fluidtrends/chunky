import { app, globalShortcut, BrowserWindow, protocol, ipcMain, ipcRenderer } from 'electron'
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'
import { enableLiveReload } from 'electron-compile'
import 'babel-polyfill'
import path from 'path'
import startDesktop from '../../../desktop/start'
require('fix-path')()

let mainWindow
let deepLink

const processDeepLink = function () {
  console.log(deepLink)
}

// Setup the custom Carmel protocol
protocol.registerStandardSchemes(['carmel'])

const isDevMode = process.execPath.match(/[\\/]electron/)
if (isDevMode) enableLiveReload({ strategy: 'react-hmr' })

const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 800,
    minWidth: 1024,
    minHeight: 800,
    show: false,
    backgroundColor: '#0bbcd4'
  })

  // The html entry points
  const entryFile = path.join(path.dirname(__dirname), 'app', 'pages', 'default.html')

  // Load the main entry point
  mainWindow.loadURL(`file://${entryFile}`)

  if (isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS)
    mainWindow.webContents.openDevTools()
  }

  startDesktop && startDesktop({ ipcMain, ipcRenderer, mainWindow })
  mainWindow.setTitle(app.getName())
  mainWindow.show()

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.setTitle(app.getName())
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

const shouldQuit = app.makeSingleInstance((argv, workingDirectory) => {
  if (process.platform === 'win32') {
    deepLink = argv.slice(1)
  }

  processDeepLink(deepLink)

  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  }
})

if (shouldQuit) {
  globalShortcut.unregisterAll()
  app.quit()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    globalShortcut.unregisterAll()
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

app.setAsDefaultProtocolClient('carmel')

app.on('will-finish-launching', () => {
  app.on('open-url', (event, url) => {
    event.preventDefault()
    deepLink = url
    processDeepLink(deepLink)
  })
})
