import React from 'react'
import Component from '../core/Component'
import Text from './Text'
import { renderResponsive } from '../utils/responsive'
import { Typography } from 'rmwc/Typography'
import { Icon } from 'rmwc/Icon'
import { Button, ButtonIcon } from 'rmwc/Button'
import { LinearProgress } from 'rmwc/LinearProgress'
import moment from 'moment'
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'

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

export default class Timeline extends Component {
  constructor(props) {
    super(props)
    this.state = { ...this.state, loading: false }
  }

  componentDidMount() {
    super.componentDidMount()
  }

  renderText() {
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

  triggerRawRedirect(url) {
    window.open(url, '_blank')
  }

  renderMilestone(item, index) {
    let iconBackground = moment().isAfter(item.until)
      ? this.props.pastColor
      : this.props.inProgressColor
    console.log(this)
    return (
      <VerticalTimelineElement
        key={index}
        className="vertical-timeline-element--work"
        date={item.date}
        iconStyle={{
          background: iconBackground,
          color: item.color,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        icon={<Icon use={item.icon} />}
      >
        <h3 className="vertical-timeline-element-title">{item.title}</h3>
        <h4 className="vertical-timeline-element-subtitle">{item.subtitle}</h4>
        <p className="vertical-timeline-element-subtitle">{item.text}</p>
        <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
          <Button onClick={() => this.triggerRawRedirect(item.link)}>
            More...
          </Button>
        </div>
      </VerticalTimelineElement>
    )
  }

  renderTimeline() {
    if (!this.props.milestones) {
      return
    }

    return (
      <VerticalTimeline style={{ marginTop: 0 }}>
        {this.props.milestones.map(milestone =>
          this.renderMilestone(milestone)
        )}
      </VerticalTimeline>
    )
  }

  renderComponent() {
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
        }}
      >
        {this.renderTimeline()}
      </div>
    )
  }
}
