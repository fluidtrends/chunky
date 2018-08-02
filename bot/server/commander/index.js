const fs = require('fs-extra')
const sh = require('shelljs')
const path = require('path')
const spawn = require('child_process').spawn

const commands = {
  hello: {

  },
  start: {

  }
}

const exec = ({ cwd, cmd, stdout, stderr }) => {
  return new Promise((resolve, reject) => {
    const proc = spawn('sh', ['-c', cmd], { cwd })

    proc.stdout.on('data', (data) => {
      stdout && stdout(`${data}`)
    })

    proc.stderr.on('data', (data) => {
      stderr && stderr(`${data}`)
    })

    proc.on('close', (code) => {
      if (code === 0) {
        resolve()
        return
      }
      reject(new Error(`Code ${code}`))
    })
  })
}

const hasCommand = (command) => {
  return commands[command]
}

const runCommand = (command, socket) => {
  // const productDir = `/Users/dancali/.carmel/products/first-product`
  const productDir = `/Users/dancali/dev/fluidtrends/carmel`
  const port = '8082'

  const doneLabel = `Chunky is happy. Chunky finished packing.`.replace(/\s/g, '')

  return new Promise((resolve, reject) => {
    socket.emit('response', Object.assign({}, { from: 'chunky', message: `Starting, this might take a minute ...` }))
    exec({ cwd: productDir, cmd: `chunky start web`, stdout: (out) => {
      const trimmed = `${out}`.replace(/\s/g, '')
      console.log(trimmed)
      if (trimmed === doneLabel) {
        socket.emit('response', Object.assign({}, { from: 'chunky', message: `Your product is now ready`, command: 'start-browser' }))
      }
    }, stderr: (err) => {
      console.log(err)
    }})
    .then(() => {
      console.log('!!!!!! FINISHED OK')
    })
    .catch(() => {
      console.log('!!!!!! FINISHED WITH ERROR')
    })
    // var oldLog = console.log
    // console.log = function (message) {
       // DO MESSAGE HERE.
      // console.log('>>>>>>', message)
      // oldLog.apply(console, arguments)
    // }

    // require('../../../start')({ platforms: ['web'], webPackagerPort: port })
    // process.stdout = stdout
    // console.log('OUTPUT_______DONE!!!!')
    // resolve({ started: true, port, message: `Started on port ${port}` })
  })

  // process.chdir(productDir)
  // startWeb(port)
}

module.exports = {
  hasCommand,
  runCommand
}
