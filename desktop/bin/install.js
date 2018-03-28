'use strict'

let path = require('path')
let fs = require('fs-extra')

const src = path.join(process.cwd(), 'node_modules', 'electron-prebuilt-compile')
const target = path.join(process.cwd(), 'react-electron-chunky', 'node_modules', 'electron-prebuilt-compile')

fs.copySync(src, target)
