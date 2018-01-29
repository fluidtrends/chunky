import React from 'react'
import Component from '../core/Component'
import Text from './Text'
import { renderResponsive } from '../utils/responsive'
import Ionicon from 'react-ionicons'
import {
  Icon,
  Button,
  Typography,
  GridList,
  Grid,
  GridCell,
  GridTile,
  GridTileTitle,
  GridTilePrimary,
  GridTileSecondary,
  GridTilePrimaryContent,
  Card,
  CardMedia,
  CardPrimary,
  CardTitle,
  CardSubtitle,
  CardSupportingText,
  CardActions,
  CardAction
} from 'rmwc'

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
      <CardPrimary>
        <CardTitle large>{ item.title }</CardTitle>
        <CardSubtitle> {item.details} </CardSubtitle>
      </CardPrimary>
      <CardSupportingText />
      <CardActions style={{justifyContent: 'center'}}>
        <CardAction onClick={this.triggerEvent(item.name || index)}> Learn More </CardAction>
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
