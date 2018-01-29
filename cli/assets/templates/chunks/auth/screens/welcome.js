import React from 'react'
import { Image } from 'react-native'
import { default as auth } from 'react-chunky-auth-chunk'

export default class WelcomeScreen extends auth.screens.welcome {

  renderBanner(slide) {
    return  (<Image style={{alignSelf: 'center', height: 80, width: 80}} source={require('../../../assets/logow.png')}/>)
  }
}
