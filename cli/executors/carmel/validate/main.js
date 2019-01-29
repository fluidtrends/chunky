const fs = require('fs-extra')
const path = require('path')
const deepmerge = require('deepmerge')

const jsdom = require('jsdom')
const chai = require('chai')
const enzyme = require('enzyme')
const chaiAsPromised = require('chai-as-promised')
const chaiEnzyme = require('chai-enzyme')
const sinon = require('sinon')
const Adapter = require('enzyme-adapter-react-16')

chai.use(chaiEnzyme())
chai.use(chaiAsPromised)
enzyme.configure({ adapter: new Adapter() })

global.chai = chai
global.jsdom = jsdom
global.enzyme = enzyme
global.sinon = sinon

describe("challenge", () => {
  var validate
  var init

  before((done) => {
    try {
      init = require(path.resolve(carmel.challenge.content.dir, `init.js`))
      validate = require(path.resolve(carmel.challenge.content.dir, `${carmel.challenge.state.taskIndex}.validate.js`))
      done()
    } catch (e) {
      console.log(e)
      done(new Error("Cannot initialize the challenge"))
    }
  })

  after(() => {
  })

  it("task", (done) => {
    init(carmel)
        .then((args) => validate(done, args))
        .catch((error) => done(error))
  })
})
