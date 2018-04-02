import React from 'react'
import shortid from 'shortid'

export function newShortId () {
  return shortid.generate()
}
