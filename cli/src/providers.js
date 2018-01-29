const firebase = require('./firebase')
const google = require('googleapis')
const coreutils = require('coreutils')
const aws = require('aws-sdk')

function authenticateFirebase(config) {
  return new Promise((resolve, reject) => {
    if (!config.google || !config.google.serviceAccount) {
        reject(new Error('Invalid Google secure configuration'))
        return
    }

    firebase.initializeApp({
      credential: firebase.credential.cert(config.google.serviceAccount),
      databaseURL: "https://" + config.google.serviceAccount.project_id + ".firebaseio.com"
    })

    coreutils.logger.ok(`Connected to Firebase`)
    resolve({ name: 'firebase', provider: {
      api: firebase,
      options: config.google
    }})
  })
}


function authenticateGoogle(config) {
  return new Promise((resolve, reject) => {
    let googleAuth = new google.auth.JWT(
           config.google.serviceAccount.client_email,
           null,
           config.google.serviceAccount.private_key,
           config.google.services.map(service => `https://www.googleapis.com/auth/${service}`))

    googleAuth.authorize((error, tokens) => {
      if (error) {
        reject(error)
        return
      }

      coreutils.logger.ok(`Connected to Google`)
      resolve({ name: 'google', provider: {
        api: google,
        options: config.google,
        auth: googleAuth
      }})
    })
  })
}

function authenticateAWS(config) {
  return new Promise((resolve, reject) => {
    if (!config.aws || !config.aws) {
      reject(new Error('Invalid AWS secure configuration'))
      return
    }

    // Let's get ready to use AWS
    process.env.AWS_ACCESS_KEY_ID=config.aws.key
    process.env.AWS_SECRET_ACCESS_KEY=config.aws.secret
    process.env.AWS_DEFAULT_REGION=config.aws.region

    coreutils.logger.ok(`Connected to AWS`)
    resolve({ name: 'aws', provider: {
      api: aws,
      options: config.aws
    }})
  })
}

function authenticate(config) {
  coreutils.logger.info(`Connecting ...`)

  return Promise.all([
    authenticateFirebase(config),
    authenticateAWS(config),
    authenticateGoogle(config)
  ]).

  then(providers => {
    coreutils.logger.done()
    var index = {}
    providers.forEach(p => { index[p.name] = p.provider })
    return index
  })
}

module.exports = {
  authenticate,
  authenticateFirebase,
  authenticateGoogle,
  authenticateAWS
}
