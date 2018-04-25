const AWS = require('aws-sdk')
AWS.config.update({region: 'us-east-1'})

const ses = new AWS.SES({ apiVersion: '2010-12-01' })
const dynamodb = new AWS.DynamoDB()

module.exports = {
  AWS,
  ses,
  dynamodb
}
