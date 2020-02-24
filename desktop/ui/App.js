import React, { Component } from "react"
import { Offline, Online } from "react-detect-offline"
import Session from './UISession'
import Loading from './components/Loading'
import Fade from 'react-reveal/Fade'

class App extends Component {

  constructor() {
    super()

    this.state = {}
    this._session = new Session(this)
  }

  componentDidMount() {
    this._session.start().then(() => this.reload())
  }

  componentWillUnmount() {
    this._session.stop()
  }

  reload() {

  }

  get session() {
    return this._session
  }

  renderScreen() {
      return <div/>
  }

  render() {
    return <div style={{ height: "100%" }}>
        <Offline>
            <Loading message="Looking for Internet connection ..."/>
        </Offline>
        <Online>
          <div style={{ 
            flex: 1,
            flexDirection: "column",
            height: "100%",
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            overflow: "auto"
          }}>
          <Fade>
            { this.state.screenId ? this.renderScreen() : <Loading/> }
          </Fade>
        </div>
      </Online>
    </div>
  }
}

export default App