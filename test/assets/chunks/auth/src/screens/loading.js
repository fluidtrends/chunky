import React, { Component } from 'react'

export default class LoadingScreen extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.retrieveAuthToken()
  }

  render() {
    if (this.props.hasCachedAuthTokenError()) {
      return (<div>
          <h1> Error: { this.props.hasCachedAuthTokenError() } </h1>
          </div>)
    }

    if (this.props.hasAuthTokenError()) {
      return (<div>
          <h1> Error: { this.props.hasAuthTokenError() } </h1>
          </div>)
    }

    if (this.props.hasCachedAuthToken()) {
      return (<div>
          <h1> Token: { this.props.getCachedAuthToken().token } </h1>
          </div>)
    }

    if (this.props.hasAuthToken()) {
      return (<div>
          <h1> Token: { this.props.getAuthToken() } </h1>
          </div>)
    }

    return (<div>
        <h1> Test </h1>
        </div>)
  }
}
