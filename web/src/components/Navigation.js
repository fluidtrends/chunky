import React, { PureComponent } from 'react'
import { renderResponsive } from '../utils/responsive'
import {
  Toolbar,
  ToolbarRow,
  ToolbarMenuIcon,
  ToolbarSection
} from 'rmwc/Toolbar'
import { Button } from 'rmwc/Button'

export default class Navigation extends PureComponent {

  constructor (props) {
    super(props)
    this._onMenuOpen = this.onMenuOpen.bind(this)
    this._onMenuItem = (item) => this.onMenuItem.bind(this, item)
  }

  onMenuItem (item) {
    this.props.onMenuItem && this.props.onMenuItem(item)
  }

  renderNavigationMenuItem (item, index) {
    // <ToolbarIcon use={item.icon} style={{color: this.props.theme.navigationTintColor}} />,
    return renderResponsive(`menuItem${index++}`, <div />,
      <Button onClick={this._onMenuItem(item)} style={{color: this.props.theme.navigationTintColor, marginRight: '20px'}}>
        { item.title }
      </Button>)
  }

  onMenuOpen () {
    this.props.onMenuOpen && this.props.onMenuOpen()
  }

  renderNavigationMenu () {
    var index = 0
    return this.props.menu.map(item => this.renderNavigationMenuItem(item, index++))
  }

  renderNavigationLogo () {
    const image = (this.props.navigationUncover ? this.props.theme.logoImage : this.props.theme.logoLightImage)
    const height = (this.props.navigationUncover ? 64 : 64)

    return renderResponsive('logo',
      <ToolbarMenuIcon use='menu' style={{color: this.props.theme.navigationTintColor}} onClick={this._onMenuOpen} />,
      <img src={`/assets/${image}`} style={{height: `${height}px`, marginLeft: '20px'}} />
      )
  }

  renderDefault () {
    return (<Toolbar waterfall fixed={this.props.layout.fixed} style={{
      backgroundColor: this.props.theme.navigationColor}}>
      <ToolbarRow>
        <ToolbarSection alignStart>
          { this.renderNavigationLogo() }
        </ToolbarSection>
        <ToolbarSection alignEnd>
          { this.renderNavigationMenu() }
        </ToolbarSection>
      </ToolbarRow>
    </Toolbar>)
  }

  render () {
    return this.renderDefault()
  }
}
