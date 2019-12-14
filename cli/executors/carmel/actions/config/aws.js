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

module.exports = (cache, env) => {
  let date = `${Date.now()}`
  let username = ``
  let friendlyUsername = ``

  coreutils.logger.info(`Chunky will need access to your private cloud infrastructure`)
  coreutils.logger.info(`Let's give Chunky admin access to your AWS ${chalk.green.bold(env)} account`)
  coreutils.logger.info(`We will do that by creating an admin user on your AWS account`)

  return inquirer.prompt([{
    type: 'input',
    name: 'name',
    message: `[${chalk.green.bold('1/4')}] Please choose a friendly name for the AWS admin user:`
  }])
  .then(({ name }) => {
    username = name.replace(/[\W_]+/g, "-")
    friendlyUsername = `${name}`
    return inquirer.prompt([{
      type: 'input',
      name: 'ok',    
      message: `[${chalk.green.bold('2/4')}] Login to AWS and click the ${chalk.blue.bold('Create user')} button. Press ENTER to continue...`
    }])
  })
  .then(() => {
    opn(AWS_SETUP_URL(`Chunky-${username}-${date}`))
  })
  .then(() => inquirer.prompt([{
    type: 'password',
    validate: (s) => s ? true : "C'mon, enter your Access key ID please :)",
    name: 'accessKey',
    message: `[${chalk.green.bold('3/4')}] Copy the ${chalk.yellow.bold('Access key ID')} and paste it here:`
  }, {
    type: 'password',
    validate: (s) => s ? true : "C'mon, enter your Secret access key please :)",
    name: 'secretKey',
    message: `[${chalk.green.bold('4/4')}] Also copy and paste your ${chalk.yellow.bold('Secret access key')} here:`
  }]))
  .then((credentials) => {
    const original = cache.vaults.master.read('aws')

    cache.vaults.master.write('aws', Object.assign({}, original, { [username]: Object.assign({}, credentials, { username, friendlyUsername, date }) }))
    coreutils.logger.info(`Amazing! Chunky can now do awesome (and secure) AWS stuff on your behalf - woohoo!`)
  })
}
