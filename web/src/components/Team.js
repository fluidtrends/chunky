import React from 'react'

import { Typography } from '@rmwc/typography'
import { Button, ButtonIcon } from '@rmwc/button'
import { Card, CardMedia } from '@rmwc/card'
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
import Media from './Media'
import { Data } from 'react-chunky'

export default class Team extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      detailDialogOpen: false,
      item: null,
      selectedLanguage: null,
      strings: null
    }
  }

  componentDidMount() {
    super.componentDidMount()
    Data.Cache.retrieveCachedItem('selectedLanguage')
      .then(lang => {
        this.setState({ selectedLanguage: lang })
      })
      .catch(() => {
        return
      })
    fetch(this.props.theme.translatedStrings)
      .then(response => response.json())
      .then(translatedTexts => {
        this.setState({ strings: translatedTexts['team'] })
      })
      .catch(() => '')
  }

  renderText(text) {
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

  renderCardMedia(item) {
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
          backgroundColor: item.backgroundColor,
          cursor:
            this.props.imageClickable && !this.state.detailDialogOpen
              ? 'pointer'
              : 'initial'
        }}
        onClick={() => {
          this.props.imageClickable
            ? this.setState({ detailDialogOpen: true, item })
            : false
        }}
      >
        <Media cache={this.props.cache} roundImg image={image} style={style} />
      </CardMedia>
    )
  }

  onLinkClick(url) {
    window.open(url, '_blank')
  }

  renderCard(item, index) {
    const { linkedIn, github, website, text } = item

    const width = this.props.small ? 230 : 320
    const height = this.props.small ? 340 : 540
    const translatedBtnSeeMoreText =
      this.props.translation &&
      this.state.strings &&
      this.state.selectedLanguage
        ? this.state.strings[this.state.selectedLanguage][`btnTextDetails`]
        : 'See more'
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
        <div style={{ padding: '15px 1rem 1rem 1rem', textAlign: 'right' }}>
          <div
            style={{
              height: 140
            }}
          >
            <Typography
              use="headline"
              tag="h2"
              style={{ textAlign: 'center', fontWeight: 700 }}
            >
              {item.name}
            </Typography>
            <Typography use="title" tag="h3" style={{ textAlign: 'center' }}>
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
                {translatedBtnSeeMoreText}
              </Button>
            )}
          </div>
        </div>
      </Card>
    )
  }

  renderDetails() {
    const { item } = this.state
    if (!item) {
      return
    }
    return this.renderText(item.text)
  }

  renderDetailsTitle() {
    const { item } = this.state
    if (!item) {
      return
    }

    return this.renderCardMedia(item)
  }

  renderTeamMemebers(members) {
    var index = 0

    if (!members || members.length == 0) {
      return
    }

    return members.map(member => this.renderCard(member, index++))
  }

  renderSection(section, index) {
    const style = this.props.small
      ? { color: 'white', textShadow: '2px 2px 5px #607D8B' }
      : { color: this.props.textColor ? this.props.textColor : '#000' }
    const translatedTitle =
      this.props.translation &&
      this.state.strings &&
      this.state.selectedLanguage
        ? this.state.strings[this.state.selectedLanguage][`section${index}`][
            `title`
          ]
        : section.title
    return (
      <div
        key={'section' + index}
        style={{ padding: '0 1rem 1rem 1rem', textAlign: 'right' }}
      >
        <Typography use="display1" tag="h1" style={style}>
          {translatedTitle}
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

  renderDialog() {
    const translatedBtnBackText =
      this.props.translation &&
      this.state.strings &&
      this.state.selectedLanguage
        ? this.state.strings[this.state.selectedLanguage][`btnTextGoBack`]
        : 'Back'
    return (
      <Dialog
        open={this.state.detailDialogOpen}
        onClose={evt => {
          this.setState({ detailDialogOpen: false })
        }}
      >
        <DialogTitle>{this.renderDetailsTitle()}</DialogTitle>
        <DialogContent>{this.renderDetails()}</DialogContent>
        <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
          <DialogButton action="close">{translatedBtnBackText}</DialogButton>
        </DialogActions>
      </Dialog>
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
          backgroundColor: this.props.backgroundColor
            ? this.props.backgroundColor
            : '#fff',
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
        {this.renderDialog()}
      </div>
    )
  }
}
