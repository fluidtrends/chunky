const coreutils = require('coreutils')
const chalk = require('chalk')
const status = require('./status')
const operation = require('./operation')
const input = require('./input')
const inquirer = require('inquirer')
const path = require('path')
const boxen = require('boxen')
const Base64 = require('js-base64').Base64;
const CarmelPublicKey = "/gzWe+WVjUMLkyxImrVXa3XAva5OGH+MAERltnPSgUM="

process.env.NODE_NO_WARNINGS=1

var nacl = require('tweetnacl')
nacl.util = require('tweetnacl-util')

function secureKey(cache) {
  const key = cache.vaults.carmel.read('secureKey')
  if (key) {
    return key
  }

  // Generate a new key
  const keyPair = nacl.box.keyPair()
  const public = nacl.util.encodeBase64(keyPair.publicKey)
  const private = nacl.util.encodeBase64(keyPair.secretKey)
  const secureKey = { public, private }
  cache.vaults.carmel.write('secureKey', secureKey)

  return secureKey
}

function encode(account, cache, input) {
  return Base64.encode(JSON.stringify(input))
}

function decode(account, cache, input) {
  return JSON.parse(Base64.decode(input))
}

function encryptPublic(account, cache, input) {
}

function decryptPublic(account, cache, input) {
}

function encrypt(account, cache, input) {
  const key = secureKey(cache)
  const keyUint8Array = nacl.util.decodeBase64(key.private)
  const nonce = nacl.randomBytes(nacl.secretbox.nonceLength)
  const messageUint8 = nacl.util.decodeUTF8(JSON.stringify(Object.assign({}, input)))
  const box = nacl.secretbox(messageUint8, nonce, keyUint8Array)

  const fullMessage = new Uint8Array(nonce.length + box.length)
  fullMessage.set(nonce)
  fullMessage.set(box, nonce.length)

  return nacl.util.encodeBase64(fullMessage)
}

function decrypt(account, cache, messageWithNonce) {
  const key = secureKey(cache)
  const keyUint8Array = nacl.util.decodeBase64(key.private)
  const messageWithNonceAsUint8Array = nacl.util.decodeBase64(messageWithNonce)
  const nonce = messageWithNonceAsUint8Array.slice(0, nacl.secretbox.nonceLength)
  const message = messageWithNonceAsUint8Array.slice(nacl.secretbox.nonceLength, messageWithNonce.length)

  const decrypted = nacl.secretbox.open(message, nonce, keyUint8Array)

  if (!decrypted) {
    return
  }

  const base64DecryptedMessage = nacl.util.encodeUTF8(decrypted)
  return JSON.parse(base64DecryptedMessage)
}

function box(message, type) {
  switch (type) {
    case "code":
      console.log(boxen(`Type: ${chalk.yellow.bold(message)}`, { padding: 1, margin: 2, borderStyle: 'round'}))
      break;
    case "fail":
      console.log(boxen(`${chalk.red.bold(message)}`, { padding: 1, margin: 2, borderStyle: 'round'}))
      break;
    default:
      console.log(boxen(chalk.green.bold(message.toUpperCase()), { padding: 2, margin: 2, borderStyle: 'round'}))
  }
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

function unlock(cache) {
  if (!cache.vaults.master.isLocked) {
    return Promise.resolve(cache.vaults.master)
  }

  return new Promise((resolve, reject) => {
    inquirer.prompt([{
      type: 'password',
      name: 'password',
      validate: (s) => s ? true : "C'mon, enter a password please :)",
      message: "Enter the vault password"
    }]).then(({ password }) => {
      coreutils.logger.info("Attempting to unlock your Carmel vault ...")
      cache.vaults.master.unlock(password).then((vault) => {
        coreutils.logger.ok("Your Carmel vault is now unlocked")
        resolve(vault)
      }).catch((e) => {
        coreutils.logger.fail('Looks like that is the wrong password. Give it another try')
        unlock(cache).then((data) => resolve(data))
      })
    })
  })
}

module.exports = {
  getChallenge,
  box,
  encode,
  decode,
  encrypt,
  encryptPublic,
  decryptPublic,
  decrypt,
  unlock
}
