const { api } = require('@electron-forge/core')
const path = require('path')
const fs = require('fs-extra')

function buildForPlatform (dir, outDir) {
  const platform = process.platform
  const arch = process.arch

  return api.package({
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
  const outDir = path.resolve(path.dirname(options.appPath), `chunky-desktop-build-${Date.now()}`)

  if (fs.existsSync(outDir)) {
    fs.removeSync(outDir)
  }

  fs.mkdirsSync(outDir)

  return buildForPlatform(dir, outDir)
}

module.exports = build
