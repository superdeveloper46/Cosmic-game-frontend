import React from "react"

import './index.css'

const Divider = ({
  style = {
    width: '5px',
    height: '100%'
  },
}) => {
  return (
    <div className={"divider"} style={ style } />
  )
}

export default Divider