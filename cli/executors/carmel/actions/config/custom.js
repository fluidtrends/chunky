const coreutils = require('coreutils')
const operation = require('../../operation')
const input = require('../../input')
const inquirer = require('inquirer')
const utils = require('../../utils')
const opn = require('opn')
const chalk = require('chalk')

const AWS_ROOT_URL = () => 'https://console.aws.amazon.com/'
const AWS_CONSOLE_URL = () => `${AWS_ROOT_URL()}console/home`
const AWS_NEWUSER_URL = () => `${AWS_ROOT_URL()}iam/home?#/users$new?step=review`
const AWS_SECRET_URL = () => `${AWS_ROOT_URL()}iam/home?#/users$new?step=final`
const AWS_SETUP_URL = (username) => `${AWS_NEWUSER_URL()}&accessKey&userNames=${username}&permissionType=policies&policies=arn:aws:iam::aws:policy%2FAdministratorAccess`

module.exports = (cache, key) => {
  return inquirer.prompt([{
    type: 'input',
    validate: (s) => s ? true : "C'mon, enter a valid key please :)",
    name: 'key',
    default: key,
    message: "What's the key?"
  }, {
    type: 'password',
    validate: (s) => s ? true : "C'mon, enter a valid value please :)",
    name: 'value',
    message: "What's the value?"
  }])
  .then(({ key, value }) => {
    cache.vaults.master.write(key, value)
    coreutils.logger.ok(`The ${key} configuration was successfully stored in your Carmel vault`)
  })
}
