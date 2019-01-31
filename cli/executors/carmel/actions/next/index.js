const path = require('path')
const fs = require('fs-extra')
const coreutils = require('coreutils')
const hook = require('hook-std')
const status = require('../../status')
const operation = require('../../operation')
const utils = require('../../utils')
const chalk = require('chalk')
const env = require('../../validate/env')

const casual = require('casual')
const marked = require('marked')

const TerminalRenderer = require('marked-terminal')
const Handlebars = require('handlebars')
const Mocha = require('mocha')
const CaptureStdout = require('capture-stdout')

const challenge = require('./challenge')
const begin = require('./begin')

marked.setOptions({
  renderer: new TerminalRenderer()
})

function initArgs (challenge, cache, original) {
  return Object.assign({}, { utils: env(cache), challenge }, original && { original })
}

function validate(challenge, cache, original) {
  global.carmel = initArgs(challenge, cache, original)

  const mocha = new Mocha({
    timeout: 12000,
    reporter: "json"
  })

  const specFile = path.resolve(path.dirname(__dirname), "../validate", "main.js")
  mocha.addFile(specFile)

  return new Promise((resolve, reject) => {
    const captureStdout = new CaptureStdout()
    captureStdout.startCapture()
    mocha.run((failures) => {
      captureStdout.stopCapture()
      const output = captureStdout.getCapturedText()
      captureStdout.clearCaptureText()
      const result = JSON.parse(output.pop())

      if (result.failures && result.failures.length > 0) {
        resolve({ output, error: result.failures[0].err.message })
        return
      }

      resolve({ output, ok: true })
    })
  })
}

function showTutorial(challenge, original) {
  try {
    const tutorialFile = path.resolve(challenge.content.dir, `${challenge.state.taskIndex}.tutorial.md`)
    const tutorialRaw = fs.readFileSync(tutorialFile, 'utf8')
    const tutorialCompiled = Handlebars.compile(tutorialRaw)(Object.assign({}, original))

    console.log(marked(tutorialCompiled))
  } catch (e) {
    console.log(e)
  }
}

function startTask(challenge, account, cache) {
  coreutils.logger.info(`Starting ${chalk.green.bold('Task ' + (challenge.state.taskIndex+1) + ' of ' + challenge.state.totalTasks)} for challenge ${chalk.green.bold(challenge.name)}`)

  const args = initArgs(challenge, cache)
  const init = require(path.resolve(challenge.content.dir, 'init.js'))

  return init(args).then((state) => {
     return begin(account, cache, challenge, state).then((response) => {
         if (!response || !response.ok) {
           throw new Error("The task could not be started")
         }

         utils.box('✓ Task started')
         coreutils.logger.info(`Go ahead and complete this task now. Time's ticking :)\n`)

         showTutorial(challenge, state)

         coreutils.logger.info(`And then when you've completed it:`)
         utils.box('chunky carmel next', 'code')
      })
  })
}

function processCommand(account, cache, args) {
  return challenge({ account, cache })
          .then((challenge) => {
            if (!challenge.state.taskActive) {
              return startTask(challenge, account, cache)
            }

            coreutils.logger.info(`Validating ${chalk.green.bold('Task ' + (challenge.state.taskIndex+1) + ' of ' + challenge.state.totalTasks)} for challenge ${chalk.green.bold(challenge.name)}`)

            const state = utils.decrypt(account, cache, challenge.state.signature)

            return validate(challenge, cache, Object.assign({}, state)).then((data) => {
              if (data && data.ok) {
                const tasksLeft = (challenge.state.totalTasks - challenge.state.taskIndex - 1)
                if (tasksLeft > 0) {
                  utils.box('✓ Task completed. Congrats!')
                  coreutils.logger.info(`Keep going, you have ${tasksLeft} tasks left:`)
                  utils.box('chunky carmel next', 'code')
                  return data
                }
                utils.box('✓ Challenge completed. Congrats, you did it!')
                coreutils.logger.info(`Wanna keep going? Go ahead and take another challenge:`)
                utils.box('chunky carmel start', 'code')
                return data
              }

              utils.box('Oops, that was close, but not quite right yet', 'fail')
              if (data.error) {
                coreutils.logger.skip(`Hint: ${data.error}\n`)
              }

              showTutorial(challenge, state)

              coreutils.logger.info(`Keep trying - don't worry it happens to the best of us. When ready:`)
              utils.box('chunky carmel next', 'code')
              return data
            })
            .then((result) => {
              return operation.send(Object.assign({}, {
                 target: "journeys",
                 type: "next",
                 result,
               }), account, cache)
            })
          })
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
