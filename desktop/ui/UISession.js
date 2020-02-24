import { ipcRenderer } from 'electron'

class Session {
    constructor(listener) {
        this._events = {}
        this._listeners = [listener]
        this._timestamp = `${Date.now()}`
        this._data = {}
    }

    get data() {
        return this._data
    }
    
    _listenToMain(key, cb) {
        ipcRenderer.on(key, (e, data) => {
            this._timestamp = `${Date.now()}`
            const callback = this._events[data.event._eid]
            cb && cb(data)
            callback && callback(data)
        })
    }

    _sendToMain(key, data, cb) {
        const _eid = `${Date.now()}`
        this._events[_eid] = cb
        ipcRenderer.send(key, Object.assign({}, data, { _eid }))
    }

    _onUpdated(data) {
        this._data = Object.assign({}, data)
        this._listeners.map(listener => {
            listener && listener.onUpdatedSession && listener.onUpdatedSession(data)
        })
    }

    start() {
        return new Promise((resolve, reject) => {
            this._listenToMain('session', (data) => this._onUpdated(data))
            this._listenToMain('sessionStarted', (data) => {
                this._onUpdated(data)
                resolve(data)
            })
            this._sendToMain('startSession')    
        })
    }

    login() {
        return new Promise((resolve, reject) => {
            resolve()
        })
    }

}

export default Session