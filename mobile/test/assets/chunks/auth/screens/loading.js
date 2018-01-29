import React, { Component } from 'react'
import {
  Image,
  View,
  ActivityIndicator
} from 'react-native'

import { Styles, Screen } from '../../../../..'

export default class LoadingScreen extends Screen {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.retrieveAuthToken()
  }

  hasCachedAuthTokenErrorOnTrue() {
    this.triggerTransition("dummy")
    this.triggerTransition("default")
    this.triggerTransition("noauth")
  }

  getCachedAuthTokenOnChanged(oldValue, newValue) {

  }
  
  componentWillReceiveProps(nextProps) {
    this.observeValues(["hasCachedAuthTokenError", "getCachedAuthToken"], nextProps)
  }

  render() {
    return (
      <View style={this.styles.containers.main}>
        <ActivityIndicator
          animating={true}
          style={{height: 120}}
          size="small"/>
      </View>)
  }
}
