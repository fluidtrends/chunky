/* eslint-disable no-unused-expressions */

const savor = require('savor')
const { Init } = require('../../commands')
const { Environment, Bundle } = require ('../../src')
const fs = require('fs-extra')

savor.

add('should make sure it expects required args', (context, done) => {
  const cmd = new Init()

  context.expect(cmd.requiredArgs[0]).to.equal('name')
  context.expect(cmd.requiredArgs[1]).to.equal('template')
  context.expect(cmd.requiredArgs[2]).to.equal('bundle')
  
  done()
}).

add('should make sure it does not run without a name', (context, done) => {
  const cmd = new Init({ env: { homeDir: context.dir }})

  savor.promiseShouldFail(cmd.run(), done, (error) => {
      context.expect(error.message).to.equal(Init.ERRORS.MISSING_ARG("name"))
  })
}).

add('should make sure it does not run without a template', (context, done) => {
  const cmd = new Init({ env: { homeDir: context.dir }})

  savor.promiseShouldFail(cmd.run({ name: "test" }), done, (error) => {
      context.expect(error.message).to.equal(Init.ERRORS.MISSING_ARG("template"))
  })
}).

add('should make sure it does not run without a bundle', (context, done) => {
  const cmd = new Init({ env: { homeDir: context.dir }})

  savor.promiseShouldFail(cmd.run({ name: "test", template: "test" }), done, (error) => {
      context.expect(error.message).to.equal(Init.ERRORS.MISSING_ARG("bundle"))
  })
}).

add('should not create if it already exists', (context, done) => {
  const cmd = new Init({ env: { homeDir: context.dir }})
  const stub = context.stub(cmd, "hasFile").callsFake(() => true)

  savor.promiseShouldFail(cmd.run({ 
            name: "test", 
            template: "test", 
            bundle: "test" }), done, (error) => {
      stub.restore()
      context.expect(error.message).to.equal(Init.ERRORS.ALREADY_EXISTS('product'))
  })
}).

add('should not create if the environment is not ready', (context, done) => {
  const cmd = new Init({ env: { test: "test", homeDir: context.dir }})
  const stub = context.stub(fs, "existsSync").callsFake(() => false)
  savor.promiseShouldFail(cmd.run({ 
            name: "test", 
            template: "test", 
            bundle: "test" }), done, (error) => {
      stub.restore()

      context.expect(cmd.title).to.equal('Creating a new product')
      context.expect(cmd.env.props.test).to.equal('test')
      context.expect(cmd.env.homeDir).to.equal(context.dir)
      context.expect(error.message).to.equal(Environment.ERRORS.NOT_READY())
  })
}).

add('should create with a ready environment', (context, done) => {
  savor.addAsset('assets/bundles', 'bundles', context)

  const cmd = new Init({ env: { test: "test", homeDir: context.dir }})
  const bundle = new Bundle({ id: "aa/bb/1.0"}, cmd.env)

  context.expect(cmd.bundle).to.not.exist
  context.replaceGetter(bundle, 'isCached', () => true)
  context.replaceGetter(bundle, 'github', () => ({
    repos: { getReleaseByTag: () => Promise.resolve() }
  }))
  context.replaceGetter(cmd, 'bundle', () => bundle)
  context.expect(cmd.bundle.id).to.equal(bundle.id)

  savor.promiseShouldSucceed(cmd.run({ 
    name: "test", 
    template: "personal", 
    bundle: "aa/bb/1.0" }), done, (error) => {
  })
}).

run('[CLI] init command')
