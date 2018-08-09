import fs from 'fs-extra'
import path from 'path'
import { createFile } from '.'

const MOBILE = 'js'
const WEB = 'web.js'
const DESKTOP = 'desktop.js'

const TYPES = [MOBILE, WEB, DESKTOP]
const IGNORES = ['.DS_Store']
const HEADER = `// THIS IS AN AUTO-GENERATED FILE. PLEASE DO NOT MODIFY. CHUNKY WILL CRY. SERIOUSLY.`

export function updateChunksIndex (dir) {
  const chunksDir = path.resolve(dir, 'chunks')

  if (!fs.existsSync(chunksDir)) {
    fs.mkdirsSync(chunksDir)
  }

  const indexFiles = TYPES.map(type => `index.${type}`)
  const chunks = fs.readdirSync(chunksDir).filter(dir => (dir && !IGNORES.includes(dir) && !indexFiles.includes(dir)))

  TYPES.map(type => {
    const indexFile = path.resolve(chunksDir, `index.${type}`)
    var exports = ''

    chunks.map(chunk => {
      const chunkIndexFile = path.resolve(chunksDir, chunk, `index.${type}`)
      if (fs.existsSync(chunkIndexFile)) {
        exports = `${exports}export { default as ${chunk} } from './index.${type}'\n`
      }
    })

    fs.writeFileSync(indexFile, `${HEADER}\n\n${exports}`)
  })
}

export function createChunkIndexFiles (dir) {
  const screensDir = path.resolve(dir, 'screens')
  const componentsDir = path.resolve(dir, 'components')

  fs.existsSync(screensDir) || fs.mkdirsSync(screensDir)
  fs.existsSync(componentsDir) || fs.mkdirsSync(componentsDir)

  TYPES.map(type => {
    const data = `import config from './chunk.json'\nimport * as screens from './screens/index.${type}'\n\nconst chunk = { screens, ...config }\nexport default chunk`
    createFile({ root: dir, filepath: `index.${type}`, data })
    createFile({ root: screensDir, filepath: `index.${type}`, data: '' })
  })
}

export function installChunk ({ dir, home, chunk }) {
  const chunkDir = path.resolve(dir, 'chunks', chunk.name)

  if (fs.existsSync(chunkDir)) {
    return
  }

  fs.mkdirsSync(chunkDir)

  var bundle = 'bananas'
  var bundleId = '0'
  var name = chunk.name

  const chunkTemplateDir = path.resolve(home, 'bundles', bundle, bundleId, 'chunks', name)

  if (!fs.existsSync(chunkTemplateDir)) {
    return
  }

  fs.copySync(chunkTemplateDir, chunkDir)
  createChunkIndexFiles(chunkDir)

  // createFile({ root: chunkDir, filepath: 'chunk.json', data: chunk, json: true })
}
