// const spawn = require('child_process').spawn
const path = require('path')
const coreutils = require('coreutils')
const fs = require('fs-extra')
const server = require('./server')

coreutils.logger.info(`Starting Chunky ...`)
server.start({ port: 8000 })

// const nodeModulesArchive = 'node_modules.tar.bz2'
// if (fs.existsSync(path.resolve(nodeModulesArchive))) {
  // console.log('found nodeModulesArchive')
// } else {
  // console.log('not found nodeModulesArchive')
// }
// const start = require('../executors/bot')

// const exec = () => {
//   const proc = spawn('ls', ['-la'], { cwd: process.cwd() })
//
//   proc.stdout.on('data', (data) => {
//     console.log(`LOG ${data}`)
//     // clientLog(mainWindow, client, data)
//   })
//
//   proc.stderr.on('data', (data) => {
//     console.log(`ERR ${data}`)
//     // clientError(mainWindow, client, data)
//   })
//
//   proc.on('close', (code) => {
//     console.log(`DONE ${code}`)
//     // clientDone(mainWindow, client, (code === 0 ? false : `Exited with code ${code}`))
//   })
// }

// exec()
// console.log(__dirname, process.cwd())
// console.log('STARTING BOT...2')
// start()
// console.log('STARTING BOT...3')
