const loader = require('./loader')
const handler = require('./handler')
const firebase = require('./firebase')
const aws = require('./aws')
const emailer = require('./emailer')

module.exports = {
  loader,
  handler,
  firebase,
  emailer,
  aws
}
