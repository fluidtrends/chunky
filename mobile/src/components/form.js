import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  Platform,
  TextInput,
  ActivityIndicator,
  View,
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  Keyboard,
} from 'react-native'
import { FormLabel, CheckBox, FormInput, Avatar, Button, Icon, FormValidationMessage, Card } from 'react-native-elements'
import Screen from '../core/Screen'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

let window = Dimensions.get('window'),
  screen = Dimensions.get('window'),
  smallScreen  = screen.height < 500

export default class FormScreen extends Screen {

  constructor(props) {
    super(props)

    this._onContinuePressed = this.onContinuePressed.bind(this)
    this._onQuestionPressed = this.onQuestionPressed.bind(this)
    this._onImageFieldPressed = (name) => this.onImageFieldPressed.bind(this)
    this._onSwitchFieldPressed = (name) => this.onSwitchFieldPressed.bind(this)
    this._onPairsFieldPressed = (name) => this.onPairsFieldPressed.bind(this)
    this._addNewPair = (name) => this.addNewPair.bind(this, name)

    this._onFieldChanged = (name, options) => this.onFieldChanged.bind(this, name, options)

    this.state = { ...this.state, fields: {}, error: "", pairTotals: {}, progress: false, extended: true, animationOffset: new Animated.Value(0) }
  }

  componentWillMount() {
    super.componentWillMount()
    this.keyboardWillShowSubscription = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow.bind(this));
    this.keyboardWillHideSubscription = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide.bind(this));
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    this.keyboardWillShowSubscription.remove();
    this.keyboardWillHideSubscription.remove();
  }

  onFieldChanged(name, options, value) {
    var fields = Object.assign({}, this.state.fields)
    var id = name
    var val = value

    if (options.type === 'pairs') {
      var label = this.props.strings[`${name}PairsLabel`].split("|")
      val = Object.assign({}, this.state.fields[id])
      val[options.index] = val[options.index] || {}
      val[options.index][label[options.pair-1]] = value
    }

    fields[id] = val
    this.setState({ fields,  error: '' })
  }

  validate() {}
  submit(data) {}

  onQuestionPressed() {}

  onError(error) {
    this.setState({ progress: false, error: error.message })
  }

  isFormValid() {
    // Start by dismissing the keyboard
    Keyboard.dismiss()

    // Check for validation errors
    const error = this.validate()

    if (error) {
        // The form is invalid
        this.setState({ progress: false, error })
        return false
    }

    // Looks like the form is valid
    this.setState({ progress: true, error: "" })
    return true
  }

  onContinuePressed() {
    // Check if the form is valid
    if (!this.isFormValid()) {
      return
    }

    // Perform the success action
    this.submit(this.state.fields)
  }

  keyboardWillShow(e) {
    this.hideStatusBar()
    const keyboardHeight = e.endCoordinates.height

    Animated.timing(this.state.animationOffset, {
      duration: 300,
      toValue: -keyboardHeight
    }).start()
  }

  keyboardWillHide() {
    this.showStatusBar()
    Animated.timing(this.state.animationOffset, {
      duration: 300,
      toValue: 0
    }).start()
  }

  renderError() {
    if (!this.state.error) {
      return (<View/>)
    }

    return (<Text style={this.styles.formError}>
          { this.state.error }
      </Text>)
  }

  get styles () {
    return Object.assign(super.styles, styles(this.props))
  }

  renderDataError() {
    return this.renderData()
  }

  renderDataDefaults() {
    return this.renderData()
  }

  renderDataLoading() {
    return this.renderProgress()
  }

  renderData() {
    return this.renderContent()
  }

  keyboardType(type) {
    switch (type) {
      case "email":
        return "email-address"
      case "phone":
        return "phone-pad"
      default:
        return "default"
    }
  }

  imageFieldData(name) {
    return {
      icon: {name: 'account-circle'}
    }
  }

  renderImageField(name, options) {
    const data = this.imageFieldData(name)

    return (<View key={`${name}Field`} style={{flexDirection: "column", height: 120, alignItems: "center", justifyContent: "center"}}>
        <Avatar
          style={{height: 75, width: 75 }}
          large
          rounded
          overlayContainerStyle={{ backgroundColor: this.props.theme.primaryColor }}
          { ...this.imageFieldData(name) }
          onPress={this.selectedImageField.bind(this, name, options)}
        />
        <Button
            buttonStyle={ this.styles.formSecondaryButton }
            backgroundColor='#ffffff'
            color={ this.props.theme.primaryColor }
            onPress={ this._onImageFieldPressed(name) }
            title={ this.props.strings.changePhoto }/>
        </View>)
  }

  renderSwitchField(name, options) {
    return (<View key={`${name}Field`} style={{flexDirection: "column", height: 120, alignItems: "center", justifyContent: "center"}}>
        <CheckBox
          center
          title={this.props.strings[`${name}Label`] || ""}
          iconRight
          onPress={ () => this.onSwitchFieldPressed(name) }
          iconType='material'
          checkedIcon='check-circle'
          uncheckedIcon='panorama-fish-eye'
          checkedColor={this.props.theme.primaryColor}
          checked={this.state.fields[name] ? true : false}
        />
        </View>)
  }

  renderFieldLabel(name) {
    if (!this.props.strings[`${name}Label`]) {
      return (<View/>)
    }

    return (<Text style={{marginTop: 20, color: "#607D8B", fontSize: 14, marginLeft: 12 }}>
      { this.props.strings[`${name}Label`] }
    </Text>)
  }

  renderFieldPairLabel(name, pair) {
    var label = (this.props.strings[`${name}PairsLabel`] || undefined)

    if (!label) {
      return (<View/>)
    }

    return (<Text style={{marginTop: 20, color: "#607D8B", fontSize: 14, marginLeft: 12 }}>
      { label.split("|")[pair-1] }
    </Text>)
  }

  renderPair(name, options, index) {
    return (<View key={`${name}Field${index}`}>
        { this.renderFieldPairLabel(name, 1) }
        { this.renderFormInput(`${name}`, Object.assign({index, pair: 1}, options), 1)}
        { this.renderFieldPairLabel(name, 2) }
        { this.renderFormInput(`${name}`, Object.assign({index, pair: 2}, options), 2)}
    </View>)
  }

  renderPairs(name, options) {
    var all = []
    const total = this.state.pairTotals[name] || 1

    for (var index = 0; index < total; index = index+1) {
      all.push(this.renderPair(name, options, index + 1))
    }
    return all
  }

  addNewPair(name) {
    var pairTotals = Object.assign({}, this.state.pairTotals)
    pairTotals[name] = pairTotals[name] || 1
    pairTotals[name] = pairTotals[name] + 1
    this.setState({ pairTotals })
  }

  renderPairsField(name, options) {
    return (<View key={`${name}Field`}>
      { this.renderFieldLabel(name) }
      { this.renderPairs(name, options)}
      <Button
          onPress={this._addNewPair(name)}
          title={ "Add Another Activity"}
          style={{marginTop: 20}}
          backgroundColor={"#FFFFFF"}
          contentContainerStyle={{ marginTop: 20}}
          color={this.props.theme.primaryColor}/>
    </View>)
  }

  onImageFieldPressed(name) {}

  selectedImageField(name) {}

  onSwitchFieldPressed(name) {
    var fields = Object.assign({}, this.state.fields)
    fields[name] = (fields[name] ? false : true)
    this.setState({ fields,  error: '' })
  }

  onPairsFieldPressed(name) {
  }

  defaultFieldValue(name) {
    return
  }

  renderField(name, options) {
      if (options.type === 'image') {
        return this.renderImageField(name, options)
      }

      if (options.type === 'switch') {
        return this.renderSwitchField(name, options)
      }

      if (options.type === 'pairs') {
        return this.renderPairsField(name, options)
      }

      return (<View key={`${name}Field`}>
            { this.renderFieldLabel(name) }
            { this.renderFormInput(name, options)}
            </View>)
  }

  renderFormInput(name, options, pair) {
    var placeholder = this.props.strings[`${name}Placeholder`] || ""

    if (pair) {
      placeholder = placeholder.split("|")[pair-1].trim()
    }

    return (<FormInput
          defaultValue={this.defaultFieldValue(name)}
          placeholder={ placeholder }
          onChangeText={this._onFieldChanged(name, options)}
          secureTextEntry={ options.secure }
          autoCorrect={ false }
          placeholderTextColor= { "#BDBDBD" }
          autoCapitalize={ "none" }
          blurOnSubmit={ true }
          keyboardType={ this.keyboardType(options.type) }
          style={this.styles.formTextField}/>)
  }

  renderFields() {
    if (!this.props.fields || Object.keys(this.props.fields).length === 0) {
      return <View/>
    }
    var fields = []
    for (const field in this.props.fields) {
      if (this.state.extended || !this.props.fields[field].extended) {
        fields.push(this.renderField(field, this.props.fields[field]))
      }
    }
    return fields
  }

  renderLogo() {
    return  (<View/>)
  }

  renderSubmitButton() {
    return (<Button
        buttonStyle={this.styles.formButton}
        backgroundColor={this.props.theme.primaryColor}
        color='#ffffff'
        onPress={this._onContinuePressed}
        title={ this.props.strings.action }/>)
  }

  showError(error) {
    this.setState({ error: error.message })
  }

  renderQuestionButton() {
    return (<Button
        buttonStyle={this.styles.formSecondaryButton}
        backgroundColor={this.props.expandInnerContent ? this.props.theme.backgroundColor : "#ffffff"}
        color={this.props.theme.primaryColor}
        onPress={this._onQuestionPressed}
        title={ this.props.strings.question }/>)
  }

  renderFormHeader() {
    return (<Text style={this.styles.formHeader}>
      { this.props.strings.header }
    </Text>)
  }

  renderContentInner() {
    if (this.props.expandInnerContent) {
      return this.renderContentInnerExpanded()
    }
    return this.renderContentInnerDefault()
  }

  renderContentInnerDefault() {
    return (<KeyboardAwareScrollView>
      { this.renderLogo() }
      { this.renderFormHeader() }
      <View style={[this.styles.formContainer]}>
        { this.renderError() }
        { this.renderFields() }
        { this.renderSubmitButton() }
        { this.renderQuestionButton() }
      </View>
    </KeyboardAwareScrollView>)
  }

  renderContentInnerExpanded() {
    return (<KeyboardAwareScrollView>
      { this.renderLogo() }
      { this.renderFormHeader() }
      <View style={[this.styles.formContainer]}>
        { this.renderError() }
        { this.renderFields() }
      </View>
      { this.renderSubmitButton() }
      { this.renderQuestionButton() }
    </KeyboardAwareScrollView>)
  }

  renderContent() {
      return (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[this.styles.container, {
              flexDirection: "row", alignItems: "center", justifyContent: "center", flex: 1 }]}>
              { this.renderDialog() }
              { this.renderContentInner() }
            </View>
          </TouchableWithoutFeedback>)
  }
}

const styles = (props) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: props.dark ? '#37474F' : props.theme.backgroundColor
  },
  formHeader: {
    padding: 10,
    color: props.theme.primaryColor,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  formContainer: {
    backgroundColor: '#ffffff',
    padding: 30,
    margin: 20,
    elevation: 3,
    borderRadius: 4,
    shadowColor: '#999999',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.5
  },
  formError: {
    marginTop: 10,
    marginBottom: 20,
    alignSelf: "center",
    color: '#f44336'
  },
  formTextField: {
    height: 60,
    width: 250,
    alignSelf: "center",
    marginBottom: 0,
    padding: 0,
    backgroundColor: "#ffffff"
  },
  formButton: {
    marginLeft: 60,
    marginRight: 60,
    marginTop: 40,
    marginBottom: 20
  },
  formSecondaryButton: {
    margin: 5
  }
})
