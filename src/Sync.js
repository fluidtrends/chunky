const _services = require('./services')
const tasks = require('./tasks')
const Product = require('./Product')

class _ {
    constructor(props) {
        this._props = props
    }
 
    get props() {
        return this._props
    }

    get services () {
        return _services
    }

    get dashboard() {
       return this._dashboard
    }

    get products() {
        return this._products
    }

    get product() {
        return this._product
    }

    async load() {
        return Promise.all(Object.keys(_services).map(name => _services[name].init()))
                      .then(() => this._dashboard = this.services.google.sheet(process.env.CHUNKY_GOOGLE_SHEET_ID))
                      .then(() => this.dashboard.rows(`Products!A4:J104`))
                      .then((products) => products.map(product => {
                         const [id, name, repo, spreadsheetId] = product 
                         return new Product({ id, name, repo, spreadsheetId }, this.services)
                      }))
                      .then((products) => this._products = products)
                      .then(() => Promise.all(this.products.map(p => p.load())))
    }

    async run({ task, productName }) {
        if (!task || !tasks[task]) {
            throw new Error('Task is required')            
        }

        if (!productName) {
            throw new Error('Product is required')            
        }

        await this.load()
        
        this._product = this.products.find(p => p.name.toLowerCase() === productName.toLowerCase())

        return tasks[task](this)
    }
}

module.exports = _