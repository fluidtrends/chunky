/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { AnimatedSection } from '../../../../src/components'

savor

.add('should handle an unknown animation', (context, done) => {
  context.mount(<AnimatedSection 
        animationType=''
        startAnimation 
        config={{ tension: 20, friction: 60 }}>
      <div/>
  </AnimatedSection>)

  // And, we're looking good
  done()
})

.add('should handle an invalid animation without any children', (context, done) => {
  context.shallow(<AnimatedSection 
        animationType={'opacity'} 
        startAnimation 
        config={{ tension: 20, friction: 60 }}/>)

  // And, we're looking good
  done()
})

.add('should handle an animation with a slide animation', (context, done) => {
    context.shallow(<AnimatedSection
        animationType={'slideFromLeft'} 
        startAnimation 
        config={{ tension: 20, friction: 60 }}>>
      <div/>
  </AnimatedSection>)

  // And, we're looking good
  done()
})

.add('should handle an animation with opacity', (context, done) => {
  context.shallow(<AnimatedSection
      animationType={'opacity'} 
      startAnimation 
      config={{ tension: 20, friction: 60 }}>>
    <div/>
  </AnimatedSection>)

  // And, we're looking good
  done()
})

.add('should handle an animation without opacity', (context, done) => {
  context.shallow(<AnimatedSection
      animationType={'slideFromRight'} 
      startAnimation 
      config={{ tension: 20, friction: 60 }}>>
    <div/>
  </AnimatedSection>)

  // And, we're looking good
  done()
})

.run('[Web] AnimatedSection Component')
