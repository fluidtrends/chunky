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
import { Typography } from 'rmwc/Typography'

export default class Collection extends Component {

  constructor (props) {
    super(props)
    this.state = { ...this.state }
  }

  componentDidMount () {
    super.componentDidMount()
  }

  renderCard (item, index) {
    return <Card style={{width: '320px'}} key={`item${index}`}>
      <CardMedia style={{
        backgroundColor: item.backgroundColor
      }}>
        <img src={`/assets/${item.image}`} style={{
          alignSelf: 'center',
          width: '320px'
        }} />
      </CardMedia>
      <div style={{padding: '0 1rem 1rem 1rem'}}>
        <Typography use='title' tag='h2'>{ item.title }</Typography>
        <Typography
          use='subheading1'
          tag='h3'
          theme='text-secondary-on-background'
          style={{marginTop: '-1rem'}}>
          {item.details}
        </Typography>
      </div>
      <CardActions style={{justifyContent: 'center'}}>
        <CardActionButtons>
          <CardAction onClick={this.triggerEvent(item.name || index)}> Learn More </CardAction>
        </CardActionButtons>
      </CardActions>
    </Card>
  }

  renderItem (item, index) {
    return <div key={`item-${index}`} style={{
      padding: '20px'
    }}>
      { this.renderCard(item, index) }
    </div>
  }

  get categories () {
    return this.props.categories || []
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
        alignItems: 'center',
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
