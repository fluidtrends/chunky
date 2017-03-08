import React, { Component } from 'react'

export default class Screen extends Component {

  didValueChange(name, nextProps) {
    const oldValue = nextProps[name]()
    const newValue = this.props[name]()

    return (oldValue != newValue)
  }

  valueChanged(name, oldValue, newValue, nextProps) {
    if (typeof oldValue === 'boolean') {
      const value = `${newValue}`.substring(0, 1).toUpperCase() + `${newValue}`.substring(1).toLowerCase()
      this[`${name}On${value}`] && this[`${name}On${value}`](nextProps)
    }

    this[`${name}OnChanged`] && this[`${name}OnChanged`](oldValue, newValue, nextProps)
  }

  observeValue(name, nextProps) {
    if (!this.didValueChange(name, nextProps)) {
      return
    }

    const oldValue = this.props[name]()
    const newValue = nextProps[name]()

    this.valueChanged(name, oldValue, newValue, nextProps)
  }

  observeValues(names, nextProps) {
    names.forEach(name => this.observeValue(name, nextProps))
  }

  componentWillReceiveProps(nextProps) {
    // Look through the observers, if any
    this.props.chunky.observers && this.observeValues(this.props.chunky.observers, nextProps)
  }
}
