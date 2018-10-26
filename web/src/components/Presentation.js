import React from 'react'
import Component from '../core/Component'
import { renderResponsive } from '../utils/responsive'
import { Icon } from 'antd'

const introVideo = 'https://www.youtube.com/watch?v=qrHBVDbrOOY'

export default class Presentation extends Component {

  constructor (props) {
    super(props)
    this.state = { ...this.state }
  }

  componentDidMount () {
    super.componentDidMount()
  }

  renderImage() {
    return renderResponsive('image', <img src={`/assets/${this.props.image}`} style={{
        width: '80vw',
        boxShadow:' 0 5px 20px 0 rgba(0,0,0,.15)'
      }} />,
      <img src={`/assets/${this.props.image}`} style={{
        width: '600px',
        boxShadow:' 0 5px 20px 0 rgba(0,0,0,.15)'
      }} />
    ) 
  }

  renderThumbnail() {
    const fontSize = this.props.isSmallScreen? 30 : 60

    return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{opacity: 0.5, width: '90vw', height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        { this. renderImage() }
        <Icon className='icon' type="play-circle" theme="filled" style={{fontSize, position: 'absolute', cursor: 'pointer'}}/>
        <style jsx>{`
            div :global(.icon) {
              color: ${'#212121'}
            }
            div :global(.icon):hover {
              color: ${'#00bcd4'}
            }
          `}</style>
      </div>
    </div>
  }

  renderComponent () {
    return <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ marginTop: 75, height: 350, textAlign: 'center'}}>
          { this.renderThumbnail() }
          {/* <Media video={introVideo} width={650} height={350}/> */}
      </div>
    </div>
  }
}
