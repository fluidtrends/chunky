const coreutils = require('coreutils')
const firebase = require('firebase')
const firebaseline = require('firebaseline')
const input = require('../input')
const operation = require('../operation')
const carmelFirebaseConfig = require('../../../assets/carmel.firebase.json')

function doLogin({ email, password }) {
  return new Promise((resolve, reject) => {
           firebaseline.operations.login(firebase, ({ email, password }))
           .then((account) => {
               const authUserKey = `firebase:authUser:${carmelFirebaseConfig.apiKey}:[DEFAULT]`
               const authUser = JSON.parse(localStorage.getItem(authUserKey))
               const combined = Object.assign({}, {
                 uid: account._id,
                 refreshToken: authUser.stsTokenManager.refreshToken,
                 timestamp: `${Date.now()}`
               }, account)
               resolve(Object.assign({}, combined))
            })
            .catch((e) => {
              reject(e)
            })
        })
}

function getUserCredentials(email, password) {
  return (!email || !password) ? input.getUserCredentials() : Promise.resolve({ email, password })
}

function skipLogin(account) {
  coreutils.logger.info(`Hey, you're already logged in :)`)
  coreutils.logger.ok(`You're logged in (${account.email})`)
  return Promise.resolve()
}

function login(account, cache, e, p, silent) {
  if (account) {
    return skipLogin(account)
  }

  silent || coreutils.logger.info(`Let's get you back on track :)`)

  return getUserCredentials(e, p)
              .then(({ email, password }) => doLogin({ email, password }))
              .then((account) => {
                silent || coreutils.logger.ok("Boom! You're in! Now let's slay ourselves some dragons.")
                cache.vaults.carmel.write('account', account)
                return operation.send({ target: "journeys", type: "login" }, account, cache)
              })
              .catch((error) => {
                coreutils.logger.fail(error.message)
                coreutils.logger.skip("Give it another shot")
                return login(account, cache, e, p)
              })
}

module.exports = login
