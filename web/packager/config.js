const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const StaticPlugin = require('./staticPlugin')
const pages = require('./pages')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = (options) => {
  const root = (options.root || options.dir)
  const dir = options.dir

  return {
    entry: {
      app: path.resolve(root, 'node_modules', 'react-dom-chunky', 'app', 'index.js')
    },

    output: {
      filename: 'chunky.js',
      path: path.resolve(dir, '.chunky', 'web'),
      publicPath: '/',
      libraryTarget: 'umd'
    },

    resolve: {
      extensions: ['.js', '.json'],
      modules: [
        path.resolve(dir),
        path.resolve(root, 'node_modules'),
        'node_modules'
      ]
    },

    externals: {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
    },

    module: {
      rules: [
        {
          test: /\.r.png$/,
          use: [{
            loader: 'responsive-loader',
            options: {
              sizes: [600, 2000],
              placeholder: true,
              placeholderSize: 50,
              adapter: require('responsive-loader/sharp')
            }
          }]
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: {
            loader: 'file-loader',
            options: {}
          }
        },
        {
          test: /\.svg$/, 
          use: {
            loader: 'raw-loader'
          }
        },
        {
          test: /\.(html)$/,
          use: {
            loader: 'html-loader',
            options: {
            }
          }
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: [{
              loader: 'css-loader',
              options: { modules: true }
            }]
          })
        },
        {
          test: /\.md$/,
          use: [
            {
              loader: 'html-loader'
            },
            {
              loader: 'markdown-loader',
              options: {
              }
            }
          ]
        },
        {
          test: /\.js$/,
          include: [
            path.resolve(root, 'node_modules', 'react-chunky'),
            path.resolve(root, 'node_modules', 'react-dom-chunky'),
            path.resolve(dir, 'chunks')
          ],
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [path.resolve(root, 'node_modules', 'babel-preset-env'), {
                  loose: true,
                  modules: false
                }],
                path.resolve(root, 'node_modules', 'babel-preset-react'),
                path.resolve(root, 'node_modules', 'babel-preset-stage-2')
              ],
              plugins: [
                require.resolve('styled-jsx/babel')
              ]
            }
          }
        }
      ]
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
      }),
      new ExtractTextPlugin('chunky.css'),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new CopyWebpackPlugin([
        { from: { glob: path.resolve(root, 'node_modules', 'react-dom-chunky', 'app', 'assets/**/*'), dot: false }, to: 'assets', flatten: 'true' },
        { from: { glob: path.resolve(dir, 'assets/**/*'), dot: false, to: 'assets', flatten: 'true' } }
      ])
    ].concat(pages(options)).concat([new StaticPlugin(Object.assign({}, options)),
      new UglifyJsPlugin({
        extractComments: true
      })
    ])
  }
}
