import React from 'react'
import Component from '../core/Component'
import ReactPlaceholder from 'react-placeholder'
import { TextBlock, MediaBlock, TextRow, RectShape, RoundShape } from 'react-placeholder/lib/placeholders'
import marked from 'marked'
import 'react-placeholder/lib/reactPlaceholder.css'
import URL from 'url-parse'

export default class Text extends Component {

  constructor (props) {
    super(props)
    this.state = { ...this.state, loading: true }
  }

  componentDidMount () {
    super.componentDidMount()
    this.loadContent()
  }

  parseUrl (source) {
    const ref = new URL(source)
    const type = ref.protocol.slice(0, -1).toLowerCase()
    const fullPath = `${ref.hostname}${ref.pathname ? ref.pathname : ''}`

    switch (type) {
      case 'local':
        return `/assets/text/${fullPath}.md`
      case 'github':
        return `https://raw.githubusercontent.com/${fullPath}.md`
      case 'dropbox':
        return `https://dl.dropboxusercontent.com/s/${fullPath}.md?raw=1&dl=1`
      case 'https':
      case 'http':
        return source
      default:
    }
  }

  loadFromUrl (url) {
    return fetch(url)
           .then(response => response.text())
           .then(markdown => marked(markdown, {}))
  }

  loadContent () {
    console.log('TEXT', this.props.source)
    const url = this.parseUrl(this.props.source)

    if (!url) {
      return
    }

    this.loadFromUrl(url)
            .then(text => {
              this.setState({ loading: false, text })
            })
            .catch(error => {
              this.setState({ error })
            })
  }

  get placeholder () {
    return (<div style={{justifyContent: 'center'}}>
      <RectShape color='#CFD8DC' style={{height: 40, marginBottom: 10}} />
      <TextBlock rows={7} color='#ECEFF1' />
    </div>)
  }

  renderComponentContent ({ titleColor, textColor }) {
    const className = `text`
    return (<div>
      <div className={className} dangerouslySetInnerHTML={{ __html: this.state.text }} />
    </div>)
  }

  renderComponent () {
    return (<div style={Object.assign({}, {
      textAlign: 'center',
      padding: '20px'
    }, this.props.style)}>
      <ReactPlaceholder
        showLoadingAnimation
        rows={7}
        ready={!this.state.loading}
        customPlaceholder={this.placeholder}>
        { this.renderComponentContent({ titleColor: '#263238', textColor: '#455A64' }) }
      </ReactPlaceholder>
    </div>)
  }
}
