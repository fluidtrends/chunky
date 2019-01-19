'use strict'

let chalk = require('chalk')
let path = require('path')
let Ora = require('ora')
let ejs = require('ejs')
const emotions = require('./emotions.json')

class Plugin {
  constructor (context) {
    this._context = context
    this._spinner = new Ora({ text: chalk.green('Chunky is getting ready to start working'), spinner: 'dots', color: 'yellow', stream: process.stdout })
  }

  emotion (type) {
    if (!emotions || !emotions[type]) {
      return 'Chunky is somewhat confused.'
    }

    const expression = emotions[type].expression
    const moods = emotions[type].moods

    const mood = moods[Math.floor(Math.random() * Math.floor(moods.length - 1))]
    return { expression, mood }
  }

  get happy () {
    return this.emotion("happy")
  }

  get working() {
    return this._working
  }

  get context () {
    return this._context
  }

  get spinner () {
    return this._spinner
  }

  get startTime () {
    return this._startTime
  }

  onStart () {
    this._working = this.emotion("working")
    this._startTime = new Date().getTime()
    this.spinner.start()
  }

  onModuleStart (module) {
  }

  onModuleFailure (module) {
    if (!module.resource) {
        // Ignore context logging
      return
    }

    var resource = module.resource.substring(path.resolve('.').length + 1)
    this.spinner.fail(module.resource)
    this.spinner.fail(module.error)
  }

  onModuleSuccess (module) {
    if (module.errors && module.errors.length > 0) {
      var resource = module.resource.substring(path.resolve('.').length + 1)
      this.spinner.fail(resource)
      this.spinner.fail(module.errors[0])
      return
    }

    if (!module.resource) {
      // Ignore context logging
      return
    }

    var resource = module.resource.substring(path.resolve('.').length + 1)
    this.spinner.text = `${chalk.green(this.working.expression)} ${chalk.gray(this.working.mood)}`
  }

  endTime (startTime) {
    const time = new Date().getTime() - startTime
    return (time < 1000 ? time + 'ms' : (parseFloat(time / 1000).toFixed(2) + 's'))
  }

  resolveHtml (data, html, st) {
    const route = Object.assign({}, data.plugin.options.route, html ? { html } : {})
    const info = this.context.config.info
    const web = this.context.config.web
    const scripts = st ? this.context.config.scripts : []
    const styles = this.context.config.styles

    const vars = JSON.stringify({ route: data.plugin.options.route })

    const chunky = { route, info, web, vars, scripts, styles }

    data.html = ejs.render(data.html, { chunky })

    return data
  }

  onPageGeneration (compilation, data, done) {
    done(null, this.resolveHtml(data))
  }

  onDone (stats) {
    if (stats.compilation.errors && stats.compilation.errors.length > 0) {
      stats.compilation.errors.map(error => {
        this.spinner.fail(error)
      })
      this.spinner.fail(`${chalk.red('Chunky failed. And he is devastated.')}`)
      return
    }

    const time = this.endTime(this.startTime)
    this.spinner.succeed(`${chalk.green('Chunky finished work in')} ${chalk.bold(time)} ${chalk.gray(this.happy.expression)} ${chalk.gray(this.happy.mood)}`)
  }

  apply (compiler) {
    compiler.plugin('compile', (params) => this.onStart())

    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('html-webpack-plugin-before-html-processing', (data, done) => this.onPageGeneration(compilation, data, done))
      compilation.plugin('build-module', (module) => this.onModuleStart(module))
      compilation.plugin('failed-module', (module) => this.onModuleFailure(module))
      compilation.plugin('succeed-module', (module) => this.onModuleSuccess(module))
    })

    compiler.plugin('done', (stats) => this.onDone(stats))
  }
}

module.exports = Plugin
