/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { Collection } from '../../../../src/components'

savor

.add('should handle loading without any categories', (context, done) => {
  const props = { id: "test" }
  const container = context.shallow(<Collection {...props}/>)

  // And, we're looking good
  done()
})

.add('should handle loading with one category without an image', (context, done) => {
  const props = { id: "test", 
    categories: [{
      details: "test",
      tags: ["one", "two"]
  }]}
  const container = context.shallow(<Collection {...props}/>)

  // And, we're looking good
  done()
})

.add('should handle loading with one category with an image and no renderer', (context, done) => {
  const props = { id: "test", 
    type: "challenges",
    categories: [{
      image: "test",
      details: "test"
  }]}

  const container = context.shallow(<Collection {...props}/>)

  // And, we're looking good
  done()
})

// .add('should handle loading with one category with an image and no renderer', (context, done) => {
//   const props = { id: "test", 
//     type: "challenges",
//     renderCardButtons: () => ({}),
//     categories: [{
//       image: "test",
//       details: "test",
//       actionTitleSecondary: true,
//       tags: ["one", "two"]
//   }]}

//   const container = context.shallow(<Collection {...props}/>)

//   // And, we're looking good
//   done()
// })


.run('[Web] Collection Component')
