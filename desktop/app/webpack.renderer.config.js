const rules = require('./webpack.rules');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack')
const path = require('path')

const chunkyDir = path.dirname(path.resolve(require.resolve('react-electron-chunky')))

rules.push(
  {
    test: /\.less$/,
    use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'less-loader',
    options: {
             modifyVars: {
               'primary-color': '#00bcd4',
               'link-color': '#1565C0',
               'border-radius-base': '2px'
             },
             javascriptEnabled: true
           }
   }]
  }
)

const plugins = [
  new HtmlWebPackPlugin({
    filename: path.resolve(chunkyDir, 'ui', 'index.html')
  }), 
  new webpack.ExternalsPlugin('commonjs', [
    'electron'
  ])
]

module.exports = {
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
