import React, { PureComponent } from 'react'
import uuid from 'uuid'
import { renderResponsive } from '../utils/responsive'

export default class Component extends PureComponent {

  constructor (props) {
    super(props)
    this._kind = `${this.constructor.name.toLowerCase()}`
    this._name = props.name || this.kind
    this._index = props.index || 0
    this._id = props.id || `${this.name}/${this.index}`// `chunky-${uuid.v1()}`
    this.triggerEvent = (event, data) => this.onEvent.bind(this, event, data)
  }

  onEvent (name = '', data) {
    this.props.onEvent && this.props.onEvent({
      component: { id: this.id, kind: this.kind, name: this.name, index: this.index },
      name,
      data,
      id: `${this.id}${name ? '/' + name : ''}`
    })
  }

  get index () {
    return this._index
  }

  get kind () {
    return this._kind
  }

  get name () {
    return this._name
  }

  get id () {
    return this._id
  }

  get width () {
    return this.props.width
  }

  get height () {
    return this.props.height
  }

  componentDidMount () {
  }

  componentWillAppear (callback) {
    callback()
  }

  componentDidAppear () {
  }

  componentDidEnter () {
  }

  componentDidLeave () {
  }

  componentWillUnmount () {
  }

  componentWillEnter (callback) {
    const el = this.container
    TweenMax.fromTo(el, 0.3, {y: 100, opacity: 0}, {y: 0, opacity: 1, onComplete: callback})
  }

  componentWillLeave (callback) {
    const el = this.container
    TweenMax.fromTo(el, 0.3, {y: 0, opacity: 1}, {y: -100, opacity: 0, onComplete: callback})
  }

  renderComponentCompact () {
    return this.renderComponent()
  }

  renderComponent () {
    return this.props.children
  }

  render () {
    return (<div style={styles.container} ref={c => this.container = c}>
      { renderResponsive(this.id, this.renderComponentCompact(), this.renderComponent()) }
    </div>)
  }
}

const styles = {
  container: {
  }
}
