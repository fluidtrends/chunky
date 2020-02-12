const { Command, Bundle } = require('../../src')
 
class _ extends Command {
  constructor(props) {
    super(props)
  }

  get requiredArgs() { return REQUIRED }
  get title() { return TITLE }

  get bundle() {
    return this._bundle
  }
  
  initialize() {
    // Let's create the appropriate bundle
    this._bundle = new Bundle({ id: this.args.bundle }, this.env)

    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  exec() {
    if (this.hasFile("chunky.json")) {
      return Promise.reject(new Error(_.ERRORS.ALREADY_EXISTS('product')))
    }

    // First let's ensure the bundle is ready for usage, then generate the product
    return this.bundle.initialize()
                      .then(() => this.bundle.generateFromTemplate(this.args.template, { name: this.args.name }))
  }
}

const REQUIRED = ['name', 'template', 'bundle']
const TITLE = "Creating a new product"

_.ERRORS = Object.assign({}, _.ERRORS, {

})

module.exports = _