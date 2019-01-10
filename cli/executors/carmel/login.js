const coreutils = require('coreutils')
const firebase = require('firebase')
const firebaseline = require('firebaseline')
const input = require('./input')

function doLogin({ email, password }) {
  return new Promise((resolve, reject) => {
           firebaseline.operations.login(firebase, ({ email, password }))
           .then((account) => {
              firebase.auth().onAuthStateChanged((user) => {
                const combined = Object.assign({}, {
                  uid: user.uid,
                  emailVerified: user.emailVerified
                }, account)
                resolve(combined)
              })
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
  coreutils.logger.ok(`You're logged in as ${account.name} (${account.email})`)
  return Promise.resolve()
}

function login(account, cache, e, p) {
  console.log(cache)
  if (account) {
    return skipLogin(account)
  }

  coreutils.logger.info(`Let's get you back on track :)`)

  return getUserCredentials(e, p)
              .then(({ email, password }) => doLogin({ email, password }))
              .then((account) => {
                coreutils.logger.ok("Boom! You're in! Now let's slay ourselves some dragons.")
                cache.vaults.carmel.write('account', account)
              })
              .catch((error) => {
                coreutils.logger.fail(error.message)
                coreutils.logger.skip("Give it another shot")
                return login(account, cache, e, p)
              })
}

module.exports = login
