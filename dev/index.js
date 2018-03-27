const chokidar = require('chokidar')
const fs = require('fs-extra')
const path = require('path')

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
  const original = paths.join('/')

  var target = path.resolve(dest)
  switch (type) {
    case 'desktop':
      target = path.join(target, 'node_modules', 'react-electron-chunky', original)
      break
    case 'web':
      target = path.join(target, 'node_modules', 'react-dom-chunky', original)
      break
    case 'mobile':
      target = path.join(target, 'node_modules', 'react-native-chunky', original)
      break
    default:
      target = path.join(target, 'node_modules', 'react-chunky', src)
  }

  return target
}

function add (src) {
  const target = findTarget(src)

  if (!target) {
    return
  }

  if (fs.existsSync(target)) {
    return
  }

  fs.copySync(src, target)
}

function update (src, remove) {
  const target = findTarget(src)

  if (!target) {
    return
  }

  remove ? fs.removeSync(target) : fs.copySync(src, target)
  console.log(remove ? 'Removed' : 'Moved', src, remove ? 'from' : 'to', target)
}

watcher
  .on('add', src => add(src))
  .on('addDir', src => add(src))
  .on('change', src => update(src))
  .on('unlink', src => update(src, true))
  .on('unlinkDir', src => update(src, true))
