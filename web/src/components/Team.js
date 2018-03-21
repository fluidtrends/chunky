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

export default class Team extends Component {
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
          padding: '10px'
        }}
      />,
      <Text
        source={this.props.text}
        style={{
          width: `70vw`,
          paddingBottom: '10px'
        }}
      />
    )
  }

  renderCardMedia(item) {
    const image = item.image

    if (!image) {
      return <div />
    }

    const style = {
      alignSelf: 'center',
      width: '220px',
      height: '70px',
      objectFit: 'cover',
      objectPosition: 'center center'
    }
    const innerWidth = '220px'
    const props = Object.assign({}, this.props)
    delete props.video

    return (
      <CardMedia
        style={{
          backgroundColor: item.backgroundColor
        }}
      >
        <Media
          cache={this.props.cache}
          image={image}
          innerWidth={innerWidth}
          style={style}
        />
      </CardMedia>
    )
  }

  onLinkClick(url) {
    window.open(url, '_blank')
  }

  renderCard(item, index) {
    const { linkedIn, github } = item

    return (
      <Card style={{ width: '220px', margin: 20 }} key={`item${index}`}>
        {this.renderCardMedia(item)}
        <div style={{ padding: '0 1rem 1rem 1rem', textAlign: 'right' }}>
          <Typography use="title" tag="h2">
            {item.name}
          </Typography>
          <Typography
            style={{ textAlign: 'center', minHeight: 70 }}
            use="title"
            tag="h3"
          >
            {item.title}
          </Typography>
          <div style={{ textAlign: 'center' }}>
            {github && (
              <Button
                onClick={() => {
                  this.onLinkClick(item.github)
                }}
              >
                <img src={this.props.githubIcon} />
              </Button>
            )}
            {linkedIn && (
              <Button
                onClick={() => {
                  this.onLinkClick(item.linkedIn)
                }}
              >
                <img src={this.props.linkedinIcon} />
              </Button>
            )}
          </div>
        </div>
      </Card>
    )
  }

  renderTeamMemebers() {
    var index = 0
    return this.props.members.map(member => this.renderCard(member, index++))
  }

  renderTeam() {
    return (
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexWrap: 'wrap',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'center'
        }}
      >
        {this.renderTeamMemebers()}
      </div>
    )
  }

  renderComponent() {
    if (!this.props.members) {
      return <div />
    }

    return (
      <div
        style={{
          color: this.props.textColor,
          position: 'relative',
          display: 'flex',
          flex: 1,
          paddingTop: '20px',
          paddingBottom: '50px',
          backgroundColor: this.props.backgroundColor,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {this.renderText()}
        {this.renderTeam()}
      </div>
    )
  }
}
