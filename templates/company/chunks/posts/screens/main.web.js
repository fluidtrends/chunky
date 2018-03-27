import React from 'react'
import { Screen, Components } from 'react-dom-chunky'

export default class CategoriesScreen extends Screen {

  constructor (props) {
    super(props)
    this.state = { ...this.state }
  }

  componentDidMount () {
    super.componentDidMount()
    this._features = this.importData('features')
  }

  get features () {
    return this._features || []
  }

  components () {
    return [
      <Components.Collection
        id='features'
        categories={this.features}
      />
    ]
  }
}
