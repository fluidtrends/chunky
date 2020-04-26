const { google } = require('googleapis')
const { auth } = require('google-auth-library')
const serviceAccount = require('./serviceAccount.json')

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]

const init = async () => {
    if (!process.env.CHUNKY_GOOGLE_PRIVATE_KEY) {
        throw new Error('Missing Chunky Google Private Key')
    }

    const private_key = process.env.CHUNKY_GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n')
    const jwt = auth.fromJSON(Object.assign({}, serviceAccount, { private_key }))
    jwt.scopes = SCOPES

    return jwt.authorize().then(() => {
        _._ = { sheets: google.sheets({ version: 'v4', auth: jwt }) }
    })
}

const _ = {
    init
}

module.exports = _


// const readSheetData = async (sheet, tab, range) => new Promise((resolve, reject) => {
//     this.sheets.spreadsheets.values.get({
//         spreadsheetId: this.config.sheets[sheet].id,
//         range: `${tab}!${range}`,
//     }, (err, res) => {
//         if (err) reject(err)
//         resolve(res.data.values)
//     })
// })


// class _ {
//     constructor(config) {
//         this._config = config
//     }

//     get config() {
//       return this._config
//     }

//     get sheets() {
//       return this._sheets
//     }

//     async init() {
//       const private_key =  process.env.GOOGLE_AUTH.replace(/\\n/gm, '\n')
//       const jwt = auth.fromJSON(Object.assign({}, this.config.google.auth, { private_key }))      
//       jwt.scopes = this.config.google.scopes

//       return jwt.authorize().then(() => {
//         this._sheets = google.sheets({ version: 'v4', auth: jwt })
//       })
//     }

//     async readSheetData(sheet, tab, range) {
//       return new Promise((resolve, reject) => {
//         this.sheets.spreadsheets.values.get({
//           spreadsheetId: this.config.sheets[sheet].id,
//           range: `${tab}!${range}`,
//         }, (err, res) => {
//           if (err) reject(err)
//           resolve(res.data.values)
//         })
//       })
//     }

//     async addSheetRow(sheet, tab, range, values) {
//       return new Promise((resolve, reject) => {
//         this.sheets.spreadsheets.values.append({
//           spreadsheetId: this.config.sheets[sheet].id,
//           valueInputOption: 'RAW',
//           range: `${tab}!${range}`,
//           resource: { values }
//         }, (err, res) => {
//           if (err) reject(err)
//           resolve()
//         })
//       })
//     }

//     async updateSheetRow(sheet, tab, range, values) {
//       return new Promise((resolve, reject) => {
//         this.sheets.spreadsheets.values.update({
//           spreadsheetId: this.config.sheets[sheet].id,
//           valueInputOption: 'RAW',
//           range: `${tab}!${range}`,
//           resource: { values }
//         }, (err, res) => {
//           if (err) reject(err)
//           resolve()
//         })
//       })
//     }
// }

module.exports = _