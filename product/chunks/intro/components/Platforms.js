import React from 'react'
import { Component } from 'react-dom-chunky'
import { Typography } from '@rmwc/typography'
import { Card, CardPrimaryAction, CardMedia, CardActions } from '@rmwc/card'
import { Row, Col } from 'antd'
import PlatformButton from './Button'
import Items from '../data/platforms.json'

export default class Platforms extends Component {
  constructor(props) {
    super(props)
    this.state = { ...super.state, hovered: false }
  }

  componentDidMount() {
    super.componentDidMount()
  }

  get items() {
    return Items
  }

  renderCard(item) {
    return (
      <Card
        style={{
          margin: '10px',
          width: '300px',
          height: '400px'
        }}
        onClick={() => this.props.onAction(item)}
      >
        <CardPrimaryAction
          style={{
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <CardMedia
            sixteenByNine
            style={{
              width: '200px',
              height: '200px',
              backgroundImage: `url(${item.image})`
            }}
          />
          <div style={{ padding: '10px' }}>
            <Typography use="headline5" tag="h1">
              {item.title}
            </Typography>
            <Typography
              use="headline6"
              tag="h2"
              theme="text-secondary-on-background"
              style={{ margin: '1rem', textAlign: 'center' }}
            >
              {item.subtitle}
            </Typography>
          </div>
          <CardActions style={{ justifyContent: 'center' }}>
            <PlatformButton item={item} onAction={this.props.onAction} />
          </CardActions>
        </CardPrimaryAction>
      </Card>
    )
  }

  renderCompact() {
    return (
      <div
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {this.items.map(item => this.renderCard(item))}
      </div>
    )
  }

  renderDefault() {
    return (
      <div
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Row gutter={16}>
          <Col xl={6} lg={8} sm={12} xs={24}>
            {this.renderCard(this.items[0])}
          </Col>
          <Col xl={6} lg={8} sm={12} xs={24}>
            {this.renderCard(this.items[1])}
          </Col>
          <Col xl={6} lg={8} sm={12} xs={24}>
            {this.renderCard(this.items[2])}
          </Col>
          <Col xl={6} lg={8} sm={12} xs={24}>
            {this.renderCard(this.items[3])}
          </Col>
        </Row>
      </div>
    )
  }

  render() {
    return this.props.compact ? this.renderCompact() : this.renderDefault()
  }
}
