import React from 'react'
import { Screen, Components } from 'react-dom-chunky'
import { Row, Col, Input } from 'antd'

export default class TextExampleScreen extends Screen {
  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      defaults: null,
      error: null
    }
  }

  componentDidMount() {
    super.componentDidMount()
    this._examples = this.importData('examples')
    this.setState({
      defaults: this.examples.textDefaults
    })
  }

  get examples() {
    return this._examples || {}
  }

  handleChange = (name, e) => {
    try {
      name === 'style' && JSON.parse(e.target.value)
    } catch (error) {
      this.setState({ error: 'Invalid JSON format.', [name]: e.target.value })
      return false
    }
    this.setState({ [name]: e.target.value, error: null })
  }

  renderFields(defaults) {
    if (!defaults) return null
    return (
      <React.Fragment>
        {Object.keys(defaults).map(key => (
          <Row gutter={16} style={{ margin: 10 }}>
            <Col xl={8} lg={8} sm={8} xs={24}>
              {key}
            </Col>
            <Col xl={16} lg={16} sm={16} xs={24}>
              <Input
                name={key}
                value={
                  this.state[key]
                    ? this.state[key]
                    : typeof defaults[key] === 'object'
                    ? JSON.stringify(defaults[key])
                    : defaults[key]
                }
                onChange={this.handleChange.bind(this, key)}
              />
            </Col>
          </Row>
        ))}
      </React.Fragment>
    )
  }

  renderText() {
    const { Text } = Components
    const { defaults, source, style, error, textSource } = this.state
    if (this.state.defaults)
      return (
        <Text
          source={source ? source : defaults.source}
          textSource={textSource ? textSource : defaults.textSource}
          style={style && !error ? JSON.parse(style) : defaults.style}
        />
      )
  }

  renderContent() {
    const { error, defaults } = this.state
    return (
      <Row
        gutter={16}
        style={{ display: 'flex', alignItems: 'center', margin: 20 }}
      >
        <Col xl={12} lg={12} sm={12} xs={24}>
          {this.renderFields(defaults)}
          {error && (
            <p style={{ fontSize: '16px', margin: 20, color: '#e53935' }}>
              {error}
            </p>
          )}
        </Col>
        <Col xl={12} lg={12} sm={12} xs={24}>
          {this.renderText()}
        </Col>
      </Row>
    )
  }

  components() {
    return super.components().concat(this.renderContent())
  }
}
