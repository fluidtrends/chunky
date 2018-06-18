import { app, BrowserWindow, protocol, ipcMain } from 'electron'
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'
import { enableLiveReload } from 'electron-compile'
import 'babel-polyfill'
import path from 'path'
import { default as startApp } from '../../../blockchain'
import { default as cmd } from 'node-cmd'
const { spawn } = require('child_process')
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

const runCommand = (command, args, callback) => {
  const cmd = spawn(command, args, {
    stdio: 'inherit',
    shell: true
  })

  cmd.stdout.on('data', (data) => {
    callback && callback.out && callback.out(data)
  })

  cmd.stderr.on('data', (data) => {
    callback && callback.err && callback.err(data)
  })

  cmd.on('close', (code) => {
    callback && callback.done && callback.done(code)
  })
}

const createWindow = async () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 600,
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

  ipcMain.on('shell', (event, arg) => {
    cmd.get(arg.command, (error, data, stderr) => {
      event.sender.send(arg.callId, { error, data })
    })
  })

  ipcMain.on('process', (event, arg) => {
    runCommand(arg.command, arg.args || [], {
      err: (error) => {
        event.sender.send(arg.callId, { error })
      },
      out: (data) => {
        event.sender.send(arg.callId, { data })
      },
      done: (code) => {
        event.sender.send(arg.callId, { done: true, code })
      }})
  })

  ipcMain.on('which', (event, arg) => {
    cmd.get(`${arg.command} --help`, (error, data, stderr) => {
      event.sender.send(arg.callId, { error, data })
    })
  })

  startApp && startApp()
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
  app.quit()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
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
