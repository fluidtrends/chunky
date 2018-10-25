import React, { Component } from 'react'
import { AnimatedValue, Spring, animated, interpolate, controller as spring } from 'react-spring'

const animation = new AnimatedValue(1)
const animationChecker = ['opacity', 'slideFromLeft', 'slideFromRight']

const animations = Object.freeze({
  opacity: {
    opacity: animation.interpolate({ range: [1, 2], output: ['0', '1'] })
  }
})

const animationMap = (animationType) => {
  return animations[animationType]
}

/**
 * Component for animating children.
 * For now it only supports opacity and slide form left or slide from right. More to be added
 * 
 * @param children -> JSX to Render inside the animation
 * @param animationType -> type of animations. For now only supports: ['opacity', 'slideFromLeft', 'slideFromRight']
 * @param startAnimation -> this is used only for slide-from-left or slide-from-right animations. When to start the animation
 * @param config -> React Spring config for the animation (refference: http://react-spring.surge.sh/spring#config)
 *
 * @export
 * @class AnimatedSection
 * @extends {Component}
 */
export default class AnimatedSection extends Component {

  constructor(props) {
    super(props)
  }

  handleError(propError){
    throw new Error(`The following prop's value doesn't have any context.
    Prop to lookout for: ${propError}`)
  }

  render() {
    const { children, animationType, startAnimation, config } = this.props

    // if props were not what we expected return an error wrapper
    if (!animationChecker.includes(animationType)) this.handleError('animationType')
    if (!children) this.handleError('children')


    const hover = () => spring(animation, { to: 2, tension: 30, friction: 40 }).start()

    if(animationType === 'opacity') {
      return (
        <animated.div
          className="item"
          style={animationMap(animationType)}
          onMouseOver={hover}
          >
          {children}
        </animated.div>
      )
    }

    const xValue = animationType  === 'slideFromLeft' ? '-100%' : '100%'

    return (
      <React.Fragment>
        {
          startAnimation ?
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
