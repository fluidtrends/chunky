'use strict'

// let coreutils = require('coreutils')
let path = require('path')
let fs = require('fs-extra')
let webpack = require('webpack')
let config = require('../packager/config.dev')
let WebpackDevServer = require('webpack-dev-server')

function start (options) {
  return new Promise((resolve, reject) => {
    // Start off fresh
    const dir = path.resolve(options.dir, '.chunky', 'web')
    if (fs.existsSync(dir)) { fs.removeSync(dir) }
    fs.mkdirSync(dir)

    const setup = config(options)
    process.noDeprecation = true
    new WebpackDevServer(webpack(setup), setup.devServer)
      .listen(options.port, '0.0.0.0', (error) => {
        if (error) {
          // Looks like webpack failed with a hard error
          reject(error)
          return
        }

        // Open a browser with the website loaded
        const url = 'http://localhost:1' + options.port
        resolve(url)
      })
  })
}

module.exports = start
