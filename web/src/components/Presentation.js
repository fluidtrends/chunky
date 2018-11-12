import React from 'react'
import Component from '../core/Component'
import { renderResponsive } from '../utils/responsive'
import { Modal, Icon } from 'antd'
import Media from './Media'

export default class Presentation extends Component {

  constructor (props) {
    super(props)
    this.state = { ...this.state, modalVisible: false, videoPlaying: false }

    this._showModal = this.showModal.bind(this)
    this._hideModal = this.hideModal.bind(this)
  }


  componentDidMount () {
    super.componentDidMount()
  }

  showModal () {
    this.setState({ modalVisible: true, videoPlaying: true })
  }

  hideModal () {
    this.setState({ modalVisible: false, videoPlaying: false })
  }

  renderImage () {

    return renderResponsive('image', <img src={`/assets/${this.props.image}`} style={{
        width: '80vw',
        opacity: 0.5,
        boxShadow:' 0 5px 20px 0 rgba(0,0,0,.15)'
      }} />,
      <img src={`/assets/${this.props.image}`} style={{
        width: '700px',
        maxWidth: '90vw',
        opacity: 0.5,
        boxShadow:' 0 5px 20px 0 rgba(0,0,0,.15)'
      }} />
    )
  }

  renderThumbnail () {
    const fontSize = this.props.isSmallScreen? 40 : 70

    return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: "80px"}}>
      <div style={{width: '90vw', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        { this.renderImage() }
          <Icon onClick={this._showModal} type="play-circle" className='icon' theme="filled" style={{fontSize, position: 'absolute', cursor: 'pointer', background: 'transparent'}} />
          <style jsx>{`
              div :global(.icon) {
                color: ${'#546E7A'}
              }
              div :global(.icon):hover {
                color: ${'#00bcd4'}
              }
            `}
          </style>
      </div>
    </div>
  }

  renderModal() {
    const width = this.props.isSmallScreen? '80vw' : 1200
    const marginTop = this.props.isSmallScreen? 150 : 0
    const paddingTop = '56.25%'
    
    return <Modal centered cancelButtonProps={{shape: 'circle', type: 'danger'}} onCancel={this._hideModal} width={width} bodyStyle={{ paddingTop, marginTop }} footer={null} visible={this.state.modalVisible} >
      <Media video={this.props.url} width='100%' height='100%' style={{ position: 'absolute', top: 0, left: 0 }} playing={this.state.videoPlaying} />
    </Modal>
  }

  renderComponent () {

    return <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', padding: "50px", backgroundColor: this.props.backgroundColor }}>
      <div style={{ textAlign: 'center'}}>
          { this.renderThumbnail() }
          { this.renderModal() }
      </div>
    </div>
  }
}
