const coreutils = require('coreutils')
const chalk = require('chalk')
const status = require('./status')
const operation = require('./operation')
const input = require('./input')
const inquirer = require('inquirer')
var nacl = require('tweetnacl')
nacl.util = require('tweetnacl-util')

function encrypt(account, cache) {
  // const key = nacl.box.keyPair()

  // const publicKeyBase64 = nacl.util.encodeBase64(key.publicKey)
  // const privateKeyBase64 = nacl.util.encodeBase64(key.secretKey)

  // console.log(publicKeyBase64)
  // console.log(privateKeyBase64)
}

function getChallenge(account, cache) {
  return operation.send({ target: "listings" }, account, cache)
          .then((response) => {
            if (!response.ok || !response.data || !response.data.journey) {
              coreutils.logger.fail("Something went wrong, give it another shot")
              return
            }

            if (!response.data.journey.challenge) {
              coreutils.logger.info("You don't have a challenge in progress")
              return Promise.resolve()
            }

            return operation.send({ target: "listings", challengeId: response.data.journey.challenge.challengeId }, account, cache)
                            .then((result) => Object.assign({}, result.data.challenge, { state: response.data.journey.challenge }))
          })
          .catch((error) => {
             coreutils.logger.fail(error.message)
           })
}


module.exports = {
  getChallenge,
  encrypt
}
