const crypto = require('crypto')

const encrypt = (inputData, config) => {
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv('aes-256-gcm', config.settings.cipher.key, iv)

  let data = cipher.update(JSON.stringify(inputData, null, 2), 'utf8', 'base64')
  data += cipher.final('base64')
  const auth = cipher.getAuthTag()
  return [iv.toString('hex'), auth.toString('hex'), data].join(config.settings.cipher.separator)
}

const decrypt = (inputData, config) => {
  const input = inputData.split(config.settings.cipher.separator)
  const decipher = crypto.createDecipheriv('aes-256-gcm', config.settings.cipher.key, Buffer.from(input[0], 'hex'))
  decipher.setAuthTag(Buffer.from(input[1], 'hex'))
  let data = decipher.update(input[2], 'base64', 'utf8')
  data += decipher.final('utf8')
  return data
}

module.exports = {
  encrypt,
  decrypt
}
