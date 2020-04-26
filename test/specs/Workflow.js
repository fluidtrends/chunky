const savor = require('savor')
const Workflow = savor.src('Workflow')

savor

.add('initialize', (context, done) => {
  const workflow = new Workflow()
  done()
})

.run('Workflow')
