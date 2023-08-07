import classNames from "classnames"
import React from "react"

import './index.css'

const InventorySlot = ({
  children,
  className,
  onClick,
  style,
  inactive = false,
}) => {
  return (
    <div className={classNames("inventory-slot d-flex justify-content-center align-items-center", {'inactive': inactive}, className, {'clickable': !!onClick})} style={ style } onClick={ onClick }>
      {
        children
      }
      <div className="inventory-slot-overlay"/>
    </div>
  )
}

export default InventorySlot