import fs from 'fs-extra'
import path from 'path'

export function createFile ({ root, filepath, data, json }) {
  const file = path.resolve(root, filepath)
  if (fs.existsSync(file)) {
    return
  }

  const content = (json ? JSON.stringify(data, null, 2) : data)
  fs.writeFileSync(file, content, 'utf8')
}
