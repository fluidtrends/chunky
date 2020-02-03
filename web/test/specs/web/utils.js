/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { Utils } from '../../../src'
import randomstring from 'randomstring'

savor

.add('should handle element visibility', (context, done) => {
  const el = {
    getBoundingClientRect: () => ({
        top: 10, left: 10, bottom: 2000, right: 2000
    })
  } 

  Utils.isAnyPartOfElementInViewport(el)
  Utils.isElementInViewport(el)

  // Handle without args
  Utils.isAnyPartOfElementInViewport()
  Utils.isElementInViewport()

  // And, we're looking good
  done()
})

.add('should handle id generation', (context, done) => { 
  const randomStub = context.stub(randomstring, 'generate').callsFake(() => 'test1234')

  context.expect(Utils.newShortId()).to.exist
  context.expect(Utils.newRandomId()).to.equal('test1234')

  randomStub.restore()

   // And, we're looking good
   done()
})

.run('[Web] Utils')
