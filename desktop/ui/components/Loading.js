import React, { Component } from "react"
import { Typography } from 'antd'
import logo from '../../assets/logo.png'
import loading from '../../assets/loading.gif'
import Fade from 'react-reveal/Fade'
import Pulse from 'react-reveal/Pulse'

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
        <img src={logo} style={{ width: "200px" }} />
      </Pulse>
        <Fade>
          <img src={loading} style={{ width: "100px", marginLeft: "40px" }} />
        </Fade>
        <Fade>
          <Text> {this.props.message} </Text>
        </Fade>
      </div>
  }
}

export default Loading