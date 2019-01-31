const fs = require('fs-extra')
const path = require('path')
const deepmerge = require('deepmerge')
const recursive = require('recursive-readdir')

const _dir = (cache) => () => {
  return process.cwd()
}

const _chunksDir = (cache) => () => {
  return path.resolve(_dir(cache)(), 'chunks')
}

const _events = (cache) => () => {
  return Object.assign({}, cache.vaults.carmel.read('events'))
}

const _assetsDir = (cache) => () => {
  return path.resolve(_dir(cache)(), 'assets')
}

const _chunkDir = (cache) => (name) => {
  return path.resolve(_chunksDir(cache)(), name)
}

const _chunkFile = (cache) => (chunkName, file) => {
  return path.resolve(_chunkDir(cache)(chunkName), file)
}

const _productFile = (cache) => (file) => {
  return path.resolve(_dir(cache)(), file)
}

const _productFileExists = (cache) => (file) => {
  return fs.existsSync(_productFile(cache)(file))
}

const _chunkFileExists = (cache) => (chunkName, file) => {
  return fs.existsSync(path.resolve(_chunkDir(cache)(chunkName), file))
}

const _chunkExists = (cache) => (name) => {
  return _chunkFileExists(cache)(name, 'chunk.json')
}

const _getChunks = (cache) => () => {
  return fs.readdirSync(_chunksDir(cache)()).filter(dir => _chunkExists(cache)(dir))
}

const _readFile = (cache) => (filepath) => {
  try {
    const content = fs.readFileSync(filepath, 'utf8')
    const ext = path.extname(filepath)

    return (ext === '.json' ? JSON.parse(content) : content)
  } catch (e) {
    console.log(e)
  }
}

const _readChunkFile = (cache) => (chunkName, filepath) => {
  return _readFile(cache)(_chunkFile(cache)(chunkName, filepath))
}

const _readProductFile = (cache) => (filepath) => {
  return _readFile(cache)(_productFile(cache)(filepath))
}

const _readChunkConfig = (cache) => (chunk) => {
  if (!_chunkExists(cache)(chunk)) {
    return
  }

  return _readChunkFile(cache)(chunk, 'chunk.json')
}

const _readProductConfig = (cache) => () => {
  return _readProductFile(cache)('chunky.json')
}

const _loadChunk = (cache) => (chunk) => {
  if (!_chunkExists(cache)(chunk)) {
    return Promise.reject(new Error("The chunk does not exist"))
  }

  const config = _readChunkConfig(cache)(chunk)
  const dir = _chunkDir(cache)(chunk)

  return recursive(dir).then((files) => ({ files: files.map(f => path.relative(dir, f)), dir, config,  name: chunk }))
}

const _loadChunks = (cache) => () => {
  return Promise.all(_getChunks(cache)().map(chunk => _loadChunk(cache)(chunk)))
}

const _productExists = (cache) => () => {
  return _productFileExists(cache)("chunky.json")
}

const _productDependenciesExist = (cache) => () => {
  return _productFileExists(cache)("package.json") && _productFileExists(cache)("node_modules/react-dom-chunky/lib/index.js")
}

const _loadProduct = (cache) => () => {
  return _loadChunks(cache)().then((chunks) => ({ chunks, config: _readProductConfig(cache)(), dir: _dir() }))
}

module.exports = (cache) => ({
  dir: _dir(cache)(),
  chunksDir: _chunksDir(cache)(),
  assetsDir: _assetsDir(cache)(),
  chunkDir: _chunkDir(cache),
  chunkFile: _chunkFile(cache),
  chunkFileExists: _chunkFileExists(cache),
  chunkExists: _chunkExists(cache),
  productFile: _productFile(cache),
  productFileExists: _productFileExists(cache),
  getChunks: _getChunks(cache),
  readFile: _readFile(cache),
  readChunkFile: _readChunkFile(cache),
  readChunkConfig: _readChunkConfig(cache),
  readProductFile: _readProductFile(cache),
  readProductConfig: _readProductConfig(cache),
  loadChunk: _loadChunk(cache),
  loadChunks: _loadChunks(cache),
  productExists: _productExists(cache),
  loadProduct: _loadProduct(cache),
  events: _events(cache),
  productDependenciesExist: _productDependenciesExist(cache)
})
