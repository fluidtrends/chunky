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
      objectFit: 'cover',
      width: 220,
      height: 220,
      borderRadius: '50%',
      objectPosition: 'center center'
    }
    const props = Object.assign({}, this.props)
    delete props.video

    return (
      <CardMedia
        style={{
          backgroundColor: item.backgroundColor
        }}
      >
        <Media cache={this.props.cache} image={image} style={style} />
      </CardMedia>
    )
  }

  onLinkClick(url) {
    window.open(url, '_blank')
  }

  renderCard(item, index) {
    const { linkedIn, github, website } = item

    return (
      <Card
        style={{ width: '220px', height: '440px', margin: 20 }}
        key={`item${index}`}
      >
        {this.renderCardMedia(item)}
        <div style={{ padding: '0 1rem 1rem 1rem', textAlign: 'right' }}>
          <div
            style={{
              height: 140
            }}
          >
            <Typography use="title" tag="h2" style={{ textAlign: 'center' }}>
              {item.name}
            </Typography>
            <Typography use="title" tag="h3" style={{ textAlign: 'center' }}>
              {item.title}
            </Typography>
          </div>
          <div style={{ textAlign: 'center' }}>
            {github && (
              <ButtonIcon
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  this.onLinkClick(item.github)
                }}
              >
                <img src={this.props.githubIcon} />
              </ButtonIcon>
            )}
            {linkedIn && (
              <ButtonIcon
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  this.onLinkClick(item.linkedIn)
                }}
              >
                <img src={this.props.linkedinIcon} />
              </ButtonIcon>
            )}
            {website && (
              <ButtonIcon
                style={{ cursor: 'pointer' }}
                use="more_horiz"
                onClick={() => {
                  this.onLinkClick(item.website)
                }}
              />
            )}
          </div>
        </div>
      </Card>
    )
  }

  renderTeamMemebers(members) {
    var index = 0

    if (!members || members.length == 0) {
      return
    }

    return members.map(member => this.renderCard(member, index++))
  }

  renderSection(section, index) {
    return (
      <div
        key={'section' + index}
        style={{ padding: '0 1rem 1rem 1rem', textAlign: 'right' }}
      >
        <Typography use="display1" tag="h1">
          {section.title}
        </Typography>
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {this.renderTeamMemebers(section.members)}
        </div>
      </div>
    )
  }

  renderTeamSections() {
    var index = 0
    return this.props.sections.map((section, index) =>
      this.renderSection(section, index)
    )
  }

  renderSections() {
    return (
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexWrap: 'wrap',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {this.renderTeamSections()}
      </div>
    )
  }

  renderComponent() {
    if (!this.props.sections) {
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
        {this.renderSections()}
      </div>
    )
  }
}