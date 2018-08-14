const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const fs = require('fs-extra')
const Router = require('../src/core/Router')

function generateDevPage (options, route) {
  return new HtmlWebpackPlugin({
    filename: 'index.html',
    route,
    inject: 'true',
    template: path.resolve(options.root || options.dir, 'node_modules', 'react-dom-chunky', 'app', 'pages', 'default.html')
  })
}

function generateStaticPage (options, route) {
  return new HtmlWebpackPlugin({
    cache: false,
    route,
    inject: 'true',
    minify: {
      removeAttributeQuotes: true,
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
      conservativeCollapse: true,
      removeComments: true
    },
    filename: `${(route.path && route.path !== '/') ? route.path + '/' : ''}index.html`,
    template: path.resolve(options.root || options.dir, 'node_modules', 'react-dom-chunky', 'app', 'pages', `${route.template || 'default'}.html`)
  })
}

function chunkRoutes (chunk, options) {
  var r = []
  for (const routeName in chunk.routes) {
    const route = chunk.routes[routeName]

    if (!route.path || (route.path && route.path.indexOf(':path') < 0)) {
      r.push(Object.assign({}, { id: routeName }, route, { location: (route.path ? `${route.path}` : '/') }))
      break
    }

    if (!route.pathData) {
      return []
    }

    try {
      const variants = require(path.resolve(options.dir, 'chunks', chunk.name, 'data', `${route.pathData}.json`))
      if (!variants || variants.length === 0) {
        return []
      }

      variants.forEach(variant => {
        const newPath = route.path.replace(/:path/g, variant.path)
        r.push(Object.assign({}, { id: routeName }, route, { location: (route.path ? `/${route.path}` : '/'), path: newPath }, variant))
      })
    } catch (e) {
    }
  }
  return r
}

function routes (options) {
  var r = []

  for (const sectionName in options.config.sections) {
    const section = options.config.sections[sectionName]
    const sectionRoutes = Router.createSectionRoutes(section, (element, section) => {
      var chunk

      options.chunks.forEach(c => {
        if (c.name === element) {
          chunk = Object.assign({}, c)
        }
      })

      if (chunk && chunk.routes && Object.keys(chunk.routes).length > 0) {
        r = r.concat(chunkRoutes(chunk, options))
      }
    })
  }

  return r
}

function pages (options, dev) {
  const r = routes(options)

  if (dev) {
    return [generateDevPage(options, r[0])]
  }

  // Add static pages
  return r.map(route => generateStaticPage(options, route))
}

module.exports = pages
