const coreutils = require('coreutils')
const inquirer = require('inquirer')
const input = require('../input')
const operation = require('../operation')

function doLogout(account, cache) {
  cache.vaults.carmel.write('account', '')
  coreutils.logger.ok(`You are now logged out`)
  return operation.send({ target: "journeys", type: "logout" })
  return Promise.resolve()
}

function skipLogout() {
  coreutils.logger.ok(`Phew, that was close.`)
  return Promise.resolve()
}


function logout(account, cache) {
  if (account) {
    return inquirer.prompt([{
      type: 'confirm',
      name: "sure",
      message: 'Are you sure you wanna logout?'
    }])
    .then(({ sure }) => sure ? doLogout(account, cache) : skipLogout())
  }

  coreutils.logger.info(`You are not logged in yet`)
}

module.exports = logout
