import React from 'react'

const MissionRowItem = ({ label, value, image, centerLabel }) => {
  return (
    <div className='mission-row-item-container'>
      <div className='d-flex align-items-center' style={{ flexDirection: 'column' }}>
        <div className='mission-item-label'>
          {label}
        </div>
        <div
          className='row-item-sizing row-item-stack-small row-item-sizing-small d-flex align-items-center justify-content-center'
          style={{
            backgroundImage: `url(${image})`,
            marginTop: '-5px',
            marginBottom: '-5px',
          }}
        />
        <div className={`mission-item-label ${centerLabel ? 'center-label' : ''}`}>
          {value}
        </div>
      </div>
    </div>
  )
}

export default MissionRowItem
