import React, { PureComponent } from 'react'
import Component from '../core/Component'
import Text from './Text'
import Media from './Media'
import Timer from './Timer'
import { Button } from 'rmwc/Button'
import { Typography } from 'rmwc/Typography'
import { Icon } from "antd"

import {
  Card,
  CardPrimaryAction,
  CardMedia,
  CardAction,
  CardActions,
  CardActionButtons,
  CardActionIcons
} from 'rmwc/Card';
import { relative } from 'path';


const periods = [
  {
    "until": "07 June 2018 00:00:00 PDT",
    "text": `Airdrop Live Now`
  }]

const purchasePeriods = [
  {
    "until": "07 July 2018 00:00:00 PDT",
    "text": `Pre Sale Starts in`
  }]

export default class Cover extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    super.componentDidMount()
  }

  renderDefaultContent() {
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
      {this.renderCoverTitle()}
      {this.renderCoverSubtitle()}
      {this.renderCoverAction()}
    </div>)
  }

  renderIcons() {
    if (!this.props.social) {
      return
    }

    const margin = this.props.isSmallScreen ? '0 0 5px 0' : '0 95px 35px 0'
    const align = this.props.isSmallScreen ? 'center' : 'flex-end'
    const { social } = this.props
    return <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', alignSelf: align, margin }}>
      {Object.keys(social).map(key => {
        return this.renderIcon(social[key], key)
      })}
    </div>
  }

  renderIcon(props, key) {
    const size = this.props.isSmallScreen ? 20 : 28

    return <div><Icon
      type={key}
      onClick={this.onLinkClick.bind(this, props.url)}
      className="icon"
      style={{
        cursor: "pointer",
        fontSize: size,
        padding: "10px"
      }}
    />
      <style jsx>{`
        div :global(.icon):hover {
          color: ${'#00bcd4'}
        }
      `}</style>
    </div>
  }

  onLinkClick(url) {
    window.open(url, '_blank')
  }

  renderIcoContent() {
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
      justifyContent: 'space-around',
      textAlign: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <div style={{ display: 'flex', flex: 1 }} />
      <div style={{
        display: 'flex',
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        {this.renderCoverTitle()}
        {this.renderCoverSubtitle()}
        {this.renderCoverTimeline()}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', flex: 2, justifyContent: 'space-around', width: '100%', padding: '0 50px' }}>
        {this.renderAirdropTimer()}
        {this.renderVideo()}
      </div>
      {this.renderIcons()}
    </div>)
  }

  renderCoverTitle() {
    if (!this.props.title) {
      return <div />
    }
    return <Typography use='display2' style={{ margin: '20px', color: this.props.color }}> {this.props.title} </Typography>
  }

  renderCoverTimeline() {
    const backgroundColor = "#00ACC1",
      textColor = "#ffffff"

    return <div style={{ maxWidth: 450, maxHeight: 300 }}>
      <Timer periods={purchasePeriods} textColor={textColor} simple actionTitle="Buy tokens" />
    </div>
  }

  renderIcoCoverTitle() {
    if (!this.props.title) {
      return <div />
    }
    return <Typography use='display1' style={{ margin: '20px', color: this.props.color }}> {this.props.title} </Typography>
  }

  renderCoverSubtitle() {
    if (!this.props.subtitle) {
      return <div />
    }
    return <Typography use='display1' style={{ margin: '20px', color: this.props.color }}> {this.props.subtitle} </Typography>
  }

  renderAirdropTimer() {
    if (this.props.isSmallScreen) {
      return <div />
    }

    const backgroundColor = "#00ACC1",
      textColor = "#ffffff"

    return <div style={{ border: '1px solid white', borderRadius: '2px', padding: 20, maxWidth: 450, maxHeight: 300 }}>
      <Timer periods={periods} textColor={textColor} simple actionTitle="Get your FREE tokens" />
    </div>
  }

  renderVideo() {
    if (this.props.isSmallScreen) {
      return <div />
    }

    const backgroundColor = "#00ACC1",
      textColor = "#ffffff"

    return <div style={{ padding: 20, width: 450, height: 300, position: 'relative' }}>
      <Media video={'https://www.youtube.com/watch?v=hUcMqblawDE&list=PL9YBPmbctP4izy3pLrev014nSlI9Cr6Se'} width={450} height={300} style={{ position: 'absolute', top: 0, left: 0 }} />
    </div>
  }

  renderCoverAction() {
    if (!this.props.primaryActionTitle) {
      return <div />
    }
    return <Button onClick={this.triggerEvent()} raised theme='secondary-bg text-primary-on-secondary'
      style={{ margin: '20px' }}> {this.props.primaryActionTitle} </Button>
  }

  get presentationHeight() {
    return 500
  }

  get simpleHeight() {
    return 300
  }

  get menuHeight() {
    return 68
  }

  renderSimpleContent(height, title) {
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
      <Typography use='display1' style={{ margin: '20px', color: this.props.color }}> {title} </Typography>
    </div>)
  }

  renderPresentationContent() {
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
      <Typography use='display2' style={{ margin: '20px', position: 'absolute', bottom: '-100px', color: this.props.color }}> {title} </Typography>
    </div>)
  }

  renderMedia(style, playing, innerHeight) {
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

  renderDefault(title) {
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
      {this.renderMedia(coverStyle, coverPlaying)}
      {this.renderDefaultContent()}
    </div>)
  }

  renderSimple(height, title) {
    const coverStyle = {
      width: '100%',
      backgroundColor: this.props.backgroundColor,
      height: `${height}px`,
      objectFit: 'cover',
      objectPosition: 'center center'
    }
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
      {this.renderMedia(coverStyle, coverPlaying)}
      {this.renderSimpleContent(height, title)}
    </div>)
  }

  renderPresentation() {
    const height = this.presentationHeight
    const coverStyle = {
      width: '100%',
      height: `${height}px`,
      backgroundColor: this.props.backgroundColor,
      objectFit: 'cover',
      objectPosition: 'center center'
    }
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
      {this.renderMedia(coverStyle, coverPlaying, `${height - 100}px`)}
      {this.renderPresentationContent()}
    </div>)
  }

  renderIco(title) {
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
      {this.renderMedia(coverStyle, coverPlaying)}
      {this.renderIcoContent()}
    </div>)
  }

  renderMenu() {
    return this.renderSimple(this.menuHeight)
  }

  get type() {
    return this.props.type || 'default'
  }

  render() {
    switch (this.type) {
      case 'presentation':
        return this.renderPresentation()
      case 'simple':
        return this.renderSimple(this.simpleHeight, this.props.title)
      case 'menu':
        return this.renderMenu()
      case 'ico':
        return this.renderIco(this.props.title)
      default:
        return this.renderDefault()
    }
  }
}
