import React from "react"

import { Button } from "react-bootstrap";

const EyeVisible = ({
  isVisible = true,
  
  setIsVisible,
}) => {
  return (
    !!isVisible
    ? <Button 
      style={{
        marginTop: '10px',
        marginRight: '10px',
        minHeight: '120px',
          maxHeight: '120px',
        minWidth: '120px',
          maxWidth: '120px',
        border: '2px solid #1963AE',
        fontSize: '56px',
        backgroundImage: 'radial-gradient(#0453A7, #06316B, #061D4C)'
      }}
      className="rounded-circle"
      onClick={ () => setIsVisible(!isVisible) }
    >
      <i className="bi bi-eye-fill"></i>
    </Button>
    : <Button 
      style={{
        marginTop: '10px',
        marginRight: '10px',
        height: '120px',
        width: '120px',
        fontSize: '56px',
        background: 'none',
        border: '0px solid #1963AE'
      }}
      className="rounded-circle"
      onClick={ () => setIsVisible(!isVisible) }
    >
      <i className="bi bi-eye-slash-fill"></i>
    </Button>
  )
}

export default EyeVisible