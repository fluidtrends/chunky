const coreutils = require('coreutils')
const firebase = require('firebase')
const firebaseline = require('firebaseline')
const fetch = require('node-fetch')
const { Base64 } = require('js-base64')
const si = require('systeminformation')
const os = require('os')
const setup = require('./setup')
const carmelFirebaseConfig = require('../../assets/carmel.firebase.json')

function getUserAccessToken(account, cache) {
  return fetch(`https://securetoken.googleapis.com/v1/token?key=${carmelFirebaseConfig.apiKey}`, {
    method: 'post',
    body:  JSON.stringify({
      grantType: "refresh_token",
      refresh_token: account.refreshToken
    }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }})
    .then(res => res.json())
    .then((access) => {
      cache.vaults.carmel.write('account', Object.assign({}, account, {
        refreshToken: access.refresh_token
      }))
      return access.access_token
    })
}

function callAction(args, account, cache, accessToken) {
  const target = args.target || 'activities'

  args.target && delete args.target

  const data = Object.assign({}, args, {
     platform: process.platform,
     email: account.email,
     machineId: cache.vaults.carmel.read('id')
  })

  return fetch(`https://api.carmel.io/journey/${target}`, {
     method: 'post',
     body:    JSON.stringify(data),
     headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json',
       'Authorization': Base64.encode(accessToken)
     }})
     .then(res => res.json())
}

function send(args, account, cache) {
  if (!account) {
    // Quietly refuse to do anything if not logged in
    return Promise.resolve()
  }

  return getUserAccessToken(account, cache)
          .then((accessToken) => callAction(args, account, cache, accessToken))
}

module.exports = { send }
