import EOS from './eos'
import InfuraFactory from './infura'

export default class Ethereum {
  constructor (props) {
    this._accounts = []
    this._props = props || {}
    this._infura = new InfuraFactory(props.infura)
    this._account = props.account
    this._load()
  }

  _load () {
    try {
      const Web3 = require('web3')
      this._provider = new Web3(this.props.provider || new Web3.providers.HttpProvider(this.infura.provider))
      this._eos = new EOS({ ethereum: this })
    } catch (e) {
      console.log(e)
    }
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

  get account () {
    return this._account
  }

  get provider () {
    return this._provider
  }

  get eos () {
    return this._eos
  }

  contract (abi, address) {
    if (!abi || !address || !this.provider) {
      return
    }

    return new this.provider.eth.Contract(abi, address)
  }

  refreshAccounts () {
    return new Promise((resolve, reject) => {
      if (!this.provider) {
        resolve([])
        return
      }

      this.provider.eth.getAccounts((error, accounts) => {
        if (error || !accounts || accounts.length < 1) {
          resolve([])
          return
        }
        this._accounts = [].concat(accounts)
        this._account = accounts[0]
        resolve(accounts)
      })
    })
  }
}
