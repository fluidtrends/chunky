const coreutils = require('coreutils')
const firebase = require('firebase')
const firebaseline = require('firebaseline')
const input = require('./input')
const login = require('./login')

function doRegister({ account, cache, email, password, name }) {
  return new Promise((resolve, reject) => {
           firebaseline.operations.register(firebase, { email, password, name, appAuth: true, fromChunky: true })
           .then(() => login(account, cache, email, password))
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

function skipRegister(account) {
  coreutils.logger.info(`Hey, you aready have an account :)`)
  coreutils.logger.ok(`You're logged in as ${account.name} (${account.email})`)
  return Promise.resolve()
}

function register(account, cache) {
  if (account) {
    return skipRegister(account)
  }

  coreutils.logger.info(`Let's set you up with a free Carmel account`)

  return input.getNewUserInfo()
              .then(({ name, email }) => input.getNewPassword()
              .then((password) => doRegister({ account, cache, email, password, name })))
              .then((account) => {
                coreutils.logger.ok("Awesome! Welcome to the Carmel family! Now let's slay ourselves some dragons.")
                cache.vaults.carmel.write('account', account)
              })
              .catch((error) => {
                coreutils.logger.fail(error.message)
                coreutils.logger.skip("Give it another shot")
                return login()
              })
}


module.exports = register
