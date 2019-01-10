const coreutils = require('coreutils')
const cache = require('../../src/cache')
const firebase = require('firebase')
const carmelFirebaseConfig = require('../../assets/carmel.firebase.json')
const status = require('./status')
const actions = require('./all')

function performAction (command, account, c) {
  try {
    const action = command.actions[0]
    if (!action || !actions[action]) {
      return status(account, c, true)
    }

    return actions[action](account, c)

  } catch (e) {
    return status(account, c, true)
  }
}

function start(command) {
  coreutils.logger.header(`Carmel`)
  firebase.initializeApp(carmelFirebaseConfig)

  const c = cache({})
  c.setup()
   .then(() => {
     try {
       return c.vaults.carmel.read('account')
     } catch (e) {
       return
     }
   })
   .then((account) => performAction(command, account, c))
   .then(() => {
     coreutils.logger.footer(`Learn more at carmel.io`)
     process.exit(0)
   })
   .catch((error) => {
     coreutils.logger.fail(error.message)
     coreutils.logger.footer(`Learn more at carmel.io`)
   })
}

module.exports = start
