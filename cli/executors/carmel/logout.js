const coreutils = require('coreutils')
const inquirer = require('inquirer')
const login = require('./login')
const input = require('./input')

function doLogout(cache) {
  cache.vaults.carmel.write('account', '')
  coreutils.logger.ok(`You are now logged out`)
  return Promise.resolve()
}

function skipLogout() {
  coreutils.logger.ok(`Phew, that was close.`)
  return Promise.resolve()
}

function doLogin(cache) {
  return input.getUserCredentials()
              .then(({ email, password }) => login({ email, password }))
              .then((account) => {
                coreutils.logger.ok("Boom! You're in! Now let's slay ourselves some dragons.")
                cache.vaults.carmel.write('account', account)
              })
              .catch((error) => {
                coreutils.logger.fail(error.message)
                coreutils.logger.skip("Give it another shot")
                return doLogin()
              })
}

function skipLogin() {
  coreutils.logger.ok(`Alright, all good - maybe some other time.`)
  return Promise.resolve()
}

function logout(account, cache) {
  if (account) {
    return inquirer.prompt([{
      type: 'confirm',
      name: "sure",
      message: 'Are you sure you wanna logout?'
    }])
    .then(({ sure }) => sure ? doLogout(cache) : skipLogout())
  }

  coreutils.logger.info(`You are not logged in yet`)
  return inquirer.prompt([{
    type: 'confirm',
    name: "sure",
    message: 'Wanna login?'
  }])
  .then(({ sure }) => sure ? doLogin(cache) : skipLogin())
}

module.exports = logout
