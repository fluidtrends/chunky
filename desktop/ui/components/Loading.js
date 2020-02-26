import React, { Component } from "react"
import { Typography } from 'antd'
import Fade from 'react-reveal/Fade'
import Pulse from 'react-reveal/Pulse'
import asset from '../asset'

const { Text } = Typography

class Loading extends Component {

  constructor() {
    super()

    this.state = {}
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return <div style={{ 
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        flexDirection: "column"
      }}>
      <Pulse>
        <img src={asset('logo.png')} style={{ width: "200px" }} />
      </Pulse>
        <Fade>
          <img src={asset('loading.gif')} style={{ width: "100px", marginLeft: "40px" }} />
        </Fade>
        <Fade>
          <Text> {this.props.message} </Text>
        </Fade>
      </div>
  }
}

export default Loading