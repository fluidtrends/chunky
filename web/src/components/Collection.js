import React from 'react'
import Component from '../core/Component'
import Text from './Text'
import { renderResponsive } from '../utils/responsive'
import Ionicon from 'react-ionicons'
import {
  Card,
  CardMedia,
  CardPrimary,
  CardTitle,
  CardSubtitle,
  CardSupportingText,
  CardActionButtons,
  CardActionIcons,
  CardActions,
  CardAction
} from 'rmwc/Card'
import { Chip, ChipText, ChipIcon, ChipSet } from 'rmwc/Chip';
import {Fab} from 'rmwc/Fab'
import { Typography } from 'rmwc/Typography'
import Media from './Media'
import { Button } from 'rmwc/Button'

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
      <CardActions style={{justifyContent: 'center', marginBottom: '1rem'}}>
        <CardActionButtons>
          <CardAction onClick={this.triggerEvent(item.name || index, item.action)}> { item.actionTitle || 'Learn More'} </CardAction>
        </CardActionButtons>
      </CardActions>
    </Card>
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
