import React from 'react'
import TransitionGroup from 'react-addons-transition-group'
import { Core, Data } from 'react-chunky'
import { Redirect } from 'react-router'
import { default as Component } from './Component'
import * as DefaultComponents from '../components'
import merge from 'deepmerge'
import { breakpoints } from '../utils/responsive'
import { default as Layout } from './Layout'
import URL from 'url-parse'
import { detect } from 'detect-browser'

export default class Screen extends Core.Screen {

  constructor (props) {
    super(props)
    this.state = { ...this.state, progress: true, progressTitle: this.progressTitle, height: 0, width: 0, scroll: 0 }
    this._updateScroll = this.updateScroll.bind(this)
    this._updateWindowDimensions = this.updateWindowDimensions.bind(this)
    this._onMenuItem = this.onMenuItem.bind(this)
  }

  componentDidMount () {
    super.componentDidMount()
    this._updateWindowDimensions()
    window.addEventListener('resize', this._updateWindowDimensions)
    window.addEventListener('scroll', this._updateScroll)
    this.unsubscribeFromHistory = this.props.history.listen(this.handleLocationChange.bind(this))
    this._onEvent = this.onEvent.bind(this)
    this._browser = detect()
    this._load(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.match.url !== nextProps.match.url) {
      // this.setState({ progress: true })
      this._load(nextProps)
      return
    }
    super.componentWillReceiveProps(nextProps)
  }

  handleLocationChange (location) {
    // this.setState({ progress: true })
    // this._load()
  }

  get browser () {
    return this._browser
  }

  scrollToTop () {
    window.scrollTo(0, 0)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this._updateWindowDimensions)
    window.removeEventListener('scroll', this._updateScroll)
    this.unsubscribeFromHistory()
  }

  onMenuItem (item) {
    if (item.action && this[item.action]) {
      this[item.action](item)
      return
    }

    if (item.link) {
      this.triggerRawRedirect(item.link)
      return
    }

    if (item.path) {
      this.triggerRedirect(item.path)
    }
  }

  get menu () {
    return (this.props.menu || []).concat([])
  }

  get sideMenu () {
    return this.menu
  }

  get isSmallScreen () {
    return this.width < breakpoints.main
  }

  get layout () {
    return Layout
  }

  get expectsVariants () {
    return (this.props.variants !== undefined)
  }

  updateWindowDimensions () {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  updateScroll () {
    const scroll = window.scrollY
    this.setState({ scroll })
  }

  handleLocalEvent (fullPath) {
    this.triggerRedirect(fullPath)
  }

  handleExternalEvent (fullPath) {
    this.triggerRawRedirect(fullPath)
  }

  importData (name) {
    try {
      return require(`chunks/${this.props.chunkName}/data/${name}.json`)
    } catch (e) {
    }
  }

  importRemoteData (url) {
    return fetch(url).then(response => response.json())
  }

  _loadVariants () {
    return new Promise((resolve, reject) => {
      if (this.props.variants.split('http://').length > 1 ||
        this.props.variants.split('https://').length > 1) {
        fetch(this.props.variants).then(response => resolve(response.json()))
        return
      }

      const data = this.importData(this.props.variants)

      if (!data || !Array.isArray(data) || data.length === 0) {
        resolve([])
        return
      }

      resolve(data)
    })
    .then(data => {
      this._variants = [].concat(data)
      return this.variants
    })
  }

  get variants () {
    return this._variants
  }

  get hasVariants () {
    return (this._variants !== undefined)
  }

  get isRootPath () {
    return this.isSamePath(this.path, this.props.path)
  }

  isSamePath (first, second) {
    return (first === second || second === `/${first}` ||
        second === `/${first}/` || second === `${first}/`)
  }

  _updateVariants () {
    if (!this.hasVariants) {
      throw new Error('Missing expected variant')
    }

    const variantPath = this.path.substring(this.props.path.length + 1)

    this.variants.forEach(variant => {
      if (!this.isSamePath(variant.path, variantPath)) {
        return
      }
      this._variant = Object.assign({}, variant)
    })

    if (!this.isVariantValid) {
      throw new Error('Invalid variant')
    }

    // We've got a valid variant now
    this.setState({ progress: false })
  }

  _load (props) {
    this.scrollToTop()
    this._path = props.location.pathname

    if (this.props.skipRootVariant && this.expectsVariants && this.isRootPath) {
      this.setState({ progress: false, skip: true })
      return
    }

    if (!this.expectsVariants || this.isRootPath) {
      this.setState({ progress: false })
      return
    }

    try {
      if (!this.hasVariants) {
        this._loadVariants()
            .then(() => {
              this._updateVariants()
            })
        return
      }

      this._updateVariants()
    } catch (e) {
      // Could not load variant path data
      this.stopWithError(e)
    }
  }

  stopWithError (e) {
    this.setState({ stopError: e, progress: false })
  }

  get isVariantValid () {
    return (this.expectsVariants && this.variant)
  }

  get _props () {
    return Object.assign({}, (this.variant ? merge.all([this.props, this.variant]) : this.props),
                         { menu: this.menu, sideMenu: this.sideMenu })
  }

  get variant () {
    return this._variant
  }

  pushTransition (transition, data) {
    var pathname = (transition.data.path.charAt(0) === ':' ? (data[transition.data.path.substring(1)] || transition.data.path) : transition.data.path)

    this.setState({redirect: { transition, data, push: true, pathname }})
  }

  replaceTransition (transition, data) {
    var pathname = (transition.data.path.charAt(0) === ':' ? (data[transition.data.path.substring(1)] || transition.data.path) : transition.data.path)

    this.setState({redirect: { transition, data, push: false, pathname }})
  }

  get account () {
    return this.props.account
  }

  get isLoggedIn () {
    return this.account
  }

  get width () {
    return this.state.width
  }

  get height () {
    return this.state.height
  }

  get scroll () {
    return this.state.scroll
  }

  get path () {
    return this._path
  }

  components () {
    if (this.props.components) {
      return Object.keys(this.props.components)
    }
    return []
  }

  logout () {
    this.props.onUserLogout && this.props.onUserLogout()
  }

  loggedIn (account) {
    this.props.onUserLoggedIn && this.props.onUserLoggedIn(account)
  }

  loadCustomComponent () {
  }

  loadSingleComponent (props) {
    const source = `${props.source.charAt(0).toUpperCase()}${props.source.toLowerCase().slice(1)}`
    var Component = DefaultComponents[source]

    if (!Component) {
      Component = this.loadCustomComponent()
    }

    if (!Component) {
      return <div />
    }

    return <Component {...this.defaultComponentProps} {...props} />
  }

  loadComponent (name, index) {
    if (!this.props.components || !this.props.components[name] || !(typeof this.props.components[name] === 'object')) {
      return <div />
    }

    if (!Array.isArray(this.props.components[name])) {
      return this.loadSingleComponent(Object.assign({}, this.props.components[name], { index }))
    }

    var subIndex = 0
    return <div>
      { this.props.components[name].map(props => {
        return this.loadSingleComponent(Object.assign({}, props, { key: `component.${subIndex++}`, index: `${index}.${subIndex}` }))
      })}
    </div>
  }

  get defaultComponentProps () {
    return Object.assign({}, {
      cache: this.cache,
      onEvent: this._onEvent,
      width: this.state.width,
      height: this.state.height,
      isSmallScreen: this.isSmallScreen,
      smallScreenBreakPoint: this.smallScreenBreakPoint
    }, this.props)
  }

  renderComponent (OriginalComponent, index) {
    const props = Object.assign({}, this.defaultComponentProps, { index })
    var ComponentContainer = React.cloneElement(OriginalComponent, Object.assign({}, this.defaultComponentProps, { index }))

    if (typeof OriginalComponent.type === 'string') {
      return <Component {...props} key={`${index}`} style={{ alignSelf: 'stretch' }}>
        { OriginalComponent }
      </Component>
    }

    if (typeof OriginalComponent === 'string') {
      ComponentContainer = this.loadComponent(OriginalComponent, index)
    }

    return (
      <TransitionGroup key={`${index}`} style={{ alignSelf: 'stretch' }}>
        { ComponentContainer }
      </TransitionGroup>
    )
  }

  renderComponents () {
    if (!this.components() || this.components().length === 0) {
      return
    }

    var index = 1
    return this.components().map(component => {
      index = index + 1
      return this.renderComponent(component, index)
    })
  }

  redirect (pathname) {
    return (<Redirect exact push to={{
      pathname
    }} />)
  }

  triggerRedirect (link) {
    if (this.isSamePath(this.path, link)) {
      return
    }

    this.setState({redirect: {push: true, pathname: link}})
  }

  triggerRawRedirect (link) {
    window.open(link, '_blank')
  }

  get cover () {
    return this._props.cover
  }

  renderScreenLayout () {
    const ScreenLayout = this.layout
    return <ScreenLayout
      onMenuItem={this._onMenuItem}
      onEvent={this._onEvent}
      scroll={this.state.scroll}
      width={this.state.width}
      height={this.state.height}
      {...this._props}
      cache={this.props.cache}
      cover={this.cover}>
      {this.renderComponents()}
    </ScreenLayout>
  }

  saveAuth (account) {
    return Data.Cache.cacheAuth(account).then(() => {
      this.loggedIn(account)
    })
  }

  renderStopError (e) {
    return <div />
  }

  renderProgress () {
    return <div />
  }

  render () {
    if (this.state.skip) {
      return <div />
    }

    if (this.state.progress) {
      return this.renderProgress()
    }

    if (this.state.stopError) {
      return this.renderStopError(this.state.stopError)
    }

    if (this.state.height === 0) {
      return <div />
    }

    if (this.state.redirect) {
      const { pathname, push } = this.state.redirect
      if (!this.isSamePath(this.path, pathname)) {
        return this.redirect(pathname, push)
      }
    }

    var height = `${this.height}px`

    return (<div style={{ height, position: 'relative' }}>
      { this.renderScreenLayout() }
      <style jsx>{`{
        :global(body){
            background-color: ${this.props.backgroundColor};
            margin: 0;
            padding: 0;
        }`}
      </style>
    </div>
    )
  }
}
