import classNames from 'classnames'
import React from 'react'
import { Image } from 'react-bootstrap'
import { rarityIcons } from '../ItemDetailsCard/item-details-card'

import './index.scss'

const ResourceItemSlot = ({
  style,
  onClick,
  onSearchClick,
  active,
  resource,
}) => {
  return (
    <div
      className={`resource-item-slot d-flex justify-content-start align-items-center flex-column ${
        active ? 'active' : ''
      }`}
      style={style}
      onClick={onClick}
    >
      {!!resource ? (
        <div className='resource-icon'>
          <Image
            src={`/images/v2/resources/${(
              resource?.Resource?.icon ||
              resource?.Utility?.icon ||
              ''
            ).replaceAll(' ', '_')}`}
            style={{
              background: `url(${rarityIcons[resource?.rarity || 'Common']})`,
              borderRadius: '5px'
            }}
            fluid
          />
          <div className='selected'>
            <div>
              <p>Item Selected</p>
            </div>
          </div>
          <img
            src='/images/rewardsearch.png'
            alt='search'
            className='resource-detail'
            onClick={() => {
              if (onSearchClick)
                onSearchClick(resource.Resource ?? resource.Utility)
            }}
          />
        </div>
      ) : null}
      {!!resource && !!resource?.Resource?.tier ? (
        <div className='resource-item-tier-overlay'>
          <Image
            src={`/images/v2/Tier${resource?.Resource?.tier || 0}.png`}
            style={{ borderRadius: '5px' }}
            fluid
          />
        </div>
      ) : null}
      <div className='resource-number'>
        {resource?.resource_quantity ||
          resource?.utility_durability ||
          resource?.utility_quantity ||
          0}
      </div>
    </div>
  )
}

export default ResourceItemSlot
