const aws = require('./aws')

function createRequest ({ to, from, subject, text, html }) {
  return ({
    Destination: {
      ToAddresses: to
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: html
        },
        Text: {
          Charset: 'UTF-8',
          Data: text
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      }
    },
    ReturnPath: from,
    Source: from
  })
}

function send ({ to, from, subject, text, html }) {
  return new Promise((resolve, reject) => {
    const request = createRequest({
      to, from, subject, text, html
    })

    aws.ses.sendEmail(request, (error, data) => {
      if (error) {
        resolve({ sent: false })
        return
      }
      resolve({ sent: true })
    })
  })
}

module.exports = {
  send
}
