import React, { Component } from 'react'
import { Spring, animated, interpolate } from 'react-spring'

const animationChecker = ['opacity', 'slideFromLeft', 'slideFromRight']

export default class AnimatedSection extends Component {

  constructor(props) {
    super(props)
  }

  handleError(propError) {
    return <div/>
  }

  render() {
    const { children, animationType, startAnimation, config } = this.props

    // if props were not what we expected return an error wrapper
    if (!animationChecker.includes(animationType)) return this.handleError('animationType')
    if (!children) return this.handleError('children')

    const xValue = animationType  === 'slideFromLeft' ? '-100%' : '100%'

    return (
      <React.Fragment>
        {
          startAnimation ?
          animationType === 'opacity' ?
            <Spring  
              from={{ opacity: 0 }}
              to={{ opacity: 1 }}
              config={config ? config : { tension: 30, friction: 40 }}>
                { props => <div style={props}>{children}</div> }
            </Spring>
            :
            <Spring 
              native 
              from={{ x: xValue}} to={{ x: '0'}}
              config={config ? config : { tension: 30, friction: 40 }}
            >
            {({x}) => (
              <animated.div
                style={{
                  transform: interpolate([x], (x) => `translate(${x}`)
                }}
              >
                {children}
              </animated.div>
            )}
            </Spring>
          :
          <div style={{height: '400px'}}/>
        }
      </React.Fragment>
    )
  }
}
