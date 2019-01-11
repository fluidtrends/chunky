const coreutils = require('coreutils')
const cache = require('../../src/cache')
const firebase = require('firebase')
const carmelFirebaseConfig = require('../../assets/carmel.firebase.json')
const path = require('path')

const HOME_DIR = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']
const CHUNKY_HOME_DIR = path.resolve(HOME_DIR, '.chunky')

if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage
  localStorage = new LocalStorage(path.resolve(CHUNKY_HOME_DIR, '.localStorage'))
}

function setup() {
  firebase.initializeApp(carmelFirebaseConfig)

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
