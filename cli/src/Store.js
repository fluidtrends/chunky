const uuid = require('uuid')
const path = require('path')
const fs = require('fs-extra')
const Base64 = require('js-base64').Base64
const cassi = require('cassi')


class _ {
  constructor(props) {
    this._props = Object.assign({}, props)
  }

  get props() {
    return this._props
  }

  get vaults() {
    return this._vaults
  }
}

// const _ = {
//     DIR,
//     MAX,
//     event    
// }

// const event = (data) => {
//     const id = `${Date.now()}-${uuid.v4()}`
//     const file = path.resolve(_.DIR, `${id}.json`)
//     const content = Base64.encode(JSON.stringify(data))
//     fs.writeFileSync(file, content)
  
//     let events = _eventsVault.read('events') || []
  
//     if (events.length >= MAX_CACHED_EVENTS) {
//       const oldId = events.shift()
//       fs.removeSync(path.resolve(_eventsDir(props), `${oldId}.json`))
//     }
  
//     events.push(id)
//     _eventsVault.write('events', events) || []
  
//     return id


//     // cache.saveEvent(Object.assign({}, { eventId: 'init', done: false, working: true }))
//           // process.send && process.send()

// }

module.exports = _