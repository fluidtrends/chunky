import fs from 'fs-extra'
import path from 'path'
import cpy from 'cpy'
import deepmerge from 'deepmerge'
import {
  installChunk,
  createFile,
  updateChunksIndex
} from '..'

export function installTemplate ({ dir, home, template, fixture }) {
  return new Promise((resolve, reject) => {
    try {
      const assetsDir = path.resolve(dir, 'assets')
      const assetsTextDir = path.resolve(assetsDir, 'text')

      fs.mkdirsSync(assetsDir)
      fs.mkdirsSync(assetsTextDir)

      const bundleImages = fixture.images.map(image => path.resolve(template.assetsDir, image))
      const bundleText = fixture.text.map(t => path.resolve(template.assetsDir, 'text', t))

      const chunkInstallers = Object.keys(fixture.chunks).map(chunkName => {
        const chunk = fixture.chunks[chunkName]
        return installChunk({ chunk, chunkName, dir, home, template, fixture })
      })

      const copyImages = () => cpy(bundleImages, assetsDir)
      const copyText = () => cpy(bundleText, assetsTextDir)

      Promise.all(chunkInstallers)
             .then(() => copyImages())
             .then(() => copyText())
             .then(() => {
               updateChunksIndex(dir)

               const webRoot = path.resolve(dir, 'web')
               const webBuildRoot = path.resolve(dir, '.chunky', 'web')

               fs.mkdirsSync(webRoot)
               fs.mkdirsSync(webBuildRoot)

               createFile({ root: webRoot, filepath: 'index.json', data: fixture.web, json: true })
               createFile({ root: webRoot, filepath: 'firebase-config.json', data: {}, json: true })
               createFile({ root: dir, filepath: 'chunky.json', data: fixture.manifest, json: true })
               createFile({ root: assetsDir, filepath: 'strings.json', data: fixture.strings || {}, json: true })

               resolve()
             })
             .catch(e => {
               console.log(e)
               reject(e)
             })
    } catch (e) {
      console.log(e)
      reject(e)
    }
  })
}
