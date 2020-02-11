import React, { PureComponent } from 'react'
import { Menu, Icon, Button, Switch } from 'antd'
import { Layout } from 'antd'
import { Utils, Components } from 'react-dom-chunky'
import { Fab } from '@rmwc/fab'

const SubMenu = Menu.SubMenu

export default class Section extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      theme: 'light',
      counter: 0,
      selectedSection: null
    }
    this._next = this.onNext.bind(this)
    this._back = this.onPrev.bind(this)
  }

  onSectionSelect = section => {
    this.setState({ selectedSection: section })
    this.props.onSectionSelect && this.props.onSectionSelect(section)
  }

  onNext() {
    const section = this.nextSection
    section && this.onSectionSelect(section)
  }

  onPrev() {
    const section = this.prevSection
    section && this.onSectionSelect(section)
  }

  get selectedSectionIndex() {
    var index = 0
    var found = false

    this.props.sections.map(s => {
      if (s.path === this.selectedSection.path) {
        found = true
        return
      }
      found || index++
    })

    return (found ? index : -1)
  }

  get nextSection() {
    const index = this.selectedSectionIndex 
    const nextIndex = ((index < this.props.sections.length) ? index + 1 : -1)

    return (nextIndex > -1 ? this.props.sections[nextIndex] : false)
  }

  get prevSection() {
    const index = this.selectedSectionIndex
    const prevIndex = ((index > 0) ? index - 1  : -1)

    return (prevIndex > -1 ? this.props.sections[prevIndex] : false)
  }

  renderIcon(item) {
    if (item.icon.split("http").length > 1) {
      return <img style={{
          width: '20px',
          marginRight: "5px"
        }} src={item.icon} />
    }

    return <Icon style={{    
      color: this.props.theme.primaryColor         
    }} type={item.icon} />
  }

  renderHeaderIcon() {
    if (this.props.section.icon.split("http").length > 1) {
      return <img style={{
          width: '240px',
          marginTop: '-20px',
          marginBottom: '-20px'
        }} src={this.props.section.icon} />
    }

    return <Icon style={{             
      fontSize: "80px" 
    }} type={this.props.section.icon} />
  }
  
  renderContentHeader() {
    return <div style={{ 
            flex: 1, display: "flex", 
            flexDirection: "column", 
            color: this.props.theme.primaryColor, 
            justifyContent: "center", 
            alignItems: "center" }}>
        { this.props.section.icon ? this.renderHeaderIcon() : <div/> }
        { this.props.section.header ? <h1> {this.props.section.header} </h1> : <div/> }
    </div>
  }

  renderContentFooter() {
    const next = this.nextSection
    const prev = this.prevSection

    return <div style={{ 
            flex: 1, 
            display: "flex", 
            flexDirection: "row", 
            color: this.props.theme.primaryColor, 
            justifyContent: "center", 
            boxShadow: "0px -2px 3px rgba(0.2,0.2,0.2,0.2)",
            padding: "40px",
            marginTop: "5px",
            backgroundColor: "#ECEFF1",
            alignItems: "flex-end" }}>

          { prev ? <span style={{ fontSize: "20px", color: "#B0BEC5" }}>
              <Fab style={{ margin: "10px", backgroundColor: "#E0E0E0" }} icon="arrow_back" onClick={this._back}/>
              <span> Go back </span>
            </span> : <div/> }

          <div style={{ flex: 1 }}/>

          { next ? <span style={{ fontSize: "20px" }}>
            <span> Next: { next.title } </span>
            <Fab style={{ margin: "10px" }} icon="arrow_forward" theme={['primaryBg', 'onPrimary']} onClick={this._next}/>
          </span> : <div/> }
    </div>
  }

  renderContentComponent() {
    return Utils.renderResponsive(
      'text',
      <Components.Text
        source={this.selectedSection.text}
        style={{
          paddingBottom: '60px',
          maxWidth: '',
          backgroundColor: this.props.lightThemeBackgroundColor,
          color: this.props.lightThemeTextColor
        }}
      />,
      <Components.Text
        source={this.selectedSection.text}
        style={{
          paddingBottom: '60px',
          maxWidth: '',
          backgroundColor: this.props.lightThemeBackgroundColor,
          color: this.props.lightThemeTextColor
        }}
      />
    )
  }

  get selectedSection() {
    return this.state.selectedSection || this.props.section
  }

  renderMenuItem = (item) => {
    const {
      lightThemeBackgroundColor,
      selectionBackgroundColor,
      lightThemeTextColor
    } = this.props

    return item.subSection ? (
      <SubMenu
        key={item.path}
        style={{ 
          margin: '10px 0',
          color: lightThemeTextColor 
        }}
        title={
          <span>
            {item.icon ? <Icon type={item.icon} /> : null}
            <span>{item.title}</span>
          </span>
        }
      >
        {item.subSection.map(subSection => this.renderMenuItem(subSection))}
      </SubMenu>
    ) : (
      <Menu.Item
        key={item.path}
        style={{
          backgroundColor:
            this.selectedSection &&
            item.path === this.selectedSection.path ? selectionBackgroundColor : lightThemeBackgroundColor
        }}
      >
        <div onClick={() => this.onSectionSelect(item)}
          style= {{
            color: lightThemeTextColor
          }} >
          {item.icon ? this.renderIcon(item) : null}
          <span>{item.title}</span>
        </div>
      </Menu.Item>
    )
  }

  renderSideMenu() {
    return <Layout.Sider
        trigger={null}
        collapsible
        collapsed={this.state.collapsed}
        style={{
          backgroundColor: this.props.lightThemeBackgroundColor
        }}>
        <Menu
          defaultSelectedKeys={[this.selectedSection.path]}
          mode="inline"
          style={{
            backgroundColor: this.props.lightThemeBackgroundColor
          }}>
          { this.props.sections.map((item) =>
            this.renderMenuItem(item, this.selectedSection)
          )}
        </Menu>
      </Layout.Sider>
  }

  render() {
    return <div style={{
      }}>
        <Layout>
          { this.renderSideMenu()}
          { this.selectedSection && (
            <Layout>
              <Layout.Content
                style={{
                  backgroundColor: this.props.lightThemeBackgroundColor
                }}>
                { this.renderContentHeader() }
                { this.renderContentComponent() }
              </Layout.Content>
            </Layout>
          )}
        </Layout>
        { this.renderContentFooter() }
    </div>
  }
}
