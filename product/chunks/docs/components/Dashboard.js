import React, { PureComponent } from 'react'
import { Menu, Icon, Button, Switch } from 'antd'
import { Layout } from 'antd'
import { Utils, Components } from 'react-dom-chunky'

const SubMenu = Menu.SubMenu

export default class Dashboard extends PureComponent {
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

  renderMenuItem = (item, index) => {
    const {
      lightThemeBackgroundColor,
      selectionBackgroundColor,
      lightThemeTextColor
    } = this.props

    return item.subSection ? (
      <SubMenu
        key={`submenu-${index}`}
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
            this.state.selectedSection &&
            item.path === this.state.selectedSection.path ? selectionBackgroundColor : lightThemeBackgroundColor
        }}
      >
        <div onClick={() => this.onSectionSelect(item)}
          style= {{
            color: lightThemeTextColor
          }} >
          {item.icon ? <Icon type={item.icon} /> : null}
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
              defaultSelectedKeys={['intro']}
              mode="inline"
              style={{
                backgroundColor: lightThemeBackgroundColor
              }}
            >
              {sections.map((item, index) =>
                this.renderMenuItem(item, index, this.state.selectedSection)
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
                {this.renderContentComponent()}
              </Content>
            </Layout>
          )}
        </Layout>
      </div>
    )
  }
}
