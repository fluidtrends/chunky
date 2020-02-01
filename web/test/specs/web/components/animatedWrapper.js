/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { AnimatedWrapper } from '../../../../src/components'

savor

.add('should handle zoom animations', (context, done) => {
  const container = context.shallow(<AnimatedWrapper animationType={'zoom'}>
      <div/>
    </AnimatedWrapper>)

  // And, we're looking good
  done()
})

.add('should handle bounce animations', (context, done) => {
    const container = context.shallow(<AnimatedWrapper animationType={'bounce'}>
        <div/>
        </AnimatedWrapper>)

    // And, we're looking good
    done()
})

.add('should handle fade animations', (context, done) => {
    const container = context.shallow(<AnimatedWrapper animationType={'fade'}>
        <div/>
        </AnimatedWrapper>)

    // And, we're looking good
    done()
})

.add('should handle flip animations', (context, done) => {
    const container = context.shallow(<AnimatedWrapper animationType={'flip'}>
        <div/>
        </AnimatedWrapper>)

    // And, we're looking good
    done()
})

.add('should handle rotate animations', (context, done) => {
    const container = context.shallow(<AnimatedWrapper animationType={'rotate'}>
        <div/>
        </AnimatedWrapper>)

    // And, we're looking good
    done()
})

.add('should handle slide animations', (context, done) => {
    const container = context.shallow(<AnimatedWrapper animationType={'slide'}>
        <div/>
        </AnimatedWrapper>)

    // And, we're looking good
    done()
})

.add('should handle roll animations', (context, done) => {
    const container = context.shallow(<AnimatedWrapper animationType={'roll'}>
        <div/>
        </AnimatedWrapper>)

    // And, we're looking good
    done()
})

.add('should handle lightspeed animations', (context, done) => {
    const container = context.shallow(<AnimatedWrapper animationType={'lightspeed'}>
        <div/>
        </AnimatedWrapper>)

    // And, we're looking good
    done()
})
  
.run('[Web] AnimatedWrapper Component')
