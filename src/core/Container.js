import { connect } from 'react-redux'

export default function (component, selectors, actions, context) {
  const mapStateToProps = (state, props) => {
    var newProps = {}

    for (let name in selectors) {
      const selector = selectors[name]
      const selectorProps = (options) =>  Object.assign(options || {}, props)
      const result = (options) => selector(state, selectorProps(options))
      newProps[name] = result
    }

    return newProps
  }

  const mapDispatchToProps = (dispatch, props) => {
    var newProps = {}
    for (let action in actions) {
      const actionProps = (options) => Object.assign(options || {}, props, { chunky: context })
      newProps[action] = (options) => dispatch(actions[action](actionProps(options)))
    }

    return newProps
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(component)
}
