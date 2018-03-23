'use strict'

let path = require('path')
let fs = require('fs-extra')
let forgeStart = require('electron-forge/dist/api/start').default
let forgeImport = require('electron-forge/dist/api/import').default

process.env.CPPFLAGS = '-I/usr/local/opt/openssl/include'
process.env.LDFLAGS = '-L/usr/local/opt/openssl/lib'

function start (options) {
  const dir = path.resolve(options.dir)
  const appPath = path.join('node_modules', 'react-electron-chunky', 'app')

  return forgeStart({
    dir,
    interactive: true,
    enableLogging: true,
    appPath
  })
}

module.exports = start
