import classNames from "classnames";
import React from "react"

import { Button } from "react-bootstrap";

const HelpButton = ({
  onClick,
  className,
}) => {
  return (
    <Button 
      style={{
        border: '1px solid #3980DA',
        fontSize: '20px',
        background: '#1963AE',
        color: 'white',
        margin: 0,
        padding: 0,
        width: '40px',
        height: '40px',
      }}
      className={classNames(className, "rounded-circle")}
      onClick={ onClick }
    >
      ?
    </Button>
  )
}

export default HelpButton