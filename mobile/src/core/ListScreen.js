import React, { Component } from 'react'
import {
  Image,
  StyleSheet,
  View,
  Text,
  ListView,
  ActivityIndicator,
  Button
} from 'react-native'
import { List, ListItem } from 'react-native-elements'
import * as Styles from '../styles'
import Screen from './Screen'

export default class ListScreen extends Screen {

  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: this.rowHasChanged,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    })
    this.state = { ...this.state, dataSource }
  }

  rowHasChanged (r1, r2) {
    return (r1 !== r2)
  }

  renderError(error = {}) {
    return (<View style={this.styles.containers.main}>
      <Text> { error.message || "" } </Text>
        <Button
          onPress={this._onRetryPressed}
          title="Retry"
        />
      </View>)
  }

  renderDataLoading() {
    return this.renderProgress()
  }

  updateData(data) {
    if (!data) {
      // Forget invalid data fetches
      return
    }

    var rawData = {}
    var sortedTitles = []
    if (!Array.isArray(data)) {
      // Sort the keys
      const sortedSectionIds = Object.keys(data).sort()
      sortedSectionIds.forEach(sectionId => {
        const section = data[sectionId]
        sortedTitles.push(section.title)
        rawData[section.title] = section.data
      })
    }

    this.setState({
      hideSections: Array.isArray(data),
      dataSource: Array.isArray(data) ? this.state.dataSource.cloneWithRows(data) : this.state.dataSource.cloneWithRowsAndSections(rawData)
    })
  }

  onItemPressed(data, section) {
    this.transitions.showDetails(data)
  }

  dataItem(item, section) {
    return ({title: item.title,
            leftIcon: {name: 'done'}})
  }

  renderDataItem(item, section) {
    const dataItem = this.dataItem(item, section)

    if (dataItem.ignoreTap) {
      return (<ListItem
          key={section}
          {...dataItem}
        />)
    }

    return (<ListItem
        key={section}
        onPress={this.onItemPressed.bind(this, item, section)}
        {...dataItem}
      />)
  }

  renderDataSectionHeader(data, header) {
     if (!header ) {
       return (<View/>)
     }

     return (<Text style={styles.header}>
       { header }
      </Text>)
  }

  renderList() {
    if (this.state.hideSections) {
      return (<ListView
          enableEmptySections={true}
          renderRow={this.renderDataItem.bind(this)}
          dataSource={this.state.dataSource}
          removeClippedSubviews={false}
      />)
    }

    return (<ListView
        enableEmptySections={true}
        renderRow={this.renderDataItem.bind(this)}
        renderSectionHeader={this.renderDataSectionHeader.bind(this)}
        removeClippedSubviews={false}
        dataSource={this.state.dataSource}
      />)
  }

  renderHeader() {}

  renderData() {
      return (<View style={styles.container}>
        { this.renderHeader() }
        <List containerStyle={styles.container}>
          { this.renderList() }
        </List>
      </View>)
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: "#FAFAFA"
  },
  header: {
    backgroundColor: "#FAFAFA",
    padding: 15
  }
})
