const fetch = require('node-fetch')

const api = (apiKey, data) => {
  const args = Object.keys(data).filter(key => data[key]).map(key => `${key}=${data[key]}`).join('&')
  const url = `http://api.etherscan.io/api?apikey=${apiKey}&tag=latest&${args}`
  return Promise.resolve(url)
  // return fetch(url).then(res => res.json())
}

const transactions = (apiKey, { address, total, contract }) => api(apiKey, {
  module: 'account',
  action: (contract ? 'tokentx' : 'txlist'),
  sort: 'desc',
  page: 1,
  offset: total,
  address,
  contract
})

const balance = (apiKey, { addresses }) => api(apiKey, {
  module: 'account',
  action: 'balance',
  addresses: addresses.join(',')
})

module.exports = {
  api,
  transactions,
  balance
}
