import React from "react"
import CloseButton from "../CloseButton"
import NormalButton from "../NormalButton"

const InfoMessage = ({
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
        { message.title || 'CONFIRM' }
        <CloseButton onClick={ onClose }/>
      </div>
      <div className="confirm-message-content text-center">
        { message.text || 'Are you sure?' }
      </div>
      <div className="confirm-message-actions">
        <NormalButton className="m-2" style={{ minWidth: '120px' }} onClick={ () => onClick('yes') }>
          Confirm
        </NormalButton>
      </div>
    </div>
    : null
  )
}

export default InfoMessage