import React from 'react'
import ReactVivus from 'react-vivus'

/**
 *  Animates a svg based on vivus.js
 * style -> style of the image ( CSS IN JS )
 * path -> the path to the SVG
 * type -> Defines what kind of animation will be used: delayed, sync, oneByOne, script, scenario or scenario-sync. [Default: delayed]
 * duration -> Animation duration, in frames. [Default: 200]
 * Timing animation function for the complete SVG. Options are: EASE, EASE_IN, EASE_OUT and EASE_OUT_BOUNCE
 * id -> an id must be provided in order for the react wrapper to work
 * 
 * All params should be string instead of duration which is an integer! 
 *
 * @param {*} { style, path, type, duration, animTimingFunction, id }
 */
const AnimatedSvg = ({ style, src, type, duration, animTimingFunction, id }) => (
  <ReactVivus
    id={id}
    option={{
      file: src,
      type,
      animTimingFunction,
      duration
    }}
    style={style}
  />
);

export default AnimatedSvg;
