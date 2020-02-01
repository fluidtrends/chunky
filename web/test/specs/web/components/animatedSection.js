/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { AnimatedSection } from '../../../../src/components'

savor

.add('should handle a valid animation', (context, done) => {
  const container = context.shallow(<AnimatedSection animationType={'opacity'} startAnimation config={{ tension: 20, friction: 60 }}>
      <div/>
</AnimatedSection>)

  // And, we're looking good
  done()
})

.add('should handle an unknown animation', (context, done) => {
  context.expect(() => {
    context.shallow(<AnimatedSection animationType={'oops'} startAnimation config={{ tension: 20, friction: 60 }}>
        <div/>
    </AnimatedSection>)
  }).to.throw

  // And, we're looking good
  done()
})

.add('should handle an invalid animation without any props', (context, done) => {
  context.expect(() => {
    context.shallow(<AnimatedSection>
      <div/>
  </AnimatedSection>)
  }).to.throw

  // And, we're looking good
  done()
})

.add('should handle an invalid animation without any children', (context, done) => {
  context.expect(() => {
    context.shallow(<AnimatedSection animationType={'opacity'} startAnimation config={{ tension: 20, friction: 60 }}/>)
  }).to.throw

  // And, we're looking good
  done()
})

.run('[Web] AnimatedSection Component')
