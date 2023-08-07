import React from "react"

import classNames from "classnames"
import { Button } from "react-bootstrap";

import './index.css'

const MenuBoxButton = ({
  children,
  onClick,
  icon,
  style,
  active = false,
}) => {
  return (
    <Button className={ classNames("menu-box-button d-flex justify-content-center align-items-center", { 'active': active }) } style={ style } onClick={ onClick }>
      <div className="menu-box-button-image d-flex justify-content-center align-items-center" style={ style }>
        <div style={{ color: 'white', width: '100%', fontSize: '42px' }}>
        {
          !!icon
          ? icon
          : null
        }
        </div>
      </div>
      <div className="menu-box-button-children-container d-flex justify-content-center align-items-center">
        {
          children
        }
      </div>
    </Button>
  )
}

export default MenuBoxButton