import fs from 'fs-extra'
import path from 'path'

import deepmerge from 'deepmerge'
import {
  installChunk,
  createFile
} from '..'

function loadTemplate ({ home, template }) {
  if (!home || !template || !template.from) {
    return
  }

  var bundle = 'bananas'
  var bundleId = '0'
  var name = template.from

  const parts = name.split('/')

  if (parts.length === 3) {
    bundle = parts[0]
    bundleId = parts[1]
    name = parts[2]
  } else if (parts.length === 2) {
    bundle = parts[0]
    name = parts[1]
  }

  const bundleDir = path.resolve(home, 'bundles', bundle, bundleId)
  const templateDir = path.resolve(bundleDir, 'templates', name)
  const templateIndex = path.resolve(templateDir, 'index.json')

  if (!fs.existsSync(templateIndex)) {
    return
  }

  try {
    const templateContent = fs.readFileSync(templateIndex, 'utf8')
    const templateData = JSON.parse(templateContent)

    return templateData
  } catch (e) {
    return
  }
}

export function installTemplate ({ dir, home, template }) {
  const t = loadTemplate({ home, template })

  if (!t || !t.chunks) {
    return
  }

  t.chunks.map(chunk => installChunk({ chunk, dir, home }))

  const webRoot = path.resolve(dir, 'web')
  const webBuildRoot = path.resolve(dir, '.chunky', 'web')

  fs.mkdirsSync(webRoot)
  fs.mkdirsSync(webBuildRoot)

  createFile({ root: webRoot, filepath: 'index.json', data: {}, json: true })
}
