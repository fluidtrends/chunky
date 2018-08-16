import React from 'react'
import Component from '../core/Component'
import Text from './Text'
import { renderResponsive } from '../utils/responsive'
import { Typography } from 'rmwc/Typography'
import Countdown from 'react-countdown-now'
import { Elevation } from 'rmwc/Elevation'
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

export default class Timer extends Component {

  constructor(props) {
    super(props)
    this.state = { ...this.state, loading: true }
    this._clockRenderer = this.clockRenderer.bind(this)
    this._onComplete = this.onComplete.bind(this)
    this._clockTick = this.clockTick.bind(this)
  }

  componentDidMount() {
    super.componentDidMount()
    this.refreshPeriods()
  }

  refreshPeriods() {
    let period

    const { periods } = this.props

    for (let i = 0; i < periods.length; i++) {
      if (!periods[i].until || !periods[i].text) {
        break
      }
      if (i + 1 === periods.length) {
        period = periods[i]
        break
      }

      if (moment().isBefore(periods[i].until)) {
        period = periods[i]
        break
      }
    }

    if (!period) {
      this.setState({ loading: false })
      return
    }

    this.setState({ period, loading: false })
  }

  renderText() {
    return renderResponsive('text',
      <Text source={this.state.period.text} style={{
        width: `90vw`,
        padding: '10px',
        color: 'white'
      }} />,
      <Text source={this.state.period.text} style={{
        width: `70vw`,
        color: 'white',
        paddingBottom: '10px'
      }} />)
  }

  renderSimpleText() {
    return <Typography use='display1' style={{ margin: '10px', textShadow: '2px 2px 5px #607D8B' }}>
      {this.state.period.text}
    </Typography>
  }

  renderInfo() {
    return <Typography use='title' style={{ marginBottom: '10px', textShadow: '2px 2px 5px #607D8B' }}>
      {this.state.period.info}
    </Typography>
  }

  renderAction() {
    return <Button onClick={this.state.period.onAction || this.triggerEvent()} raised style={{ padding: '0 20px' }} theme='secondary-bg text-primary-on-secondary'>
      {this.state.period.actionTitle}
    </Button>
  }

  onComplete() {
    this._clockRenderer = this.clockRenderer.bind(this)
    this.refreshPeriods()
  }

  clockTick() {
    // this.refreshPeriods()
  }

  clockRenderer({ days, hours, minutes, seconds, completed }) {
    const size = this.props.isSmallScreen ? 'title' : 'headline3'
    const margin = this.props.isSmallScreen ? '5' : '20'
    const width = this.props.isSmallScreen ? '10' : '90'
    const height = this.props.isSmallScreen ? '10' : '50'

    const style = {
      border: '2px solid #ffffff', color: this.props.textColor, padding: 2,
      width,
      height
    }
    return <ChipSet>
      <Chip style={style}>
        <Typography use={size} style={{ margin: `${margin}px`, color: '#fff' }}><ChipText style={{ marginLeft: 5 }}>{days}d</ChipText></Typography>
      </Chip>
      <Chip style={style}><Typography use={size} style={{ margin: `${margin}px`, color: '#fff' }}><ChipText>{hours}h</ChipText></Typography></Chip>
      <Chip style={style}><Typography use={size} style={{ margin: `${margin}px`, color: '#fff' }}><ChipText>{minutes}m</ChipText></Typography></Chip>
      <Chip style={style}><Typography use={size} style={{ margin: `${margin}px`, color: '#fff' }}><ChipText>{seconds}s</ChipText></Typography></Chip>
    </ChipSet>
  }

  renderClock() {
    const size = this.props.isSmallScreen ? 'title' : 'headline'
    const margin = '20'

    return <Typography use={size} style={{ marginBottom: `${margin}px`, textAlign: 'center' }}>
      <Countdown
        date={this.state.period.until}
        zeroPadLength={3}
        onTick={this._clockTick}
        onComplete={this._onComplete}
        renderer={this._clockRenderer} />
      {/* Period ends on <strong> {this.state.period.until} </strong> */}
    </Typography>
  }

  renderComponent() {
    if (this.state.loading) {
      return (<div style={{ display: 'flex', flex: 1, margin: '10px', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }} >
        <Card style={{ width: '80vw', margin: '20px', padding: '0px' }} >
          <LinearProgress determinate={false} />
        </Card>
      </div>)
    }

    if (!this.state.period) {
      return (<div />)
    }

    return <div style={{
      color: 'white',
      position: 'relative',
      display: 'flex',
      flex: 1,
      paddingTop: '20px',
      paddingBottom: '50px',
      backgroundColor: this.props.backgroundColor,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {this.renderSimpleText()}
      {this.renderClock()}
      {this.renderInfo()}
      {this.renderAction()}
    </div>
  }
}
