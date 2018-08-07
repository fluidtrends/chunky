import fs from 'fs-extra'
import path from 'path'
import ejs from 'ejs'

// function _processTemplateFile (src, target, options) {
//   try {
//     // Parse the file
//     const templateContent = fs.readFileSync(src, 'utf8')
//     const templateCompiler = ejs.compile(templateContent)
//     const templateResult = templateCompiler(options)
//
//     // First copy the file
//     fs.copySync(src, target)
//
//     // Let's override its contents now
//     fs.writeFileSync(target, templateResult, 'utf8')
//
//     // Looks like this file made it
//     return true
//   } catch (e) {
//     return false
//   }
// }

export function createFile ({ root, filepath, data, json }) {
  const file = path.resolve(root, filepath)
  const content = (json ? JSON.stringify(data, null, 2) : data)
  fs.writeFileSync(file, content, 'utf8')
}
