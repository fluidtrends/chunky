const { google } = require('googleapis')

const savor = require('savor')
const service = savor.src('services/google')

savor

.add('initialize', (context, done) => {
  done()
})

.run('Google')
