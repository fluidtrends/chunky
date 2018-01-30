import React from 'react'
import Component from '../core/Component'
import Text from './Text'
import { renderResponsive } from '../utils/responsive'
import Ionicon from 'react-ionicons'

import { Icon } from 'rmwc/Icon'
import { Button } from 'rmwc/Button'
import { Typography } from 'rmwc/Typography'

export default class Benefits extends Component {

  constructor (props) {
    super(props)
    this.state = { ...this.state }
  }

  componentDidMount () {
    super.componentDidMount()
  }

  text (name, index, total) {
    return renderResponsive('text',
      <Text source={name} style={{
        width: `90vw`,
        color: this.props.textColor
      }} />,
      <Text source={name} style={{
        width: `${80 / total}vw`,
        color: this.props.textColor
      }} />)
  }

  button () {
    return <div />
  }

  image (image, index, total) {
    return renderResponsive('image', <img src={`/assets/${image}`} style={{
      width: '90vw'
    }} />,
      <img src={`/assets/${image}`} style={{
        width: `${100 / total}vw`
      }} />)
  }

  renderBlock (block, index, total) {
    return <div
      key={`block${index}`}
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      { this.image(block.image, index, total) }
      { this.text(block.text, index, total) }
    </div>
  }

  renderBlocks (benefits, compact) {
    var index = 0
    var total = benefits.length
    return <div style={{
      color: this.props.textColor,
      position: 'relative',
      display: 'flex',
      flex: 1,
      flexDirection: (compact ? 'column' : 'row'),
      alignItems: (compact ? 'center' : 'flex-start'),
      backgroundColor: this.props.backgroundColor,
      justifyContent: 'center' }}>
      { benefits.map(b => this.renderBlock(b, index++, total)) }
    </div>
  }

  renderDefault (compact) {
    return this.renderBlocks(this.props.benefits, compact)
  }

  renderComponentCompact () {
    return this.renderDefault(true)
  }

  renderComponent () {
    return this.renderDefault()
  }
}
