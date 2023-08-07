import React, { useEffect } from 'react'
import useAudio from '../Audio/audio'
import { AUDIOLIST } from '../../consts/audio-list'
import InfoMessage from '../ConfirmMessage/confirm-message'
import ConfirmMessage from '../ConfirmMessage/confirm-message'
import ErrorMessage from '../ErrorMessage/error-message'

const MessageDialog = ({ message, setMessage }) => {
  const errorSound = useAudio(AUDIOLIST['ERROR_SFX'])
  const cancelSound = useAudio(AUDIOLIST['CANCEL_BUTTON'])
  const generalSound = useAudio(AUDIOLIST['GERNERAL_BUTTON'])

  useEffect(() => {
    if (message && message?.type === 'error') {
      errorSound()
    } else if (message) {
      generalSound()
    }
  }, [message])

  return !!message ? (
    <div className='message-wrapper'>
      {message.type === 'error' ? (
        <ErrorMessage
          message={message}
          onClose={() => {
            setMessage(null)
            cancelSound()
          }}
        />
      ) : message.type === 'confirm' ? (
        <ConfirmMessage
          message={message}
          onClose={() => {
            setMessage(null)
            cancelSound()
          }}
        />
      ) : message.type === 'info' ? (
        <InfoMessage
          message={message}
          onClose={() => {
            setMessage(null)
            cancelSound()
          }}
        />
      ) : null}
    </div>
  ) : null
}

export default MessageDialog
