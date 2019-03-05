const coreutils = require('coreutils')
const status = require('../status')
const operation = require('../operation')
const pm2 = require('pm2')

function bringUp(account, cache, args) {
  coreutils.logger.info(`Connecting to your Carmel account ...`)
  return new Promise((resolve, reject) => {

    // pm2.connect((err) => {
    //   if (err) {
    //     reject(err)
    //     return
    //   }
    //
    //   pm2.list((err2, list) => {
    //     if (err2) {
    //       reject(err2)
    //       return
    //     }
    //
    //     console.log(list)
        coreutils.logger.ok(`You are now connected`)
    //     resolve()
    //   })



      // pm2.start({
      //   script    : 'app.js',
      //   exec_mode : 'cluster',
      //   instances : 4,
      //   max_memory_restart : '100M'
      // }, function(err, apps) {
      //   pm2.disconnect()
      //   if (err) throw err
      // })
    })
  })
}

function hello(account, cache, args) {
  if (!account) {
    return status(account, cache).then(() => {
      try {
        const a = cache.vaults.carmel.read('account')
        return bringUp(a, cache, args)
      } catch (e) {
        coreutils.logger.info(`Hey so how about you try this again :)`)
        return
      }
    })
  }

  return bringUp(account, cache, args)
}

module.exports = hello
