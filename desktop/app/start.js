const { api } = require('@electron-forge/core')
const path = require('path')

function start (options) {
  const dir = path.resolve(options.dir)

  return api.start({
    dir,
    interactive: true,
    enableLogging: true,
    appPath: dir
  })
}

module.exports = start
