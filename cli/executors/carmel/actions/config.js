const coreutils = require('coreutils')
const status = require('../status')
const operation = require('../operation')
const input = require('../input')
const inquirer = require('inquirer')
const utils = require('../utils')
const opn = require('opn')
const chalk = require('chalk')

const AWS_ROOT_URL = () => 'https://console.aws.amazon.com/'
const AWS_CONSOLE_URL = () => `${AWS_ROOT_URL()}console/home`
const AWS_NEWUSER_URL = () => `${AWS_ROOT_URL()}iam/home?#/users$new?step=review`
const AWS_SECRET_URL = () => `${AWS_ROOT_URL()}iam/home?#/users$new?step=final`
const AWS_SETUP_URL = (username) => `${AWS_NEWUSER_URL()}&accessKey&userNames=${username}&permissionType=policies&policies=arn:aws:iam::aws:policy%2FAdministratorAccess`

function ensureVaultIsUnlocked(cache) {
  if (cache.vaults.master.isLocked) {
    coreutils.logger.info(`Looks like your Carmel vault is locked. Let's unlock it first`)
    return utils.unlock(cache)
  }

  return Promise.resolve()
}

function getKey(args) {
  if (args && args.length > 0) {
    return Promise.resolve({ key: args[0] })
  }

  return inquirer.prompt([{
    type: 'input',
    validate: (s) => s ? true : "C'mon, enter a valid key please :)",
    name: 'key',
    message: "What do you wanna save?"
  }])
}

function getValue() {
  return inquirer.prompt([{
    type: 'password',
    validate: (s) => s ? true : "C'mon, enter a valid value please :)",
    name: 'value',
    message: "What's the value?"
  }])
}

function getAwsCredentials() {
  const username = `Chunky-Admin-${Date.now()}`
  const url = AWS_SETUP_URL(username)

  coreutils.logger.info(`Let's give Chunky admin access to your AWS account`)
  coreutils.logger.ok(`We're going to do that by creating a special Chunky user inside your AWS account`)

  return inquirer.prompt([{
    type: 'input',
    name: 'ok',
    message: "Press ENTER to open your AWS console now"
  }])
  .then(() => {
    opn(url)
    coreutils.logger.ok(`Awesome, now login and press the ${chalk.green.bold('Create user')} button when ready`)
  })
  .then(() => inquirer.prompt([{
    type: 'password',
    validate: (s) => s ? true : "C'mon, enter your key please :)",
    name: 'accessKey',
    message: `Now copy and paste your ${chalk.green.bold('Access key ID')} here:`
  }, {
    type: 'password',
    validate: (s) => s ? true : "C'mon, enter your key please :)",
    name: 'secretKey',
    message: `Great! Now also copy and paste your ${chalk.green.bold('Secret access key')} here:`
  }]))
  .then(({ accessKey, secretKey }) => {
    coreutils.logger.ok(`Amazing! That's it! Chunky can now do awesome AWS stuff on your behalf.`)
    return { accessKey, secretKey, username }
  })
}

function processCommand(account, cache, args) {
  return ensureVaultIsUnlocked(cache)
          .then(() => getAwsCredentials())
          .then((credentials) => {
            cache.vaults.master.write('aws', credentials)
          })
}

function main(account, cache, args) {
  if (!account) {
    return status(account, cache).then(() => {
      try {
        const a = cache.vaults.carmel.read('account')
        return processCommand(a, cache, args)
      } catch (e) {
        coreutils.logger.info(`Hey so how about you try this again :)`)
        return
      }
    })
  }

  return processCommand(account, cache, args)
}

module.exports = main
