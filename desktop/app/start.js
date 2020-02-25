const { api } = require('@electron-forge/core')
const path = require('path')

function start (options) {
  const dir = path.resolve(options.dir)
  // const appPath = path.resolve(options.dir, 'node_modules', 'react-electron-chunky', 'src')

  return api.start({
    dir,
    interactive: true,
    enableLogging: true,
    appPath: dir
  })
}

module.exports = start
