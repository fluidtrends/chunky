const express = require('express')
const intercept = require("intercept-stdout")
const path = require('path')
const spawn = require('child_process').spawn
const router = express.Router()

function executeCommand(command, args) {
  return new Promise((resolve, reject) => {
    const cwd = process.cwd()
    const proc = spawn('sh', ['-c', 'chunky', command].concat(args), { cwd })
    var output = ""

    proc.stdout.on('data', (data) => {
      output = `${output}${data}`
    })

    proc.stderr.on('data', (data) => {
      output = `${output}${data}`
    })

    proc.on('close', (code) => {
      console.log(output, code)
      if (code === 0) {
        resolve({ output })
        return
      }
      reject(new Error("Something went wrong"))
    })
  })
}

router.post('/:command', (req, res, next) => {
  const command = req.params.command
  const args = req.body.args

  executeCommand(command, args)
    .then((data) => res.json({ data }))
    .catch((error) => res.json({ error: error.message }))
})

module.exports = router
