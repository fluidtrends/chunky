const inquirer = require('inquirer')
const coreutils = require('coreutils')

function getNewChallengeDetails() {
  return inquirer.prompt([{
    type: 'list',
    choices: ["Professional", "Studio", "Playground"],
    default: "Professional",
    name: 'type',
    message: "What kind of a challenge will this be?"
  }, {
    type: 'list',
    choices: ["Apprentice", "Journeyman", "Master"],
    default: "Apprentice",
    name: 'level',
    message: "What will be the difficulty level?"
  }, {
    type: 'input',
    name: 'name',
    validate: (s) => s.length > 10 && s.length < 60 || "10 to 60 characters please :)",
    message: "Great, now give this challenge a good name"
  }, {
   type: 'input',
   name: 'source',
   validate: (s) => s && s.split("/").length === 3 || "Use this as an example: idancali/carmel-challenges/first-product",
   message: "And finally, where is the source code located (<github username>/<repo>/<dir>)?"
 }])
}

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
  getNewUserInfo,
  getNewChallengeDetails
}
