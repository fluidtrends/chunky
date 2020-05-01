const { google } = require('googleapis')
const { auth } = require('google-auth-library')
const serviceAccount = require('./serviceAccount.json')

const SCOPES = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive"
]

const files = async () => _._.drive.files.list().then(({ data}) => data)
    
const sheet = (spreadsheetId) => ({
    rows: async (range) => _._.sheets.spreadsheets.values.get({ spreadsheetId, range }).then(({ data}) => data.values),
    update: async (range, values) => _._.sheets.spreadsheets.values.update({ spreadsheetId, range,  valueInputOption: 'USER_ENTERED', resource: { values } })
})

const init = async () => {
    if (!process.env.CHUNKY_GOOGLE_PRIVATE_KEY) {
        throw new Error('Missing Chunky Google Private Key')
    }

    if (!process.env.CHUNKY_GOOGLE_SHEET_ID) {
        throw new Error('Missing Chunky Google Dashboard ID')
    }

    const private_key = process.env.CHUNKY_GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n')
    const jwt = auth.fromJSON(Object.assign({}, serviceAccount, { private_key }))
    jwt.scopes = SCOPES

    return jwt.authorize().then(() => {
        _._ = { 
            sheets: google.sheets({ version: 'v4', auth: jwt }),
            drive: google.drive({version: 'v3', auth: jwt })
        }
    })
}

const _ = {
    init, files, sheet
}

module.exports = _