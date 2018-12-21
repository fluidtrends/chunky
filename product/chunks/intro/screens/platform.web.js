import React from 'react'
import { Screen } from 'react-dom-chunky'
import Platforms from '../components/Platforms'

export default class PlatformScreen extends Screen {
  constructor(props) {
    super(props)
    this.state = { ...this.state }
    this._onAction = this.onAction.bind(this)
  }

  componentDidMount() {
    super.componentDidMount()
  }

  onAction(item) {
    this.triggerRedirect(item.path)
  }

  renderMainContent() {
    return (
      <div
        style={{
          display: 'flex',
          flex: 1,
          padding: '20px',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Platforms
          onAction={this._onAction}
          redirect={this.triggerRedirect}
          compact={this.isSmallScreen}
        />
      </div>
    )
  }

  components() {
    return [this.renderMainContent()]
  }
}
