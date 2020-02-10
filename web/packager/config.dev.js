const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const pages = require('./pages')
const WebPlugin = require('./webPlugin')

module.exports = (options) => {
  const root = (options.root || options.dir)
  const dir = options.dir
  const htmlPages = pages(options, true)
  
  return {
    entry: [
      'react-hot-loader/patch',
      'webpack-dev-server/client',
      'webpack/hot/only-dev-server',
      path.resolve(root, 'node_modules', 'react-dom-chunky', 'app', 'index.dev.js')
    ],
    mode: 'development',

    watch: true,

    output: {
      filename: 'chunky.js',
      path: path.resolve(dir, '.chunky', 'web'),
      publicPath: '/',
      libraryTarget: 'umd'
    },

    devtool: 'inline-source-map',
    target: 'web',

    resolve: {
      extensions: ['.js', '.json'],
      alias: {
        moment: 'moment/moment.js',
        'react-dom': '@hot-loader/react-dom'
      },
      modules: [
        path.resolve(dir),
        path.resolve(root, 'node_modules'),
        'node_modules'
      ]
    },

    module: {
      noParse: [/moment.js/],
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
            path.resolve(root, 'node_modules', 'react-chunky'),
            path.resolve(root, 'node_modules', 'react-dom-chunky'),
            path.resolve(dir, 'chunks')
          ],
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [path.resolve(root, 'node_modules', '@babel/preset-env'), {
                  loose: true,
                  modules: false
                }],
                path.resolve(root, 'node_modules', '@babel/preset-react'),
              ],
              plugins: [
                require.resolve('react-hot-loader/babel'),
                require.resolve('styled-jsx/babel')
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
        { from: { glob: path.resolve(root, 'node_modules', 'react-dom-chunky', 'app', 'assets/**/*'), dot: false }, to: 'assets', flatten: 'true' },
        { from: { glob: path.resolve(dir, 'assets/**/*'), dot: false, to: 'assets', flatten: 'true' } }
      ])
    ]    

    .concat(htmlPages)
    .concat([new WebPlugin(Object.assign({}, options, { dev: true }))]),

    devServer: {
      host: '0.0.0.0',
      inline: true,
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
      contentBase: path.resolve(dir, '.chunky', 'web'),
      watchContentBase: true,
      historyApiFallback: true,
      hot: true
    }
  }
}
