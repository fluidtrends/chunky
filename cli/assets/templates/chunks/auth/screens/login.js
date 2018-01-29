import React from 'react'
import { Image } from 'react-native'
import { default as auth } from 'react-chunky-auth-chunk'

export default class LoginScreen extends auth.screens.login {

  renderLogo() {
    return  (<Image style={{alignSelf: 'center', height: 80, width: 80 }} source={require('../../../assets/logo.png')}/>)
  }

}
