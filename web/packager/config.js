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
      ],
      alias: {
        'react-dom': '@hot-loader/react-dom'
      }
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
    //   'react-router': {
    //     root: 'ReactRouter',
    //     commonjs2: 'react-router',
    //     commonjs: 'react-router',
    //     amd: 'react-router'
    //   },
    //   'react-dom-router': {
    //     root: 'ReactDOMRouter',
    //     commonjs2: 'react-dom-router',
    //     commonjs: 'react-dom-router',
    //     amd: 'react-dom-router'
    //   },
    //   antd: {
    //     root: 'antd',
    //     commonjs2: 'antd',
    //     commonjs: 'antd',
    //     amd: 'antd'
    //   },
    //   moment: {
    //     root: 'moment',
    //     commonjs2: 'moment',
    //     commonjs: 'moment',
    //     amd: 'moment'
    //   }
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
              placeholderSize: 50
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
          test: /\.(svg|ttf|eot|woff)$/,
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
