import React, { PureComponent } from 'react'
import ProgressiveImage from 'react-progressive-image'
import ReactPlayer from 'react-player'
import { renderResponsive } from '../utils/responsive'

export default class Media extends PureComponent {

  constructor (props) {
    super(props)
  }

  renderImage (name, src, placeholder) {
    return (<ProgressiveImage src={src} placeholder={placeholder}>
      {(src, loading) => {
        const style = Object.assign({}, this.props.style, {
          opacity: loading ? 0.5 : 1,
          height: '100vh',
          width: '100vw'
        })
        return <img style={style} src={src} alt={name} />
      }}
    </ProgressiveImage>)
  }

  renderResponsiveImage (image) {
    return renderResponsive(
      image.id,
      this.renderImage(this.props.image, image.data.images[0].path, image.data.placeholder),
      this.renderImage(this.props.image, image.data.images[1].path, image.data.placeholder))
  }

  render () {
    if (this.props.video) {
      return (<ReactPlayer ref={(player) => { this.coverPlayer = player }} url={this.props.video} playing={this.props.playing}
        width='100vw'
        height='100vh' />)
    }

    if (!this.props.image || !this.props.cache.image) {
      return <div />
    }

    const i = this.props.cache.image(this.props.image)
    return this.renderResponsiveImage(i)
  }
}
