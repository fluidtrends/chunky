'use strict';

var crypto = require('crypto');

var encrypt = function encrypt(inputData, config) {
  var iv = crypto.randomBytes(12);
  var cipher = crypto.createCipheriv('aes-256-gcm', config.settings.cipher.key, iv);

  var data = cipher.update(JSON.stringify(inputData, null, 2), 'utf8', 'base64');
  data += cipher.final('base64');
  var auth = cipher.getAuthTag();
  return [iv.toString('hex'), auth.toString('hex'), data].join(config.settings.cipher.separator);
};

var decrypt = function decrypt(inputData, config) {
  var input = inputData.split(config.settings.cipher.separator);
  var decipher = crypto.createDecipheriv('aes-256-gcm', config.settings.cipher.key, Buffer.from(input[0], 'hex'));
  decipher.setAuthTag(Buffer.from(input[1], 'hex'));
  var data = decipher.update(input[2], 'base64', 'utf8');
  data += decipher.final('utf8');
  return data;
};

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt
};