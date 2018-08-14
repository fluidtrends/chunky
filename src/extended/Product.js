import {
  createFile,
  generateManifest,
  generatePackage,
  loadManifest,
  loadChunks,
  installTemplate
} from '.'
import path from 'path'
import fs from 'fs-extra'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import cpy from 'cpy'

export default class Product {
  constructor (props) {
    this._props = props
  }

  get props () {
    return this._props
  }

  get id () {
    return this.props.id
  }

  get name () {
    return this.props.name
  }

  get template () {
    return this.props.template
  }

  get fixture () {
    return this.props.fixture
  }

  get root () {
    return this.props.root
  }

  get home () {
    return this.props.home
  }

  get exists () {
    return fs.existsSync(this.dir)
  }

  get depsRoot () {
    return this.props.depsRoot
  }

  get dir () {
    return path.resolve(this.home, 'products', this.id)
  }

  compilerConfig ({ dir, port }) {
    return {
      host: '0.0.0.0',
      watchOptions: {
        poll: true,
        aggregateTimeout: 100
      },
      // inline: true,
      // quiet: true,
      // noInfo: true,
      // stats: {
      //   assets: false,
      //   colors: true,
      //   version: false,
      //   hash: false,
      //   timings: false,
      //   chunks: false,
      //   chunkModules: false,
      //   modules: false
      // },
      port,
      contentBase: path.resolve(dir, '.chunky', 'web'),
      watchContentBase: true,
      historyApiFallback: true,
      hot: true
    }
  }

  start ({ port }, cb) {
    return new Promise((resolve, reject) => {
      try {
        process.noDeprecation = true

        const dir = path.resolve(this.dir, '.chunky', 'web')
        fs.existsSync(dir) && fs.removeSync(dir)
        fs.mkdirsSync(dir)

        const manifest = loadManifest(this)
        const chunks = loadChunks(this)

        const root = this.root
        console.log(root)
        const configFile = path.resolve(this.dir, 'node_modules', 'react-dom-chunky', 'packager', 'config.dev.js')
        const config = require(configFile)
        const setup = config({ dir: this.dir, chunks, config: manifest, root, port })
        const compConfig = this.compilerConfig({ dir: this.dir, root, port })

        const compiler = webpack(setup)
        compiler.plugin('done', (stats) => {
          cb && cb(Object.assign({}, { compiled: true, compiling: false }, stats.compilation.errors.length > 0, { errors: stats.compilation.errors }))
        })
        compiler.plugin('compile', (params) => {
          cb && cb(Object.assign({}, { compiled: false, compiling: true }))
        })

        const server = new WebpackDevServer(compiler, compConfig)
        server.listen(port, '0.0.0.0', (error) => {
          if (error) {
            console.log(error)
            reject(error)
            return
          }
          console.log('Web server started')
          resolve()
        })
      } catch (e) {
        console.log(e)
        reject(e)
      }
    })
  }

  installDependencies () {
    const depsDir = path.resolve(this.dir, 'node_modules')
    if (!fs.existsSync(depsDir)) {
      fs.mkdirsSync(depsDir)
    }

    const srcDepsDir = path.resolve(this.root, 'node_modules')
    const destDepsDir = path.resolve(this.dir, 'node_modules')

    const deps = ['react-dom-chunky']
    fs.copySync(path.resolve(srcDepsDir, 'react-dom-chunky'), path.resolve(destDepsDir, 'react-dom-chunky'))
  }

  create () {
    if (this.exists) {
      return Promise.reject(new Error('The product already exists'))
    }

    fs.mkdirsSync(this.dir)

    const packageData = generatePackage({ name: this.name })
    createFile({ root: this.dir, filepath: 'package.json', data: packageData, json: true })
    this.installDependencies()

    const template = Object.assign({}, this.template, { name: this.name })
    const fixture = this.fixture(template)

    return installTemplate({ dir: this.dir, home: this.home, template, fixture })
  }
}
