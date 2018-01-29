const coreutils = require('coreutils')
const firebaseline = require('firebaseline')

module.exports = function(firebase) {
    coreutils.logger.info("Resetting users ...")

    return firebaseline.operations.retrieve(firebase, { key: 'users' }).
           then(users => Array.isArray(users) ? users.map(user => user._id) : [users._id]).
           then(ids => Promise.all(ids.map(id => firebaseline.operations.unregister(firebase, { id })))).
           then(ids => firebaseline.operations.remove(firebase, { key: 'users' })).
           then(() => coreutils.logger.done())
}
