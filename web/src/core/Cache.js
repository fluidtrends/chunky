export default class Cache {

  constructor (props) {
    this._images = {}
    this._timestamp = Date.now()
    this._loadContext()
  }

  _loadContext () {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return
    }

    if (!require.context) {
      this._imagesContext = (name) => ({ placeholder: `../../assets/${name}`, images: [{ path: `../../assets/${name}` }, { path: `../../assets/${name}` }] })
      return
    }

    this._imagesContext = require.context('assets', false, /\.(png|jpe?g|svg)$/)
  }

  get images () {
    return this._images
  }

  hasImage (name) {
    return (this.images[name] !== undefined)
  }

  cacheImage (id) {
    const name = `./${id}`
    const timestamp = Date.now()
    const data = this._imagesContext(name, true)
    const placeholder = data.placeholder
    const small = data.images[0].path
    const large = data.images[1].path
    this._images[id] = { data, id, timestamp, small, large, placeholder }
  }

  image (name) {
    if (!this.hasImage(name)) {
      this.cacheImage(name)
    }

    return this.images[name]
  }
}
