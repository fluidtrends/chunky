/* eslint-disable no-unused-expressions */

const { Octokit } = require('@octokit/rest')
const savor = require('savor')
const { Bundle, Environment } = require ('../../src')
const path = require('path')
const lali = require('lali')
const fs = require('fs-extra')

savor.

add('should not check for the latest version without a bundle id', (context, done) => {
  const bundle = new Bundle()
  context.expect(bundle.id).to.not.exist
  context.expect(bundle.github).to.exist

  savor.promiseShouldFail(bundle.checkVersion(), done, (error) => {
    context.expect(error.message).to.equal(Bundle.ERRORS.CANNOT_CHECK('the bundle id is missing'))
  })
}).

add('should not check for the latest version without a bundle repo', (context, done) => {
  const bundle = new Bundle({ id: "test" })
  context.expect(bundle.info.owner).to.equal('test')
  context.expect(bundle.info.repo).to.not.exist

  savor.promiseShouldFail(bundle.checkVersion(), done, (error) => {
    context.expect(error.message).to.equal(Bundle.ERRORS.CANNOT_CHECK('the bundle repo is missing'))
  })
}).

add('should handle remote errors when checking for a specific version', (context, done) => {
  const bundle = new Bundle({ id: "aa/bb/1.0" })
  
  context.replaceGetter(bundle, 'github', () => ({ repos: { getReleaseByTag: () => Promise.reject(new Error('oops')) }  }))

  savor.promiseShouldFail(bundle.checkVersion(), done, (error) => {
    context.expect(error.message).to.equal('oops')
  })
}).

add('should handle remote errors when checking for the latest version', (context, done) => {
  const bundle = new Bundle({ id: "aa/bb" })

  context.replaceGetter(bundle, 'github', () => ({ repos: { getLatestRelease: () => Promise.reject(new Error('oops')) } }))

  context.expect(bundle.info.owner).to.equal('aa')
  context.expect(bundle.info.repo).to.equal('bb')

  savor.promiseShouldFail(bundle.checkVersion(), done, (error) => {
    context.expect(error.message).to.equal('oops')
  })
}).

add('should check for the latest version', (context, done) => {
  const bundle = new Bundle({ id: "aa/bb" })

  context.replaceGetter(bundle, 'isCached', () => true)
  context.replaceGetter(bundle, 'github', () => ({
    repos: { getLatestRelease: () => Promise.resolve({ data: { tag_name: "1.0" } }) }
  }))

  savor.promiseShouldSucceed(bundle.initialize(), done, (id) => {
    context.expect(bundle.isReady).to.be.true
    context.expect(bundle.fullId).to.equal('aa/bb/1.0')
  })
}).

add('should check for the specific version', (context, done) => {
  const bundle = new Bundle({ id: "aa/bb/1.0" })
 
  context.replaceGetter(bundle, 'isCached', () => true)
  context.replaceGetter(bundle, 'github', () => ({
    repos: { getReleaseByTag: () => Promise.resolve() }
  }))

  savor.promiseShouldSucceed(bundle.initialize(), done, (id) => {
    context.expect(bundle.fullId).to.equal('aa/bb/1.0')
  })
}).

add('should initialize with a fresh environment', (context, done) => {
  const env = new Environment({ test: "test1234", homeDir: context.dir })
  const bundle = new Bundle({ id: "aa/bb/1.0"}, env)

  context.replaceGetter(bundle, 'isCached', () => true)
  context.replaceGetter(bundle, 'github', () => ({
    repos: { getReleaseByTag: () => Promise.resolve() }
  }))

  context.expect(bundle.env.props.test).to.equal('test1234')

  savor.promiseShouldSucceed(bundle.initialize(), done, (id) => {
    context.expect(bundle.fullId).to.equal('aa/bb/1.0')
  })
}).

add('should initialize with a ready environment', (context, done) => {
  const env = new Environment({ homeDir: context.dir })
  const bundle = new Bundle({ id: "aa/bb/1.0"}, env)

  context.replaceGetter(bundle, 'isCached', () => true)
  context.replaceGetter(bundle, 'github', () => ({
    repos: { getReleaseByTag: () => Promise.resolve() }
  }))

  savor.promiseShouldSucceed(env.initialize().then(() => bundle.initialize()), done, (id) => {
    context.expect(bundle.fullId).to.equal('aa/bb/1.0')
  })
}).

add('should not initialize if it is ready', (context, done) => {
  const bundle = new Bundle({ id: "aa/bb/1.0" })
  context.replaceGetter(bundle, 'isReady', () => true)
  context.expect(bundle.isCached).to.be.false

  savor.promiseShouldSucceed(bundle.initialize(), done, (id) => {
    context.expect(bundle.fullId).to.equal('aa/bb/1.0')
  })
}).

add('should not download if it is already cached', (context, done) => {
  const env = new Environment({ homeDir: context.dir })
  const bundle = new Bundle({ id: "aa/bb/1.0"}, env)

  context.replaceGetter(bundle, 'isCached', () => true)
  context.expect(bundle.cachedPath).to.equal(path.resolve(context.dir, 'bundles', "aa", "bb", "1.0"))
  context.replaceGetter(bundle, 'github', () => ({
    repos: { getReleaseByTag: () => Promise.resolve() }
  }))

  savor.promiseShouldSucceed(bundle.initialize(), done, (id) => {
    context.expect(bundle.fullId).to.equal('aa/bb/1.0')
  })
}).

add('should handle download errors', (context, done) => {
  const env = new Environment({ homeDir: context.dir })
  const bundle = new Bundle({ id: "aa/bb/1.0"}, env)

  context.replaceGetter(bundle, 'isCached', () => false)
  context.expect(bundle.cachedPath).to.equal(path.resolve(context.dir, 'bundles', "aa", "bb", "1.0"))
  context.expect(bundle.archiveUrl).to.equal(`https://github.com/aa/bb/archive/1.0.tar.gz`)
  const stub = context.stub(lali, 'link').callsFake(() => ({ install: () => Promise.reject(new Error('oops')) }))

  context.replaceGetter(bundle, 'github', () => ({ 
    repos: { getReleaseByTag: () => Promise.resolve() } 
  }))

  savor.promiseShouldSucceed(bundle.initialize(), done, () => {
    stub.restore()
    // Make sure the cached location was cleaned up
    context.expect(fs.existsSync(bundle.cachedPath)).to.be.false
  })
}).

add('should download if it is not cached', (context, done) => {
  const env = new Environment({ homeDir: context.dir })
  const bundle = new Bundle({ id: "aa/bb/1.0"}, env)

  context.replaceGetter(bundle, 'isCached', () => false)
  const stub = context.stub(lali, 'link').callsFake(() => ({ install: () => Promise.resolve() }))

  context.replaceGetter(bundle, 'github', () => ({
    repos: { getReleaseByTag: () => Promise.resolve() }
  }))

  savor.promiseShouldSucceed(bundle.initialize(), done, (id) => {
    stub.restore()
    context.expect(fs.existsSync(bundle.cachedPath)).to.be.true
    context.expect(bundle.fullId).to.equal('aa/bb/1.0')
  })
}).

add('should not load an unknown template', (context, done) => {
  const env = new Environment({ homeDir: context.dir })
  const bundle = new Bundle({ id: "aa/bb/1.0"}, env)

  context.replaceGetter(bundle, 'isCached', () => true)
  context.replaceGetter(bundle, 'github', () => ({ repos: { getReleaseByTag: () => Promise.resolve() }}))

  savor.promiseShouldSucceed(bundle.initialize(), done, (id) => {
    context.expect(bundle.hasTemplate('test')).to.be.false
    context.expect(bundle.loadTemplate('test')).to.not.exist
  })
}).

add('should not load a template with an unknown fixture', (context, done) => {
  const env = new Environment({ homeDir: context.dir })
  const bundle = new Bundle({ id: "aa/bb/0.9"}, env)

  savor.addAsset('assets/bundles', 'bundles', context)
  context.replaceGetter(bundle, 'isCached', () => true)
  context.replaceGetter(bundle, 'github', () => ({ repos: { getReleaseByTag: () => Promise.resolve() }}))

  savor.promiseShouldSucceed(bundle.initialize(), done, (id) => {
    context.expect(bundle.hasTemplate('personal')).to.be.true
    context.expect(bundle.hasTemplate('unknown')).to.be.false
    const template = bundle.loadTemplate('personal')
    context.expect(template).to.not.exist
  })
}).

add('should not generate a template with an unknown fixture', (context, done) => {
  const env = new Environment({ homeDir: context.dir })
  const bundle = new Bundle({ id: "aa/bb/0.9"}, env)

  savor.addAsset('assets/bundles', 'bundles', context)
  context.replaceGetter(bundle, 'isCached', () => true)
  context.replaceGetter(bundle, 'github', () => ({ repos: { getReleaseByTag: () => Promise.resolve() }}))

  savor.promiseShouldFail(bundle.generateFromTemplate('oops'), done, (error) => {
    context.expect(error.message).to.equal(Bundle.ERRORS.CANNOT_LOAD_TEMPLATE())
  })
}).

add('should load a known template', (context, done) => {
  const env = new Environment({ homeDir: context.dir })
  const bundle = new Bundle({ id: "aa/bb/1.0"}, env)

  savor.addAsset('assets/bundles', 'bundles', context)
  context.replaceGetter(bundle, 'isCached', () => true)
  context.replaceGetter(bundle, 'github', () => ({ repos: { getReleaseByTag: () => Promise.resolve() }}))

  savor.promiseShouldSucceed(bundle.initialize(), done, (id) => {
    context.expect(bundle.hasTemplate('personal')).to.be.true
    const template = bundle.loadTemplate('personal')
    context.expect(template).to.exist
    context.expect(template.props.id).to.equal('personal')
    context.expect(template.data).to.exist
  })
}).

run('[CLI] Bundle')
