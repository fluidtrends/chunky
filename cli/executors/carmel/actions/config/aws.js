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

module.exports = (account, cache, env) => {
  const username = `Chunky-Admin-${Date.now()}`
  const url = AWS_SETUP_URL(username)

  coreutils.logger.info(`Let's give Chunky admin access to your AWS ${chalk.green.bold(env)} account`)
  coreutils.logger.ok(`We're going to do that by creating a special AWS Chunky user`)

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
  .then((credentials) => {
    const envs = cache.vaults.master.read('envs')
    const original = cache.vaults.master.read('aws')

    cache.vaults.master.write('envs', envs ? [env].concat(envs) : [env])
    cache.vaults.master.write('aws', Object.assign({}, original, { [env]: Object.assign({}, credentials, { username }) }))

    coreutils.logger.info(`Amazing! Your AWS credentials are now securely stored in your Carmel vault`)
    coreutils.logger.ok(`Chunky can now do awesome AWS stuff on your behalf`)
  })
}
