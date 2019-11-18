const path = require('path')
const fs = require('fs-extra')
const coreutils = require('coreutils')
const hook = require('hook-std')
const status = require('../../status')
const operation = require('../../operation')
const utils = require('../../utils')
const chalk = require('chalk')
const env = require('../../validate/env')
const opn = require('opn')
const marked = require('marked')
const Base64 = require('js-base64').Base64

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

function openEditor(file) {
  try {
    Promise.all([opn("chunky.code-workspace"), opn(file)])
  } catch (e) {
    console.log(e)
  }
}

function makeTutorial(challenge, original) {
  try {
    const tutorialFile = path.resolve(challenge.content.dir, `${challenge.state.taskIndex}.tutorial.md`)
    const tutorialRaw = fs.readFileSync(tutorialFile, 'utf8')
    const tutorialCompiled = Handlebars.compile(tutorialRaw)(Object.assign({}, original))

    // const { files } = challenge.content.tasks[challenge.state.taskIndex]
    // if (!files || !files[0]) {
    //   return
    // }
    // const resolvedFiles = files.map(f => Handlebars.compile(f)(Object.assign({}, original)))
    // openEditor(resolvedFiles[0])

    return tutorialCompiled

  } catch (e) {
    console.log(e)
  }
}

function startTask(ch, account, cache, options) {
  coreutils.logger.info(`Starting ${chalk.green.bold('Task ' + (ch.state.taskIndex+1) + ' of ' + ch.state.totalTasks)} for challenge ${chalk.green.bold(ch.title)}`)

  const args = initArgs(ch, cache)
  const init = require(path.resolve(ch.content.dir, 'init.js'))

  const i = (ch.state.taskIndex > 0 ? Promise.resolve(JSON.parse(Base64.decode(ch.state.signature))) : init(args))

  return i.then((originalState) => {
     return begin(account, cache, ch, originalState).then((response) => {
         if (!response || !response.ok) {
           throw new Error("The task could not be started")
         }

         return challenge({ account, cache }).then((updatedChallenge) => {
          const taskTutorial = makeTutorial(updatedChallenge, originalState)
          const tutorial = marked(taskTutorial)
          process.send && process.send(cache.saveEvent(Object.assign({}, { challenge: updatedChallenge, originalState, taskTutorial, eventId: (options.startChallenge ? 'challengeStarted' : 'taskStarted') })))
 
          utils.box('✓ Task started')
          coreutils.logger.info(`Go ahead and complete this task now. Time's ticking :)\n`)
 
          console.log(tutorial)
 
          coreutils.logger.info(`And then when you've completed it:`)
          utils.box('chunky carmel next', 'code') 
         })
      })
  })
}

function processCommand(account, cache, args) {
  return challenge({ account, cache })
          .then((ch) => {
            if (args.continueTask) {
              const originalState = JSON.parse(Base64.decode(ch.state.signature))
              const taskTutorial = makeTutorial(ch, originalState)
              return Object.assign({}, ch, { taskTutorial })
            }

            if (!ch.state.taskActive) {
              return startTask(ch, account, cache, args)
            }

            coreutils.logger.info(`Validating ${chalk.green.bold('Task ' + (ch.state.taskIndex+1) + ' of ' + ch.state.totalTasks)} for challenge ${chalk.green.bold(ch.title)}`)

            const state = utils.decode(account, cache, ch.state.signature)

            return validate(ch, cache, Object.assign({}, state)).then((data) => {
              if (data && data.ok) {
                const tasksLeft = (ch.state.totalTasks - ch.state.taskIndex - 1)
                if (tasksLeft > 0) {
                  utils.box('✓ Task completed. Congrats!')
                  coreutils.logger.info(`Keep going, you have ${tasksLeft} tasks left:`)
                  utils.box('chunky carmel next', 'code')
                  return data
                }
                utils.box('✓ Challenge completed. Congrats, you did it!')
                coreutils.logger.info(`Wanna keep going? Go ahead and take another challenge:`)
                utils.box('chunky carmel start', 'code')
                return Object.assign({}, data, { challengeCompleted: true, challenge: ch })
              }

              utils.box('Oops, that was close, but not quite right yet', 'fail')
              if (data.error) {
                coreutils.logger.skip(`Hint: ${data.error}\n`)
              }

              coreutils.logger.info(`Keep trying - don't worry it happens to the best of us. When ready:`)
              utils.box('chunky carmel next', 'code')

              return data
            })
            .then((result) => {
              return operation.send(Object.assign({}, {
                 target: "journeys",
                 type: "next",
                 result,
               }), account, cache).then(() => result)
            })
            .then((data) => {
              if (data.challengeCompleted) {
                process.send && process.send(cache.saveEvent(Object.assign({}, { challenge: data.challenge, eventId: 'challengeCompleted' })))
                return 
              }
              return challenge({ account, cache }).then((ch) => {
                process.send && process.send(cache.saveEvent(Object.assign({}, { challenge: ch, error: data.error, eventId: 'taskValidated' })))
              })
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
