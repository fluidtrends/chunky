import React from 'react'
import Component from '../core/Component'
import Text from './Text'
import { renderResponsive } from '../utils/responsive'
import { Typography } from '@rmwc/typography'
import Countdown from 'react-countdown-now'
import { Elevation } from '@rmwc/elevation'
import { Chip, ChipText, ChipIcon, ChipSet } from '@rmwc/chip'
import { Button, ButtonIcon } from '@rmwc/button'
import { LinearProgress } from '@rmwc/linear-progress'
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
} from '@rmwc/card'

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

  renderText () {
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

  renderSimpleText () {
    return <Typography use='headline4' style={{ margin: '10px', color: this.props.textColor }}>
      {this.state.period.text}
    </Typography>
  }

  renderInfo () {
    return <Typography use='headline5' style={{ marginBottom: '10px', color: this.props.textColor }}>
      {this.state.period.info}
    </Typography>
  }

  renderAction () {
    return <Button onClick={this.state.period.onAction || this.triggerEvent()} raised style={{ padding: '0 20px' }} theme='secondary-bg text-primary-on-secondary'>
      {this.state.period.actionTitle}
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
    const size = this.props.isSmallScreen ? 'headline6' : 'headline6'
    const margin = this.props.isSmallScreen ? '5' : '20'
    const width = this.props.isSmallScreen ? '30' : '50'
    const height = this.props.isSmallScreen ? '140' : '50'
    const typographyStyle = { margin: `${margin}px`, color: '#fff' }

    const style = {
      border: '2px solid #4ebcd4',
      backgroundColor: '#fff',
      color: "#4ebcd4", 
      padding: 2,
      width,
      height: 40
    }

    return <ChipSet>
      <Chip style={style}>
        <Typography use={size} style={typographyStyle}><ChipText style={{ marginLeft: 5, color: '#4ebcd4' }}>{days}d</ChipText></Typography>
      </Chip>
      <Chip style={style}><Typography use={size} style={typographyStyle}><ChipText style={{color: '#4ebcd4'}}>{hours}h</ChipText></Typography></Chip>
      <Chip style={style}><Typography use={size} style={typographyStyle}><ChipText style={{color: '#4ebcd4'}}>{minutes}m</ChipText></Typography></Chip>
      <Chip style={style}><Typography use={size} style={typographyStyle}><ChipText style={{color: '#4ebcd4'}}>{seconds}s</ChipText></Typography></Chip>
    </ChipSet>
  }

  renderClock () {
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

  renderComponent () {
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
      backgroundColor: this.props.backgroundColor,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {this.renderSimpleText()}
      {this.renderClock()}
      {this.renderInfo()}
      {/* {this.renderAction()} */}
    </div>
  }
}
