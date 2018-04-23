import React, { PureComponent } from 'react'
import Component from '../core/Component'
import Text from './Text'
import Media from './Media'
import { Icon } from 'rmwc/Icon'
import { Button } from 'rmwc/Button'
import { Typography } from 'rmwc/Typography'

export default class Cover extends Component {

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    super.componentDidMount()
  }

  renderDefaultContent () {
    if (this.props.video) {
      return <div />
    }

    return (<div style={{
      position: 'absolute',
      backgroundColor: `rgba(0,0,0,${this.props.opacity})`,
      width: '100vw',
      height: '100vh',
      top: 0,
      left: 0,
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      { this.renderCoverTitle() }
      { this.renderCoverSubtitle() }
      { this.renderCoverAction() }
    </div>)
  }

  renderCoverTitle () {
    if (!this.props.title) {
      return <div />
    }
    return <Typography use='display2' style={{margin: '20px', color: this.props.color}}> {this.props.title} </Typography>
  }

  renderCoverSubtitle () {
    if (!this.props.subtitle) {
      return <div />
    }
    return <Typography use='display1' style={{margin: '20px', color: this.props.color}}> {this.props.subtitle} </Typography>
  }

  renderCoverAction () {
    if (!this.props.primaryActionTitle) {
      return <div />
    }
    return <Button onClick={this.triggerEvent()} raised theme='secondary-bg text-primary-on-secondary'
      style={{margin: '20px'}}> {this.props.primaryActionTitle} </Button>
  }

  renderDownArrow () {
    return <div style={{
      bottom: '10px',
      position: 'absolute',
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Icon style={{fontSize: '30px'}} use='keyboard_arrow_down' />
    </div>
  }

  get presentationHeight () {
    return 500
  }

  get simpleHeight () {
    return 300
  }

  get menuHeight () {
    return 68
  }

  renderSimpleContent (height, title) {
    return (<div style={{
      position: 'absolute',
      backgroundColor: `rgba(0,0,0,${this.props.opacity})`,
      width: '100vw',
      height: `${height}px`,
      top: 0,
      left: 0,
      display: 'flex',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <Typography use='display1' style={{margin: '20px', color: this.props.color}}> {title} </Typography>
    </div>)
  }

  renderPresentationContent () {
    const title = this.props.title
    return (<div style={{
      position: 'absolute',
      width: '100vw',
      display: 'flex',
      top: `${this.presentationHeight - this.menuHeight - 20}`,
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
      flexDirection: 'column'
    }}>
      <Typography use='display2' style={{margin: '20px', position: 'absolute', bottom: '-100px', color: this.props.color}}> {title} </Typography>
    </div>)
  }

  renderMedia (style, playing, innerHeight) {
    if (!this.props.image && !this.props.video) {
      return <div />
    }

    return <Media
      cache={this.props.cache}
      video={this.props.video}
      image={this.props.image}
      imageSmall={this.props.imageSmall}
      playing={playing}
      innerHeight={innerHeight}
      style={style} />
  }

  renderDefault (title) {
    const height = this.props.height
    const coverStyle = { width: '100%', height: `${height}px`, objectFit: 'cover', objectPosition: 'center center' }
    const coverPlaying = (this.props.scroll < 200)

    return (<div style={{
      backgroundColor: this.props.backgroundColor,
      marginTop: `${this.props.offset}px`,
      height: `${height}px`,
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      { this.renderMedia(coverStyle, coverPlaying) }
      { this.renderDefaultContent() }
    </div>)
  }

  renderSimple (height, title) {
    const coverStyle = {
      width: '100%',
      backgroundColor: this.props.backgroundColor,
      height: `${height}px`,
      objectFit: 'cover',
      objectPosition: 'center center' }
    const coverPlaying = (this.props.scroll < 200)

    return (<div style={{
      backgroundColor: this.props.backgroundColor,
      marginTop: `${this.props.offset}px`,
      height: `${height}px`,
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      { this.renderMedia(coverStyle, coverPlaying) }
      { this.renderSimpleContent(height, title) }
    </div>)
  }

  renderPresentation () {
    const height = this.presentationHeight
    const coverStyle = {
      width: '100%',
      height: `${height}px`,
      backgroundColor: this.props.backgroundColor,
      objectFit: 'cover',
      objectPosition: 'center center' }
    const coverPlaying = (this.props.scroll < 200)

    return (<div style={{
      backgroundColor: this.props.backgroundColor,
      marginTop: `${this.props.offset}px`,
      height: `${height + 2}px`,
      display: 'flex',
      overflow: 'hidden',      
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      { this.renderMedia(coverStyle, coverPlaying, `${height - 100}px`) }
      { this.renderPresentationContent() }
    </div>)
  }

  renderMenu () {
    return this.renderSimple(this.menuHeight)
  }

  get type () {
    return this.props.type || 'default'
  }

  render () {
    switch (this.type) {
      case 'presentation':
        return this.renderPresentation()
      case 'simple':
        return this.renderSimple(this.simpleHeight, this.props.title)
      case 'menu':
        return this.renderMenu()
      default:
        return this.renderDefault()
    }
  }
}
