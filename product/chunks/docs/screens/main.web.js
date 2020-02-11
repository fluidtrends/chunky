import React from 'react'
import { Screen, Components } from 'react-dom-chunky'
import Section from '../components/Section'

export default class DocsScreen extends Screen {
  constructor(props) {
    super(props)
    this.state = { ...this.state }
    this._onSectionSelect = this.onSectionSelect.bind(this)
  }

  componentDidMount() {
    super.componentDidMount()
  }

  onSectionSelect(section) {
    this.setState({ section })
    this.triggerRedirect(`${this.props.path}/${section.path}`)
  }

  get selectedSection() {
    return this.state.section || this.variant
  }

  components() {
    const {
      lightThemeBackgroundColor,
      lightThemeTextColor,
      buttonsBackgroundColor,
      buttonsTextColor,
      selectionBackgroundColor
    } = this.props
    return [
      <Section
        lightThemeBackgroundColor={lightThemeBackgroundColor}
        lightThemeTextColor={lightThemeTextColor}
        buttonsBackgroundColor={buttonsBackgroundColor}
        buttonsTextColor={buttonsTextColor}
        theme={this.props.theme}
        selectionBackgroundColor={selectionBackgroundColor}
        sections={this.variants}
        section={this.selectedSection}
        onSectionSelect={this._onSectionSelect}
      />
    ]
  }
}
