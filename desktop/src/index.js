import { app, BrowserWindow, protocol } from 'electron'
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer'
import { enableLiveReload } from 'electron-compile'
import 'babel-polyfill'
import path from 'path'

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
    height: 600
  })

  // The main html entry point
  const entryFile = path.join(path.dirname(__dirname), 'app', 'pages', 'default.html')

  // Load the main entry point
  mainWindow.loadURL(`file://${entryFile}`)

  if (isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS)
    mainWindow.webContents.openDevTools()
  }

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
