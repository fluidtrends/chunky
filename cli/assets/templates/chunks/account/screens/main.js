import React from 'react'
import {
  Image,
  View,
  Text,
  StyleSheet
} from 'react-native'
import { Button, Card, Icon, Avatar } from 'react-native-elements'
import { Styles, ListScreen, Utils } from 'react-native-chunky'

export default class MainAccountScreen extends ListScreen {

  constructor(props) {
    super(props)
    this.state = { ...this.state, progress: false }
    this._onLogoutPressed = this.onLogoutPressed.bind(this)
    this._onProfilePhotoChange = this.onProfilePhotoChange.bind(this)
  }

  componentDidMount() {
    super.componentDidMount()

    this.updateData({
      section1: {
        title: "",
        data: [
          { id: "header" },
          { title: "Edit Your Details", icon: "border-color" },
          { title: "Update Your Profile Picture", icon: "photo-camera" },
          { title: "Change Your Password", icon: "lock-outline" }]
      },
      section3: {
        title: "Get In Touch",
        data: [
          { id: "email", title: "Send Us An Email" , icon: "email"},
          { id: "phone", title: "Give Us a Call", icon: "phonelink-ring" }]
      },
      section4: {
        title: " ",
        data: [
          { id: 'signout' }
        ]
      }
    })

    if (this.data.account.image) {
      this.setState({ photo: this.data.account.image })
    }
  }

  onLogoutPressed() {
    this.props.removeCache()
  }

  renderDataSectionHeader(data, header) {
     if (!header ) {
       return
     }

     return (<Text style={{ flex: 1, backgroundColor: "#eeeeee", padding: 15 }}>
       { header }
      </Text>)
  }

  operationDidFinish(name, data, error) {
    switch (name) {
      case "removeCache":
        // We've just removed the cache, let's clean everything up
        this.props.cleanUp()
      break
      default:
        // Cleaned up, let's start again
        this.transitions.showStart()
    }
  }

  renderDataError() {
    return this.renderData()
  }

  renderDataDefaults() {
    return this.renderData()
  }

  renderSignOut() {
    return (<Button
            onPress={this._onLogoutPressed}
            color="#F5F5F5"
            backgroundColor={this.props.theme.primaryColor}
            title='Sign Out' />)
  }

  onProfilePhotoChange() {
    this.setState({ progress: true })
    Utils.Photo.choosePhoto("Choose Your Photo").
                then((data) => { this.setState({ photo: data }) }).
                catch((error) => { console.log(error) })
  }

  renderProfilePhoto() {
    var source = { icon: { name: 'account-circle'} }

    if (this.state.photo) {
      source = { uri: `data:image/jpeg;base64,${this.state.photo}` }
    }

    console.log("******", source)

    return(<Avatar
        large
        rounded
        { ...source }
        onPress={this._onProfilePhotoChange}
        avatarStyle={{fontSize: 80}}
        containerStyle={{flex: 1, width: 75, height: 75, marginBottom: 70 }}
      />)
  }

  renderMainHeader() {
    return (<View style={{ height: 120, flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      { this.renderProfilePhoto() }
      <Text style={{color: "#ffffff", fontSize: 20, fontWeight: "bold"}}>
        { this.data.account.name }
      </Text>
      <Text style={{color: "#ffffff", fontSize: 16, margin: 5 }}>
        { this.data.account.email }
      </Text>
    </View>)
  }

  currentLanguage() {
    return "EN"
  }

  dataItem(item) {
    var fields = {
      containerStyle: { backgroundColor: "#F5F5F5" }
    }

    switch(item.id) {
      case "signout":
        fields.subtitle = this.renderSignOut()
        fields.hideChevron = true
        fields.containerStyle = { backgroundColor: "#eeeeee", paddingTop: 0, paddingBottom: 30}
      break
      case "header":
        fields.subtitle = this.renderMainHeader()
        fields.hideChevron = true
        fields.containerStyle = { backgroundColor: this.props.theme.primaryColor, paddingTop: 30, paddingBottom: 30 }
      break
    }

    if (item.icon) {
      fields.leftIcon = { name: item.icon }
    }

    if (item.title) {
      fields.title = item.title
      fields.titleStyle = { marginLeft: 5 }
    }

    return fields
  }

  onItemPressed(data, section) {
    switch(data.id) {
      case "donate":
        this.transitions.showDonate({ ...data, account: this.data.account })
      break
      case "shop":
        this.transitions.showShop({ ...data, account: this.data.account })
      break
      case "signout":
        this._onLogoutPressed()
      break
    }
  }
}
