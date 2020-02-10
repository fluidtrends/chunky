const chokidar = require('chokidar')
const fs = require('fs-extra')
const path = require('path')
const babel = require('@babel/core')
require('@babel/polyfill')

const watcher = chokidar.watch('.', {
  ignored: /node_modules|coverage|cli|dev|.git|.DS_Store|product/,
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
  let compile = (!fs.lstatSync(path.resolve(src)).isDirectory() && path.extname(src) === '.js' && source && (type === 'src' || source === 'src'))

  var target = path.resolve(dest)
  var targetSrc = path.resolve(dest)

  switch (type) {
    case 'blockchain':
      target = path.join(dest, 'node_modules', 'react-blockchain-chunky', compile ? 'lib' : (source || ''), original)
      targetSrc = path.join(dest, 'node_modules', 'react-blockchain-chunky', (source || ''), original)
      break
    case 'desktop':
      target = path.join(dest, 'node_modules', 'react-electron-chunky', compile ? 'lib' : (source || ''), original)
      targetSrc = path.join(dest, 'node_modules', 'react-electron-chunky', (source || ''), original)
      break
    case 'cloud':
      target = path.join(dest, 'node_modules', 'react-cloud-chunky', compile ? 'lib' : (source || ''), original)
      targetSrc = path.join(dest, 'node_modules', 'react-cloud-chunky', (source || ''), original)
      break
    case 'web':
      target = path.join(dest, 'node_modules', 'react-dom-chunky', compile ? 'lib' : (source || ''), original)
      targetSrc = path.join(dest, 'node_modules', 'react-dom-chunky', (source || ''), original)
      break
    case 'mobile':
      target = path.join(dest, 'node_modules', 'react-native-chunky', compile ? 'lib' : (source || ''), original)
      targetSrc = path.join(dest, 'node_modules', 'react-native-chunky', (source || ''), original)
      break
    case 'src':
      target = path.join(dest, 'node_modules', 'react-chunky', 'lib', (source || ''), original)
      targetSrc = path.join(dest, 'node_modules', 'react-chunky', (source || ''), original)
      break
    default:
      target = path.join(dest, 'node_modules', 'react-chunky', src)
      targetSrc = path.join(dest, 'node_modules', 'react-chunky', src)
  }

  return ({ target, targetSrc, compile })
}

function transpile (src, target) {
  const code = babel.transformFileSync(path.resolve(src), {
    sourceRoot: path.join(process.cwd(), 'node_modules'),
    plugins: ['@babel/plugin-transform-react-jsx', '@babel/plugin-transform-destructuring', '@babel/plugin-proposal-object-rest-spread', 'styled-jsx/babel'],
    presets: ['@babel/react', '@babel/env']
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
  const { target, targetSrc, compile } = findTarget(src)

  if (!target) {
    return
  }

  if (fs.existsSync(target)) {
    return
  }

  if (compile) {
    transpile(src, target)
  }

  fs.copySync(src, targetSrc)
}

function update (src, remove) {
  const { target, targetSrc, compile } = findTarget(src)
  if (!target) {
    return
  }
  if (remove) {
    fs.removeSync(target)
    console.log('Removed', src, 'from', target)
    return
  }

  if (compile) {
    transpile(src, target)
  }

  fs.copySync(src, targetSrc)
  console.log(compile ? 'Transpiled' : 'Moved', src, 'to', target)
}

console.log('*** Started ***')

watcher
  .on('add', src => add(src))
  .on('addDir', src => add(src))
  .on('change', src => update(src))
  .on('unlink', src => update(src, true))
  .on('unlinkDir', src => update(src, true))
