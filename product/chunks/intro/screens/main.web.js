import React from 'react'
import { Screen } from 'react-dom-chunky'
import Wizard from '../components/Wizard'

export default class MainScreen extends Screen {
  constructor(props) {
    super(props)
    this.state = { ...this.state, wizardDone: true }
  }

  componentDidMount() {
    super.componentDidMount()
  }

  // renderWizard() {
  //   // TODO: ADD WIZARD
  //   return [<Wizard />]
  // }

  components() {
    // return []
    // // if (!this.state.wizardDone) {
    // //   return this.renderWizard()
    // // }
    return super.components().concat([])
  }
}
