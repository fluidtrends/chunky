const savor = require('savor')
const main = savor.src('main')

savor

.add('initialize', (context, done) => {
  const m = new main()
  done()
})

.run('Main')
