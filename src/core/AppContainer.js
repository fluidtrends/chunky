import ErrorStackParser     from 'error-stack-parser'
import React, { Component } from 'react'
import { Provider }         from 'react-redux'
import DataStore            from '../data/store'
import * as Errors          from '../errors'

export default class AppContainer extends Component {

  constructor(props) {
    super(props)

    // Initialize the store with customer app reducers
    this.state = { store: DataStore(this.props.reducers) }
  }

  enableGlobalErrorHandler() {
    const self = this
    ErrorUtils.setGlobalHandler((e, isFatal) => {
      // Extract a meaningful stack trace
      const stack = ErrorStackParser.parse(e)

      // Notify the app that an error has occured
      self.setState({ error: e, isErrorFatal: isFatal, errorStack: stack })
    });
  }

  componentDidMount() {
    // this.enableGlobalErrorHandler()
  }

  render() {
    if (React.Children.count(this.props.children) !== 1) {
      throw new Errors.UNABLE_TO_LOAD_APP()
    }

    return (
      <Provider store={this.state.store}>
        { this.props.children }
      </Provider>
    )
  }
}
