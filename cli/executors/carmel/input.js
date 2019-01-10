const inquirer = require('inquirer')
const coreutils = require('coreutils')

function getNewPassword() {
  return inquirer.prompt([{
    type: 'password',
    name: 'password',
    message: "Choose a password"
  }, {
    type: 'password',
    name: 'password2',
    message: "Confirm your password"
  }])
  .then(({ password, password2 }) => {
    if (password !== password2) {
      coreutils.logger.skip("Your passwords don't match :(")
      return getNewPassword()
    }

    return password
  })
}

function getNewUserInfo() {
  return inquirer.prompt([{
    type: 'input',
    name: 'name',
    message: "What's your name?"
  }, {
    type: 'input',
    name: 'email',
    message: "What's your email address?"
  }])
}

function getUserCredentials() {
  return inquirer.prompt([{
    type: 'input',
    name: 'email',
    message: "What's your email address?"
  }, {
    type: 'password',
    name: 'password',
    message: "What's your password?"
  }])
}

module.exports = {
  getUserCredentials,
  getNewPassword,
  getNewUserInfo
}
