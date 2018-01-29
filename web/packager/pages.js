const HtmlWebpackPlugin = require('html-webpack-plugin')
// const frontMatter = require('markdown-it-front-matter')
// const markdown = (fm) => require('markdown-it')().use(frontMatter, fm)
const path = require('path')
const fs = require('fs-extra')
const Router = require('../src/core/Router')

function generateDevPage (options, route) {
  return new HtmlWebpackPlugin({
    filename: 'index.html',
    route,
    inject: 'true',
    template: path.resolve(options.dir, 'node_modules', 'react-dom-chunky', 'app', 'pages', 'default.html')
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
    template: path.resolve(options.dir, 'node_modules', 'react-dom-chunky', 'app', 'pages', `${route.template || 'default'}.html`)
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

// module.exports = (context) => {
//   var results = []
//   // var pages = context.product.web.pages
//   //
//   // const localesDir = path.resolve(context.product.dir, "locales")
//   // const locales = fs.readdirSync(localesDir)
//   // const defaultLocale = context.product.info.locales[0]
//   //
//   // var defaultMeta = {
//   //   url: context.product.info.url,
//   //   title: context.product.info.title,
//   //   description: context.product.info.description,
//   //   image: context.product.info.image,
//   // }
//   //
//   // locales.forEach(locale => {
//   //   const articlesDir = path.resolve(context.product.dir, "locales", locale, 'articles')
//   //   const articles = fs.readdirSync(articlesDir)
//   //
//   //   articles.forEach(article => {
//   //     const extlen = path.extname(article).length
//   //     const id = path.basename(article).slice(0, -extlen)
//   //     const root = context.product.info.blogRoot || "blog"
//   //     const file = path.resolve(articlesDir, article)
//   //     const content = fs.readFileSync(file, 'utf8')
//   //     var settings = {}
//   //     const data = markdown(fm => {
//   //       fm.split("\n").map(line => {
//   //         const [key, val] = line.split(":")
//   //         settings[key.toLowerCase().trim()] = val.trim()
//   //       })
//   //     }).render(`${content}`)
//   //
//   //     const meta = Object.assign({}, defaultMeta, {
//   //       url: `${context.product.info.url}/${root}/${settings.path}`,
//   //       title: settings.title,
//   //       description: settings.summary,
//   //       image: `${context.product.info.url}/${settings.image}`
//   //     })
//   //
//   //     pages.push({
//   //       id, meta,
//   //       name: `${root}/${settings.path}`,
//   //       path: `${root}/${settings.path}`,
//   //       data,
//   //       settings,
//   //       isArticle: true
//   //     })
//   //   })
//   // })
//   //
//   // pages.forEach((page) => {
//   //   // Resolve the page path
//   //   var pagePath = 'index.html'
//   //
//   //   if (page.path) {
//   //     pagePath = `${page.path}/index.html`
//   //   }
//   //
//   //   // Inject meta if necessary
//   //   page.meta = page.meta || Object.assign({}, defaultMeta, {
//   //     url: `${context.product.info.url}/${page.path || ''}`
//   //   })
//   //
//   //   // Enable page generation
//     results.push(new HtmlWebpackPlugin({
//   //     // cache: false,
//   //     // page: page,
//       inject: 'body',
//   // //     // minify: {
//   // //     //   removeAttributeQuotes: true,
//   // //     //   collapseWhitespace: true,
//   // //     //   collapseInlineTagWhitespace: true,
//   // //     //   conservativeCollapse: true,
//   // //     //   removeComments: true
//   // //     // },
//       filename: `index.html`,
//   //     // template: 'page.html'
//       template: path.resolve(context.product.dir, 'web', 'index.html')
//     }))
//   // })
//
//   return results
// }
