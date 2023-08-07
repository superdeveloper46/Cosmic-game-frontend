import classNames from "classnames"
import React from "react"

import './index.css'

const FilterToggle = ({
  children,
  style,
  inactive = false,
}) => {
  return (
    <div className={classNames("filter-toggle d-flex justify-content-center align-items-center", {'inactive': inactive})} style={ style }>
      {
        children
      }
    </div>
  )
}

export default FilterToggle