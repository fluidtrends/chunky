'use strict'

const handler = require('./handler')
const loader = require('./loader')

module.exports = Object.assign({}, handler, loader)
