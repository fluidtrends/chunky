'use strict'

let chalk = require('chalk')
let path = require('path')
let Ora = require('ora')
let ejs = require('ejs')
const ipc = require('node-ipc')

class Plugin {

  constructor (context) {
    this._context = context
    this._startTime = new Date().getTime()
    this._spinner = new Ora()
    this._ipcConnected = false
  }

  get context () {
    return this._context
  }

  get spinner () {
    return chalk.gray.dim(this._spinner.frame())
  }

  get startTime () {
    return this._startTime
  }

  get ipcConnected () {
    return this._ipcConnected
  }

  log (message) {
    console.log(`${chalk.bold('[Chunky]')} ${message}`)
  }

  onStart () {
    this._startTime = new Date().getTime()
    this.log(chalk.green('Getting ready to start packing'))
    this.connectToStudio()
    this.sendStudioEvent({ type: 'start_packing', time: this._startTime })
  }

  connectToStudio () {
    if (this.ipcConnected) {
      return
    }

    const name = 'chunkyweb'
    ipc.config.id = 'name'
    ipc.config.retry = 1500
    ipc.config.silent = true

    ipc.connectTo('carmelstudio', () => {
      ipc.of.carmelstudio.on('connect', () => {
        console.log(`[${name}] connected to carmelstudio`)
      })
    })
  }

  sendStudioEvent (event) {
    if (!this.ipcConnected) {
      return
    }
    ipc.of.carmelstudio.emit('event', event)
  }

  onDone (done) {
    const time = this.endTime(this.startTime)
    this.log(chalk.green('✔ Finished packing in ') + chalk.bold(time))
    this.sendStudioEvent({ type: 'finished_packing', time })
    done && done()
  }

  onModuleStart (module) {
  }

  onModuleFailure (module) {
    if (!module.resource) {
        // Ignore context logging
      return
    }

    this.log(chalk.red('✘ ') + chalk.gray(module.resource))
    this.log(chalk.red(module.error))
    this.sendStudioEvent({ type: 'module_error', module: module.resource, error: module.error })
  }

  onModuleSuccess (module) {
    if (module.errors && module.errors.length > 0) {
      this.log(chalk.red('✘ ') + chalk.gray(module.resource))
      this.log(chalk.red(module.errors[0]))
      return
    }

    if (!module.resource) {
      // Ignore context logging
      return
    }

    this.log(chalk.green('✔ ') + chalk.gray(module.resource))
    this.sendStudioEvent({ type: 'module_success', module: module.resource })
  }

  endTime (startTime) {
    const time = new Date().getTime() - startTime
    return (time < 1000 ? time + 'ms' : (parseFloat(time / 1000).toFixed(2) + 's'))
  }

  resolveHtml (data, html) {
    const route = Object.assign({}, data.plugin.options.route, html ? { html } : {})
    const info = this.context.config.info
    const web = this.context.config.web

    const vars = JSON.stringify({ route: data.plugin.options.route })

    const chunky = { route, info, web, vars }

    data.html = ejs.render(data.html, { chunky })

    return data
  }

  onPageGeneration (compilation, data, done) {
    done(null, this.resolveHtml(data))
  }

  apply (compiler) {
    compiler.plugin('compile', (params) => this.onStart())

    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('html-webpack-plugin-before-html-processing', (data, done) => this.onPageGeneration(compilation, data, done))
      compilation.plugin('build-module', (module) => this.onModuleStart(module))
      compilation.plugin('failed-module', (module) => this.onModuleFailure(module))
      compilation.plugin('succeed-module', (module) => this.onModuleSuccess(module))
    })

    compiler.plugin('emit', (compilation, done) => this.onDone(done))
  }
}

module.exports = Plugin
