import React from "react"

import { Button } from "react-bootstrap";

const RightButton = ({
  onClick,
}) => {
  return (
    <Button 
      className="direction-button"
      onClick={ onClick }
    >
      <img className='navigation-responsive' style={{ height:"50px", width:"80px" }} src='/images/screen-right.png' alt='right' />
    </Button>
  )
}

export default RightButton