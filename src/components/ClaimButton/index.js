import React from "react"

import classNames from "classnames"
import { Button } from "react-bootstrap";

import './index.css'

const ClaimButton = ({
  children,
  style,
  onClick,
  inactive = false,
}) => {
  return (
    <Button className={ classNames(`claim-button d-flex justify-content-center align-items-center ${inactive ? 'cursor-no-drop' : ''}`, { 'inactive': inactive }) } style={ style } onClick={ onClick }>
      {
        children
      }
    </Button>
  )
}

export default ClaimButton