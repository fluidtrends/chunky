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
      theme: 'dark',
      counter: 0,
      selectedSection: null
    }
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  changeTheme = value => {
    this.setState({
      theme: value ? 'dark' : 'light',
      counter: this.state.counter ? this.state.counter + 1 : 1
    })
  }

  onSectionSelect = section => {
    this.setState({ selectedSection: section })
    this.props.onSectionSelect && this.props.onSectionSelect(section)
  }

  renderContentComponent() {
    return this.props.renderContent
      ? this.props.renderContent()
      : this.renderText()
  }

  renderText() {
    const {
      lightThemeBackgroundColor,
      lightThemeTextColor,
      darkThemeBackgroundColor,
      darkThemeTextColor
    } = this.props
    return Utils.renderResponsive(
      'text',
      <Components.Text
        source={this.props.section.text}
        style={{
          paddingBottom: '60px',
          maxWidth: '',
          backgroundColor:
            this.state.theme === 'dark'
              ? darkThemeBackgroundColor
              : lightThemeBackgroundColor,
          color:
            this.state.theme === 'dark'
              ? darkThemeTextColor
              : lightThemeTextColor
        }}
      />,
      <Components.Text
        source={this.props.section.text}
        style={{
          paddingBottom: '60px',
          maxWidth: '',
          backgroundColor:
            this.state.theme === 'dark'
              ? darkThemeBackgroundColor
              : lightThemeBackgroundColor,
          color:
            this.state.theme === 'dark'
              ? darkThemeTextColor
              : lightThemeTextColor
        }}
      />
    )
  }

  renderMenuItem = (item, index) => {
    const {
      lightThemeBackgroundColor,
      darkThemeBackgroundColor,
      selectionBackgroundColor
    } = this.props
    return item.subSection ? (
      <SubMenu
        key={`submenu-${index}`}
        style={{ margin: '10px 0' }}
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
            item.path === this.state.selectedSection.path
              ? selectionBackgroundColor
              : this.state.theme === 'dark'
              ? darkThemeBackgroundColor
              : lightThemeBackgroundColor
        }}
      >
        <div onClick={() => this.onSectionSelect(item)}>
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
      darkThemeBackgroundColor,
      buttonsBackgroundColor,
      darkThemeTextColor,
      lightThemeTextColor,
      buttonsTextColor
    } = this.props
    const { Sider, Content } = Layout
    return (
      <div>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            style={{
              backgroundColor:
                this.state.theme === 'dark'
                  ? darkThemeBackgroundColor
                  : lightThemeBackgroundColor
            }}
          >
            <Switch
              checked={this.state.theme === 'dark'}
              onChange={this.changeTheme}
              checkedChildren="Dark"
              unCheckedChildren="Light"
              style={{
                margin: '15px auto',
                display: 'block',
                width: '60px',
                backgroundColor: buttonsBackgroundColor,
                color: buttonsTextColor
              }}
            />
            <span
              style={{
                display: 'flex',
                textAlign: 'center',
                padding: 10,
                color:
                  this.state.theme === 'dark'
                    ? darkThemeTextColor
                    : lightThemeTextColor
              }}
            >
              I'm having fun changing the theme 😂🤷‍♂️. So far I did it :{' '}
              {this.state.counter ? this.state.counter.toString() : 0} times.
              💪🤩
            </span>
            {this.state.counter >= 20 && this.state.counter < 50 ? (
              <span
                style={{
                  display: 'flex',
                  textAlign: 'center',
                  padding: 10,
                  color:
                    this.state.theme === 'dark'
                      ? darkThemeTextColor
                      : lightThemeTextColor
                }}
              >
                Somebody stop him. 😱
              </span>
            ) : null}
            {this.state.counter >= 50 && this.state.counter < 100 ? (
              <span
                style={{
                  display: 'flex',
                  textAlign: 'center',
                  padding: 10,
                  color:
                    this.state.theme === 'dark'
                      ? darkThemeTextColor
                      : lightThemeTextColor
                }}
              >
                You should really focus on the docs now ... 😓
              </span>
            ) : null}
            {this.state.counter >= 100 ? (
              <span
                style={{
                  display: 'flex',
                  textAlign: 'center',
                  padding: 10,
                  color:
                    this.state.theme === 'dark'
                      ? darkThemeTextColor
                      : lightThemeTextColor
                }}
              >
                Really? 👀😨 Chunky is scared now. 🙈
              </span>
            ) : null}
            <Button
              type="primary"
              onClick={this.toggleCollapsed}
              style={{
                margin: '15px auto',
                display: 'block',
                backgroundColor: buttonsBackgroundColor,
                color: buttonsTextColor,
                border: 0
              }}
            >
              <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
            </Button>
            <Menu
              defaultSelectedKeys={['intro']}
              mode="inline"
              style={{
                backgroundColor:
                  this.state.theme === 'dark'
                    ? darkThemeBackgroundColor
                    : lightThemeBackgroundColor
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
                  backgroundColor:
                    this.state.theme === 'dark'
                      ? darkThemeBackgroundColor
                      : lightThemeBackgroundColor
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
