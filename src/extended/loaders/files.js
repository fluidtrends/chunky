import path from 'path'
import fs from 'fs-extra'

export function loadJsonFile (file) {
  if (!fs.existsSync(file)) {
    // We can't continue without this file
    throw new Error('The file is missing')
  }

  // Load the content
  var config = fs.readFileSync(file, 'utf8')

  if (!config) {
    throw new Error('The file is invalid')
  }

    // Parse the json content
  config = JSON.parse(config)

  if (!config) {
    throw new Error('The file is invalid')
  }

  return config
}
