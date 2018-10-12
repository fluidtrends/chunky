import React from 'react'
import Component from '../core/Component'
import { Button } from '@rmwc/button'
import { Typography } from '@rmwc/typography'
import { Chip, ChipText, ChipSet } from '@rmwc/chip'
import {Fab} from '@rmwc/fab'
import {
  Card,
  CardMedia,
  CardActionButtons,
  CardActions,
  CardAction
} from '@rmwc/card'
import Media from './Media'

const colors = {
  'Beginner': '#65bb6a',
  'Entry': '#F57C00',
  'Intermediate': '#FDD835',
  'Advanced': '#E64A19',
  'Expert': '#1565C0'
}

export default class Collection extends Component {
  constructor (props) {
    super(props)
    this.state = { ...this.state }
  }

  componentDidMount () {
    super.componentDidMount()
  }

  renderCardMedia (item) {
    const image = item.thumbnail || item.imageSmall || item.image

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
        desktop={this.props.desktop}
        innerWidth={innerWidth}
        style={style} />
    </CardMedia>
  }

  renderCard (item, index) {
    const details = item.details.substring(0, 120)
    return <Card style={{width: '320px'}} key={`item${index}`}>
      <Button onClick={this.triggerEvent(item.name || index, item.action)} style={{padding: 0, height: '100%'}}>
        { this.renderCardMedia(item) }
      </Button>
      <div style={{padding: '0 1rem 1rem 1rem'}}>
        <Typography use='title' tag='h2'>{ item.title }</Typography>
        <Typography
          use='subheading1'
          tag='h3'
          theme='text-secondary-on-background'
          style={{marginTop: '1rem'}}>
          {`${details} ...` }
        </Typography>
      </div>
      { this.renderCardTags(item) }
      <CardActions style={{justifyContent: 'center', marginBottom: '1rem'}}>
        { this.renderCardButtons(item, index) }
      </CardActions>
    </Card>
  }

  renderCardButtons (item, index) {
    if (this.props.renderCardButtons) {
      return this.props.renderCardButtons(item, index)
    }

    return <CardActionButtons>
      <CardAction onClick={this.triggerEvent(item.name || index, Object.assign({}, item.action, { primary: true }))}> { item.actionTitle || 'Learn More'} </CardAction>
      { this.renderSecondaryCardButton(item, index) }
    </CardActionButtons>
  }

  renderCardTag (tag) {
    return <Chip style={{background: 'red', color: 'white'}}>
      <ChipText>
        <Typography
          use='caption'>
           sdfasd
        </Typography>
      </ChipText>
    </Chip>
  }

  renderCardTags (item) {
    if (!item.tags) {
      return <div />
    }

    return <div style={{display: 'flex', alignItems: 'center'}}>
      <ChipSet style={{flex: 2}}>
        { item.tags.map(t => this.renderCardTag(t)) }
      </ChipSet>
    </div>
  }

  renderSecondaryCardButton (item, index) {
    if (!item.actionTitleSecondary) {
      return <div />
    }

    return <CardAction onClick={this.triggerEvent(item.name || index, Object.assign({}, item.action, { secondary: true }))}> { item.actionTitleSecondary || 'Learn More'} </CardAction>
  }

  renderChallenge (item, index) {
    const details = item.details.substring(0, 50)
    return <Card style={{width: '320px'}} key={`item${index}`}>
      { this.renderCardMedia(item) }
      <div style={{padding: '0 1rem 1rem 1rem'}}>
        <Typography use='title' tag='h2'>{ item.title }</Typography>
        <Typography
          use='subheading1'
          tag='h3'
          theme='text-secondary-on-background'
          style={{marginTop: '1rem'}}>
          {details}...
        </Typography>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <ChipSet style={{flex: 2}}>
            <Chip style={{background: colors[item.category], color: 'white'}}>
              <ChipText>
                <Typography
                  use='caption'
                >
                  {item.category}
                </Typography>
              </ChipText>
            </Chip>
            <Chip style={{background: '#90A4AE', color: 'white'}}>
              <ChipText>
                <Typography
                  use='caption'
                >
                  {item.label}
                </Typography>
              </ChipText>
            </Chip>
          </ChipSet>
          <Fab mini>star</Fab>
          <Typography
            use='title'
            style={{marginLeft: 5}}
          >
            {item.xp}
          </Typography>
        </div>
      </div>
      <CardActions style={{justifyContent: 'center', marginBottom: '1rem'}}>
        <CardActionButtons>
          <CardAction onClick={this.triggerEvent(item.name || index, item.action)}> { item.actionTitle || 'Learn More'} </CardAction>
        </CardActionButtons>
      </CardActions>
    </Card>
  }

  renderItem (item, index) {
    return <div key={`item-${index}`} style={{
      padding: '20px'
    }}>
      { this.renderItemType(item, index) }
    </div>
  }

  renderItemType (item, index) {
    switch (this.type) {
      case 'challenges':
        return this.renderChallenge(item, index)
      default:
        return this.renderCard(item, index)
    }
  }

  get categories () {
    return this.props.categories || []
  }

  get type () {
    return this.props.type || 'default'
  }

  renderItems () {
    var index = 0
    return this.categories.map(item => this.renderItem(item, index++))
  }

  renderCollection () {
    return <div
      style={{
        display: 'flex',
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center'
      }}>
      { this.renderItems() }
    </div>
  }

  renderDefault () {
    return this.renderCollection()
  }

  renderComponent () {
    return this.renderDefault()
  }
}
