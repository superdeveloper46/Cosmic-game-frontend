import React from "react"
import useAudio from "../Audio/audio";
import { AUDIOLIST } from "../../consts/audio-list";
import classNames from "classnames"
import { Button, Image } from "react-bootstrap";

import './index.css'

const IconTextButton = ({
  children,
  info = [],
  onClick,
  className,
  style,
  inactive = false,
}) => {
  const inactiveSound = useAudio(AUDIOLIST['INACTIVE_BUTTON'])

  return (
    <Button className={ classNames("icon-text-button d-flex justify-content-between align-items-center", { 'inactive': inactive }, className) } onClick={ () => !!inactive ? inactiveSound() : onClick && onClick() } style={ style }>
      {
        info.map(
          value => (
            <div 
              key={ value.id } 
              className="icon-text-button-info flex-grow-1" 
              style={{ 
                color: value.available === undefined 
                        ? ''
                        : Number(value.available) > Number(value.text)
                        ? ''
                        : 'red'
              }} 
            >
              {
                !!value.image
                ? <Image src={ value.image } className="icon-text-button-image" />
                : null
              }
              { (typeof value.text) === 'undefined' ? '' : value.text }
            </div>
          )
        )
      }
      <div className="flex-grow-1"> 
        {
          children
        }
      </div>
    </Button>
  )
}

export default IconTextButton