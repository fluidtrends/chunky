const got = require('got')
const tar = require('tar')
const zlib = require('zlib')
const fs = require('fs-extra')
const request = require('request')
const Zip = require('adm-zip')
const path = require('path')
const progress = require('request-progress')

export function install (url, dest, cb) {
  return download(url, dest, cb)
}

export function download (url, dest, cb) {
  return new Promise((resolve, reject) => {
    const isZip = (path.extname(url) === '.zip')
    progress(request(url))
      .on('progress', state => {
        cb && cb(state)
      })
      .on('error', (error) => {
        reject(error)
      })
      .on('end', () => {
        if (isZip) {
          const zip = new Zip(dest)
          zip.extractAllTo(path.dirname(dest), true)
        }
        resolve()
      })
      .pipe(fs.createWriteStream(dest))
  })
}

export function _exists (url) {
  if (!url) {
    return Promise.reject(new Error('Invalid url'))
  }

  return got.head(url)
}
