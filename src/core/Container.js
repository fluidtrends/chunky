import { connect } from 'react-redux'

export default function (component, selectors, actions) {

  const mapStateToProps = (state, props) => {
    var results = {}
    for (let selector in selectors) {
      results[selector] = (options) => selectors[selector](state, Object.assign(options || {}, props))
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
