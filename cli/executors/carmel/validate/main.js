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

const readFile = (file) => {
  try {
    const filepath = path.resolve(process.cwd(), file)
    const content = fs.readFileSync(filepath, 'utf8')
    const ext = path.extname(filepath)

    return (ext === '.json' ? JSON.parse(content) : content)
  } catch (e) {
  }
}

const utils = {
  readFile
}

describe("challenge", () => {
  var validate

  before(() => {
    try {
      validate = require(path.resolve(CARMEL.challenge.dir, `${CARMEL.taskIndex}.validate.js`))
    } catch (e) {
      console.log(e)
    }
  })

  after(() => {
  })

  it("task", (done) => {
    validate.main({
      chai,
      jsdom,
      enzyme,
      sinon,
      utils,
      dir: process.cwd(),
      expected: CARMEL.expected,
      challenge: CARMEL.challenge,
      taskIndex: CARMEL.taskIndex,
      done
    })
  })
})
