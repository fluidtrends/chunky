import { loadJsonFile } from '..'
import path from 'path'

export function loadManifest (product) {
  const main = loadJsonFile(path.resolve(product.dir, 'chunky.json'))
  const web = loadJsonFile(path.resolve(product.dir, 'web', 'index.json'))

  return Object.assign({}, main, { web })
}
