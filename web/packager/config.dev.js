const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const pages = require('./pages')
const WebPlugin = require('./webPlugin')

module.exports = (options) => {
  return {
    entry: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:' + options.port,
      'webpack/hot/only-dev-server',
      path.resolve(options.dir, 'node_modules', 'react-dom-chunky', 'app', 'index.dev.js')
    ],

    watch: true,

    output: {
      filename: 'chunky.js',
      path: path.resolve(options.dir, '.chunky', 'web'),
      publicPath: '/',
      libraryTarget: 'umd'
    },

    devtool: 'inline-source-map',
    target: 'web',

    resolve: {
      extensions: ['.js', '.json'],
      alias: {
        moment: 'moment/moment.js'
      },
      modules: [
        path.resolve(options.dir),
        'node_modules'
      ]
    },

    module: {
      noParse: [/moment.js/],
      rules: [
        {
          test: /\.(png|gif|jpe?g)$/,
          use: [ {
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
          test: /\.(html)$/,
          use: {
            loader: 'html-loader',
            options: {
            }
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', {
            loader: 'css-loader',
            options: { modules: true }
          }]
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
            path.resolve(options.dir, 'node_modules', 'react-chunky'),
            path.resolve(options.dir, 'node_modules', 'react-dom-chunky'),
            path.resolve(options.dir, 'chunks')
          ],
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [path.resolve(options.dir, 'node_modules', 'babel-preset-env'), {
                  loose: true,
                  modules: false
                }],
                path.resolve(options.dir, 'node_modules', 'babel-preset-react'),
                path.resolve(options.dir, 'node_modules', 'babel-preset-stage-2')
              ],
              plugins: [
                require.resolve('react-hot-loader/babel'),
                'styled-jsx/babel'
              ]
            }
          }
        }
      ]
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new CopyWebpackPlugin([
        { from: { glob: path.resolve(options.dir, 'node_modules', 'react-dom-chunky', 'app', 'assets/**/*'), dot: false }, to: 'assets', flatten: 'true' },
        { from: { glob: path.resolve(options.dir, 'assets/**/*'), dot: false, to: 'assets', flatten: 'true' } }
      ])
    ].concat([new WebPlugin(Object.assign({}, options, { dev: true }))]).concat(pages(options, true)),

    devServer: {
      host: 'localhost',
      watchOptions: {
        poll: true,
        aggregateTimeout: 100
      },
      quiet: true,
      noInfo: true,
      stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false,
        modules: false
      },
      port: options.port,
      contentBase: path.resolve(options.dir, 'web', 'build'),
      watchContentBase: true,
      historyApiFallback: true,
      hot: true
    }
  }
}
