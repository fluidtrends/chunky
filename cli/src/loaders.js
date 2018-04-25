const path = require('path')
const fs = require('fs-extra')
const yaml = require('js-yaml')
const URL = require('url-parse')
const xml2json = require('xml2json')
const parsers = require('./parsers')

function _loadXmlAsJsonFile (file) {
  if (!fs.existsSync(file)) {
    throw new Error('Wordpress export file does not exist')
  }

  const xml = fs.readFileSync(file, 'utf8')
  try {
    const json = xml2json.toJson(xml, {
      object: true,
      coerce: true,
      sanitize: true,
      trim: true,
      arrayNotation: false,
      alternateTextNode: false
    })
    return json
  } catch (e) {
  }
  return {}
}

function _loadChunkArtifactAsXmlToJson (chunk, type, artifact) {
  const artifactFile = path.resolve(process.cwd(), 'chunks', chunk, type, artifact.name + '.xml')

  if (!fs.existsSync(artifactFile)) {
    return
  }

  return _loadXmlAsJsonFile(artifactFile)
}

function _loadYamlAsJsonFile (file) {
  if (!fs.existsSync(file)) {
    throw new Error('Yaml file does not exist')
  }

  try {
    return yaml.safeLoad(fs.readFileSync(file, 'utf8'))
  } catch (e) {
  }
  return {}
}

function _loadChunkArtifactAsYamlToJson (chunk, type, artifact) {
  const artifactFile = path.resolve(process.cwd(), 'chunks', chunk, type, artifact.name + '.yaml')

  if (!fs.existsSync(artifactFile)) {
    return
  }
  return _loadYamlAsJsonFile(artifactFile)
}

function _loadChunkArtifactAsYaml (chunk, type, artifact) {
  const artifactFile = path.resolve(process.cwd(), 'chunks', chunk, type, artifact.name + '.yaml')

  if (!fs.existsSync(artifactFile)) {
    return
  }

    // Load all data as Yaml
  const data = yaml.safeLoad(fs.readFileSync(artifactFile, 'utf8'))

  if (!data || Object.keys(data).length === 0) {
    return
  }

  return data
}

function _loadChunkArtifactAsFilePath (chunk, type, artifact, ext) {
  const artifactFile = path.resolve(process.cwd(), 'chunks', chunk, type, artifact.name + '.' + ext)

  return (fs.existsSync(artifactFile) ? artifactFile : undefined)
}

function _findChunkArtifacts (chunk, type, artifacts) {
  try {
        // Look up the config file for this chunk
    var config = loadChunkConfig(chunk)
    var dependencies = {}
    var permissions = {}

    if (type === 'functions') {
      config = config.service
      dependencies = config.dependencies
      permissions = Object.assign({}, permissions, config.permissions)
    }

    if (!config[type] || config[type].length === 0) {
            // No artifacts defined
      return []
    }

        // Look up the artifacts dir
    const artifactsDir = path.resolve(process.cwd(), 'chunks', chunk, type)

    if (!fs.existsSync(artifactsDir)) {
      // This chunk has no artifacts, even if it declared some
      return []
    }

    if (!artifacts || artifacts.length === 0) {
      // We want all the artifacts in this chunk
      artifacts = config[type]
    } else {
      artifacts = config[type].filter(a => {
        var found = false
        const aConfig = new URL(a, true)
        artifacts.forEach(a2 => {
          if (a2.toLowerCase() === aConfig.hostname.toLowerCase()) {
            found = true
            return
          }
        })
        return found
      })
    }

    return artifacts.map(artifact => {
      const url = new URL(artifact, true)
      const path = url.hostname + url.pathname
      const name = url.hash.slice(1) || path
      return { chunk,
        name,
        source: url.protocol.slice(0, -1),
        dependencies,
        permissions: permissions[name],
        path,
        options: Object.assign({ priority: 99999 }, url.query)}
    }).sort((a, b) => (Number.parseInt(a.options.priority) - Number.parseInt(b.options.priority)))
  } catch (e) {
    return []
  }
}

function _loadChunkReports (providers, chunk, reports) {
  const all = _findChunkArtifacts(chunk, 'reports', reports)
    // Look up all valid reports and load them up
  return Promise.all(all.map(report => {
    var data = _loadChunkArtifactAsYaml(chunk, 'reports', report)
    data = Object.assign({}, report, (data ? { data } : {}))
    return Promise.resolve(data)
  }))
}

function _loadChunkTransforms (providers, chunk, transforms) {
  const all = _findChunkArtifacts(chunk, 'transforms', transforms)

    // Look up all valid transforms and load them up
  return Promise.all(all.map(transform => {
    var data = _loadChunkArtifactAsYaml(chunk, 'transforms', transform)

    if (data.import) {
      data = data.import
      const type = data.type
      delete data.type
      var local = {}

      switch (type) {
        case 'wordpress':
          local = _loadChunkArtifactAsXmlToJson(chunk, 'transforms', transform)
          break
        case 'report':
          local = _loadChunkArtifactAsYamlToJson(chunk, 'reports', { name: `${data.report}.report` })
          delete data.report
          break
        default:
      }

      return parsers.parseImportAsTransforms({ type, data, local, providers })
                .then(d => Object.assign({}, transform, (d ? { data: d } : {})))
    }

    data = Object.assign({}, transform, (data ? { data } : {}))
    return Promise.resolve(data)
  }))
}

function _loadChunkFunctions (providers, chunk) {
  const functions = _findChunkArtifacts(chunk, 'functions')

    // Look up all valid transforms and load them up
  return Promise.resolve(functions.map(f => {
    const data = _loadChunkArtifactAsFilePath(chunk, 'functions', f, 'js')
    return Object.assign({}, f, (data ? { data } : {}))
  }))
}

function _load (providers, chunks, loader, artifacts) {
    // Figure out the chunks we need to look into
  if (chunks.length === 0) {
    chunks = fs.readdirSync(path.resolve(process.cwd(), 'chunks')).filter(dir => (dir && dir !== 'index.js' && dir !== 'index.web.js' && dir !== 'index.desktop.js' && dir !== '.DS_Store'))
  }
  return Promise.all(chunks.map(chunk => loader(providers, chunk, artifacts)))

    .then(all => {
      var merged = []
      all.map(a => { merged = merged.concat(a) })
      return merged.sort((a, b) => (Number.parseInt(a.options.priority) - Number.parseInt(b.options.priority)))
    })
}

function loadTransforms (providers, chunks, transforms) {
  return _load(providers, chunks, _loadChunkTransforms, transforms)
}

function loadReports (providers, chunks, reports) {
  return _load(providers, chunks, _loadChunkReports, reports)
}

function loadFunctions (providers, chunks) {
  return _load(providers, chunks, _loadChunkFunctions)
}

function _loadJsonFile (filepath) {
    // The project directory
  const dir = path.resolve(process.cwd())

    // Look for the file
  const file = path.resolve(dir, filepath)

  if (!fs.existsSync(file)) {
        // We can't continue without this file
    throw new Error('The file is missing')
  }

    // Load the content
  var config = fs.readFileSync(file, 'utf8')

  if (!config) {
    throw new Error('The file is invalid')
  }

    // Parse the json content
  config = JSON.parse(config)

  if (!config) {
    throw new Error('The file is invalid')
  }

  return config
}

function loadMainConfig () {
  const main = _loadJsonFile('chunky.json')
  const web = _loadJsonFile('web/index.json')

  return Object.assign({}, main, { web })
}

function loadChunkConfig (chunk) {
  return _loadJsonFile(`chunks/${chunk}/chunk.json`)
}

function loadSecureConfig () {
  return _loadJsonFile('.chunky.json')
}

function loadChunkConfigs () {
  const chunks = fs.readdirSync(path.resolve(process.cwd(), 'chunks')).filter(dir => (dir && dir !== 'index.js' && dir !== 'index.desktop.js' && dir !== 'index.web.js' && dir !== '.DS_Store'))

  if (!chunks || chunks.length === 0) {
    return
  }

  return chunks.map(chunk => loadChunkConfig(chunk))
}

module.exports = {
  loadSecureConfig,
  loadMainConfig,
  loadChunkConfig,
  loadFunctions,
  loadChunkConfigs,
  loadTransforms,
  loadReports
}
