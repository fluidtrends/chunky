import React from 'react'
import Component from '../core/Component'
import Text from './Text'
import { renderResponsive } from '../utils/responsive'
import { Icon } from '@rmwc/icon'
import { Button } from '@rmwc/button'
import { LinearProgress } from '@rmwc/linear-progress'
import moment from 'moment'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'

import { Card } from 'rmwc/Card'

export default class Timeline extends Component {
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

  triggerRawRedirect (url) {
    window.open(url, '_blank')
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
    let iconBackground, iconType

    switch (item.status) {
      case 'done':
        iconBackground = doneColor
        iconType = doneIcon
        break;
      case 'progress':
        iconBackground = progressColor
        iconType = progressIcon
        break;
      case 'todo':
        iconBackground = todoColor
        iconType = todoIcon
        break;
      default:
        break;
    }

    return (
      <VerticalTimelineElement
        key={item.id}
        className='vertical-timeline-element--work'
        iconStyle={{
          background: iconBackground,
          color: item.color,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        icon={<Icon icon={iconType} />}
        position={'left'}
        >
        <h3 className='vertical-timeline-element-title'>{item.title}</h3>
        <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
          <Button onClick={() => this.triggerRawRedirect(item.link)}>
            More...
          </Button>
        </div>
      </VerticalTimelineElement>
    )
  }

  renderTimeline () {
    if (!this.props.milestones) {
      return
    }

    return (
      <VerticalTimeline style={{ marginTop: 0 }} layout={'one-column'}>
        {this.props.milestones.map(milestone =>
          this.renderMilestone(milestone)
        )}
      </VerticalTimeline>
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
