import React from 'react'
import { Screen, Components } from 'react-dom-chunky'
import Dashboard from '../components/Dashboard'

export default class DocsScreen extends Screen {
  constructor(props) {
    super(props)
    this.state = { ...this.state }
    this._onSectionSelect = this.onSectionSelect.bind(this)
  }

  componentDidMount() {
    super.componentDidMount()
    this._sections = this.importData('sections')

    if (!this.sections || this.sections.length === 0) {
      return
    }

    var section = this.sections[0]

    if (this.isRootPath) {
      this.setState({ section })
      return
    }

    this.sections.forEach(s => {
      if (!this.isSamePath(this.path, `${this.props.path}/${s.path}`)) {
        return
      }
      section = Object.assign({}, s)
    })

    this.setState({ section })
  }

  get sections() {
    return this._sections || []
  }

  onSectionSelect(section) {
    this.setState({ section })
  }

  components() {
    const {
      lightThemeBackgroundColor,
      lightThemeTextColor,
      darkThemeBackgroundColor,
      darkThemeTextColor,
      buttonsBackgroundColor,
      buttonsTextColor,
      selectionBackgroundColor
    } = this.props
    return [
      <Dashboard
        lightThemeBackgroundColor={lightThemeBackgroundColor}
        lightThemeTextColor={lightThemeTextColor}
        darkThemeBackgroundColor={darkThemeBackgroundColor}
        darkThemeTextColor={darkThemeTextColor}
        buttonsBackgroundColor={buttonsBackgroundColor}
        buttonsTextColor={buttonsTextColor}
        selectionBackgroundColor={selectionBackgroundColor}
        sections={this.sections}
        section={this.state.section}
        onSectionSelect={this._onSectionSelect}
      />
    ]
  }
}
