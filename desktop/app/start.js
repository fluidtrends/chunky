const { api } = require('@electron-forge/core')

function start (options) {
  return api.start(Object.assign({}, {
    interactive: true,
    enableLogging: true
  }, options))
}

module.exports = start
