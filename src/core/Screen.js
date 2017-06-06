import React, { Component } from 'react'
import URL from 'url-parse'
import { diff } from 'deep-diff'

export default class Screen extends Component {

  constructor(props) {
    super(props)

    this.state = { transitioned: false }
  }

  componentDidMount() {
    this.props.retrieveDataOnMount && this.props.retrieveData()
  }

  componentWillMount() {
    for(const transitionName in this.props.transitions) {
      // Inject all transitions into this screen
      this.injectTransition(this.props.transitions[transitionName])
    }
  }

  injectTransition (transition) {
    // Let's actually perform the transition to the new route
    this.transitions = this.transitions || {}
    this.transitions[transition.name] = (data) => {
      if (this.state.triggered || !transition) {
        // We already transitioned, or this is an unknown transition
        return
      }
      
      if (transition.type === 'replace') {
        // We're replacing the previous route with this one
        this.setState({ triggered: true })
      }
      
      this[transition.type](transition.route, data)
    }
  }

  push(transition, data) {}
  replace(transition, data) {}
  onDataChanged(data) {}  
  onDataError(error) {}
  onDataDone(data) {}

  didValueChange(name, nextProps) {
    // Look at the old and new value
    const oldValue = nextProps[name]()
    const newValue = this.props[name]()

    // Check the differences
    const differences = diff(oldValue, newValue)

    // Determine whether it changed or not
    return differences
  }

  valueChanged(name, nextProps) {  
    // Look up the old and new values
    const oldValue = this.props[name]()
    const newValue = nextProps[name]()
    
    switch(name) {
      case 'hasData':
        this.onDataChanged(nextProps.data())
        break
      case 'hasDataError':
        newValue && this.onDataError(nextProps.dataError())
        break
      default:
        break
    }
  }

  observeValue(name, nextProps) {
    if (!this.didValueChange(name, nextProps)) {
      // This value did not change
      return
    }

    // Signal the fact that this value did change
    this.valueChanged(name, nextProps)
  }

  observeValues(names, nextProps) {
    // We want to observe all values for changes
    names.forEach(name => this.observeValue(name, nextProps))
  }

  componentWillReceiveProps(nextProps) {
    // Look through the observers, if any
    this.observeValues(['hasDataError', 'hasData'], nextProps)
  }
}
