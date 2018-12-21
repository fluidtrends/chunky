const coreutils = require('coreutils')
const path = require('path')
const fs = require('fs-extra')
const got = require('got')
const deepmerge = require('deepmerge')
const lali = require('lali')

const _createFile = (props) => (dir, filepath, data, json) {
  const file = path.resolve(dir, filepath)
  if (fs.existsSync(file)) {
    return
  }

  const content = (json ? JSON.stringify(data, null, 2) : data)
  fs.writeFileSync(file, content, 'utf8')
}

module.exports = (props) => ({
  createFile: _createFile(props)
})
