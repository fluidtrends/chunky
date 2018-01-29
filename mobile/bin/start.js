'use strict'

const path = require('path')
const spawn = require('child_process').spawn
const remotedev = require('remotedev-server')

const args = process.argv.slice(2)
const isWindows = /^win/.test(process.platform)
const appDir = process.cwd()

const reactNativeChunkyDir = path.dirname(__dirname)
const reactNativeChunkyBinDir = path.resolve(reactNativeChunkyDir, 'bin')
const reactNativeChunkyAppDir = path.resolve(reactNativeChunkyDir, 'app')
const packagerExec = path.resolve(reactNativeChunkyBinDir, isWindows ? 'packager.bat' : 'packager.sh')

var isDebug = false
args.forEach(arg => {
  if (arg === '--debug') {
    isDebug = true
  }
})

if (isDebug) {
  // Inject the remote dev server in the React Native Debugger
  remotedev({ hostname: 'localhost', port: 8000, injectserver: true })
}

const packager = spawn(packagerExec, ['--verbose', '--projectRoots', `${appDir},${reactNativeChunkyAppDir}`])

packager.stdout.on('data', (data) => {
  console.log(`${data}`);
})

packager.stderr.on('data', (data) => {
  console.log(`${data}`)
});

packager.on('close', (code) => {
  console.log(`exit ${code}`)
})
