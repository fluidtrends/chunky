const rules = require('./webpack.rules')
const path = require('path')

const chunkyDir = path.dirname(path.resolve(require.resolve('react-electron-chunky')))

module.exports = {
  entry: path.resolve(chunkyDir, 'src', 'index.js'),
  module: {
    rules
  },
  resolve: {
    alias: {
      "__app": path.resolve(process.cwd())
    },
    modules: [
      path.resolve(chunkyDir, "node_modules"),
      path.resolve(process.cwd(), "node_modules"),
      "node_modules"
    ]
  }
}
