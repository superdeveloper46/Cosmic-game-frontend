import React from "react"

import classNames from "classnames"
import { Button } from "react-bootstrap";

import './index.css'

const MenuButton = ({
  children,
  style,
  inactive = false,

  onClick,
}) => {
  return (
    <Button 
      className={ classNames("menu-button rounded-circle d-flex justify-content-center align-items-center", { 'inactive': inactive }) } 
      style={ style }
      onClick={ onClick }
    >
      {
        children
      }
    </Button>
  )
}

export default MenuButton