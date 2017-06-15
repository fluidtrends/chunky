import * as Errors from '../errors'

export default class DataProvider {

  constructor(props) {
    this._props = this.parseProps(props)
  }

  parseProps(props) {
    return props
  }

  get props () {
    return this._props
  }
  
  operation(options) {
    if (!options) {
      // We require a type for each operation
      return Promise.reject(Errors.UNDEFINED_OPERATION())
    }
    
    // Let's check the type of operation we want to execute
    const type = options.type.toLowerCase()
    const executor = this[`${type}Operation`]

    if (!executor) {
      // Looks like we don't support such operation types
      return Promise.reject(Errors.UNDEFINED_OPERATION())
    }

    // We should be able to execute it now
    return executor(options.nodes || [], options.options || {}, options.props || {})
  }
}
