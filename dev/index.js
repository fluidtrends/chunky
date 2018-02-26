const chokidar = require('chokidar')
const fs = require('fs-extra')
const path = require('path')

const watcher = chokidar.watch('.', {
  ignored: /node_modules|bin|coverage|dev|.git/,
  persistent: true
})

var dest = process.argv[2]

if (!dest || !fs.existsSync(path.resolve(dest))) {
  console.error('Invalid destination')
  process.exit(0)
}

function update (src, remove) {
  var paths = src.split('/')
  const type = paths.shift()
  const original = paths.join('/')
  var target = path.resolve(dest)

  switch (type) {
    case 'web':
      target = path.join(target, 'node_modules', 'react-dom-chunky', original)
      break
    case 'mobile':
      target = path.join(target, 'node_modules', 'react-native-chunky', original)
      break
    case 'cli':
      console.log('Skipping', original)
      return
    default:
      target = path.join(target, 'node_modules', 'react-chunky', src)
  }

  remove ? fs.removeSync(target) : fs.copySync(src, target)
  console.log(remove ? 'Removed' : 'Moved', src, remove ? 'from' : 'to', target)
}

watcher
  .on('change', src => update(src))
  .on('unlink', src => update(src, true))
