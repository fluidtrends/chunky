const { api } = require('@electron-forge/core')
const path = require('path')

function start (options) {
  const dir = path.resolve(options.dir)
  const appPath = path.resolve(options.appPath)

  return api.start({
    dir,
    interactive: true,
    enableLogging: true,
    appPath
  })
}

module.exports = start
