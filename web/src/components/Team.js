import React from 'react'
import Component from '../core/Component'
import Text from './Text'
import { renderResponsive } from '../utils/responsive'
import { Typography } from 'rmwc/Typography'
import { Icon } from 'rmwc/Icon'
import { Chip, ChipText, ChipIcon, ChipSet } from 'rmwc/Chip'
import { Button, ButtonIcon } from 'rmwc/Button'
import { LinearProgress } from 'rmwc/LinearProgress'
import moment from 'moment'
import {
  Card,
  CardMedia,
  CardMediaItem,
  CardPrimary,
  CardTitle,
  CardActions,
  CardActionButtons,
  CardAction,
  CardPrimaryAction,
  CardActionIcons,
  CardSubtitle,
  CardSupportingText,
  CardHorizontalBlock
} from 'rmwc/Card'
import Media from './Media'

export default class Timer extends Component {

  constructor (props) {
    super(props)
    this.state = { ...this.state }
  }

  componentDidMount () {
    super.componentDidMount()
  }

  renderText () {
    return renderResponsive('text',
      <Text source={this.props.text} style={{
        width: `90vw`,
        padding: '10px'
      }} />,
      <Text source={this.props.text} style={{
        width: `70vw`,
        paddingBottom: '10px'
      }} />)
  }

  renderCardMedia (item) {
    const image = item.image

    if (!image) {
      return <div />
    }

    const style = {
      alignSelf: 'center',
      width: '320px',
      height: '170px',
      objectFit: 'cover',
      objectPosition: 'center center'
    }
    const innerWidth = '320px'
    const props = Object.assign({}, this.props)
    delete props.video

    return <CardMedia style={{
      backgroundColor: item.backgroundColor
    }}>
      <Media
        cache={this.props.cache}
        image={image}
        innerWidth={innerWidth}
        style={style} />
    </CardMedia>
  }

  onLinkClick (url) {
    window.open(url, '_blank')    
  }

  renderMember (member, index) {
    return <Card style={{width: '340px', margin: 20}} key={`item${index}`}>
      <Button onClick={() => this.onLinkClick(member.linkedIn)} style={{padding: 0, height: '100%', cursor: 'pointer'}}>
        { this.renderCardMedia(member) }
      </Button>
      <div style={{padding: '0 1rem 1rem 1rem'}}>
        <Icon></Icon>
        <Typography use='title' tag='h2'>{ member.name }</Typography>
        <Typography style={{textAlign: 'center'}} use='title' tag='h3'>{ member.title }</Typography>
      </div>
    </Card>
  }

  renderTeamMembers () {
    var index = 0
    return this.props.members.map(member => this.renderMember(member, index++))
  }

  renderTeam () {
    return <div
      style={{
        display: 'flex',
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center'
      }}>
      { this.renderTeamMembers() }
    </div>
  }

  renderComponent () {
    if (!this.props.members) {
      return (<div />)
    }

    return <div style={{
      color: this.props.textColor,
      position: 'relative',
      display: 'flex',
      flex: 1,
      paddingTop: '20px',
      paddingBottom: '50px',
      backgroundColor: this.props.backgroundColor,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center' }}>
      { this.renderText() }
      { this.renderTeam() }
    </div>
  }
}
