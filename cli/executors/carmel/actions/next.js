const path = require('path')
const fs = require('fs-extra')
const coreutils = require('coreutils')
const hook = require('hook-std')
const Mocha = require('mocha')
const CaptureStdout = require('capture-stdout')
const status = require('../status')

function validate(challenge, expected, taskIndex, cache) {
  global.CARMEL =  {
    challenge,
    taskIndex,
    expected
  }

  const mocha = new Mocha({
    timeout: 12000,
    reporter: "json"
  })

  const specFile = path.resolve(path.dirname(__dirname), "validate", "main.js")
  mocha.addFile(specFile)

  const captureStdout = new CaptureStdout()
  captureStdout.startCapture()

  return new Promise((resolve, reject) => {
    mocha.run((failures) => {
      captureStdout.stopCapture()
      const output = captureStdout.getCapturedText()
      captureStdout.clearCaptureText()
      const result = JSON.parse(output.pop())

      if (result.failures && result.failures.length > 0) {
        resolve({ output, error: result.failures[0].err.message })
        return
      }

      resolve({ output, "ok": true })
    })
  })
}

function verifyTask(account, cache, args) {
  const taskIndex = 0
  const expected = {
    title: "Join Now",
    chunk: "auth",
    route: "register"
  }

  const dir = process.cwd()
  const manifest = path.resolve(dir, 'chunky.json')

  if (!fs.existsSync(manifest)) {
    coreutils.logger.fail(`Hey, this doesn't look like a Chunky product :)`)
    return
  }

  return cache.downloadChallenge({
    repo: 'idancali/carmel-challenges',
    sha: "5afebed99291fd9fc8dbee9e8b3e2a86a1242076",
    id: "change-strings",
    cache
  })
   .then((challenge) => validate(challenge, expected, taskIndex, cache))
   .then((result) => {
     if (!result.ok && result.error) {
       coreutils.logger.fail(result.error)
       return
     }
     coreutils.logger.ok(`Passed`)
    })
   .catch((error) => {
     coreutils.logger.fail(error.message)
   })
}


function processCommand(account, cache, args) {
  return verifyTask(account, cache, args)
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
