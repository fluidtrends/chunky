
const lali = require('lali')
const coreutils = require('coreutils')
const path = require('path')
const fs = require('fs-extra')
const ejs = require('ejs')
const cpy = require('cpy')
const recursive = require('recursive-readdir')
const decompress = require('decompress')

const config = {
  templatesDir: path.resolve(__dirname, '../assets', 'templates'),
  templatesIgnores: ['.DS_Store', '*.jar', '*.zip', '*.png', '*.jpg', '*.jpeg', '*.gif', '*.ttf', 'Pods', 'Pods.zip'],
  assetsTypes: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.zip', '**/*.jar', '**/*.ttf', '!.DS_Store', 'Pods.zip']
}

function generateServerlessPackage (service, deployment) {
  return {
    name: service.name,
    version: service.version,
    description: '',
    main: 'service.js',
    scripts: {},
    author: '',
    dependencies: service.dependencies
  }
}

function generateServerlessManifest (service, deployment) {
  var base = {
    service: service.name,
    provider: {
      name: 'aws',
      runtime: 'nodejs6.10',
      stage: deployment.env,
      timeout: 60,
      environment: {
        CHUNKY_ENV: deployment.env
      }
    },
    package: {
      exclude: ['.git/**']
    }
        // resources: {
        //     Resources: {
        //         pathmapping: {
        //             Type: "AWS::ApiGateway::BasePathMapping",
        //             Properties: {
        //                 BasePath: "",
        //                 DomainName: deployment.apiDomain,
        //                 RestApiId: {
        //                     Ref: "ApiGatewayRestApi"
        //                 },
        //                 Stage: deployment.env
        //             }
        //         }
        //     }
        // }
  }

  base.functions = {}

  service.functions.forEach(f => {
    base.functions[f.name] = {
      handler: f.name + '.main',
      events: [{
        http: {
          method: f.source,
          path: f.path,
          cors: true,
          integration: 'lambda'
        }
      }]
    }
  })

  return base
}

function _generateProductPackage (name, template) {
  return {
    name,
    version: '0.1.0',
    description: 'This is Chunky',
    scripts: {
      test: 'react-savor test',
      lint: 'react-savor lint',
      coverage: 'react-savor coverage',
      codeclimate: 'react-savor codeclimate',
      deployweb: 'aws s3 sync web/build s3://www.chunky.io'
    },
    repository: {
      type: 'git',
      url: 'git+https://github.com/react-chunky/react-chunky-product.git'
    },
    homepage: 'http://www.chunky.io',
    dependencies: {
      'react-dom-chunky': '0.9.x'
    },
    devDependencies: {
      'react-savor': '0.x'
    }
  }
}

function _generateProductChunkyManifest (name, template) {
  return {
    name,
    template,
    env: 'dev',
    id: 'io.chunky',
    androidSdkDir: '~/Library/Android/sdk',
    sections: {
      start: {
        stack: [ 'intro', 'posts', 'docs' ]
      }
    },
    transitions: ['replace://start'],
    provisioning: {},
    theme: {
      logoImage: 'logo.png',
      logoLightImage: 'logo.png',
      headerColor: '#FF5722',
      textColor: '#546E7A',
      linkColor: '#0288D1',
      linkHoverColor: '#64B5F6',
      linkHoverBackgroundColor: '#F5F5F5',
      progressColor: 'rgba(50,50,50,0.9)',
      primaryColor: '#0097A7',
      statusBarLight: false,
      navigationColor: '#FFFFFF',
      navigationTintColor: '#37474F',
      backgroundColor: '#999999',
      footerTintColor: '#CFD8DC',
      footerHeaderColor: '#90A4AE',
      footerColor: '#546E7A',
      footerBottomColor: '#37474F'
    },
    info: {
      copyright: '© 2018',
      watermark: 'Created with Chunky.'
    }
  }
}

function _generateProductStrings (data) {
  return {
    'appName': data.chunky.name,
    'noData': 'Sorry, no data available',
    'inProgress': 'Loading data ...',
    'welcomeTitle': `Welcome To ${data.chunky.name}.`,
    'welcomeSubtitle': "We're working hard to launch soon.",
    'welcomeActionTitle': `Join ${data.chunky.name}`,
    'welcomeActionSubtitle': 'Stay Tuned.',
    'retry': 'Try again',
    'cancel': 'Cancel',
    'reload': 'Reload',
    'success': 'Success',
    'error': 'An error occured',
    'signIn': 'Sign In',
    'signUp': 'Sign Up',
    'continue': 'Continue',
    'logout': 'Sign Out Of Our Account',
    'loginToAccount': 'Welcome Back',
    'createAccount': 'Create Your Account',
    'needAccount': 'Do you need an account?',
    'haveAccount': 'Do you have an account?',
    'email': 'Enter Your Email Address',
    'enterEmail': 'Please enter your email address',
    'password': 'Enter Your Password',
    'password2': 'Confirm Your Password',
    'enterPassword': 'Please enter your password',
    'enterPassword2': 'Please confirm your password',
    'detectingLocation': 'Detecting your location...',
    'foundLocation': 'Found your location',
    'notFoundLocation': 'Could not find your location',
    'welcomeBack': 'Welcome back',
    'failedLocationDetection': 'Failed to detect your location',
    'yourProfile': 'Your Profile',
    'updateAccount': 'Update',
    'setupAccount': 'Setup Your Account',
    'setup': 'Setup',
    'skipSetup': 'Skip Setup',
    'enterName': 'Please enter your name',
    'name': 'Enter Your Name',
    'enterPhone': 'Please enter your phone number',
    'phone': 'Your Phone Number',
    'enterImage': 'Please take a picture',
    'image': 'Your Picture',
    'passwordsNotMatching': 'Please make sure your passwords match',
    'changePhoto': 'Change Photo'
  }
}

function _generateProductChunkySecureManifest (name, template, serviceAccount) {
  return {
    name,
    template,
    cloud: {
      dev: {
        aws: {
          key: '',
          secret: '',
          apiDomain: '',
          region: 'us-east-1'
        },
        google: {
          services: ['drive', 'calendar', 'spreadsheets'],
          serviceAccount
        }
      },
      staging: {
        aws: {
          key: '',
          secret: '',
          apiDomain: '',
          region: 'us-east-1'
        },
        google: {
          services: ['drive', 'calendar', 'spreadsheets'],
          serviceAccount: { }
        }
      },
      production: {
        aws: {
          key: '',
          secret: '',
          apiDomain: '',
          region: 'us-east-1'
        },
        google: {
          services: ['drive', 'calendar', 'spreadsheets'],
          serviceAccount: { }
        }
      }
    }
  }
}

function generateProductManifestFiles (name, template) {
  fs.writeFileSync(path.resolve(process.cwd(), 'package.json'), JSON.stringify(_generateProductPackage(name, template), null, 2))
  coreutils.logger.ok(`Created package.json`)

  fs.writeFileSync(path.resolve(process.cwd(), 'chunky.json'), JSON.stringify(_generateProductChunkyManifest(name, template), null, 2))
  coreutils.logger.ok(`Created chunky.json`)
}

function _postCreationiOSProcess (data) {
  // const sourceFirebaseFile = path.resolve(process.cwd(), 'GoogleService-Info.plist')
  // const targetFirebaseFile = path.resolve(process.cwd(), 'ios', 'GoogleService-Info.plist')
  //
  // if (!fs.existsSync(sourceFirebaseFile)) {
  //   return Promise.resolve()
  // }
  //
  // fs.copySync(sourceFirebaseFile, targetFirebaseFile)
  // fs.copySync(sourceFirebaseFile, targetFirebaseFile)
  //
  // coreutils.logger.ok(`Provisioned iOS app for Firebase`)
  //
  // const targetAssetsDir = path.resolve(process.cwd(), 'ios', 'assets')
  // fs.mkdirsSync(targetAssetsDir)
  //
  // const targetPodsZipFile = path.resolve(process.cwd(), 'ios', 'Pods.zip')
  // const targetPodsDir = path.resolve(process.cwd(), 'ios')
  //
  // if (!fs.existsSync(targetPodsZipFile)) {
  //   // No need to decompress iOS Pods
  //   return Promise.resolve()
  // }
  //
  // return decompress(targetPodsZipFile, targetPodsDir)
  //        .then(files => {
  //          fs.removeSync(targetPodsZipFile)
  //          coreutils.logger.ok(`Decompressed iOS Pods`)
  //        })
  //        .catch(e => coreutils.logger.fail(e.message))
  return Promise.resolve()
}

function _postCreationWebProcess (data) {
  const sourceFirebaseFile = path.resolve(process.cwd(), 'firebase-config.json')
  const targetFirebaseFile = path.resolve(process.cwd(), 'web', 'firebase-config.json')

  if (!fs.existsSync(sourceFirebaseFile)) {
    return Promise.resolve()
  }

  fs.copySync(sourceFirebaseFile, targetFirebaseFile)
  coreutils.logger.ok(`Provisioned Web app for Firebase`)

  return Promise.resolve()
}

function _postCreationAssetsProcess (data) {
  fs.writeFileSync(path.resolve(process.cwd(), 'assets', 'strings.json'), JSON.stringify(_generateProductStrings(data), null, 2))
  coreutils.logger.ok(`Created product strings`)

  return Promise.resolve()
}

function _postCreationCloudProcess (data) {
  return Promise.resolve()
}

function _postCreationAndroidProcess (data) {
  // var paths = [process.cwd(), 'android', 'app', 'src', 'main', 'java']
  // const sourcePackageRoot = paths.concat(['io']).join('/')
  // const sourcePackage = paths.concat(['io', 'chunky']).join('/')
  // const targetPackage = paths.concat(data.chunky.id.split('.')).join('/')
  //
  // fs.moveSync(sourcePackage, targetPackage, { overwrite: true })
  // fs.removeSync(sourcePackageRoot)
  // coreutils.logger.ok(`Created ${data.chunky.id} package`)
  //
  // const sourceFirebaseFile = path.resolve(process.cwd(), 'google-services.json')
  // const targetFirebaseFile = path.resolve(process.cwd(), 'android', 'app', 'google-services.json')
  //
  // if (!fs.existsSync(sourceFirebaseFile)) {
  //   return Promise.resolve()
  // }
  //
  // fs.copySync(sourceFirebaseFile, targetFirebaseFile)
  // coreutils.logger.ok(`Provisioned Android app for Firebase`)

  return Promise.resolve()
}

function _processTemplateFile (file, options) {
  try {
    // Parse the file
    const templateContent = fs.readFileSync(file, 'utf8')
    const templateCompiler = ejs.compile(templateContent)
    const templateResult = templateCompiler(options.context)

    // First copy the file
    fs.copySync(file, options.targetFile)

    // Let's override its contents now
    fs.writeFileSync(options.targetFile, templateResult, 'utf8')

    // Looks like this file made it
    coreutils.logger.ok(`Created ${options.relativeFile}`)
  } catch (e) {
    coreutils.logger.fail(file)
  }
}

function _copyTemplateFiles (name, templateDir, targetDir, context) {
  return new Promise((resolve, reject) => {
    recursive(templateDir, config.templatesIgnores, (err, files) => {
      if (!files || files.length === 0) {
        reject(new Error('Invalid artifact template'))
        return
      }
      files.map((file) => {
          // Process each file in the template and copy it if necessary
        const relativeFile = file.substring(templateDir.length + 1)

        _processTemplateFile(file, {
          name,
          relativeFile,
          targetFile: path.join(targetDir, relativeFile),
          context
        })
      })
      resolve()
    })
  })
}

function _copyTemplateAssetsToTarget (templateDir, targetDir) {
  return cpy(config.assetsTypes, targetDir, {
    cwd: templateDir,
    parents: true
  }).catch(e => coreutils.logger.fail(e.message))
}

function _generateChunkIndexFile (data) {
  return new Promise((resolve, reject) => {
    const productDir = path.resolve(process.cwd())
    const chunksDir = path.resolve(productDir, 'chunks')
    const chunks = fs.readdirSync(chunksDir).filter(dir => (dir && dir !== 'index.js' && dir !== 'index.web.js' && dir !== '.DS_Store'))

    var chunksExports = chunks.map(chunk => `export { default as ${chunk} } from './${chunk}'`).join('\n')
    var chunksExportsWeb = chunks.map(chunk => `export { default as ${chunk} } from './${chunk}/index.web'`).join('\n')
    var chunksExportsHeader = '// AUTO-GENERATED FILE. PLEASE DO NOT MODIFY. CHUNKY WILL CRY.'

    fs.writeFileSync(path.resolve(chunksDir, 'index.js'), `${chunksExportsHeader}\n\n${chunksExports}`)
    fs.writeFileSync(path.resolve(chunksDir, 'index.web.js'), `${chunksExportsHeader}\n\n${chunksExportsWeb}`)
    resolve()
  })
}

function _postCreationProcess (type, data) {
  switch (type) {
    case 'android':
      return _postCreationAndroidProcess(data)
    case 'ios':
      return _postCreationiOSProcess(data)
    case 'assets':
      return _postCreationAssetsProcess(data)
    case 'chunk':
      return _generateChunkIndexFile(data)
    case 'web':
      return _postCreationWebProcess(data)
    case 'cloud':
      return _postCreationCloudProcess(data)
    default:
      return Promise.resolve()
  }
}

function _generateArtifact (name, template, type, data) {
    // Figure out the path where it will live
  var targetDir = path.resolve(process.cwd(), 'chunks', name)
  var templateDir = path.resolve(config.templatesDir, 'chunks', template)

  switch (type) {
    case 'android':
    case 'ios':
    case 'assets':
    case 'web':
    case 'cloud':
      targetDir = path.resolve(process.cwd(), type)
      templateDir = path.resolve(config.templatesDir, type, template)
      break
    default:
  }

  if (/\s/.test(name)) {
        // Make sure the name provided is valid
    throw new Error('The name cannot contain spaces')
  }

  if (fs.existsSync(targetDir)) {
    fs.removeSync(targetDir)
  }

  if (!fs.existsSync(config.templatesDir)) {
        // This should not happen, but better safe than sorry
    throw new Error('Missing expected template')
  }

    // Create the empty chunk destination
  fs.mkdirsSync(targetDir)

  return _copyTemplateAssetsToTarget(templateDir, targetDir)
           .then(() => _copyTemplateFiles(name, templateDir, targetDir, data))
           .then(() => _postCreationProcess(type, data))
}

function generateChunk (name, template, data) {
  return _generateArtifact(name, template, 'chunk', data)
}

function generateAndroid (name, template, data) {
  return _generateArtifact(name, template, 'android', data)
}

function generateiOS (name, template, data) {
  return _generateArtifact(name, template, 'ios', data)
}

function generateWeb (name, template, data) {
  return _generateArtifact(name, template, 'web', data)
}

function generateCloud (name, template, data) {
  return _generateArtifact(name, template, 'cloud', data)
}

function generateAssets (name, template, data) {
  return _generateArtifact(name, template, 'assets', data)
}

function generateProvisioning (name, template, data) {
  const serviceAccountFile = path.resolve(process.cwd(), 'serviceAccount.json')

  if (!fs.existsSync(serviceAccountFile)) {
    return Promise.resolve()
  }

  try {
    const serviceAccount = require(serviceAccountFile)
    fs.writeFileSync(path.resolve(process.cwd(), '.chunky.json'), JSON.stringify(_generateProductChunkySecureManifest(name, template, serviceAccount), null, 2))
    coreutils.logger.ok(`Created .chunky.json`)
    return Promise.resolve()
  } catch (e) {
    return Promise.reject(e)
  }
}

module.exports = {
  generateServerlessManifest,
  generateServerlessPackage,
  generateChunk,
  generateAndroid,
  generateiOS,
  generateWeb,
  generateCloud,
  generateAssets,
  generateProvisioning,
  generateProductManifestFiles
}
