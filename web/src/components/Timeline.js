import React from 'react'
import Component from '../core/Component'
import Text from './Text'
import { renderResponsive } from '../utils/responsive'
import { LinearProgress } from '@rmwc/linear-progress'
import { Timeline, Icon, Button } from 'antd'
import { Typography } from '@rmwc/typography'

import { Card } from 'rmwc/Card'

export default class ChunkyTimeline extends Component {
  constructor (props) {
    super(props)
    this.state = { ...this.state, loading: false }
  }

  componentDidMount () {
    super.componentDidMount()
  }

  renderText () {
    return renderResponsive(
      'text',
      <Text
        source={this.state.period.text}
        style={{
          width: `90vw`,
          padding: '10px'
        }}
      />,
      <Text
        source={this.state.period.text}
        style={{
          width: `70vw`,
          paddingBottom: '10px'
        }}
      />
    )
  }

  renderMilestone (item) {
    const {
      doneColor,
      progressColor,
      todoColor,
      doneIcon,
      progressIcon,
      todoIcon
    } = this.props
    let iconColor, iconType

    switch (item.status) {
      case 'done':
        iconColor = doneColor
        iconType = doneIcon
        break;
      case 'progress':
        iconColor = progressColor
        iconType = progressIcon
        break;
      case 'todo':
        iconColor = todoColor
        iconType = todoIcon
        break;
      default:
        break;
    }

    return (
        <Timeline.Item dot={<Icon type={iconType} style={{ fontSize: '20px', color: iconColor }} />}>
          <div style={{boxShadow: 'rgba(224,224,224,1) 0px 5px 20px 0px', display: 'flex', alignItems: 'center', padding: '15px'}}>
            <Typography use="headline5" style={{paddingRight: '5px', paddingLeft: '5px'}}>{item.title}</Typography>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
              <Button style={{backgroundColor: '#009688'}} type="primary" href={item.link} target={'_blank'}>
                Find out more<Icon type="right" />
              </Button>
            </div>
          </div>
        </Timeline.Item>
      )
  }

  renderTimeline () {
    if (!this.props.milestones) {
      return
    }

    return (
      <Timeline mode="alternate">
        {this.props.milestones.map( milestone => this.renderMilestone(milestone))}
      </Timeline>
    )
  }

  renderComponent () {
    if (this.state.loading) {
      return (
        <div
          style={{
            display: 'flex',
            flex: 1,
            margin: '10px',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Card style={{ width: '80vw', margin: '20px', padding: '0px' }}>
            <LinearProgress determinate={false} />
          </Card>
        </div>
      )
    }

    return (
      <div
        style={{
          color: this.props.textColor,
          backgroundColor: this.props.backgroundColor
        }}>
        {this.renderTimeline()}
      </div>
    )
  }
}
