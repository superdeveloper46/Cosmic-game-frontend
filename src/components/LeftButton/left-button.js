import React from "react"

import { Button } from "react-bootstrap";

const LeftButton = ({
  onClick,
}) => {
  return (
    <Button 
      className="direction-button"
      onClick={ onClick }
    >
      <img className='navigation-responsive' style={{ height: "50px", width: "80px" }} src='/images/screen-left.png' alt='left' />
    </Button>
  )
}

export default LeftButton