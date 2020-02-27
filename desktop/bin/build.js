const build = require('../app/build')
const dir = __dirname
const appPath = process.cwd()

module.exports = (options, callback) => new Promise((resolve, reject) => {
    build({ dir, appPath })
    resolve()
})
