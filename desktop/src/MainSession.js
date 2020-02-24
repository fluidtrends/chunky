const { ipcMain, BrowserWindow, shell } = require('electron')

class Session {
    constructor ({ window }) {    
        this._window = window
    }

    get window() {
        return this._window
    }

    listen(key, cb) {
        ipcMain.on(key, (event, data) => {
            cb && cb(data)
        })
    }

    send(key, data) {
        this._window.webContents.send(key, data)
    }

    start() {  
        const startTimestamp = `${Date.now()}`
        const event = { }
        return Promise.resolve({ startTimestamp, event })
    }
    
    initialize(cb) {
        this.listen('startSession', () => {        
            this.start()
                .then((data) => {
                    this.send('sessionStarted', data)
                })
                .catch((error) => {
                    this.send('sessionNotStarted', { error })
                })
        })    

        return new Promise((resolve, reject) => {           
            resolve()
        })        
    }
}

module.exports = Session