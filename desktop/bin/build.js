'use strict'

let path = require('path')
let fs = require('fs-extra')
let forgePackage = require('electron-forge/dist/api/package').default

process.env.CPPFLAGS = '-I/usr/local/opt/openssl/include'
process.env.LDFLAGS = '-L/usr/local/opt/openssl/lib'

function buildForPlatform (dir, outDir, platform) {
  const parts = (platform ? platform.split('/') : [process.platform, process.arch])

  return forgePackage({
    dir,
    interactive: true,
    platform: parts[0],
    arch: parts[1],
    outDir
  })
}

function build (options) {
  const dir = path.resolve(options.dir)
  const outDir = path.resolve(options.dir, 'desktop', 'build')

  if (fs.existsSync(outDir)) { fs.removeSync(outDir) }

  if (options.config && options.config.build && options.config.build.platforms) {
    return Promise.all(options.config.build.platforms.map(p => buildForPlatform(dir, outDir, p)))
  }

  return buildForPlatform(dir, outDir)
}

module.exports = build
