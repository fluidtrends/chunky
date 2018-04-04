export default class InfuraFactory {

  constructor (props) {
    this._props = props
  }

  makeProvider (url) {
    if (!url) {
      return
    }

    return url
  }

  get props () {
    return this._props
  }

  get hasKey () {
    return (this.props && this.props.key)
  }

  get key () {
    if (!this.hasKey) {
      return
    }

    return this.props.key
  }

  get provider () {
    if (!this.props || !this.hasKey) {
      return
    }

    if (this.props.provider && this[this.props.provider]) {
      return this[this.props.provider]
    }

    return this.mainNet
  }

  get mainNet () {
    return this.makeProvider(`https://mainnet.infura.io/${this.key}`)
  }

  get ropsten () {
    return this.makeProvider(`https://ropsten.infura.io/${this.key}`)
  }

  get infuraNet () {
    return this.makeProvider(`https://infuranet.infura.io/${this.key}`)
  }

  get kovan () {
    return this.makeProvider(`https://kovan.infura.io/${this.key}`)
  }

  get rinkeby () {
    return this.makeProvider(`https://rinkeby.infura.io/${this.key}`)
  }

  get ipfs () {
    return this.makeProvider(`https://ipfs.infura.io`)
  }
}
