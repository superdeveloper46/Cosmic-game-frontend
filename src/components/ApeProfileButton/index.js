import React from "react"

import classNames from "classnames"
import { Button } from "react-bootstrap";

import './index.css'

const ApeProfileButton = ({
  children,
  onClick,
  icon,
  style,
  active = false,
}) => {
  return (
    <Button className={ classNames("ape-profile-button d-flex justify-content-center align-items-center w-100", { 'active': active }) } style={ style } onClick={ onClick }>
      <div className="ape-profile-button-image d-flex justify-content-center align-items-center" style={ style }>
        <div style={{ color: 'white', width: '80px' }}>
        {
          !!icon
          ? icon
          : null
        }
        </div>
      </div>
      <div className="ape-profile-button-children-container d-flex justify-content-start align-items-center">
        {
          children
        }
      </div>
    </Button>
  )
}

export default ApeProfileButton