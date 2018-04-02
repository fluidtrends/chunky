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

  constructor (props) {
    super(props)
    this.state = { ...this.state, loading: true }
    this._clockRenderer = this.clockRenderer.bind(this)
    this._onComplete = this.onComplete.bind(this)
    this._clockTick = this.clockTick.bind(this)
  }

  componentDidMount () {
    super.componentDidMount()
    this.refreshPeriods()
  }

  refreshPeriods () {
    let period

    const { periods } = this.props

    for (let i = 0; i < periods.length; i++) {
      if (!periods[i].until || !periods[i].text) {
        break
      }
      if (i + 1 === periods.length) {
        period = periods[ i ]
        break
      }

      if (moment().isBefore(periods[ i ].until)) {
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

  renderText () {
    return renderResponsive('text',
      <Text source={this.state.period.text} style={{
        width: `90vw`,
        padding: '10px'
      }} />,
      <Text source={this.state.period.text} style={{
        width: `70vw`,
        paddingBottom: '10px'
      }} />)
  }

  renderAction () {
    return <Button onClick={this.triggerEvent()} raised style={{height: '64px'}} theme='secondary-bg text-primary-on-secondary'>
      <Typography use='headline' style={{margin: '10px'}}>
        { this.props.actionTitle }
      </Typography>
    </Button>
  }

  onComplete () {
    this._clockRenderer = this.clockRenderer.bind(this)
    this.refreshPeriods()
  }

  clockTick () {
    // this.refreshPeriods()
  }

  clockRenderer ({ days, hours, minutes, seconds, completed }) {
    const size = this.props.isSmallScreen ? 'title' : 'display1'
    const margin = this.props.isSmallScreen ? '5' : '20'

    return <ChipSet style={{paddingBottom: '30px'}}>
      <Chip style={{border: '2px solid #ffffff', color: this.props.textColor}}>
        <Typography use={size} style={{margin: `${margin}px`}}><ChipText>{days}d</ChipText></Typography>
      </Chip>
      <Chip style={{border: '2px solid #ffffff', color: this.props.textColor}}><Typography use={size} style={{margin: `${margin}px`}}><ChipText>{hours}h</ChipText></Typography></Chip>
      <Chip style={{border: '2px solid #ffffff', color: this.props.textColor}}><Typography use={size} style={{margin: `${margin}px`}}><ChipText>{minutes}m</ChipText></Typography></Chip>
      <Chip style={{border: '2px solid #ffffff', color: this.props.textColor}}><Typography use={size} style={{margin: `${margin}px`}}><ChipText>{seconds}s</ChipText></Typography></Chip>
    </ChipSet>
  }

  renderClock () {
    const size = this.props.isSmallScreen ? 'title' : 'headline'
    const margin = '50'

    return <Typography use={size} style={{marginBottom: `${margin}px`, textAlign: 'center'}}>
      <Countdown
        date={this.state.period.until}
        zeroPadLength={3}
        onTick={this._clockTick}
        onComplete={this._onComplete}
        renderer={this._clockRenderer} />
      Period ends on <strong> {this.state.period.until} </strong>
    </Typography>
  }

  renderComponent () {
    if (this.state.loading) {
      return (<div style={{ display: 'flex', flex: 1, margin: '10px', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }} >
        <Card style={{width: '80vw', margin: '20px', padding: '0px'}} >
          <LinearProgress determinate={false} />
        </Card>
      </div>)
    }

    if (!this.state.period) {
      return (<div />)
    }

    return <div style={{
      color: this.props.textColor,
      position: 'relative',
      display: 'flex',
      flex: 1,
      paddingTop: '20px',
      paddingBottom: '50px',
      backgroundColor: this.props.backgroundColor,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center' }}>
      { this.renderText() }
      { this.renderClock() }
      { this.renderAction() }
    </div>
  }
}
