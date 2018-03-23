'use strict'

let path = require('path')
let fs = require('fs-extra')
let forgeStart = require('electron-forge/dist/api/start').default

function start (options) {
  const dir = '/Users/dancali/dev/fluidtrends/chunky/desktop'// path.resolve(options.dir, 'node_modules', 'react-electron-chunky')
  const appPath = 'app'

  process.env.CPPFLAGS = '-I/usr/local/opt/openssl/include'
  process.env.LDFLAGS = '-L/usr/local/opt/openssl/lib'

  return forgeStart({
    dir,
    interactive: true,
    enableLogging: true,
    appPath
  })
}

module.exports = start
