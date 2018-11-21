'use strict';

var aws = require('./aws');

function createRequest(_ref) {
  var to = _ref.to,
      from = _ref.from,
      subject = _ref.subject,
      text = _ref.text,
      html = _ref.html;

  return {
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
  };
}

function send(_ref2) {
  var to = _ref2.to,
      from = _ref2.from,
      subject = _ref2.subject,
      text = _ref2.text,
      html = _ref2.html;

  return new Promise(function (resolve, reject) {
    var request = createRequest({
      to: to, from: from, subject: subject, text: text, html: html
    });

    aws.ses.sendEmail(request, function (error, data) {
      if (error) {
        resolve({ sent: false, error: error });
        return;
      }
      resolve({ sent: true });
    });
  });
}

module.exports = {
  send: send
};