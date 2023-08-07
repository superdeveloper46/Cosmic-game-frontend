import React from "react"

import { Button } from "react-bootstrap";

const CloseButton = ({
  onClick,
}) => {
  return (
    <Button 
      style={{
        border: 0,
        fontSize: '20px',
        background: 'none',
        color: 'red',
        margin: 0,
        padding: 0,
        position: 'absolute',
        right: '1rem',
          marginBottom: '10px',
      }}
      onClick={ onClick }
    >
      <i className="bi bi-x-square-fill"></i>
    </Button>
  )
}

export default CloseButton