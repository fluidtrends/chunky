var app = require('./app')
var debug = require('debug')('server:server')
var http = require('http')
const commander = require('./commander')

const server = http.createServer(app)
const io = require('socket.io')(server)

// function normalizePort (val) {
//   var port = parseInt(val, 10)
//
//   if (isNaN(port)) {
//     // named pipe
//     return val
//   }
//
//   if (port >= 0) {
//     // port number
//     return port
//   }
//
//   return false
// }

// function onError (error) {
//   if (error.syscall !== 'listen') {
//     throw error
//   }
//
//   var bind = typeof port === 'string'
//     ? 'Pipe ' + port
//     : 'Port ' + port
//
//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case 'EACCES':
//       console.error(bind + ' requires elevated privileges')
//       process.exit(1)
//       break
//     case 'EADDRINUSE':
//       console.error(bind + ' is already in use')
//       process.exit(1)
//       break
//     default:
//       throw error
//   }
// }
//
// function onListening (server) {
//   var addr = server.address()
//   var bind = typeof addr === 'string'
//     ? 'pipe ' + addr
//     : 'port ' + addr.port
//   debug('Listening on ' + bind)
// }

// const start

const packerOutput = (data, socket) => {
  socket.emit('response', { from: 'chunky', message: `Packing ${Date.now()}` })

  // if (data.done) {

    // socket.emit('response', { from: 'chunky', message: `Finished packing ${data.time}`})
    // return
  // }

  // socket.emit('response', { from: 'chunky', message: `Packing ${data.resource}` })
}

const parseCommand = (data, socket) => {
  const words = data.message.split(' ')
  const command = words[0]

  if (!commander.hasCommand(command)) {
    socket.emit('response', { from: 'chunky', message: 'command not recognized' })
    return
  }

  commander.runCommand(command, socket)
           // .then(response => {
           //   socket.emit('response', Object.assign({}, { from: 'chunky' }, response))
           // })
           // .catch(error => {
           //   socket.emit('response', { from: 'chunky', message: 'command could not be executed :(', error })
           // })
}

module.exports = {
  start: ({ port }) => {
    app.set('port', port)
    io.on('connection', (socket) => {
      // socket.emit('message', { from: 'chunky', message: 'hello from chunky' })
      socket.on('command', (data) => parseCommand(data, socket))
      socket.on('webpacker', (data) => packerOutput(data, socket))

      socket.on('disconnect', function () {
        console.log('CLOSED')
      })
    })

    server.listen(port)
    // server.on('error', onError)
    // server.on('listening', onListening)
  },
  stop: () => {
  }
}
