import fs from 'fs-extra'
import path from 'path'
import ejs from 'ejs'
import lali from 'lali'

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
        exports = `${exports}export { default as ${chunk} } from './index${type}'\n`
      }
    })

    fs.writeFileSync(indexFile, `${HEADER}\n\n${exports}`)
  })
}

// export function cacheChunksArchive (name, version, dir) {
//   const archiveUrl = `https://github.com/fluidtrends/chunky/archive/chunks-${name}-${version}.tar.gz`
//   const link = lali.link(archiveUrl)
//
//   return link.install(dir)
// }
