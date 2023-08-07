import React from "react"
import { Image } from "react-bootstrap"

const PanelDivider = ({
  style = {},
  vertically
}) => {
  return (
    <Image 
      style={{
        width: !!vertically ? '4px' : '100%',
        height: !!vertically ? 'auto' : '20px',
        margin: '10px',
        ...style
      }} 
      src={
        !!vertically
        ? '/images/v2/panel-divider-vertical.png'
        : '/images/v2/panel-divider-horizontal.png'
      }
    />
  )
}

export default PanelDivider