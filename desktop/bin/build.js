'use strict'

let path = require('path')
let fs = require('fs-extra')
let forgePackage = require('electron-forge/dist/api/make').default

function buildForPlatform (dir, outDir) {
  const platform = process.platform
  const arch = process.arch

  return forgePackage({
    dir,
    prune: false,
    interactive: true,
    platform,
    arch,
    outDir
  })
}

function build (options) {
  const dir = path.resolve(options.dir)
  const outDir = path.resolve(path.dirname(options.dir), `chunky-desktop-build`)

  if (fs.existsSync(outDir)) {
    fs.removeSync(outDir)
  }

  fs.mkdirsSync(outDir)

  const includePath = path.resolve(options.dir, 'node_modules', 'react-electron-chunky', 'include')

  return buildForPlatform(dir, outDir)
}

module.exports = build
