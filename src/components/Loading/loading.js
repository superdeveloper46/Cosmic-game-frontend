import React from 'react'

const Loading = ({ isLoading, sm, className, fullScreen = false }) => {
  return isLoading ? (
    fullScreen ? (
      <div className='position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center bg-blur-white'>
        <div className=''>
          <div
            className={`spinner-border ${className}`}
            role='status'
            style={{width: '4em', height: '4em'}}
          >
          </div>
        </div>
      </div>
    ) : (
      <span
        className={`spinner-border m-1 ${
          sm ? 'spinner-border-sm' : ''
        } ${className}`}
        role='status'
        aria-hidden='true'
      />
    )
  ) : null
}

export default Loading
