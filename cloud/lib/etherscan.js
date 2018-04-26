'use strict';

var fetch = require('node-fetch');

var api = function api(apiKey, data) {
  var args = Object.keys(data).filter(function (key) {
    return data[key];
  }).map(function (key) {
    return key + '=' + data[key];
  }).join('&');
  var url = 'http://api.etherscan.io/api?apikey=' + apiKey + '&tag=latest&' + args;
  return fetch(url).then(function (res) {
    return res.json();
  }).then(function (json) {
    return json.result;
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
  var addresses = _ref2.addresses,
      address = _ref2.address;
  return api(apiKey, {
    module: 'account',
    action: 'balance',
    addresses: addresses ? addresses.join(',') : undefined,
    address: address
  });
};

module.exports = {
  api: api,
  transactions: transactions,
  balance: balance
};