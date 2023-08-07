import React from 'react'
import useAudio from '../Audio/audio'
import { AUDIOLIST } from '../../consts/audio-list'
import classNames from 'classnames'
import { Button } from 'react-bootstrap'

import './index.css'

const ApplyButton = ({
  children,
  onClick,
  className,
  style,
  inactive = false,
}) => {
  const inactiveSound = useAudio(AUDIOLIST['INACTIVE_BUTTON'])

  return (
    <Button
      className={classNames(
        'apply-button d-flex justify-content-center align-items-center',
        { inactive: inactive },
        className,
      )}
      onClick={() => {
        if (!inactive && onClick) {
          onClick()
        } else if (inactive) {
          inactiveSound()
        }
      }}
      style={style}
    >
      {children}
    </Button>
  )
}

export default ApplyButton
