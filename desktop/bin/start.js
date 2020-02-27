const start = require('../app/start')
const dir = __dirname
const appPath = process.cwd()

module.exports = (options, callback) => new Promise((resolve, reject) => {
    start({ dir, appPath })
    resolve()
})
