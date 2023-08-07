import classNames from "classnames"
import React from "react"

import './index.css'

const Box = ({
  children,
  style,
  inactive = false,
}) => {
  return (
    <div className={classNames("box d-flex justify-content-center align-items-center", {'inactive': inactive})} style={ style }>
      {
        children
      }
    </div>
  )
}

export default Box