import Web3 from 'web3'
import Infura from './infura'
import EOS from './eos'

export default class Ethereum {
  constructor (props) {
    this._accounts = []
    this._props = props || {}
    this._infura = new Infura(props.infura)
    this._provider = new Web3(this.props.provider || this.infura.provider)
    this._eos = new EOS({ ethereum: this })
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
        reject(new Error('Unknown Ethereum provider'))
        return
      }

      this.provider.eth.getAccounts((error, accounts) => {
        if (error || !accounts || accounts.length < 1) {
          reject(new Error('No Ethereum accounts available'))
          return
        }
        this._accounts = [].concat(accounts)
        this._account = accounts[0]
        resolve(accounts)
      })
    })
  }
}
