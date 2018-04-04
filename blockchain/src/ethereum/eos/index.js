import EOS_CROWDSALE_ABI from './crowdsale.abi.js'
import EOS_TOKEN_ABI from './token.abi.js'
import EOS_UTILITIES_ABI from './utilities.abi.js'

const EOS_CROWDSALE_ETH_ADDRESS = '0xd0a6e6c54dbc68db5db3a091b171a77407ff7ccf'
const EOS_TOKEN_ETH_ADDRESS = '0x86fa049857e0209aa7d9e616f7eb3b3b78ecfdb0'
const EOS_UTILITIES_ETH_ADDRESS = '0x860fd485f533b0348e413e65151f7ee993f93c02'

export default class EOS {
  constructor (props) {
    this._props = props || {}
    this._ethereum = props.ethereum
  }

  get props () {
    return this._props
  }

  get ethereum () {
    return this._ethereum
  }

  get crowdsaleContract () {
    if (!this.ethereum) {
      return
    }

    return this.ethereum.contract(EOS_CROWDSALE_ABI, EOS_CROWDSALE_ETH_ADDRESS)
  }

  get tokenContract () {
    if (!this.ethereum) {
      return
    }

    return this.ethereum.contract(EOS_TOKEN_ABI, EOS_TOKEN_ETH_ADDRESS)
  }

  balance (address) {
    const contract = this.tokenContract

    if (!contract) {
      return Promise.reject(new Error('Missing EOS Token Contract'))
    }

    return contract.methods.balanceOf(address).call()
  }
}
