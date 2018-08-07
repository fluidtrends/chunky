import URL from 'url-parse'
import fs from 'fs-extra'
import path from 'path'
import ejs from 'ejs'
import lali from 'lali'

const bundlesDir = '/Users/dancali/dev/fluidtrends/chunky-bundles'

export function loadTemplate ({ name }) {
  try {
    const templateFile = path.resolve(bundlesDir, `${name}-bundle`, 'templates', name, 'index.json')
    const templateContent = fs.readFileSync(templateFile, 'utf8')
    const template = JSON.parse(templateContent)

    return template
  } catch (e) {
    return false
  }
}

export function installTemplate ({ root, name }) {
  const template = loadTemplate({ name })

  if (!template) {
    return
  }

  console.log(chunks)
  // const chunks = template.chunks
}

// export function generateTemplate ({ bundle, name }) {
//   const template = loadTemplate({ bundle, name })
//   const chunks = template.
  // try {

    // const chunksRefUri = ''
    // const chunksRef = new URL(chunksRefUri)
    //
    // console.log(chunksRef)

    // const handlerHash = handlerRef.hash ? handlerRef.hash.substring(1) : ''
    //
    // if (handlerHash) {
    //   // This is a function handler
    //   this[handlerHash] && this[handlerHash](event)
    //   return
    // }
    //
    // const handlerType = handlerRef.protocol.slice(0, -1).toLowerCase()
    // const fullPath = `${handlerRef.hostname}${handlerRef.pathname ? handlerRef.pathname : ''}`
    //
    // switch (handlerType) {
    //   case 'local':
    //     return this.handleLocalEvent(`/${fullPath}`)
    //   case 'system':
    //     return this.handleSystemEvent(`/${fullPath}`)
    //   default:
    //     return this.handleExternalEvent(`${handlerType}://${fullPath}`)
    // }
  // } catch (error) {

  // }
// }
