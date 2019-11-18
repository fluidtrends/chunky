const Service = require('./Service')

const service = new Service({ 
    port: 13001,
    nodeVersion: "8.16.1" 
})

service.start()