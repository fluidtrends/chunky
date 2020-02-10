import React from 'react'
import { Screen, Components } from 'react-dom-chunky'
import { Row, Col, Input } from 'antd'

export default class CoverExampleScreen extends Screen {
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
      defaults: this.examples.coverDefaults
    })
  }

  get examples() {
    return this._examples || {}
  }

  handleChange = (name, e) => {
    try {
      ;(name === 'titleStyle' && JSON.parse(e.target.value)) ||
        (name === 'subtitleStyle' && JSON.parse(e.target.value))
    } catch (error) {
      this.setState({ error: 'Invalid JSON format.', [name]: e.target.value })
      return false
    }
    this.setState({ [name]: e.target.value, error: null })
  }

  renderFields(defaults) {
    if (!defaults) return null
    return (
      <div style={{ minHeight: '400px' }}>
        {Object.keys(defaults).map(key => (
          <Row gutter={16} style={{ margin: 10 }}>
            <Col xl={8} lg={8} sm={8} xs={24}>
              {key}
            </Col>
            <Col xl={16} lg={16} sm={16} xs={24}>
              <Input
                name={key}
                value={
                  this.state[key] || this.state[key] === ''
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
      </div>
    )
  }

  renderCover() {
    const { Cover } = Components
    const {
      defaults,
      source,
      image,
      opacity,
      title,
      subtitle,
      type,
      error,
      titleStyle,
      subtitleStyle
    } = this.state
    if (this.state.defaults)
      return (
        <Cover
          source={source || defaults.source}
          image={image || defaults.image}
          opacity={opacity || defaults.opacity}
          title={title || title === '' ? title : defaults.title}
          type={type && type !== 'ico' ? type : defaults.type}
          subtitle={subtitle || subtitle === '' ? subtitle : defaults.subtitle}
          titleStyle={
            titleStyle && !error ? JSON.parse(titleStyle) : defaults.titleStyle
          }
          subtitleStyle={
            subtitleStyle && !error
              ? JSON.parse(subtitleStyle)
              : defaults.subtitleStyle
          }
        />
      )
  }

  renderContent() {
    const { error, defaults } = this.state
    return (
      <React.Fragment>
        <Row
          gutter={16}
          style={{ display: 'flex', alignItems: 'center', margin: 20 }}
        >
          <Col span={24}>
            {this.renderFields(defaults)}
            {error && (
              <p style={{ fontSize: '16px', margin: 20, color: '#e53935' }}>
                {error}
              </p>
            )}
          </Col>
        </Row>
        <Row style={{ marginTop: '150px' }}>
          <Col xl={24} lg={24} sm={24} xs={24}>
            {this.renderCover()}
          </Col>
        </Row>
      </React.Fragment>
    )
  }

  components() {
    return super.components().concat(this.renderContent())
  }
}
