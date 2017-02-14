import { connect } from 'react-redux'

export default function (component, selectors, actions, context) {

  const mapStateToProps = (state, props) => {
    var results = {}

    for (let name in selectors) {
      const selector = selectors[name]
      const selectorProps = (options) =>  Object.assign(options || {}, props)
      const result = (options) => selector(state, selectorProps(options))
      results[name] = result
    }

    return results
  }

  const mapDispatchToProps = (dispatch, props) => {
    var results = {}

    for (let action in actions) {
      const actionProps = (options) => Object.assign(options || {}, props, { chunky: context })
      results[action] = (options) => dispatch(actions[action](actionProps(options)))
    }

    return results
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(component)
}
