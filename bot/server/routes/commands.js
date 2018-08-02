var express = require('express')
var router = express.Router()

const commander = require('../commander')

const all = [
  { name: 'hello' }
]

router.get('/', (req, res, next) => {
  res.send(all)
})

router.get('/:command', (req, res, next) => {
  const command = req.params.command
  if (!commander.hasCommand(command)) {
    res.send({ error: 'Invalid command' })
    return
  }

  commander.runCommand(command)
           .then(response => res.send(response))
           .catch(error => res.send({ error }))
})

module.exports = router
