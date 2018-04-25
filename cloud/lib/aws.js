'use strict';

var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

var ses = new AWS.SES({ apiVersion: '2010-12-01' });
var dynamodb = new AWS.DynamoDB();

module.exports = {
  AWS: AWS,
  ses: ses,
  dynamodb: dynamodb
};