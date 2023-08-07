import React from "react"

import { Image } from "react-bootstrap";

import './index.css'

const TextWithImage = ({
  children,
  style,
  imgSrc,
  imgStyle,
}) => {
  return (
    <div className={ "text-with-image d-flex align-items-center" } style={ style }>
      <Image className="text-with-image-image" src={ imgSrc } style={ imgStyle } fluid />
      {
        children
      }
    </div>
  )
}

export default TextWithImage