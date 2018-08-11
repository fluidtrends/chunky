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

  get home () {
    return this.props.home
  }

  get exists () {
    return fs.existsSync(this.dir)
  }

  get dir () {
    return path.resolve(this.home, 'products', this.id)
  }

  start () {
    return new Promise((resolve, reject) => {
      try {
        const dir = path.resolve(this.dir, '.chunky', 'web')
        fs.existsSync(dir) && fs.removeSync(dir)
        fs.mkdirsSync(dir)

        var configFile = path.resolve(this.dir, 'node_modules', 'react-dom-chunky', 'packager', 'config.dev.js')
        const config = require(configFile)

        const manifest = loadManifest(this)
        const chunks = loadChunks(this)

        const setup = config({ dir: this.dir, chunks, config: manifest, port: 8082 })

        process.noDeprecation = true

        const server = new WebpackDevServer(webpack(setup), setup.devServer)

        server.listen(8082, '0.0.0.0', (error) => {
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

  create () {
    if (this.exists) {
      return Promise.reject(new Error('The product already exists'))
    }

    fs.mkdirsSync(this.dir)

    const packageData = generatePackage({ name: this.name })

    createFile({ root: this.dir, filepath: 'package.json', data: packageData, json: true })

    return installTemplate({ dir: this.dir, home: this.home, template: this.template })
  }
}
