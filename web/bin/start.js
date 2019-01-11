'use strict'

let path = require('path')
let fs = require('fs-extra')
let webpack = require('webpack')
let config = require('../packager/config.dev')
let WebpackDevServer = require('webpack-dev-server')

function start (options, callback) {
  return new Promise((resolve, reject) => {
    // Start off fresh
    process.noDeprecation = true
    const dir = path.resolve(options.dir, '.chunky', 'web')
    if (fs.existsSync(dir)) { fs.removeSync(dir) }
    fs.mkdirSync(dir)

    const setup = config(options)
    const compiler = webpack(setup)

    compiler.plugin('done', (stats) => {
      callback && callback(Object.assign({}, { compiled: true, compiling: false }, stats.compilation.errors.length > 0, { errors: stats.compilation.errors }))
      resolve({ port: options.port })
    })
    compiler.plugin('compile', (params) => {
      callback && callback(Object.assign({}, { compiled: false, compiling: true }))
    })

    const server = new WebpackDevServer(compiler, setup.devServer)
    server.listen(options.port, '0.0.0.0', (error) => {
      if (error) {
        reject(error)
        return
      }
    })
  })
}

module.exports = start
