const { Command, Product } = require('../..')
 
class _ extends Command {
  constructor(props) {
    super(props)
  }

  get requiredArgs() { return REQUIRED }
  get title() { return TITLE }

  // get bundle() {
  //   return this._bundle
  // }

  get product() {
    return this._product
  }
  
  initialize() {
    this._product = new Product({ name: this.args.name }, this.env)

    return new Promise((resolve, reject) => {
      resolve()
    })
  }

  exec() {
    if (this.hasFile("chunky.json")) {
      return Promise.reject(new Error(_.ERRORS.ALREADY_EXISTS('product')))
    }

    return this.product.generate(this.args)
 }
}

const REQUIRED = ['name', 'template', 'bundle']
const TITLE = "Creating a new product"

_.ERRORS = Object.assign({}, _.ERRORS, {

})

module.exports = _