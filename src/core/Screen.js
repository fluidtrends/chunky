import React, { Component } from 'react'
import URL                  from 'url-parse'

export default class Screen extends Component {

  constructor(props) {
    super(props)

    this.state = { transitioned: false }
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
  onData(name, data) {}  
  onDataError(type, error) {}

  didValueChange(name, nextProps) {
    // Look at the old and new value
    const oldValue = nextProps[name]()
    const newValue = this.props[name]()

    // Determine whether it changed or not
    return (oldValue != newValue)
  }

  valueChanged(name, oldValue, newValue, nextProps) {  
    if (typeof oldValue === 'boolean') {
      const value = `${newValue}`.substring(0, 1).toUpperCase() + `${newValue}`.substring(1).toLowerCase()
      this[`${name}On${value}`] && this[`${name}On${value}`](nextProps)
      
      if (name.endsWith("HasError") && newValue) {
        const chunkName = name.slice(0, -8)
        this.onDataError(chunkName, nextProps[`${chunkName}Error`]())
      }
    }

    if (name.endsWith("HasData")) {
      const chunkName = name.slice(0, -7)
      this[`${name}OnChanged`] && this[`${name}OnChanged`](oldValue, newValue, nextProps)
      const data = nextProps[`${chunkName}Data`]()
      data && this.onData(chunkName, data)
    }
  }

  observeValue(name, nextProps) {
    if (!this.didValueChange(name, nextProps)) {
      // This value did not change
      return
    }

    // Look up the old and new values
    const oldValue = this.props[name]()
    const newValue = nextProps[name]()

    // Signal the fact that this value did change
    this.valueChanged(name, oldValue, newValue, nextProps)
  }

  observeValues(names, nextProps) {
    // We want to observe all values for changes
    names.forEach(name => this.observeValue(name, nextProps))
  }

  componentWillReceiveProps(nextProps) {
    // Look through the observers, if any
    this.props.chunky.observers && this.observeValues(this.props.chunky.observers, nextProps)
  }
}
