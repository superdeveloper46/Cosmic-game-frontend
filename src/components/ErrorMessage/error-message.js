import React from "react"
import CloseButton from "../CloseButton"
import NormalButton from "../NormalButton"

const ErrorMessage = ({
  message,
  onClose,
}) => {
  return (
    !!message
    ? <div className="error-message-wrapper">
      <div className="error-message-header">
        { message.title || 'ERROR' }
        <CloseButton onClick={ onClose }/>
      </div>
      <div className="error-message-content text-center d-flex flex-column justify-content-center align-items-start">
        { message.text || 'Something went wrong' }
      </div>
      <div className="error-message-actions">
        <NormalButton style={{ filter: 'hue-rotate(180deg) brightness(0.7)', minWidth: '120px' }} onClick={ onClose }>
          DISMISS
        </NormalButton>
      </div>
    </div>
    : null
  )
}

export default ErrorMessage