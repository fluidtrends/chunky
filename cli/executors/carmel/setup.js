const coreutils = require('coreutils')
const cache = require('../../src/cache')
const firebase = require('firebase')
const fs = require('fs-extra')
const carmelFirebaseConfig = require('../../assets/carmel.firebase.json')
const path = require('path')

const HOME_DIR = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']

if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage
  localStorage = new LocalStorage(path.resolve(HOME_DIR, '.chunkyLocalStorage'))
}

function setup() {
  try {
    firebase.initializeApp(carmelFirebaseConfig)
  } catch (e) {

  }
  const c = cache({})

  return c.setup()
   .then(() => {
     try {
       return c.vaults.carmel.read('account')
     } catch (e) {
       return
     }
   })
   .then((account) => ({ account, cache: c }))
}

module.exports = setup
