'use strict'

let WebPlugin = require('./webPlugin')
let requireFromString = require('require-from-string')
let ejs = require('ejs')

class Plugin extends WebPlugin {

  loadMainModule (compilation) {
    if (this._mainModule) {
      return this._mainModule
    }

    // We're only loading chunky once
    const bundle = compilation.assets['chunky.js']
    const source = bundle.source()

    try {
      this._mainModule = requireFromString(source)
      return this._mainModule
    } catch (e) {
      console.log(e)
    }
  }

  onPageGeneration (compilation, data, done) {
    const main = this.loadMainModule(compilation)

    if (!main) {
      done(new Error('Could not load main module'))
      return
    }

    const route = data.plugin.options.route

    main.renderStaticPage(route)
         .then(html => done(null, this.resolveHtml(data, html)))
         .catch((error) => done(error))
  }
}

module.exports = Plugin
