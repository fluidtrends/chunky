import {
  createFile,
  generateManifest,
  generatePackage,
  cacheChunksArchive,
  updateChunksIndex,
  installTemplate
} from '../generators'
import fs from 'fs-extra'
import path from 'path'
import Chunk from './Chunk'

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

  get root () {
    return this.props.root
  }

  get dir () {
    return path.resolve(this.root, this.id)
  }

  get exists () {
    return fs.existsSync(this.dir)
  }

  create () {
    if (this.exists) {
      return
    }

    fs.mkdirsSync(this.dir)

    const packageData = generatePackage({ name: this.name })
    const manifestData = generateManifest({ name: this.name })

    createFile({ root: this.dir, filepath: 'package.json', data: packageData, json: true })
    createFile({ root: this.dir, filepath: 'chunky.json', data: manifestData, json: true })

    installTemplate({ root: this.dir, name: 'bananas/personal' })

    updateChunksIndex(this.dir)
  }

  addChunk () {
    const chunksCacheDir = path.resolve(this.dir)
    // const name = 'main'
    // const chunk = new Chunk({ name })
  }
}
