const inquirer = require('inquirer')
const coreutils = require('coreutils')
const input = require('./input')
const login = require('./login')
const register = require('./register')

function accountStatus(account, cache) {
  coreutils.logger.ok(`You are logged in (${account.email})`)
  return Promise.resolve()
}

function main(account, cache, help) {
  if (account) {
    return accountStatus(account, cache)
  }

  coreutils.logger.info(`Hey you, welcome to Carmel!`)
  coreutils.logger.info(`Carmel is a Decentralized Platform that helps you grow your tech skills`)
  coreutils.logger.info(`Get a free account right now or sign if you're already part of the family`)

  return inquirer.prompt([{
    type: 'confirm',
    name: "hasAccount",
    message: 'Do you have a Carmel account?'
  }])
  .then(({ hasAccount }) => hasAccount ? login(account, cache) : register(account, cache))
}

module.exports = main
