'use strict'

let path = require('path')
let fs = require('fs-extra')
let forgeStart = require('electron-forge/dist/api/start').default

process.env.CPPFLAGS = '-I/usr/local/opt/openssl/include'
process.env.LDFLAGS = '-L/usr/local/opt/openssl/lib'

function start (options) {
  const dir = path.resolve(options.dir)
  // const appPath = path.join('node_modules', 'react-electron-chunky', 'app')
  const appPath = path.join('desktop', 'app')

  return forgeStart({
    dir,
    interactive: true,
    enableLogging: true,
    appPath
  })
}

module.exports = start
