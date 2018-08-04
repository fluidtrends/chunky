import { app, globalShortcut, BrowserWindow, protocol, ipcMain, ipcRenderer } from 'electron'
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'
import { enableLiveReload } from 'electron-compile'
import 'babel-polyfill'
import path from 'path'
import startDesktop from '../../../desktop/start'
require('fix-path')()

let mainWindow
let startWindow
let deepLink
let session

const processDeepLink = function () {
  console.log(deepLink)
}

protocol.registerStandardSchemes(['carmel'])

const isDevMode = process.execPath.match(/[\\/]electron/)
if (isDevMode) enableLiveReload({ strategy: 'react-hmr' })

const start = async () => {
  startDesktop({ ipcMain, mainWindow })
      .then((s) => {
        session = s
        mainWindow.webContents.send('start', { session })
        setTimeout(() => {
          startWindow && startWindow.close()
          mainWindow && mainWindow.show()
        }, 1000)
      })
      .catch((error) => {
        mainWindow && mainWindow.close()
        startWindow.webContents.send('event', { error: error.message })
      })
}

const createWindow = async () => {
  startWindow = new BrowserWindow({
    width: 800,
    height: 500,
    minWidth: 800,
    minHeight: 500,
    frame: false,
    resizable: false,
    center: true,
    show: true
  })

  mainWindow = new BrowserWindow({
    width: 1024,
    height: 800,
    center: true,
    minWidth: 1024,
    minHeight: 800,
    show: false,
    backgroundColor: '#f5f5f5'
  })

  mainWindow.loadURL(`file://${path.join(path.dirname(__dirname), 'app', 'pages', 'main.html')}`)
  startWindow.loadURL(`file://${path.join(path.dirname(__dirname), 'app', 'pages', 'start.html')}`)

  if (isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS)
    mainWindow.webContents.openDevTools()
  }

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.setTitle(app.getName())

    if (!startDesktop) {
      startWindow.close()
      mainWindow.show()
      return
    }

    start()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  startWindow.on('closed', () => {
    startWindow = null
  })

  ipcMain.on('startEvent', (event, e) => {
    if (e.close) {
      startWindow.close()
    }
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
