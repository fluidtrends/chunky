import React from 'react'

export default class AnimatedWrapper extends React.PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    const { animationOptions, animationType, children } = this.props
    if (animationType === 'zoom') {
      const Zoom = require('react-reveal/Zoom')

      return <Zoom {...animationOptions}>{children}</Zoom>
    } else if (this.props.animationType === 'bounce') {
      const Bounce = require('react-reveal/Bounce')
      return <Bounce {...animationOptions}>{children}</Bounce>
    } else if (this.props.animationType === 'fade') {
      const Fade = require('react-reveal/Fade')
      return <Fade {...animationOptions}>{children}</Fade>
    } else if (this.props.animationType === 'flip') {
      const Flip = require('react-reveal/Flip')
      return <Flip {...animationOptions}>{children}</Flip>
    } else if (this.props.animationType === 'rotate') {
      const Rotate = require('react-reveal/Rotate')
      return <Rotate {...animationOptions}>{children}</Rotate>
    } else if (this.props.animationType === 'slide') {
      const Slide = require('react-reveal/Slide')
      return <Slide {...animationOptions}>{children}</Slide>
    } else if (this.props.animationType === 'roll') {
      const Roll = require('react-reveal/Roll')
      return <Roll {...animationOptions}>{children}</Roll>
    } else if (this.props.animationType === 'lightspeed') {
      const LightSpeed = require('react-reveal/LightSpeed')
      return <LightSpeed {...animationOptions}>{children}</LightSpeed>
    }
  }
}
