import { connect } from 'react-redux'

export default function (component, selectors, actions) {

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
      results[action] = (options) => dispatch(actions[action](Object.assign(options || {}, props)))
    }

    return results
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(component)
}
