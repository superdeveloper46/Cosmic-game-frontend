import classNames from 'classnames'
import React from 'react'
import useAudio from '../Audio/audio'
import { AUDIOLIST } from '../../consts/audio-list'

import './index.css'

const ItemSlot = ({
  children,
  style,
  onClick,
  onDoubleClick,
  clickable,
  inactive = false,
}) => {
  const inactiveSound = useAudio(AUDIOLIST['INACTIVE_BUTTON'])
  const generalSound = useAudio(AUDIOLIST['GERNERAL_BUTTON'])

  return (
    <div
      className={classNames(
        'item-slot d-flex justify-content-center align-items-center',
        { inactive: inactive },
        { 'hover-opacity-8 hover-cursor-pointer': !!clickable },
      )}
      style={style}
      onClick={(e) => {
        if (!!inactive) {
          inactiveSound()
        } else {
          onClick(e)
        }
      }}
      onDoubleClick={onDoubleClick}
    >
      {children}
      <div className='item-slot-overlay' />
    </div>
  )
}

export default ItemSlot
