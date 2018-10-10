import React from 'react'

import { Typography } from '@rmwc/typography'
import { Icon } from '@rmwc/icon'
import { Chip, ChipText, ChipIcon, ChipSet } from '@rmwc/chip'
import { Button, ButtonIcon } from '@rmwc/button'
import { LinearProgress } from '@rmwc/linear-progress'
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
} from '@rmwc/card'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogButton
} from '@rmwc/dialog'

import Component from '../core/Component'
import Text from './Text'
import { renderResponsive } from '../utils/responsive'
import moment from 'moment'
import Media from './Media'

export default class Team extends Component {
  constructor (props) {
    super(props)
    this.state = { ...this.state, detailDialogOpen: false, item: null }
  }

  componentDidMount () {
    super.componentDidMount()
  }

  renderText (text) {
    return renderResponsive(
      'text',
      <Text
        source={text}
        style={{
          padding: '10px'
        }}
      />,
      <Text
        source={text}
        style={{
          paddingBottom: '10px'
        }}
      />
    )
  }

  renderCardMedia (item) {
    const image = item.image

    if (!image) {
      return <div />
    }

    const width = this.props.small ? 100 : 220
    const height = this.props.small ? 100 : 220

    const style = {
      alignSelf: 'center',
      marginTop: '20px',
      objectFit: 'cover',
      height,
      width,
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
        <Media cache={this.props.cache} roundImg image={image} style={style} />
      </CardMedia>
    )
  }

  onLinkClick (url) {
    window.open(url, '_blank')
  }

  renderCard (item, index) {
    const { linkedIn, github, website, text } = item

    const width = this.props.small ? 230 : 320
    const height = this.props.small ? 340 : 540

    return (
      <Card
        style={{
          width,
          height,
          margin: 20,
          textAlign: 'center'
        }}
        key={`item${index}`}
      >
        {this.renderCardMedia(item)}
        <div style={{ padding: '0 1rem 1rem 1rem', textAlign: 'right' }}>
          <div
            style={{
              height: 140
            }}
          >
            <Typography
              use='headline'
              tag='h2'
              style={{ textAlign: 'center', fontWeight: 700 }}
            >
              {item.name}
            </Typography>
            <Typography use='title' tag='h3' style={{ textAlign: 'center' }}>
              {item.title}
            </Typography>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                  onClick={() => {
                    this.onLinkClick(item.website)
                  }}
                >
                  <img src={this.props.webIcon} />
                </ButtonIcon>
              )}
            </div>
            {text && (
              <Button
                style={{ marginTop: 10 }}
                onClick={() => {
                  this.setState({ detailDialogOpen: true, item })
                }}
              >
                See More
              </Button>
            )}
          </div>
        </div>
      </Card>
    )
  }

  renderDetails () {
    const { item } = this.state
    if (!item) {
      return
    }
    return this.renderText(item.text)
  }

  renderDetailsTitle () {
    const { item } = this.state
    if (!item) {
      return
    }

    return this.renderCardMedia(item)
  }

  renderTeamMemebers (members) {
    var index = 0

    if (!members || members.length == 0) {
      return
    }

    return members.map(member => this.renderCard(member, index++))
  }

  renderSection (section, index) {
    const style = this.props.small ? { color: 'white', textShadow: '2px 2px 5px #607D8B' } : {}
    return (
      <div
        key={'section' + index}
        style={{ padding: '0 1rem 1rem 1rem', textAlign: 'right' }}
      >
        <Typography use='display1' tag='h1' style={style} >
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

  renderTeamSections () {
    var index = 0
    return this.props.sections.map((section, index) =>
      this.renderSection(section, index)
    )
  }

  renderSections () {
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

  renderDialog () {
    return <Dialog
      open={this.state.detailDialogOpen}
      onClose={evt => {
        this.setState({detailDialogOpen: false})
      }}>
      <DialogTitle>{this.renderDetailsTitle()}</DialogTitle>
      <DialogContent>{this.renderDetails()}</DialogContent>
      <DialogActions style={{display: 'flex', justifyContent: 'center'}} >
        <DialogButton action='close'>Back</DialogButton>
      </DialogActions>
    </Dialog>
  }

  renderComponent () {
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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {this.renderSections()}
        { this.renderDialog()}
      </div>
    )
  }
}
