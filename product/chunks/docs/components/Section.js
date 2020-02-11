import React, { PureComponent } from 'react'
import { Menu, Icon, Button, Switch } from 'antd'
import { Layout } from 'antd'
import { Utils, Components } from 'react-dom-chunky'

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
  }

  onSectionSelect = section => {
    this.setState({ selectedSection: section })
    this.props.onSectionSelect && this.props.onSectionSelect(section)
  }

  renderContentComponent() {
    return this.props.renderContent ? this.props.renderContent() : this.renderText()
  }

  renderContentHeader() {
    return this.props.renderContentHeader ? this.props.renderContentHeader() : this.renderHeader()
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
  
  renderHeader() {
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

  renderText() {
    const {
      lightThemeBackgroundColor,
      lightThemeTextColor
    } = this.props
    return Utils.renderResponsive(
      'text',
      <Components.Text
        source={this.props.section.text}
        style={{
          paddingBottom: '60px',
          maxWidth: '',
          backgroundColor: lightThemeBackgroundColor,
          color: lightThemeTextColor
        }}
      />,
      <Components.Text
        source={this.props.section.text}
        style={{
          paddingBottom: '60px',
          maxWidth: '',
          backgroundColor: lightThemeBackgroundColor,
          color: lightThemeTextColor
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

  render() {
    const {
      sections,
      section,
      lightThemeBackgroundColor,
      buttonsBackgroundColor,
      lightThemeTextColor,
      buttonsTextColor
    } = this.props
    const { Sider, Content } = Layout
    
    return (
      <div >
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            style={{
              backgroundColor: lightThemeBackgroundColor
            }}
          >
            <Menu
              defaultSelectedKeys={[this.props.section.path]}
              mode="inline"
              style={{
                backgroundColor: lightThemeBackgroundColor
              }}
            >
              {sections.map((item) =>
                this.renderMenuItem(item, this.selectedSection)
              )}
            </Menu>
          </Sider>
          {section && (
            <Layout>
              <Content
                style={{
                  backgroundColor: lightThemeBackgroundColor
                }}
              >
                { this.renderContentHeader() }
                { this.renderContentComponent() }
              </Content>
            </Layout>
          )}
        </Layout>
      </div>
    )
  }
}
