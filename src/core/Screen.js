import React, { Component } from 'react'
import URL from 'url-parse'
import { diff } from 'deep-diff'
import { AllHtmlEntities} from 'html-entities'

export default class Screen extends Component {

  constructor(props) {
    super(props)

    this.state = { lastTransitionTimestamp: '',  visible: true }
    this._entities = new AllHtmlEntities()
    this._containerId = props["@"] ? props["@"].id : undefined
  }

  get entities() {
    return this._entities
  }

  get containerId () {
    return this._containerId
  }

  get isContainer() {
    return (this.containerId != undefined)
  }

  componentDidMount() {
    // Automatically attempt to retrieve the main data, if possible and if desired
    if (this.props.startOperationsOnMount && this.props.startOperation) {
      this.props.startOperation()
    }
  }

  componentWillMount() {
    for(const transitionName in this.props.transitions) {
      // Inject all transitions into this screen
      this.injectTransition(this.props.transitions[transitionName])
    }
  }

  componentWillUnmount() {
  }

  injectTransition (transition) {
    this.transitions = this.transitions || {}
    this.transitions[transition.name] = (data) => {
      this.transition(transition, data)
    }
  }

  injectBasicAuth(url) {
    if (!this.props.basicAuth) {
      return url
    }

    const urlRef = new URL(url)
    const protocol = urlRef.protocol
    const link = url.substring(protocol.length + 2)
    return `${protocol}//${this.props.basicAuth.username}:${this.props.basicAuth.password}@${link}`
  }

  transition(transition, data) {
    const timeSinceLastTransition = Date.now() - this.state.lastTransitionTimestamp
    if (this.state.lastTransitionTimestamp && timeSinceLastTransition < 500) {
      // Ignore transition
      return
    }

    // Turn off the progress
    if (this.state.progress) {
      this.setState({ progress: false })
    }

    // Timestamp this transition
    this.setState({ lastTransitionTimestamp: Date.now(), visible: false })
    this[`${transition.type.toLowerCase()}Transition`] && this[`${transition.type.toLowerCase()}Transition`](transition, { ...data, transition })
  }

  _operationDidFinish(name, data, operation, handler) {
    if ("string" !== typeof operation[handler]) {
      // We only handle simple handlers at the moment
      return
    }

    // Let's see what we have as a handler
    const parts = operation[handler].split(":")

    if (parts && parts.length === 2) {
      // Perform the transition
      const transition = `${parts[1].charAt(0).toUpperCase()}${parts[1].substring(1)}`
      this.transitions[`show${transition}`]({ [operation.flavor]: data })
      return
    }

    if (parts && parts.length === 1) {
      // Execute the specified operation
      this[operation[handler]] ? this[operation[handler]](data) : (this.props[operation[handler]] && this.props[operation[handler]](data))
    }
  }

  isForeignOperation(operation) {
    const foreign = (this.containerId !== operation.routeId)
    return foreign
  }

  operationDidFinish(name, data, error, operation) {
    if (operation && operation.onError && error && error[operation.flavor]) {
      return this._operationDidFinish(name, error[operation.flavor], operation, 'onError')
    }

    if (operation && operation.onSuccess && data && data[operation.flavor] && (!error || !error[operation.flavor])) {
      // The operation response is successful
      return this._operationDidFinish(name, data[operation.flavor], operation, 'onSuccess')
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  componentWillReceiveProps(nextProps) {
    const operation = this.props[`@${nextProps.action()}`]

    if (this.state.visible && operation && !this.isForeignOperation(operation) && this.props.isDataLoading() && nextProps.isDataLoaded()) {
      // Looks like an operation just finished, so let's trigger the callback
      this.operationDidFinish(nextProps.action(), nextProps.data(), nextProps.dataError(), operation)
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
    if (this.state.progress && this.renderProgress) {
      return this.renderProgress()
    }

    if (this.props.isDataLoading && this.props.isDataLoading() && this.renderDataLoading) {
      // We're loading the data still
      return this.renderDataLoading()
    }

    if (this.props.hasDataError && this.props.hasDataError() && this.renderDataError) {
      // Looks like there's an error that we need to handle
      return this.renderDataError(this.props.dataError())
    }

    if (this.props.hasData && !this.props.hasData()  && this.renderDataDefaults) {
      // This screen does not have any data to render
      return this.renderDataDefaults()
    }

    if (this.props.hasData && this.props.hasData() && this.renderData) {
      return this.renderData(this.props.data())
    }

    // This should not happen
    return this.renderDataError({ main: new Error('Could not render the data') })
  }
}
