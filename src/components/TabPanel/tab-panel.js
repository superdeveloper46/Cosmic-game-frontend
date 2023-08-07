import React from 'react'
import './tab-panel.scss'

const TabPanel = ({ children }) => {
  return (
    <div className='tab-panel custom-scroll d-flex align-items-center'>
      {children}
    </div>
  )
}

export default TabPanel