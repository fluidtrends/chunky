import path from 'path'
import fs from 'fs-extra'
import { loadJsonFile } from '..'

export function loadChunks (product) {
  const chunksDir = path.resolve(product.dir, 'chunks')
  const chunks = fs.readdirSync(chunksDir).filter(dir => (dir && dir !== 'index.js' && dir !== 'index.desktop.js' && dir !== 'index.web.js' && dir !== '.DS_Store'))

  if (!chunks || chunks.length === 0) {
    return
  }

  return chunks.map(chunk => loadJsonFile(path.resolve(chunksDir, chunk, 'chunk.json')))
}
