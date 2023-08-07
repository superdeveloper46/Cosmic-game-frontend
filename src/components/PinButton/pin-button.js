import React from "react"
import { Button, Image } from "react-bootstrap"

const PinButton = ({
  style,
  collapsed,
  setCollapsed,
}) => {
  return (
    <Button 
      onClick={() => setCollapsed(!collapsed)} 
      style={{ 
        ...(style || {}),
        padding: 0,
        background: 'none',
        border: 'none'
      }}
    >
      <Image src={`/images/pin-${!!collapsed ? 'inactive' : 'active'}.png`} fluid />
    </Button>
  )
}

export default PinButton