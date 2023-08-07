import React from 'react'
import { Image } from 'react-bootstrap'
import './detailed-tooltip.scss'

function DetailedTooltip({ image, title, content, bottomBar }) {
  return (
    <div className='detail-tooltip'>
      <div className='detail-tooltip-top d-flex'>
        {image && (
          <Image
            src={image}
            style={{ width: '60px', height: '60px', marginRight: '10px' }}
          />
        )}
        <div className='detail-tooltip-content'>
          {title && <h3>{title}</h3>}
          <p>{content}</p>
        </div>
      </div>
      {bottomBar && <div className='detail-tooltip-bottom'>{bottomBar}</div>}
    </div>
  )
}

export default DetailedTooltip
