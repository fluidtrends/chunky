import {
  createFile,
  generateManifest,
  generatePackage,
  updateChunksIndex,
  installTemplate
} from './generators'
import path from 'path'
import fs from 'fs-extra'

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

  create () {
    if (this.exists) {
      return
    }

    const packageData = generatePackage({ name: this.name })
    const manifestData = generateManifest({ name: this.name })

    createFile({ root: this.dir, filepath: 'package.json', data: packageData, json: true })
    createFile({ root: this.dir, filepath: 'chunky.json', data: manifestData, json: true })

    installTemplate({ dir: this.dir, home: this.home, template: this.template })

    updateChunksIndex(this.dir)
  }
}
