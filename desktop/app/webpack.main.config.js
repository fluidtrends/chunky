const rules = require('./webpack.rules')
const path = require('path')

module.exports = {
  entry: './src/index.js',
  module: {
    rules
  },
  resolve: {
    alias: {
      "__app": path.resolve(process.cwd())
    }
  }
}