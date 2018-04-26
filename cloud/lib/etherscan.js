'use strict';

var fetch = require('node-fetch');

var api = function api(apiKey, data) {
  var args = Object.keys(data).filter(function (key) {
    return data[key];
  }).map(function (key) {
    return key + '=' + data[key];
  }).join('&');
  return fetch('http://api.etherscan.io/api?apikey=' + apiKey + '&tag=latest&' + args).then(function (res) {
    return res.json();
  });
};

var transactions = function transactions(apiKey, _ref) {
  var address = _ref.address,
      total = _ref.total,
      contract = _ref.contract;
  return api(apiKey, {
    module: 'account',
    action: contract ? 'tokentx' : 'txlist',
    sort: 'desc',
    page: 1,
    offset: total,
    address: address,
    contract: contract
  });
};

var balance = function balance(apiKey, _ref2) {
  var addresses = _ref2.addresses;
  return api(apiKey, {
    module: 'account',
    action: 'balance',
    addresses: addresses.join(',')
  });
};

module.exports = {
  api: api,
  transactions: transactions,
  balance: balance
};