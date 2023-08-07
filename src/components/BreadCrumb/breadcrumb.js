import React from 'react'
import './breadcrumb.scss'

const BreadCrumb = ({ icon, content }) => {
  return (
    <div className='breadcrumb-container d-flex align-items-center'>
      <div>
        <img src={icon} alt='tab' />
      </div>
      <p>{content}</p>
    </div>
  )
}

export default BreadCrumb
