const path = require('path')
const fs = require('fs-extra')
const coreutils = require('coreutils')
const hook = require('hook-std')
const Mocha = require('mocha')
const CaptureStdout = require('capture-stdout')
const status = require('../status')
const operation = require('../operation')
const utils = require('../utils')
const chalk = require('chalk')
const env = require('../validate/env')
const casual = require('casual')
const marked = require('marked')
const TerminalRenderer = require('marked-terminal')
const Handlebars = require('handlebars')

marked.setOptions({
  renderer: new TerminalRenderer()
})

function prepareVerification({ challenge, taskIndex, totalTasks, account, cache }) {
  if (!challenge.content || !challenge.content.tasks || challenge.content.tasks.length <= taskIndex) {
    return Promise.resolve({})
  }

  const task = challenge.content.tasks[taskIndex]

  if (!task || !task.expected) {
    return Promise.resolve({})
  }

  return operation.send(Object.assign({}, {
    target: "journeys",
    type: "next",
    skills: challenge.content.skills,
    totalTasks,
    expected: Object.assign({}, task.expected),
  }), account, cache)
}

function validate({ challenge, task }) {
  const mocha = new Mocha({
    timeout: 12000,
    reporter: "json"
  })

  const specFile = path.resolve(path.dirname(__dirname), "validate", "main.js")
  mocha.addFile(specFile)

  return new Promise((resolve, reject) => {

    const captureStdout = new CaptureStdout()
    captureStdout.startCapture()

    env.loadProduct()
       .then((product) => {
          global.carmel = Object.assign({}, {
            product,
            utils: env,
            challenge,
            task
          })

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
  })
}

function verifyNextTask({ challenge, account, cache }) {
  if (!challenge.content || !challenge.content.tasks || challenge.content.tasks.length == 0) {
    return Promise.reject(new Error("Looks like this challenge does not have any tasks"))
  }

  const totalTasks = challenge.content.tasks.length
  const taskIndex = parseInt(challenge.state.taskIndex)

  if (isNaN(taskIndex)) {
    return Promise.reject(new Error("Looks like this challenge does not have a valid task index"))
  }

  if (taskIndex >= totalTasks) {
    return Promise.reject(new Error("Looks like this challenge is completed"))
  }

  const tutorialFile = path.resolve(challenge.content.dir, `${taskIndex}.tutorial.md`)
  const tutorial = (exp) => {
    try {
      const tutorialRaw = fs.readFileSync(tutorialFile, 'utf8')
      const tutorialCompiled = Handlebars.compile(tutorialRaw)(exp)
      return marked(tutorialCompiled)
    } catch (e) {
      throw new Error("Invalid tutorial")
    }
  }

  if (!challenge.state.taskActive) {
    return prepareVerification({ challenge, taskIndex, totalTasks, account, cache })
          .then((response) => {
            if (!response.ok || response.error || !response.data.taskActive) {
              return Promise.reject(new Error("Could not prepare the verification"))
            }

            coreutils.logger.info(`Started ${chalk.green.bold('Task ' + (challenge.state.taskIndex+1) + ' of ' + totalTasks)} for challenge ${chalk.green.bold(challenge.name)}`)
            coreutils.logger.info(`Alright, time's ticking :) Go ahead and complete this task now. Here's what to do:\n`)
            console.log(tutorial(response.data.expected))
            coreutils.logger.info(`Ready? Go for it :)\n`)

            return Promise.resolve()
          })
  }

  coreutils.logger.info(`Verifying ${chalk.green.bold('Task ' + (challenge.state.taskIndex+1) + ' of ' + totalTasks)} for challenge ${chalk.green.bold(challenge.name)}`)

  const task = {
    expected: Object.assign({}, challenge.state.expectedTaskData),
    index: taskIndex
  }

  return validate({ challenge: Object.assign({}, challenge, { totalTasks }), task })
                .then((result) => {
                  if (!result || !result.ok || result.error) {
                    coreutils.logger.fail(result.error)
                    coreutils.logger.info(`Don't worry - it happens, try again :)\n`)
                    console.log(tutorial(challenge.state.expectedTaskData))
                    coreutils.logger.info(`Go ahead and try again and don't you worry about a thing :)\n`)
                  } else {
                    coreutils.logger.ok(`Amazing, you did it! Congrats! :)\n`)
                    if ((totalTasks - challenge.state.taskIndex - 1) === 0) {
                      coreutils.logger.info(`That was the last task - can you believe it? :)\n`)
                    } else {
                      coreutils.logger.info(`Keep going now, you have ${totalTasks - challenge.state.taskIndex - 1} tasks left\n`)
                    }
                  }

                  return operation.send(Object.assign({}, {
                    target: "journeys",
                    type: "next",
                    totalTasks,
                    result: result,
                  }), account, cache)
                })
                .then((response) => {
                  if (!response.data.completed) {
                    return Promise.resolve()
                  }

                  coreutils.logger.header(`Congratulations!`)
                  coreutils.logger.ok(`You have successfully completed this challenge!\n`)
                })
                .catch((e) => {
                  coreutils.logger.fail(`Something went wrong: ${result.error}`)
                })
}

function processCommand(account, cache, args) {
  if (!env.productExists()) {
    return Promise.reject(new Error('Looks like this is not a Chunky product. Please run this inside a Chunky product'))
  }

  return utils.getChallenge(account, cache)
          .then((challenge) => {
            if (!challenge || !challenge._id) {
              coreutils.logger.skip(`Try starting a challenge first :)`)
              return
            }

            if (!challenge.status || challenge.status !== "published") {
              coreutils.logger.skip(`This challenge is unpublished, give us some time to audit first.`)
              return
            }

            return cache.getChallenge({
              repo: challenge.repo,
              sha: challenge.hash,
              fragment: challenge.path
            })
            .then((content) => Object.assign({}, challenge, { content }))
          })
          .then((challenge) => challenge && verifyNextTask({ challenge, account, cache }))
          .catch((error) => {
            coreutils.logger.fail(error.message)
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
