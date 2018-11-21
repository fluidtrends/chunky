import React from 'react'
import Component from '../core/Component'
import { Typography } from '@rmwc/typography'
import { Spin, Icon } from 'antd'

export default class LoadingComponent extends Component {
  constructor (props) {
    super(props)
    this.state = { ...super.state }
  }

  render () {
    const indicator = <Icon type='loading' style={{ fontSize: 48, color: '#039BE5' }} spin />

    return (
      <div
        style={{
          display: 'flex',
          flex: 1,
          height: '300px',
          margin: '10px',
          backgroundColor: '#ffffff',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Spin indicator={indicator} style={{padding: '40px'}} />
        <Typography use='headline' style={{ color: '#B0BEC5' }} tag='h2'>
          {this.props.message}
        </Typography>
      </div>
    )
  }
}
