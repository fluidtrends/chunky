import { StackNavigator, TabNavigator, DrawerNavigator, DrawerView, NavigationActions } from 'react-navigation'
import URL from 'url-parse'
import React, { PureComponent } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Icon } from 'react-native-elements'

import { Image, Platform, NetInfo, Button, View, Text, ScrollView, ActivityIndicator } from 'react-native'
import { Styles } from 'react-chunky'

/**
 * The main React Native Chunky App instance is in charge of parsing the chunky.json
 * content and generating the app sections and navigators. This is the main entry point
 * for a Chunky mobile app. This class is not to be instantiated manually, but it is rather
 * invoked by the main Chunky AppContainer.
 * @extends {PureComponent}
 */
export default class App extends PureComponent {

  /**
   * This App constructor is not to be called manually, but it's injected by the Chunky AppContainer
   * @param {object} props the App gets its properties injected by the Chunky AppContainer
   */
  constructor(props) {
    super(props)

    // We're ready to keep track of our app sections and navigator
    this.state = { hasNetworkConnection: true }
  }

  renderProgress() {
    return ( <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: this.props.theme.primaryColor }}>
      <ActivityIndicator color= "#ffffff"/>
    </View>)
  }

  restart(hasNetworkConnection) {
    const sections = this._createSections()
    const navigator = this._createAppNavigator(sections)
    this.setState({ sections, navigator, hasNetworkConnection })
  }

  componentDidMount() {
    NetInfo.isConnected.fetch().done(hasNetworkConnection => this._handleConnectivityChange(hasNetworkConnection))
    NetInfo.isConnected.addEventListener( 'change', (hasNetworkConnection) => this._handleConnectivityChange(hasNetworkConnection))
  }

  _handleConnectivityChange (hasNetworkConnection) {
    if (this.state.sections && (this.state.hasNetworkConnection === hasNetworkConnection)) {
      return
    }

    this.setState({ hasNetworkConnection })
    this.restart(hasNetworkConnection)
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('change', this._handleConnectivityChange)
  }

  _resolveTransitionFromURI(uri) {
      const url = new URL(uri, true)
      return {
        name: `show${url.hostname.charAt(0).toUpperCase()}${url.hostname.substring(1)}`,
        type: url.protocol.slice(0, -1).toLowerCase(),
        route: url.hostname
      }
  }

  _createSectionNavigatorRoutes(element, section) {
    // We want to look at a stack element and figure out its parent chunk;
    // Note that chunks may also have flavours so this looks for the flavor, if any
    const [ chunkName, chunkFlavorName ] = element.split("/")

    // This is our chunk, if it actually exists
    const chunk = this.props.chunks[chunkName]

    if (!chunk) {
      // Let's verify that it actually points to a real chunk
      return
    }

    if (chunkFlavorName && (!chunk.flavors || !chunk.flavors[chunkFlavorName])) {
      // Great, let's check the flavor now
      return
    }

    // Great, so we've cleared the chunk and its flavor, if any, let's check the icon
    // const iconName = `${chunkName}/${ chunkFlavorName ? chunkFlavorName : 'icon' }`

    if (!chunk.routes || chunk.routes.length === 0) {
      // One last thing, let's also make sure the chunk has routes
      return
    }

    // These routes will be the ones we want to parse out of the chunk, as necessary
    var routes = {}

    var rootRoute = {}

    // Let's build up global transitions, if any
    var globalTransitions = {}

    if (this.props.transitions) {
        this.props.transitions.forEach(transitionUri => {
          // Let's resolve global transitions
          const transition = this._resolveTransitionFromURI(transitionUri)
          globalTransitions[transition.name] = transition
        })
    }

    for (let routeName in chunk.routes) {
      // Great, this chunk has routes, let's look through all of them
      var route = chunk.routes[routeName]

      if (Object.keys(rootRoute).length === 0) {
        route.root = true
        route.menuTitle = route.title
        rootRoute = Object.assign({}, route)
      } else {
        route.icon = rootRoute.icon
        route.menuTitle = rootRoute.menuTitle
      }

      // Let's build up the transitions, if any
      var transitions = {}

      if (chunk.transitions) {
        chunk.transitions.forEach(transitionUri => {
          // Parse this transition's URI
          const transition = this._resolveTransitionFromURI(transitionUri)

          if (transition.route && chunk.routes[transition.route]) {
            // This is a local transition, so let's resolve locally
            transition.route = `${section.name}/${chunkName}/${transition.route}`
            transitions[transition.name] = transition
            return
          }

          if (globalTransitions[transition.name]) {
            // Let's look through the global transitions, if any
            transitions[transition.name] = Object.assign({}, globalTransitions[transition.name])
          }
        })
      }

      // Let's pass over the theme as well
      const theme = this.props.theme

      // For each route, we want to compose its properties
      const screenProps = Object.assign({
        // Defaults
        strings: {},
        startOperationsOnMount: true
      }, { theme, transitions, ...route, chunkName })

      // Resolve strings
      var resolvedStrings = {}
      for (const string in screenProps.strings) {
        resolvedStrings[string] = this.props.strings[screenProps.strings[string]] || `??${screenProps.strings[string]}??`
      }
      screenProps.strings = Object.assign({}, this.props.strings, resolvedStrings)

      // Now that we have properties, we're ready to initialize the route's screen
      const RouteScreen = route.screen
      const Screen = (props) => {
        return <RouteScreen {...props} {...screenProps}/>
      }

      // Good, so let's add this route to the navigator
      routes[`${section.name}/${chunkName}/${routeName}`] = {
        screen: Screen,
        navigationOptions: this._createRouteNavigationOptions(section, route)
       }
    }

    // We've got ourselves some routes so we should be done with this
    return routes
  }

  _createRouteNavigationOptions(section, route) {
    // Construct a top left menu button, if necessary
    const headerLeft = (navigation) => {
      if (section.layout === 'drawer' && route.root) {
        return (<MaterialIcons.Button name="menu" size={28} color={Styles.styleColor(this.props.theme.navigationTintColor)} backgroundColor={Styles.styleColor(this.props.theme.navigationColor)} onPress={() => { navigation.navigate("DrawerOpen") }}/> )
      }

      if (!route.root || route.forceBack) {
        return (<MaterialIcons.Button name="navigate-before" size={28} color={Styles.styleColor(this.props.theme.navigationTintColor)} backgroundColor={Styles.styleColor(this.props.theme.navigationColor)} onPress={() => {
          navigation.goBack()
        }}/> )
      }

      return
    }

    // Before we keep track of the screen inside our navigator, we need some navigation options
    return ({ navigation }) => {
      return {
        title: (navigation.state.params && navigation.state.params.title ? navigation.state.params.title : route.title || ""),
        headerTintColor: Styles.styleColor(this.props.theme.navigationTintColor),
        headerStyle: { backgroundColor:  Styles.styleColor(this.props.theme.navigationColor) },
        headerLeft: headerLeft(navigation),
        gesturesEnabled: false,
        tabBarLabel: route.menuTitle || "",
        tabBarIcon: ({ tintColor }) => this._createRouteIcon(route, tintColor)
      }
    }
  }

  _createRouteIcon(route, tintColor) {
    if (!route.icon) {
      return <Icon name='help' type='material' color={tintColor}/>
    }

    var [iconType, iconName] = route.icon.split("/")
    if (!iconName) {
      iconName = iconType
      iconType = 'material'
    }

    return (<Icon name={iconName} type={iconType} color={tintColor}/>)
  }

  _createSectionNavigator(section) {
    if (!section || !section.stack) {
      // We don't even consider stackless sections
      return
    }

    // These are the routes that we need to compile for this section's navigator
    var routes = {}

    // Let's look through the stack and build some routes for this section's navigator
    var elementIndex = 0
    section.stack.forEach(element => {
      var elementRoutes = {}

      if (element && typeof element === 'string') {
        // The first kind of element in the sack is a plain string, that signifies a chunk
        elementRoutes = Object.assign({}, elementRoutes, this._createSectionNavigatorRoutes(element, section))
      } else if (element &&  Array.isArray(element) && element.length > 0) {
        // Another type of element in the sack is a list of strings, that each signifies a chunk
        var composedRoutes = {}
        element.forEach(subElement => { composedRoutes = Object.assign({}, composedRoutes, this._createSectionNavigatorRoutes(subElement, section)) })
        elementRoutes = Object.assign({}, elementRoutes, composedRoutes)
      }

      // Compile a list of options for this section's navigator
      const navigatorConfig = {
        headerMode: (section.hideHeader ? 'none' : (Platform.OS === 'ios' ? 'float' : 'screen')),
        transitionConfig: (props) => {}
      }

      routes[`${section.name}/${elementIndex}`] = { screen: StackNavigator(elementRoutes, navigatorConfig) }
      elementIndex = elementIndex + 1
    })

    if (section.layout === "drawer") {
      return DrawerNavigator(routes, {
        drawerWidth: 300,
        drawerPosition: 'left',
        contentOptions: {
          activeTintColor: Styles.styleColor(this.props.theme.navigationTintColor),
          inactiveTintColor: Styles.styleColor(this.props.theme.navigationTintColor),
          style: {
            marginVertical: 0,
            backgroundColor:  Styles.styleColor(this.props.theme.navigationColor)
          }
        },
        contentComponent: props => <ScrollView style={{ backgroundColor: Styles.styleColor(this.props.theme.navigationColor) }}><DrawerView.Items {...props} /></ScrollView>
      })
    }

    if (section.layout === "tabs") {
      return TabNavigator(routes, {
        headerMode: 'none',
        tabBarOptions: {
          scrollEnabled: false,
          showIcon: true,
          showLabel: (Platform.OS === 'ios')
        }
      })
    }

    return StackNavigator(routes, {
      headerMode: 'none',
      transitionConfig: (props) => {}
    })
  }

  _createSections() {
    // These are the sections we want to generate and initialize
    var sections = {}

    for(const sectionName in this.props.sections) {
      // Look through all the app's sections and for each, build defaults if necessary
      var section = this.props.sections[sectionName]
      section.name = sectionName
      section.layout = section.layout || "default"

      // Let's also generate a navigator for this section
      section.navigator = this._createSectionNavigator(section)

      if (!section.navigator) {
        // We want to skip sections without navigators
        continue
      }

      // Let's keep track of all the resolved sections
      sections[sectionName] = section
    }

    // And here are all our valid app sections
    return sections
  }

  _createAppNavigator(sections) {
    // We will use the section navigators to compose the main app navigator
    var subNavigators = {}

    for (let name in sections) {
      // We want to look through all the sections and pull out each section navigator
      const section = sections[name]
      subNavigators[name] = { screen: section.navigator }
    }

    // Let's put them all together into a headerless stack navigator
    const navigator = StackNavigator(subNavigators, { headerMode: 'none' })

    // Save the original handler
    const defaultGetStateForAction = navigator.router.getStateForAction

    navigator.router.getStateForAction = (action, state) => {
      if (action.type === 'Navigation/BACK' && state.routes[state.index].index === 0) {
        // Ignore the back on the first screen
        // return state
      }

      var newState = defaultGetStateForAction(action, state)

      if (action.type === 'Navigation/NAVIGATE' && action.params && action.params.transition && action.params.transition.type === 'replace') {
        this.trimRoutes(action.routeName, newState)
      }

      // Handle all other actions with the default handler
      return newState
    }

    return navigator
  }

  trimRoutes(name, state, deep) {
    if (!state || !state.routes) {
      return
    }

    var found = false
    var index = 0
    state.routes.forEach(route => {
      if (found) {
        return true
      }
      if (route.routeName === name) {
        found = Object.assign({}, route)
        if (index > 0 && deep) {
          state.routes.splice(index - 1, 1)
          state.index = index - 1
          return true
        }
      }
      index = index + 1
    })

    if (found) {
      return true
    }

    state.routes.forEach(route => {
      if (this.trimRoutes(name, route, true)) {
          found = true
          return
      }
    })

    return found
  }

  renderNoNetworkConnection() {
    return ( <View style={{ flex: 1, flexDirection: 'column', backgroundColor: this.props.theme.primaryColor, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#ffffff", textAlign: "center" }}>
        You are currently offline. Please reconnect to the Internet.
        </Text>
    </View>)
  }

  render() {
    if (!this.state.sections) {
      return this.renderProgress()
    }

    if (!this.state.hasNetworkConnection) {
      return this.renderNoNetworkConnection()
    }

    // The only element we need to render here is the main app navigator
    const AppNavigator = this.state.navigator
    return <AppNavigator/>
  }
}
