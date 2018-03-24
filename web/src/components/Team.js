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
import {
  Dialog,
  DefaultDialogTemplate,
  DialogSurface,
  DialogHeader,
  DialogHeaderTitle,
  DialogBody,
  DialogFooter,
  DialogFooterButton,
  DialogBackdrop
} from 'rmwc/Dialog'
import Media from './Media'

export default class Team extends Component {
  constructor (props) {
    super(props)
    this.state = { ...this.state, detailDialogOpen: false, item: null }
  }

  componentDidMount () {
    super.componentDidMount()
  }

  renderText () {
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

  renderCardMedia (item) {
    const image = item.image

    if (!image) {
      return <div />
    }

    const style = {
      alignSelf: 'center',
      marginTop: '20px',
      objectFit: 'cover',
      height: 220,
      width: 220,
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

    return (
      <Card
        style={{ width: '320px', height: '540px', margin: 20, textAlign: 'center' }}
        key={`item${index}`}
      >
        {this.renderCardMedia(item)}
        <div style={{ padding: '0 1rem 1rem 1rem', textAlign: 'right' }}>
          <div
            style={{
              height: 140
            }}
          >
            <Typography use='headline' tag='h2' style={{ textAlign: 'center', fontWeight: 700 }}>
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
    return <Text source={item.text} style={{ width: `90%`, padding: '10px' }} />
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
    return (
      <div
        key={'section' + index}
        style={{ padding: '0 1rem 1rem 1rem', textAlign: 'right' }}
      >
        <Typography use='display1' tag='h1'>
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
          backgroundColor: this.props.backgroundColor,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {this.renderSections()}
        <Dialog
          open={this.state.detailDialogOpen}
          onClose={evt =>
            this.setState({ detailDialogOpen: false, item: null })
          }
        >
          <DialogSurface>
            <DialogHeader>
              <DialogHeaderTitle>{this.renderDetailsTitle()}</DialogHeaderTitle>
            </DialogHeader>
            <DialogBody>{this.renderDetails()}</DialogBody>
            <DialogFooter>
              <DialogFooterButton cancel>Back</DialogFooterButton>
            </DialogFooter>
          </DialogSurface>
          <DialogBackdrop />
        </Dialog>
      </div>
    )
  }
}
