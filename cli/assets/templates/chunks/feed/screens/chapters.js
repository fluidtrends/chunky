import React from 'react'
import {
  Image,
  View,
  Text,
  StyleSheet
} from 'react-native'
import { Button, Card, Icon, Avatar } from 'react-native-elements'
import { Styles, ListScreen } from 'react-native-chunky'

export default class BookChaptersScreen extends ListScreen {

  constructor(props) {
    super(props)

    this.state = { ...this.state }
  }

  componentDidMount() {
    super.componentDidMount()

    const self = this
    const timer = setTimeout(() => {
      this.props.getChapters({ onStarted: (stream) => {
        self.setState({ stream })
      }, onReceivedData: (chapters) => {
        self.refreshChapters(chapters)
      }})
    }, 300)
    self.setState({ timer })
  }

  componentWillUnmount() {
    super.componentWillUnmount()
    clearTimeout(this.state.timer)
    this.state.stream.off()
  }

  refreshChapters(chapters) {
    var all = []
    for (const chapterId in chapters) {
      const chapter = chapters[chapterId]
      all.push(Object.assign({}, { _id: chapterId }, chapter ))
    }
    all.sort((a, b) => Number.parseInt(a.order) - Number.parseInt(b.order))
    this.updateData(all)
  }

  renderDataError() {
    return this.renderData()
  }

  renderDataDefaults() {
    return this.renderData()
  }

  dataItem(item) {
    var fields = {}

    fields.title = `${item.title}`
    fields.titleNumberOfLines = 2
    fields.containerStyle = {  backgroundColor: "#FFFFFF" }
    fields.titleContainerStyle = { height: 40, justifyContent: 'center' }
    fields.hideChevron = false
    fields.leftIcon = { name: 'bookmark' }

    return fields
  }

  onItemPressed(chapter, section) {
    this.transitions.showEntries({ chapter, title: chapter.title })
  }
}
