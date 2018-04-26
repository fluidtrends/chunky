const blockchain = require('react-blockchain-chunky')

function initialize (config) {
  return new blockchain.Ethereum(config.settings.ethereum)
}

module.exports = {
  initialize
}
