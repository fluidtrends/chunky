'use strict'

let path = require('path')
let fs = require('fs-extra')
let webpack = require('webpack')
let config = require('../packager/config')
let copyfiles = require('copyfiles')

function build (options) {
  return new Promise((resolve, reject) => {
    // Start off fresh
    const dir = path.resolve(options.dir, '.chunky', 'web')
    if (fs.existsSync(dir)) { fs.removeSync(dir) }
    fs.mkdirSync(dir)

    const setup = config(options)

    process.noDeprecation = true
    process.env.NODE_ENV = 'production'

    webpack(setup, (error, stats) => {
      if (error) {
          // Looks like webpack failed with a hard error
        reject(error)
        return
      }
      copyfiles(['./web/public/*/**', './web/build'], { up: 2 }, () => resolve())
    })
  })
}

module.exports = build
