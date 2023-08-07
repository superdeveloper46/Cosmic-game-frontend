import React from "react"
import CloseButton from "../CloseButton"
import NormalButton from "../NormalButton"

const ConfirmMessage = ({
  message,
  onClose,
}) => {
  const onClick = answer => {
    if (typeof message.callback === 'function') {
      message.callback(answer)
      onClose()
    } else {
      onClose()
    }
  }
  return (
    !!message
    ? <div className="confirm-message-wrapper">
      <div className="confirm-message-header">
        { message.title || 'INFO' }
        <CloseButton onClick={ onClose }/>
      </div>
      <div className="confirm-message-content text-center">
        { message.text || '' }
      </div>
      <div className="confirm-message-actions">
        <NormalButton className="m-2" style={{ minWidth: '120px' }} onClick={ () => onClick('yes') }>
          Close
        </NormalButton>
      </div>
    </div>
    : null
  )
}

export default ConfirmMessage