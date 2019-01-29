const fs = require('fs-extra')
const path = require('path')
const deepmerge = require('deepmerge')
const recursive = require('recursive-readdir')

const _dir = () => {
  return process.cwd()
}

const _chunksDir = () => {
  return path.resolve(_dir(), 'chunks')
}

const _assetsDir = () => {
  return path.resolve(_dir(), 'assets')
}

const _chunkDir = (name) => {
  return path.resolve(_chunksDir(), name)
}

const _chunkFile = (chunkName, file) => {
  return path.resolve(_chunkDir(chunkName), file)
}

const _productFile = (file) => {
  return path.resolve(_dir(), file)
}

const _productFileExists = (file) => {
  return fs.existsSync(_productFile(file))
}

const _chunkFileExists = (chunkName, file) => {
  return fs.existsSync(path.resolve(_chunkDir(chunkName), file))
}

const _chunkExists = (name) => {
  return _chunkFileExists(name, 'chunk.json')
}

const _getChunks = () => {
  return fs.readdirSync(_chunksDir()).filter(dir => _chunkExists(dir))
}

const _readFile = (filepath) => {
  try {
    const content = fs.readFileSync(filepath, 'utf8')
    const ext = path.extname(filepath)

    return (ext === '.json' ? JSON.parse(content) : content)
  } catch (e) {
    console.log(e)
  }
}

const _readChunkFile = (chunkName, filepath) => {
  return _readFile(_chunkFile(chunkName, filepath))
}

const _readProductFile = (filepath) => {
  return _readFile(_productFile(filepath))
}

const _readChunkConfig = (chunk) => {
  if (!_chunkExists(chunk)) {
    return
  }

  return _readChunkFile(chunk, 'chunk.json')
}

const _readProductConfig = () => {
  return _readProductFile('chunky.json')
}

const _loadChunk = (chunk) => {
  if (!_chunkExists(chunk)) {
    return Promise.reject(new Error("The chunk does not exist"))
  }

  const config = _readChunkConfig(chunk)
  const dir = _chunkDir(chunk)

  return recursive(dir).then((files) => ({ files: files.map(f => path.relative(dir, f)), dir, config,  name: chunk }))
}

const _loadChunks = () => {
  return Promise.all(_getChunks().map(chunk => _loadChunk(chunk)))
}

const _productExists = () => {
  return _productFileExists("chunky.json")
}

const _loadProduct = () => {
  return _loadChunks().then((chunks) => ({ chunks, config: _readProductConfig(), dir: _dir() }))
}

module.exports = {
  dir: _dir(),
  chunksDir: _chunksDir(),
  assetsDir: _assetsDir(),
  chunkDir: _chunkDir,
  chunkFile: _chunkFile,
  chunkFileExists: _chunkFileExists,
  chunkExists: _chunkExists,
  productFile: _productFile,
  productFileExists: _productFileExists,
  getChunks: _getChunks,
  readFile: _readFile,
  readChunkFile: _readChunkFile,
  readChunkConfig: _readChunkConfig,
  readProductFile: _readProductFile,
  readProductConfig: _readProductConfig,
  loadChunk: _loadChunk,
  loadChunks: _loadChunks,
  productExists: _productExists,
  loadProduct: _loadProduct
}
