import React, { PureComponent } from 'react'
import { Icon, Button } from 'antd'

export default class PlatformButton extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { hovered: false }
  }

  render() {
    const { item } = this.props
    return (
      <Button
        onMouseEnter={() => {
          this.setState({ hovered: true })
        }}
        onMouseLeave={() => {
          this.setState({ hovered: false })
        }}
        onClick={() => this.props.onAction(item)}
        style={{
          margin: '10px 0px 30px 0px',
          color: '#ffffff',
          backgroundColor: `${item.color}`
        }}
      >
        {item.action}
        <Icon
          type={item.icon}
          style={{ marginLeft: this.state.hovered ? '30px' : '5px' }}
        />
      </Button>
    )
  }
}
