const fetch = require('node-fetch')

const api = (apiKey, data) => {
  const args = Object.keys(data).filter(key => data[key]).map(key => `${key}=${data[key]}`).join('&')
  const url = `http://api.etherscan.io/api?apikey=${apiKey}&tag=latest&${args}`
  return fetch(url).then(res => res.json()).then(json => json.result)
}

const transactions = (apiKey, { address, total, contract, startBlock }) => api(apiKey, {
  module: 'account',
  action: (contract ? 'tokentx' : 'txlist'),
  sort: 'desc',
  page: 1,
  offset: total,
  address,
  startBlock,
  contract
})

const balance = (apiKey, { addresses, address, contract }) => api(apiKey, {
  module: 'account',
  action: (contract ? 'tokenbalance' : (addresses ? 'balancemulti' : 'balance')),
  contractaddress: contract,
  address: (addresses ? addresses.join(',') : address)
})

module.exports = {
  api,
  transactions,
  balance
}
