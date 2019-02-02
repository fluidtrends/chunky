import React, { PureComponent } from 'react'
import Cover from '../components/Cover'
import Drawer from '../components/Drawer'
import LargeFooter from '../components/Footer'
import Navigation from '../components/Navigation'
import { Layout, Menu, Icon } from 'antd'

const { Header, Content, Sider, Footer } = Layout

/**
 *
 */
export default class DefaultLayout extends PureComponent {
  constructor (props) {
    super(props)
    this.state = { menuOpened: false, fixed: false }
    this._onMenuItem = this.onMenuItem.bind(this)
    this._onMenuOpen = this.onMenuOpen.bind(this)
    this._onMenuClose = this.onMenuClose.bind(this)
    this._onEvent = this.onEvent.bind(this)
    this._sidebarMenuSelected = this.sidebarMenuSelected.bind(this)
  }

  get styles () {
    return styles
  }

  get cover () {
    return Object.assign({}, this.props.cover, {})
  }

  get hasCover () {
    return (this.props.cover !== undefined)
  }

  get navigationHeight () {
    return (this.isLargeScreen ? 64 : 56)
  }

  get coverOffset () {
    if (this.hasCover && !this.cover.navigation && this.props.layout.fixed) {
      return this.navigationHeight
    }

    if (this.hasCover && this.cover.navigation && !this.props.layout.fixed) {
      return -this.navigationHeight
    }

    return 0
  }

  get navigationUncover () {
    if (this.hasCover && this.cover.navigation && !this.props.layout.fixed) {
      return true
    }

    if (!this.hasCover && this.props.forceNavigation) {
      return (this.props.scroll < 10)
    }

    return (this.hasCover && this.cover.navigation && this.props.scroll < 10)
  }

  onMenuItem (item) {
    this.props.onMenuItem && this.props.onMenuItem(item)
  }

  onEvent (event, data) {
    this.props.onEvent && this.props.onEvent(event, data)
  }

  onMenuOpen () {
    this.setState({ menuOpened: true })
  }

  onMenuClose () {
    this.setState({ menuOpened: false })
  }

  get theme () {
    let navigationColor = (this.navigationUncover || (this.props.forceNavigation && this.hasCover) ? `rgba(0,0,0,0)` : this.props.theme.navigationColor)
    navigationColor = this.props.theme.stickyNavigation ? this.props.theme.navigationColor : navigationColor
    const navigationTintColor = (this.navigationUncover || (this.props.forceNavigation && this.hasCover) ? '#FFFFFF' : this.props.theme.navigationTintColor)

    return Object.assign({}, this.props.theme, {
      navigationColor, navigationTintColor
    })
  }

  renderDrawer () {
    if (this.props.desktop) {
      return <div />
    }

    return (<Drawer
      index={-1}
      onClose={this._onMenuClose}
      open={this.state.menuOpened}
      onMenuItem={this._onMenuItem}
      onEvent={this._onEvent}
      theme={this.theme}
      menu={this.props.sideMenu}
    />)
  }

  renderNavigation () {
    if (this.props.desktop) {
      return <div />
    }

    return (<Navigation
      index={0}
      onMenuOpen={this._onMenuOpen}
      layout={this.props.layout}
      onMenuItem={this._onMenuItem}
      navigationUncover={this.navigationUncover}
      onEvent={this._onEvent}
      theme={this.theme}
      desktop={this.props.desktop}
      menu={this.props.menu}
    />)
  }

  renderCover () {
    if (!this.hasCover || this.props.desktop) {
      return <div />
    }
    return (<Cover
      index={1}
      color='#ffffff'
      {...this.props}
      {...this.props.cover}
      id='cover'
      onEvent={this._onEvent}
      offset={this.coverOffset}
    />)
  }

  renderFooter () {
    if (this.props.desktop) {
      return <div />
    }

    if (this.props.noFooter) {
      return <div />
    }

    return <LargeFooter
      index={9999}
      id='footer'
      {...this.props}
      onEvent={this._onEvent} />
  }

  renderComponent (component, index) {
    return (<div key={`component${index}`} style={this.styles.component}>
      {component}
    </div>)
  }

  renderPrimary () {
    if (this.props.sidebar && this.props.private && !this.props.isSmallScreen) {
      return this.renderWithSidebar()
    }

    return this.renderWithoutSidebar()
  }

  sidebarMenuSelected (selection) {
    const item = this.props.sidebar[selection.key]
    this.props.onSidebarMenuSelected && this.props.onSidebarMenuSelected(item)
  }

  get sidebarIndex () {
    if (!this.props.sidebar || this.props.sidebar.length === 0) {
      return 0
    }

    return this.props.sidebarIndex
  }

  renderSidebarItem (item) {
    return (<Menu.Item key={item.id}>
      <Icon type={item.icon} />
      <span className='nav-text'> {item.title}</span>
    </Menu.Item>)
  }

  renderWithSidebar () {
    const collapseSidebar = (this.props.desktop ? false : this.props.isSmallScreen)
    const width = this.props.sidebarWidth
    return <Layout>
      <Sider
        collapsible={false}
        defaultCollapsed={false}
        width={width}
        collapsed={collapseSidebar}>
        <Menu
          theme='light'
          mode='inline'
          onClick={this._sidebarMenuSelected}
          defaultSelectedKeys={[`${this.sidebarIndex}`]}
          style={{
            backgroundColor: '#FAFAFA',
            minHeight: '100%',
            color: '#90A4AE'
          }}>
          {this.props.sidebar.map(item => this.renderSidebarItem(item))}
        </Menu>
      </Sider>
      <Layout style={{
        backgroundColor: '#ffffff'
      }}>
        <Content style={{
          minHeight: '100vh',
          backgroundColor: `${this.props.layoutBackground || '#ffffff'}`,
          alignItems: 'top',
          width: '100%',
          marginLeft: `${this.props.isSmallScreen ? '0px' : '0px'}`,
          justifyContent: 'center',
          flex: 1,
          display: 'flex'
        }}>
          {this.renderComponents()}
        </Content>
      </Layout>
    </Layout>
  }

  renderWithoutSidebar () {
    return <Layout>
      <Content style={{ margin: '0' }}>
        <div style={{ padding: 0, background: '#ffffff', minHeight: 360 }}>
          {this.renderComponents()}
        </div>
      </Content>
      {this.renderFooter()}
    </Layout>
  }

  renderComponents () {
    var components = this.props.children || []
    var index = 0
    let marginTop
    if (this.props.forceNavigation) {
      marginTop = 0
    } else {
      marginTop = (this.props.layout.fixed && !this.hasCover ? this.navigationHeight : 0)
    }

    if (this.props.desktop) {
      marginTop = 0
    }

    return (<main style={{
      marginTop: `${marginTop}px`
    }}>
      {components.map(c => this.renderComponent(c, index++))}
    </main>)
  }

  render () {
    return (<div>
      {this.renderDrawer()}
      <div style={this.styles.container} ref={c => { this.container = c }}>

        {this.renderNavigation()}
        {this.renderCover()}
        {this.renderPrimary()}

        <style jsx global>{`{
        :root {
          --mdc-theme-primary: ${this.props.theme.primaryColor};
          --mdc-theme-secondary: ${this.props.theme.secondaryColor};
          font-family: Roboto Condensed, sans-serif;
        }

        html {
          font-weight: 300;
          font-family: Roboto Condensed, sans-serif;
          color: #ffffff;
        }

        pre {
          background-color: #F5F5F5;
          color: #455A64;
          text-align: left;
          padding: 20px;
          width: 90%;
        }

        .text {
          text-align: left;
        }

        a {
          text-decoration: none;
        }

        h1 {
          font-weight: 300;
          font-size: 40px;
          text-align: center;
        }

        h2 {
          font-weight: 300;
          font-size: 32px;
          text-align: center;
        }

        h3 {
          font-weight: 300;
          font-size: 24px;
          text-align: left;
        }

        code {
          font-size: 16px;
          text-align: center;
          backgroundColor: "#F5F5F5",
          padding: "10px"
        }

        p {
          font-size: 20px;
          text-align: justify;
        }

        .transition-enter {
          opacity: 0.01;
        }

        .transition-enter.transition-enter-active {
          opacity: 1;
          transition: opacity 500ms ease-in;
        }

        .transition-exit {
          opacity: 1;
        }

        .transition-exit.transition-exit-active {
          opacity: 0.01;
          transition: opacity 300ms ease-in;
        }
      }`}
        </style>
      </div>
    </div>)
  }
}

const styles = {
  container: {
    backgroundColor: '#FFFFFF'
  },
  component: {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    color: '#455A64'
  }
}
