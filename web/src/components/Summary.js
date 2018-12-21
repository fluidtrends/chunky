import React from 'react'
import Component from '../core/Component'
import Text from './Text'
import { renderResponsive } from '../utils/responsive'
import AnimatedWrapper from './AnimatedWrapper'
export default class Summary extends Component {
  constructor(props) {
    super(props)
    this.state = { ...this.state }
  }

  componentDidMount() {
    super.componentDidMount()
  }

  renderText() {
    return renderResponsive(
      'text',
      <Text
        source={this.props.text}
        style={{
          width: `90vw`,
          padding: '10px',
          paddingBottom: '60px'
        }}
      />,
      <Text
        source={this.props.text}
        style={{
          width: `70vw`,
          paddingBottom: '60px'
        }}
      />
    )
  }

  renderImg() {
    if (!this.props.image) return null
    const imageAdditionalStyle = this.props.imageStyle
      ? this.props.imageStyle
      : {}
    return (
      <img
        src={`/assets/${this.props.image}`}
        style={{
          width: '200px',
          marginTop: '20px',
          marginBottom: '-20px',
          ...imageAdditionalStyle
        }}
      />
    )
  }

  renderAnimation() {
    return (
      <AnimatedWrapper {...this.props}>
        <div
          style={{
            color: this.props.textColor,
            position: 'relative',
            padding: '60px 0',
            display: 'flex',
            padding: '40px 0',
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {this.renderImg()}
          {this.renderText()}
        </div>
      </AnimatedWrapper>
    )
  }

  renderWrapper() {
    return (
      <div
        style={{
          color: this.props.textColor,
          position: 'relative',
          padding: '60px 0',
          display: 'flex',
          padding: '40px 0',
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {this.renderImg()}
        {this.renderText()}
      </div>
    )
  }
  renderComponent() {
    if (this.props.animation) {
      return this.renderAnimation()
    }
    return (
      <div
        style={{
          color: this.props.textColor,
          position: 'relative',
          padding: '60px 0',
          display: 'flex',
          padding: '40px 0',
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {this.renderImg()}
        {this.renderText()}
      </div>
    )
  }
}
