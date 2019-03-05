const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const http = require('http')
const coreutils = require('coreutils')
const chalk = require('chalk')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/commands', require('./commands'))

const _port = 9000

const server = http.createServer(app)
coreutils.logger.info(`Starting the Chunky server on port ${chalk.green.bold(_port)}`)
server.listen(_port)
