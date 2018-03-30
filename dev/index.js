const chokidar = require('chokidar')
const fs = require('fs-extra')
const path = require('path')
const babel = require('babel-core')
require('babel-polyfill')

const watcher = chokidar.watch('.', {
  ignored: /node_modules|coverage|cli|dev|.git|.DS_Store/,
  persistent: true
})

var dest = process.argv[2]

if (!dest || !fs.existsSync(path.resolve(dest))) {
  console.error('Invalid destination')
  process.exit(0)
}

function findTarget (src) {
  var paths = src.split('/')
  const type = paths.shift()
  const source = paths.shift()
  const original = paths.join('/')
  const compile = (!fs.lstatSync(path.resolve(src)).isDirectory() && path.extname(src) === '.js' && source && source === 'src')

  var target = path.resolve(dest)
  switch (type) {
    case 'desktop':
      target = path.join(target, 'node_modules', 'react-electron-chunky', compile ? 'lib' : (source || ''), original)
      break
    case 'web':
      target = path.join(target, 'node_modules', 'react-dom-chunky', compile ? 'lib' : (source || ''), original)
      break
    case 'mobile':
      target = path.join(target, 'node_modules', 'react-native-chunky', compile ? 'lib' : (source || ''), original)
      break
    default:
      target = path.join(target, 'node_modules', 'react-chunky', src)
  }

  return ({ target, compile })
}

function transpile (src, target) {
  const code = babel.transformFileSync(path.resolve(src), {
    sourceRoot: path.join(process.cwd(), 'node_modules'),
    plugins: ['styled-jsx/babel', 'transform-react-jsx', 'transform-es2015-destructuring', 'transform-object-rest-spread'],
    presets: ['react', 'env']
  }).code

  if (fs.existsSync(target)) {
    fs.removeSync(target)
  }

  if (!fs.existsSync(path.dirname(target))) {
    fs.mkdirsSync(path.dirname(target))
  }

  fs.writeFileSync(target, code)
}

function add (src) {
  const { target, compile } = findTarget(src)

  if (!target) {
    return
  }

  if (fs.existsSync(target)) {
    return
  }

  compile ? transpile(src, target) : fs.copySync(src, target)
}

function update (src, remove) {
  const { target, compile } = findTarget(src)
  console.log(src, remove)
  if (!target) {
    return
  }

  remove ? fs.removeSync(target) : (compile ? transpile(src, target) : fs.copySync(src, target))
  console.log(remove ? 'Removed' : (compile ? 'Transpiled' : 'Moved'), src, remove ? 'from' : 'to', target)
}

watcher
  .on('add', src => add(src))
  .on('addDir', src => add(src))
  .on('change', src => update(src))
  .on('unlink', src => update(src, true))
  .on('unlinkDir', src => update(src, true))
