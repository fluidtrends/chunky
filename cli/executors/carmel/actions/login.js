const coreutils = require('coreutils')
const firebase = require('firebase')
const Base64 = require('js-base64').Base64
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
  coreutils.logger.info(`Hey, you're already logged in.`)
  coreutils.logger.ok(`You're logged in (${account.email})`)
  return Promise.resolve()
}

function login(account, cache, args, env, cmd) {
  if (account) {
    if (!cmd.service) {
      return skipLogin(account)
    }

    return operation.send({ target: "journeys", type: "login" }, account, cache)
                    .then((response) => operation.send({ target: "listings" }, account, cache)
                                .then((journey) => {
                                  process.send && process.send(cache.saveEvent(Object.assign({}, { eventId: 'login', account }, journey.data)))
                                }))
  }

  coreutils.logger.info(`Let's get you back on track :)`)

  if (cmd.service && cmd.silent && !account) {
    process.send && process.send(cache.saveEvent(Object.assign({}, { eventId: 'login', error: 'Not logged in' })))
    return Promise.resolve()
  }

  return getUserCredentials(`${cmd.email}`, `${cmd.password}`)
              .then(({ email, password }) => doLogin({ email, password }))
              .then((account) => {
                coreutils.logger.ok("Boom! You're in! Now let's slay ourselves some dragons.")
                cache.vaults.carmel.write('account', account)
                return operation.send({ target: "journeys", type: "login" }, account, cache)
                                .then((response) => operation.send({ target: "listings" }, account, cache)
                                .then((journey) => {
                                  process.send && process.send(cache.saveEvent(Object.assign({}, { eventId: 'login', account }, journey.data)))
                                  return journey
                                }))              
              })
              .catch((error) => {
                process.send && process.send(cache.saveEvent(Object.assign({}, { eventId: 'login', error: error.message })))
                coreutils.logger.fail(error.message)
                coreutils.logger.skip("Give it another shot")
                // return login(account, cache, args, env, cmd)
              })
}

module.exports = login
