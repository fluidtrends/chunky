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
          opacity: 1,
          height: this.props.style.height,
          width: this.props.innerWidth || '100vw'
        })
        if (!loading && this.props.innerHeight) {
          return <img height={this.props.innerHeight} src={src} alt={name} />
        }
        if (!loading && this.props.innerWidth) {
          return <img width={this.props.innerWidth} src={src} alt={name} />
        }
        return <img style={style} src={src} alt={name} />
      }}
    </ProgressiveImage>)
  }

  renderResponsiveImage (image) {
    if (!image) {
      return renderResponsive(
        'media',
        this.renderImage('', this.props.imageSmall? this.props.imageSmall: this.props.image, '/assets/placeholder.jpg'),
        this.renderImage('', this.props.image, '/assets/placeholder.jpg'))
    }

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

    if (this.props.image.split('http://').length > 1 ||
        this.props.image.split('https://').length > 1) {
      return this.renderResponsiveImage()
    }

    if (!this.props.image || !this.props.cache.image) {
      return <div />
    }

    const i = this.props.cache.image(`${this.props.image}`)
    return this.renderResponsiveImage(i)
  }
}
