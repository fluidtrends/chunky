module.exports = (_props) => ({
  assets: require('./assets')(_props),
  package: require('./package')(_props),
  manifest: require('./manifest')(_props),
  assets: require('./assets')(_props),
  chunks: require('./chunks')(_props),
  web: require('./web')(_props),
  props: Object.assign({}, _props)
})
