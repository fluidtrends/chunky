import React, { PureComponent } from 'react'
import { renderResponsive } from '../utils/responsive'
import {
  Toolbar,
  ToolbarRow,
  ToolbarMenuIcon,
  ToolbarSection
} from '@rmwc/toolbar'
import { Button } from '@rmwc/button'
import { Icon } from '@rmwc/icon'

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
    const MenuIcon = <ToolbarMenuIcon onClick={this._onMenuItem(item)} use={item.icon} style={{
      color: this.props.theme.navigationTintColor,
      marginRight: '0px'
    }} />
    const MenuButton = <Button onClick={this._onMenuItem(item)}
      style={{
        color: this.props.theme.navigationTintColor,
        textShadow: this.props.theme.textShadow,
        marginRight: '0px'
      }}>
      {item.title}
    </Button>
    const MenuActionButton = <Button raised theme='secondary-bg text-primary-on-secondary'
      onClick={this._onMenuItem(item)}
      style={{
        color: this.props.theme.nanvigationTextButton,
        marginRight: '0px'
      }}>
      {`${item.title}`}
    </Button>
    return renderResponsive(`menuItem${index++}`, <div />, item.alwaysShowIcon ? MenuIcon : (item.action ? MenuActionButton : MenuButton))
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
      <ToolbarMenuIcon use='menu' style={{ color: this.props.theme.navigationTintColor }} onClick={this._onMenuOpen} />,
      <img src={`${this.props.desktop ? '../../../../' : '/'}assets/${image}`} style={{ height: `${height}px`, marginLeft: '20px' }} />
    )
  }

  renderDefault () {
    return (<Toolbar waterfall fixed={this.props.layout.fixed} style={{
      backgroundColor: this.props.theme.navigationColor
    }}>
      <ToolbarRow>
        <ToolbarSection alignStart style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'left',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          {this.renderNavigationLogo()}
        </ToolbarSection>
        <ToolbarSection alignEnd style={{
          flex: 4,
          display: 'flex',
          justifyContent: 'flex-end',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          {this.renderNavigationMenu()}
        </ToolbarSection>
      </ToolbarRow>
    </Toolbar>)
  }

  render () {
    return this.renderDefault()
  }
}
