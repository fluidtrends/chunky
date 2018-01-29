import React from 'react'
import { Core } from 'react-chunky'
import * as DefaultStyles from '../styles'
import {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  Platform,
  TextInput,
  NetInfo,
  ActivityIndicator,
  View,
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  Keyboard,
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { FormLabel, FormInput, Button, Icon, FormValidationMessage, Card } from 'react-native-elements'
import { BlurView, VibrancyView } from 'react-native-blur'
import Spinner from 'react-native-loading-spinner-overlay'
import PopupDialog, { DialogTitle, DialogButton } from 'react-native-popup-dialog'

export default class Screen extends Core.Screen {

  constructor(props) {
    super(props)
    this.state = { ...this.state, progress: false, progressTitle: this.progressTitle }
  }

  get styles() {
    return {
      containers: DefaultStyles.containers(this.props.theme),
      forms: DefaultStyles.forms(this.props.theme)
    }
  }

  componentDidMount() {
    super.componentDidMount()
    StatusBar.setBarStyle(`${this.props.theme.statusBarLight ? 'light' : 'dark'}-content`, false)
    StatusBar.setHidden(false, false)
  }

  get progressTitle() {
    const min = 0
    const max = this.props.strings.progressTitle ? this.props.strings.progressTitle.length : 0
    const id = Math.floor(min + Math.random() * (max - min))
    return this.props.strings.progressTitle ? this.props.strings.progressTitle[id] : "Please wait"
  }

  get data() {
    return this.props.navigation.state.params || {}
  }

  pushTransition(transition, data) {
    this.props.navigation.navigate(transition.route, data)
  }

  hideStatusBar() {
    // StatusBar.setHidden(true, false)
  }

  showStatusBar() {
    // StatusBar.setHidden(false, false)
  }

  lightenStatusBar() {
    StatusBar.setBarStyle('light-content', false)
  }

  darkenStatusBar() {
    StatusBar.setBarStyle('dark-content', false)
  }

  renderProgress() {
    return ( <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: this.props.theme.primaryColor }}>
      <ActivityIndicator color= "#ffffff"/>
      <Text style={{color: "#ffffff",textAlign:"center", fontSize: 20, fontWeight: "bold", padding: 20}}>
        { this.state.progressTitle }
      </Text>
    </View>)
  }

  replaceTransition(transition, data) {
    this.props.navigation.navigate(transition.route, data)
  }

  goBack() {
    this.props.navigation.goBack()
  }

  get account() {
    return this.props.account
  }

  get isLoggedIn() {
    return this.account
  }

  renderData(data) {
    return ( <View style={this.styles.containers.main}>
    </View>)
  }

  renderDialogContent() {
    return (<View/>)
  }

  renderDialogTitle() {
    return ""
  }

  showDialog() {
    this.popupDialog && this.popupDialog.show(() => {})
  }

  hideDialog() {
    this.popupDialog && this.popupDialog.dismiss(() => {})
  }

  okDialog() {
    this.hideDialog()
  }

  renderDialog() {
    return (
      <PopupDialog
          actions={[<DialogButton key={"_ok"} text="OK" align="center" onPress={this.okDialog.bind(this)}/>]}
          dialogTitle={<DialogTitle title={this.renderDialogTitle()} />}
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
        >
        { this.renderDialogContent() }
        </PopupDialog>)
  }

  renderDataDefaults() {
    return ( <View style={this.styles.containers.main}>
      <Card
        title={ this.props.strings.noData }
        titleStyle={this.styles.forms.header}
        style={this.styles.forms.container}>
        <Button
          style={this.styles.forms.secondaryButton}
          backgroundColor='#ffffff'
          color="#039BE5"
          onPress={this._onRetryRetrieveData}
          title={this.props.strings.retry}/>
      </Card>
    </View>)
  }

  renderDataLoading() {
    return this.renderData()
  }

  renderDataError({ main }) {
    return this.renderData()
  }
}
