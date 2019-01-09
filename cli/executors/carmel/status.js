const coreutils = require('coreutils')
const path = require('path')
const fs = require('fs-extra')
const cache = require('../../src/cache')
const cpy = require('cpy')
const firebase = require('firebase')
const carmelFirebaseConfig = require('../../assets/carmel.firebase.json')
const firebaseline = require('firebaseline')
const inquirer = require('inquirer')

function getCredentials() {
  var questions = [{
    type: 'input',
    name: 'email',
    message: "Email:",
  },
  {
    type: 'password',
    name: 'password',
    message: "Password:",
  }]

  coreutils.logger.info(`Please login to your Carmel account`)

  return inquirer.prompt(questions)
}

function login({ email, password }) {
  return new Promise((resolve, reject) => {
           firebaseline.operations.login(firebase, ({ email, password }))
           .then((account) => {
              firebase.auth().onAuthStateChanged((user) => {
                const combined = Object.assign({}, {
                  uid: user.uid,
                  emailVerified: user.emailVerified
                }, account)
                coreutils.logger.ok(`You are now logged in to Carmel`)
                resolve(combined)
              })
            })
            .catch((e) => {
              reject(e)
              coreutils.logger.fail(e.message)
            })
        })
}


function check(command) {
  coreutils.logger.header(`Carmel`)
  firebase.initializeApp(carmelFirebaseConfig)

  const c = cache({})
  c.setup()
   .then(() => {
     try {
       return c.vaults.carmel.read('account')
     } catch (e) {
       return
     }
   })
   .then((account) => {
     if (!account) {
       return getCredentials()
                .then((credentials) => login(credentials))
                .then((account) => c.vaults.carmel.write('account', account))
                .then(() => process.exit(0))
     }

     coreutils.logger.ok(`You are logged in to Carmel (${account.name})`)
   })
   .catch((error) => {
      console.log(error)
   })
}

module.exports = { check }
