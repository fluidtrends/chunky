import React from 'react'

import { useMediaQuery } from 'react-responsive'

export const breakpoints = {
  main: 1224
}

export function renderResponsive (key, small, large) {
  // const isDesktopOrLaptop = () => useMediaQuery({ query: `(min-device-width: ${breakpoints.main}px)` })
  // const isTabletOrMobileDevice = () => useMediaQuery({ query: `(max-device-width: ${breakpoints.main}px)` })
  // {isDesktopOrLaptop() && large }
    // {isTabletOrMobileDevice() && small }
     
  return (<div key={key}>    
    { large || small }
  </div>)
}
