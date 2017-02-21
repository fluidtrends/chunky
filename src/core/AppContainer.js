import ErrorStackParser     from 'error-stack-parser'
import React, { Component } from 'react'
import { Provider }         from 'react-redux'
import DataStore            from '../data/store'
import * as Errors          from '../errors'
import Container            from './Container'

export default class AppContainer extends Component {

  constructor(props) {
    super(props)

    this.parseChunks()

    // Initialize the store with custom app reducers
    this.state = { store: DataStore(this.reducers) }
  }

  get app () {
    return React.cloneElement(this.props.children, {
      initialChunk: this.initialChunk,
      initialRoute: this.initialRoute,
      chunks: this.chunks
    })
  }

  get initialChunk () {
    return this.chunks[this.props.startChunk]
  }

  get initialRoute () {
    const chunk = this.initialChunk
    return (chunk && chunk.routes ? chunk.routes[chunk.startRoute] : undefined)
  }

  get chunks() {
    return this._chunks
  }

  parseChunks() {
    this._reducers = {}

    if (!this.props.chunks) {
      return
    }


    for (let chunkName in this.props.chunks) {
      const chunk = this.props.chunks[chunkName]
      Object.assign(this._reducers, chunk.reducers || {})

      if (chunk.routes) {
        for (let routeName in chunk.routes) {

          const route = chunk.routes[routeName]
          if (route.screen && route.container) {
            // Resolve containers
            chunk.routes[routeName].screen = Container(route.screen, route.container.selectors, route.container.actions, {
              api: this.props.api,
              chunk
            })
          }
        }
      }

      this._chunks = this._chunks || {}
      this._chunks[chunkName] = chunk
    }

    for (let chunkName in this.chunks) {
      const chunk = this.chunks[chunkName]

      if (chunk.routes) {
        for (let routeName in chunk.routes) {

          const route = chunk.routes[routeName]

          if (route.transitions) {
            // Resolve transitions
            for(let transitionName in route.transitions) {
              const transition = route.transitions[transitionName]
              route.transitions[transitionName].route = this.resolveTransitionRoute(transition)
            }
          }
        }
      }
    }
  }

  resolveTransitionRoute(transition) {
    if (!transition.id) {
      return
    }

    const [chunkName, routeId] = transition.id.split("/")
    const chunk = this.chunks[chunkName]

    if (!chunk || !chunk.routes[routeId]) {
      return
    }

    return chunk.routes[routeId]
  }

  get reducers() {
    return this._reducers
  }

  enableGlobalErrorHandler() {
    const self = this
    ErrorUtils.setGlobalHandler((e, isFatal) => {
      // Extract a meaningful stack trace
      const stack = ErrorStackParser.parse(e)

      // Notify the app that an error has occured
      self.setState({ error: e, isErrorFatal: isFatal, errorStack: stack })
    });
  }

  componentDidMount() {
    // this.enableGlobalErrorHandler()
  }

  render() {
    if (React.Children.count(this.props.children) !== 1) {
      throw new Errors.UNABLE_TO_LOAD_APP()
    }

    console.log("CHUNKS", this.chunks);

    if (!this.chunks) {
      throw new Errors.UNABLE_TO_LOAD_CHUNKS()
    }

    return (
      <Provider store={this.state.store}>
        { this.app }
      </Provider>
    )
  }
}
