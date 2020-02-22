/* eslint-disable no-unused-expressions */

const savor = require('savor')
const Start = require('../../../src/commands/start')
const { Session, Commander } = require("@carmel/sdk")

savor.

add('should start a new web app', (context, done) => {
  const session = new Session({ name: 'test' })
  const command = new Start()

  savor.addAsset('assets/workspace', '', context)

  savor.promiseShouldSucceed(session.initialize()
                                    .then(() => Commander.run(command, session)), done, (data) => {
  })
}).

run('[Chunky Carmel Plugin] Start Command')
