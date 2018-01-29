const path = require('path')
const fs = require('fs-extra')

function _sanitizeKey(key) {
  return key.replace(/[\$:]/g, '_');
}

function _sanitizeData(data) {
  if (!data) {
    return ""
  }

  if ("string" === typeof data) {
    return data
  }

  if (Array.isArray(data)) {
    return data.map(item => _sanitizeData(item))
  }

  if ("object" !== typeof data) {
    return data
  }

  var newData = {}
  for (const key in data) {
    newData[_sanitizeKey(key)] = _sanitizeData(data[key])
  }
  return newData
}

function _parseWordpressPost(data) {
  var op = _sanitizeData(data)

  var info = {
    title: op.title,
    date: op.wp_post_date,
    status: op.wp_status,
    timestamp: new Date(op.wp_post_date).getTime()
  }

  var meta = {}
  if (op.wp_postmeta) {
    if (Array.isArray(op.wp_postmeta)) {
      op.wp_postmeta.map(m => {
        const field = m.wp_meta_key
        if (meta[field] || meta[field] != undefined || meta[field.substring(1)]) {
          return
        }
        const value = m.wp_meta_value
        meta[field] = value
      })
    } else if ("object" === typeof op.wp_postmeta) {
      meta = Object.assign({}, op.wp_postmeta)
    }
  }

  return Object.assign({}, info,
    meta ? meta : {})
}

function _parseReportResultNode(item, node) {
  const type = (typeof node)
  switch (type) {
    case "object":
      var newNode = Array.isArray(node) ? [] : {}
      for(const key in node) {
        const nodeValue = _parseReportResultNode(item, node[key])
        if (!nodeValue || (Array.isArray(node) && newNode.includes(nodeValue))) {
          continue
        }
        newNode[key] = nodeValue
      }
      return newNode
    default:
      return (node[0] === '$' ? (item[node.substring(1)] || "") : (item[node] || node))
  }
}

function _parseReportResult(item, data) {
  var node = _parseReportResultNode(item, data)

  return Object.assign({}, node)
}

function _parseReportAsTransforms(data, providers, local) {
  var report = []
  local.forEach(item => {
    var result = _parseReportResult(item, data)
    if (!result) {
      return
    }
    report.push(result)
  })

  return Promise.resolve({ report })
}

function _parseWordpressPostsAsTransforms(data, providers, local) {
  var wordpress = []
  local.rss.channel.item.forEach(item => {
    var post = _parseWordpressPost (item)
    const transform = Object.assign({}, data, post)

    wordpress.push(transform)
  })

  return Promise.resolve({ wordpress })
}

function _parseGoogleDataAsTransforms(data, google) {
  const drive = google.api.drive({ version: 'v3', auth: google.auth })

  return new Promise((resolve, reject) => {
    // // const fileId = ''
    // // const localPath = path.resolve(process.cwd(), '.chunky', 'google', 'files', `${fileId}.docx`)
    //
    // // if (!fs.existsSync(localPath)) {
    // //   fs.mkdirsSync(localPath)
    // // }
    //
    // // Generate the manifest
    // fs.writeFileSync(localPath, "")
    //
    // const dest = fs.createWriteStream(localPath)
    //
    // drive.files.export({
    //    fileId: fileId,
    //    alt: 'media',
    //    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    // })
    // .on('end', function() {
    //   console.log('Done');
    //   resolve({})
    // })
    // .on('error', function(err) {
    //   console.log('Error during download', err);
    //   resolve({})
    // })
    // .pipe(dest)
    resolve()
  })
}

function parseImportAsTransforms({ type, data, providers, local }) {
  switch (type) {
    case 'report':
      return _parseReportAsTransforms(data, providers, local)
    case 'wordpress':
      return _parseWordpressPostsAsTransforms(data, providers, local)
    case 'google':
      return _parseGoogleDataAsTransforms(data, providers.google)
    default:
  }
}

module.exports = {
  parseImportAsTransforms
}
