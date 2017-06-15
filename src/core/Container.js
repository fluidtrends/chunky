import { connect } from 'react-redux'
 
function mapStateToProps (selectors) {
  return (state, props) => {
    if (!props.chunkName || !state[props.chunkName]) {
      return props
    }
    
    // const slice = state[props.chunkName]
    // if (slice.inProgress) {
    //   console.log(props.chunkName, " IN PROGRESS")
    // } else {
    //   console.log(props.chunkName, " DONE!")      
    // }

    var newProps = {}
    for (let name in selectors) {
      const selector = selectors[name]
      const selectorProps = (options) =>  Object.assign(options || {}, props)
      const result = (options) => selector(state, selectorProps(options))
      newProps[name] = result
    }

    return newProps
  }
}

function mapDispatchToProps (actions) {
  return (dispatch, props) => {
    var newProps = {}
    for (let action in actions) {
      const actionProps = (options) => Object.assign(options || {}, props, { })
      newProps[action] = (options) => dispatch(actions[action](actionProps(options)))
    }

    return newProps
  }
}

export default function (component, selectors, actions) {
  return connect(
    mapStateToProps(selectors),
    mapDispatchToProps(actions)
  )(component)
}
