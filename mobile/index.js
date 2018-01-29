import React from 'react'
import { Core } from 'react-chunky'
import { AppRegistry, AsyncStorage, Text } from 'react-native'
import RNFirebase from 'react-native-firebase'

import * as Styles from './src/styles'
import * as Errors from './src/errors'
import * as Utils from './src/utils'
import * as Components from './src/components'
import Screen from './src/core/Screen'
import ListScreen from './src/core/ListScreen'
import App from './src/core/App'

global.storage = AsyncStorage
global.firebase = RNFirebase.initializeApp({
  debug: true
})

export function renderApp(props) {
  const main = () => (<Core.AppContainer {...props}>
    <App {...props}/>
  </Core.AppContainer>)

  AppRegistry.registerComponent(props.id, () => main)
}

export { Styles, Errors, Screen, ListScreen, App, Components, Utils }
