import React, { Component } from 'react'
import URL from 'url-parse'
import { diff } from 'deep-diff'

export default class Screen extends Component {

  constructor(props) {
    super(props)

    this._onRetryRetrieveData = this.onRetryRetrieveData.bind(this)
    this._onCancelRetrieveData = this.onCancelRetrieveData.bind(this)

    this.state = { lastTransitionTimestamp: '',  visible: true }
  }

  componentDidMount() {
    // Automatically attempt to retrieve the main data, if possible and if desired
    this.props.startOperationsOnMount && this.props.startOperation && this.props.startOperation()
  }

  componentWillMount() {
    for(const transitionName in this.props.transitions) {
      // Inject all transitions into this screen
      this.injectTransition(this.props.transitions[transitionName])
    }
  }

  injectTransition (transition) {
    this.transitions = this.transitions || {}
    this.transitions[transition.name] = (data) => {
      this[`${transition.type.toLowerCase()}Transition`](transition.route, data)
    }
  }

  pushTransition(transition, data) {
    const timeSinceLastTransition = Date.now() - this.state.lastTransitionTimestamp
    if (this.state.lastTransitionTimestamp && timeSinceLastTransition < 500) {
      // Ignore transition
      return
    }

    // Timestamp this transition
    this.setState({ lastTransitionTimestamp: Date.now(), visible: false })
  }

  get isVisible() {
    return this.state.visible
  }

  replaceTransition(transition, data) {
    // TODO fix replace issue
    this.pushTransition(transition, data)
  }

  onRetryRetrieveData() {
    this.props.retrieveData && this.props.retrieveData()
  }

  onCancelRetrieveData() {
    // TODO: handle cancellation
  }

  operationDidFinish(data, error) {
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.isVisible
  }

  componentWillReceiveProps(nextProps) {
    if (this.isVisible && this.props.isDataLoading() && nextProps.isDataLoaded()) {
      // Looks like an operation just finished, so let's trigger the callback
      this.operationDidFinish(nextProps.data(), nextProps.dataError())
    }
  }

  renderDataError({ main }) {
    throw new Error('Chunky says: implement renderDataError in your route.')
  }

  renderDataLoading() {
    throw new Error('Chunky says: implement renderDataLoading in your route.')
  }

  renderDataDefaults() {
    throw new Error('Chunky says: implement renderDataDefaults in your route.')    
  }

  renderData() {
    throw new Error('Chunky says: implement renderData in your route.')    
  }

  render() {
    if (this.props.isDataLoading() && this.renderDataLoading) {
      // We're loading the data still
      return this.renderDataLoading()
    }

    if (this.props.hasDataError() && this.renderDataError) {
      // Looks like there's an error that we need to handle
      return this.renderDataError(this.props.dataError())
    }
    
    if (!this.props.hasData() && this.renderDataDefaults) {
      // This screen does not have any data to render
      return this.renderDataDefaults()
    }

    if (this.props.hasData() && this.renderData) {
      return this.renderData(this.props.data())
    }

    // This should not happen
    return this.renderDataError({ main: new Error('Could not render the data') })
  }
}
