import React from 'react'
import { Image } from 'react-native'
import { default as auth } from 'react-chunky-auth-chunk'

export default class RegisterScreen extends auth.screens.register {

  renderLogo() {
    return  (<Image style={{alignSelf: 'center', height: 80, width: 80, marginTop: 10, marginBottom: -40}} source={require('../../../assets/logo.png')}/>)
  }

}
