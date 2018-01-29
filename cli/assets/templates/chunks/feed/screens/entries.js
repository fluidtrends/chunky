import React from 'react'
import {
  Image,
  View,
  Text,
  StyleSheet
} from 'react-native'
import { Button, Card, Icon, Avatar } from 'react-native-elements'
import { Styles, ListScreen } from 'react-native-chunky'

export default class BookEntriesScreen extends ListScreen {

  constructor(props) {
    super(props)

    this.state = { ...this.state }
  }

  componentDidMount() {
    super.componentDidMount()

    const self = this
    setTimeout(() => {
      this.props.getEntries({ chapterId: this.data.chapter._id, onStarted: (stream) => {
        self.setState({ stream })
      }, onReceivedData: (entries) => {
        self.refreshEntries(entries)
      }})
    }, 300)
  }

  refreshEntries(entries) {
    var all = []
    for (const _id in entries) {
      const entry = entries[_id]
      all.push(Object.assign({}, { _id }, entry ))
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
    fields.titleNumberOfLines = 5
    fields.titleContainerStyle = { height: 80, justifyContent: 'center' }
    fields.hideChevron = false
    fields.leftIcon = { name: 'attach-file' }

    return fields
  }

  onItemPressed(entry, section) {
    this.transitions.showEntry({ entry, title: this.data.chapter.title })
  }
}
