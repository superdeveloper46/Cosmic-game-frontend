import React, { useEffect, useState, useRef } from 'react'
import { Manager, Reference, Popper } from 'react-popper'

const Tooltip = ({ children, isArrow, tooltipElement, className, childrenClassName }) => {
  const [tooltip, setTooltip] = useState(false)

  return (
    <div
      onMouseEnter={() => setTooltip(true)}
      onMouseLeave={() => setTooltip(false)}
    >
      <Manager>
        <Reference>
          {({ ref }) => <div ref={ref} className={childrenClassName}>{children}</div>}
        </Reference>
        {tooltip && (
          <Popper placement='top'>
            {({ ref, style, placement, arrowProps }) => {
              let arrowStyle = {
                width: '0',
                height: '0',
                borderLeft: '15px solid transparent',
                borderRight: '15px solid transparent',
                borderTop: '15px solid #1c3970',
                position: 'absolute',
                bottom: '-5px',
                left: '50%',
                marginLeft: '-15px',
              }

              if (placement === 'bottom') {
                arrowStyle = {
                  ...arrowStyle,
                  top: '-5px',
                  borderTop: 'none',
                  borderBottom: '15px solid #1c3970',
                }
              }
              return (
                <div
                  ref={ref}
                  style={style}
                  className={`my-2 ${className}`}
                  data-placement={placement}
                >
                  {tooltipElement}
                  {isArrow && <div ref={arrowProps.ref} style={arrowStyle} />}
                </div>
              )
            }}
          </Popper>
        )}
      </Manager>
    </div>
  )
}

export default Tooltip
