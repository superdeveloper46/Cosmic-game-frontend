import React from "react"

import './index.css'

const Divider = ({
  style = {
    width: '5px',
    height: '100%'
  },
}) => {
  return (
    <div className={"divider divider-small-screen"} style={ style } />
  )
}

export default Divider