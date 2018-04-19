'use strict'

let path = require('path')
let forgeStart = require('electron-forge/dist/api/start').default

function start (options) {
  const dir = path.resolve(options.dir)
  const appPath = path.resolve(options.dir, 'node_modules', 'react-electron-chunky', 'lib')
  const includePath = path.resolve(options.dir, 'node_modules', 'react-electron-chunky', 'include')

  process.env.CPPFLAGS = `-I${path.resolve(includePath)}`

  return forgeStart({
    dir,
    interactive: true,
    enableLogging: true,
    appPath
  })
}

module.exports = start
