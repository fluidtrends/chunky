/* eslint-disable no-unused-expressions */

const { Octokit } = require('@octokit/rest')
const savor = require('savor')
const path = require('path')
const lali = require('lali')
const fs = require('fs-extra')
const { Bundle, Environment, Template } = require ('../../src')

savor.

add('should load a template from cache', (context, done) => {
  const env = new Environment({ homeDir: context.dir })
  const bundle = new Bundle({ id: "aa/bb/1.0"}, env)
  savor.addAsset('assets/bundles', 'bundles', context)
  const template = bundle.loadTemplate('personal')

  context.expect(template).to.exist
  context.expect(template.props.id).to.equal('personal')
  context.expect(template.data).to.exist

  done()
}).

add('should not generate without specified files', (context, done) => {
  savor.addAsset('assets/bundles', 'bundles', context)

  const env = new Environment({ homeDir: context.dir })
  const bundle = new Bundle({ id: "aa/bb/1.1"}, env)

  savor.promiseShouldFail(bundle.generateFromTemplate("personal", { name: "test1234" }), done, (error) => {
    context.expect(error.message).to.equal(Template.ERRORS.CANNOT_GENERATE('there are no files to be generated'))
  })
}).

add('should generate template files from scratch', (context, done) => {
  savor.addAsset('assets/bundles', 'bundles', context)

  const env = new Environment({ homeDir: context.dir })
  const bundle = new Bundle({ id: "aa/bb/1.0"}, env)

  bundle.generateFromTemplate("personal", { name: "test" })

  done()
}).

add('should generate but skip existing files', (context, done) => {
  savor.addAsset('assets/bundles', 'bundles', context)
  savor.addAsset('assets/chunky.json', 'chunky.json', context)

  const env = new Environment({ homeDir: context.dir })
  const bundle = new Bundle({ id: "aa/bb/1.0"}, env)

  bundle.generateFromTemplate("personal", { name: "test" })

  done()
}).

run('[CLI] Template')
