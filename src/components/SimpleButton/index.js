import React from "react"

import classNames from "classnames"
import { Button } from "react-bootstrap";

import './index.css'

const SimpleButton = ({
  children,
  style,
  inactive = false,

  onClick,
}) => {
  return (
    <Button className={ classNames("simple-button d-flex justify-content-center align-items-center", { 'inactive': inactive }) } style={ style } onClick={ onClick }>
      {
        children
      }
    </Button>
  )
}

export default SimpleButton