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
      <Typography use='display2' style={{margin: '20px'}}> {this.props.title} </Typography>
      <Typography use='display1' style={{margin: '20px'}}> {this.props.subtitle} </Typography>
      <Button onClick={this.triggerEvent()} raised style={{margin: '20px'}}> {this.props.primaryActionTitle} </Button>
      <div style={{
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
    </div>)
  }

  get simpleHeight () {
    return 200
  }

  get menuHeight () {
    return 68
  }

  renderSimpleContent (title) {
    return (<div style={{
      position: 'absolute',
      width: '100vw',
      height: `${this.simpleHeight}px`,
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

  renderMedia (style, playing) {
    if (!this.props.image && !this.props.video) {
      return <div />
    }

    return <Media
      cache={this.props.cache}
      video={this.props.video}
      image={this.props.image}
      playing={playing}
      style={style} />
  }

  renderDefault () {
    const coverStyle = { width: '100%', height: '100vh', objectFit: 'cover', objectPosition: 'center center' }
    const coverPlaying = (this.props.scroll < 200)
    const midY = (this.props.height / 2)
    const height = this.props.height

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
    const coverStyle = { width: '100%', height: '100vh', objectFit: 'cover', objectPosition: 'center center' }
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
      { this.renderSimpleContent(title) }
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
      case 'simple':
        return this.renderSimple(this.simpleHeight, this.props.title)
      case 'menu':
        return this.renderMenu()
      default:
        return this.renderDefault()
    }
  }
}
