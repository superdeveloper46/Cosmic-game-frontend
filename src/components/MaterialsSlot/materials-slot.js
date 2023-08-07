import classNames from 'classnames'
import React from 'react'
import { Image } from 'react-bootstrap'
import { rarityIcons } from '../ItemDetailsCard/item-details-card'

import './materials-slot.scss'

const MaterialsSlot = ({
  onClick,
  clickable,
  inactive = false,
  resource,
  style,
  text,
}) => {
  return (
    <div
      className={classNames(
        'materials-item-slot d-flex justify-content-start align-items-center flex-column position-relative',
        { inactive: inactive },
        { 'hover-opacity-8 hover-cursor-pointer': !!clickable },
      )}
      onClick={onClick}
      style={style}
    >
      {!!resource ? (
        <Image
          src={`/images/v2/resources/${(resource?.icon || '').replaceAll(
            ' ',
            '_',
          )}`}
          className='resource-img'
          style={{
            background: `url(${rarityIcons[resource?.rarity || 'Common']})`,
          }}
          fluid
        />
      ) : (
        <div className='resource-img' />
      )}
      {resource?.tier && (
        <Image
          src={`/images/v2/Tier${resource?.tier}.png`}
          className='tier-img'
          fluid
        />
      )}
      <p className='h6'>{typeof text !== 'undefined' ? text : '0'}</p>
    </div>
  )
}

export default MaterialsSlot
