import React from 'react'
import moment from 'moment'
import {
  Image,
  ActivityIndicator,
  Animated,
  View,
  Text,
  StyleSheet,
  ScrollView,
  WebView
} from 'react-native'
import { Button, Card, Icon, Avatar, Slider } from 'react-native-elements'
import { Styles, Screen } from 'react-native-chunky'
import HTMLView from 'react-native-htmlview'

export default class EntryScreen extends Screen {

  constructor(props) {
    super(props)
    this.state = { ...this.state }
    this._renderNode = this.renderNode.bind(this)
  }

  componentDidMount() {
    super.componentDidMount()
  }

  componentWillUnmount() {
    super.componentWillMount()
  }

  renderDataError() {
    return this.renderData()
  }

  renderDataDefaults() {
    return this.renderData()
  }

  renderNode(node, index, siblings, parent, renderer) {
  }

  renderPostContent() {
    if (!this.data.entry || !this.data.entry.body) {
      return (<View/>)
    }

    const htmlContent = `<p>${this.data.entry.body}</p>`

    return (<View>
      <HTMLView
       value={htmlContent}
       renderNode={this._renderNode}
       stylesheet={styles}
     />
     </View>)
  }

  renderImage() {
    return (<View/>)
  }

  renderChapter() {
    return (<Text style={styles.chapter}> { this.data.title } </Text>)
  }

  renderContent() {
    return (<ScrollView style={styles.postContent}>
      { this.renderImage() }
      { this.renderChapter() }
        <Text style={styles.postTitle}>
            { this.entities.decode(this.data.entry.title) }
        </Text>
        { this.renderPostContent() }
    </ScrollView>)
  }

  renderData() {
    return (
        <ScrollView style={styles.container}>
        { this.renderContent() }
       </ScrollView>)
  }
}

const styles = StyleSheet.create({
  body: {
   fontFamily: 'Roboto',
   fontSize: 14,
   color: '#37474F',
   padding: '10px 10px 0px 0px'
  },
  p: {
     textAlign:'justify',
     color: '#263238'
  },
  a: {
    fontWeight: '300',
    color: '#6BBCF4'
  },
  chapter: {
    fontSize: 12,
    color: '#B0BEC5'
  },
  container: {
    backgroundColor: "#ffffff"
  },
  postContent:  {
    backgroundColor: "#ffffff",
    padding: 5
  },
  postImage: {
    flex: 1,
    height: 200,
    marginTop: 0
  },
  postTitle: {
    margin: 0,
    marginTop: 10,
    marginBottom: 20,
    fontSize: 20
  },
  postDate: {
    color: "#999999",
    margin: 5,
    fontSize: 14,
    marginBottom: 10,
  }
})
