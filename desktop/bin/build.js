'use strict'

let path = require('path')
let fs = require('fs-extra')
let forgePackage = require('electron-forge/dist/api/package').default

process.env.CPPFLAGS = '-I/usr/local/opt/openssl/include'
process.env.LDFLAGS = '-L/usr/local/opt/openssl/lib'

function build (options) {
  const dir = path.resolve(options.dir)
  const platform = process.platform
  const arch = process.arch
  const outDir = path.resolve(options.dir, 'desktop', 'build')

  if (fs.existsSync(outDir)) { fs.removeSync(outDir) }

  return forgePackage({
    dir,
    interactive: true,
    platform,
    arch,
    outDir
  })
}

module.exports = build
