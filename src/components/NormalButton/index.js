import React from "react"

import classNames from "classnames"
import { Button, Image } from "react-bootstrap";

import './index.css'

const NormalButton = ({
  children,
  image,
  onClick,
  className,
  style,
  inactive = false,
  disabled = false,
}) => {
  return (
    <Button className={ classNames("normal-button d-flex justify-content-between align-items-center", className, { 'inactive': inactive }, {'disabled': disabled} ) } onClick={ !disabled && onClick } style={ style }>
      {
        !!image
        ? <Image
          src={ image }
          className="normal-button-image"
          fluid
        />
        : null
      }
      <div className="flex-grow-1"> 
        {
          children
        }
      </div>
    </Button>
  )
}

export default NormalButton