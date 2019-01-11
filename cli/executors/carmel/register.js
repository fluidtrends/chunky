const coreutils = require('coreutils')
const firebase = require('firebase')
const firebaseline = require('firebaseline')
const input = require('./input')
const login = require('./login')
const operation = require('./operation')

function doRegister({ account, cache, email, password, name }) {
    return firebaseline.operations.register(firebase, { email, password, name, appAuth: true, fromChunky: true })
           .then(() => login(account, cache, email, password, true))
}

function skipRegister(account) {
  coreutils.logger.info(`Hey, you aready have an account :)`)
  coreutils.logger.ok(`You're logged in now (${account.email})`)
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
                coreutils.logger.ok("Welcome to the Carmel family :)")
                return operation.send({ type: "register" }, account, cache)
              })
              .catch((error) => {
                coreutils.logger.fail(error.message)
                coreutils.logger.skip("Give it another shot")
                return register(account, cache)
              })
}


module.exports = register
