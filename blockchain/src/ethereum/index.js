import Infura from './infura'

export default class Ethereum {
  constructor (props) {
    this._accounts = []
    this._props = props || {}
    this._infura = new Infura(props.infura)
    this._provider = this.props.provider || this.infura.provider
  }

  get infura () {
    return this._infura
  }

  get props () {
    return this._props
  }

  get accounts () {
    return this._accounts
  }

  get provider () {
    return this._provider
  }

  contract (data) {
    if (!data || !data.abi || !data.address || !this.provider) {
      return
    }

    return new this.provider.Contract(data.abi, data.address)
  }

  refreshAccounts () {
    return new Promise((resolve, reject) => {
      if (!this.provider) {
        reject(new Error('Unknown Ethereum provider'))
        return
      }

      this.provider.getAccounts((error, accounts) => {
        if (error || !accounts || accounts.length < 1) {
          reject(new Error('No Ethereum accounts available'))
          return
        }
        this._accounts = [].concat(accounts)
        resolve(accounts)
      })
    })
  }
}
