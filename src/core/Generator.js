import URL                  from 'url-parse'
import Container            from './Container'
import { 
  Actions, 
  Selectors, 
  Reducers, 
  Providers 
} from '../data'

export default class Generator {

  constructor(props) {
    this._props = props
  }

  get props () {
    return this._props
  }

  generateSelectors(chunk) {
    const hasData = Selectors.common.hasData(chunk.name)
    const getData = Selectors.common.getData(chunk.name)
    const hasError = Selectors.common.hasError(chunk.name)
    const getError = Selectors.common.getError(chunk.name)
    const isDone = Selectors.common.isDone(chunk.name)
    const isInProgress = Selectors.common.isInProgress(chunk.name)

    return {
      [`${chunk.name}HasData`]: hasData,
      [`${chunk.name}Data`]: getData,
      [`${chunk.name}HasError`]: hasError,
      [`${chunk.name}Error`]: getError,
      [`${chunk.name}IsDone`]: isDone,
      [`${chunk.name}IsInProgress`]: isInProgress
    }
  }

  generateAction(chunk, action) {
    if (!action.operation || !action.provider || !this.props.dataProviders[action.provider]) {
      // All actions must specify an operation and a data provider
      return
    }

    // Look up the data provider first
    const provider = this.props.dataProviders[action.provider]

    if (!provider) {
      // We want to make sure we have a valid data provider before we move on
      return
    }

    // Let's build up the operation from the data provider
    const operation = (props) => provider.operation(Object.assign({props}, action.operation))

    // And finally, let's use that operation to generate an action
    return (props) => {
      if (action.provider === 'local') {
        var all = []
        var localChunks = {}
        const opts = action.operation.options

        if (opts && opts.chunks) {
          var chunksArray = opts.chunks.split(',')
          chunksArray.forEach(localChunk => {
            localChunks[localChunk] = localChunk
          })
        }

        for(const chunkName in this.props.chunks) {
          if (Object.keys(localChunks).length === 0 || localChunks[chunkName]) {
            all.push({name: `${chunkName}/${action.name}`, operation: () => operation(props), provider: action.provider})
          }
        }
        
        if (all.length > 0) {
          return Actions.common.syncActions(all)
        }
      }

      return Actions.common.asyncAction(`${chunk.name}/${action.name}`, () => operation(props), action.provider)
    }
  }

  parseActionFromURI(uri) {
    const url = new URL(uri, true)
    const action = {
      name: url.hash.substring(1),
      provider: url.protocol.slice(0, -1).toLowerCase(),
      operation: {
        type: url.hostname.toLowerCase(),
        arguments: url.pathname.toLowerCase().split("/").slice(1),
        options: url.query
      }
    }

    return action
  }

  generateActions(chunk, actions) {
    if (!actions || !Array.isArray(actions) || actions.length === 0) {
      return {}
    }

    var all = {}
    actions.forEach(actionUri => {
      // Parse the action from the URI
      const action = this.parseActionFromURI(actionUri)

      // Attempt to generate this action
      const generatedAction = this.generateAction(chunk, action)

      if (generatedAction) {
        // Keep track of it if it was successfully generated
        all[action.name] = generatedAction
      }
    })

    return all
  }

  generateContainer(chunk, route) {
    const actions = Object.assign({}, this.generateActions(chunk, route.actions))
    const selectors = Object.assign({}, this.generateSelectors(chunk))

    return Container(route.screen, selectors, actions, {
      api: this.props.api,
      options: route,
      chunk
    })
  }

  generateReducer(chunk) {
    return Reducers.common.asyncReducer(chunk.name)
  }
}
