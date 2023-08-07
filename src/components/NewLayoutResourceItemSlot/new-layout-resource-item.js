import classNames from 'classnames'
import React from 'react'
import { Image } from 'react-bootstrap'
import { rarityIcons } from '../ItemDetailsCard/item-details-card'

import './new-layout-resource-item.scss'

const NewLayoutResourceItem = ({
  style,
  onClick,
  onSearchClick,
  onApeDoubleClick,
  active,
  search,
  inventory,
  checked,
}) => {
  return (
    <div
      className={classNames("new-layout-resource-item d-flex justify-content-start align-items-center flex-column", {
        'active' : active,
        'white-border': !!checked
      })}
      style={style}
      onClick={onClick}
    >
      {!!inventory ? (
        <div className='resource-icon'>
          <Image
            src={`/images/v2/resources/${(inventory?.icon || '').replaceAll(' ', '_')}`}
            style={{
              background: `url(${rarityIcons[inventory?.rarity || 'Common']})`,
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
            className={classNames('resource-detail', { 'visible': !!search, 'invisible': !search })}
            onClick={() => {
              // if (onSearchClick)
                // onSearchClick(resource.Resource ?? resource.Utility)
            }}
          />
        </div>
      ) : null}
      <div className='resource-number'>
        {inventory?.quantity || 0}
      </div>
      <img
        src={inventory.ape_image}
        alt='Equipper Image'
        className={classNames('resource-owner', { 'visible': !!inventory.ape_image, 'invisible': !inventory.ape_image })}
        onDoubleClick={(e) => {
            e.stopPropagation()
            if (onApeDoubleClick) onApeDoubleClick()
        }}
      />
      {
        !!checked
        ? <img src="/images/v2/game-ui/inventory-check.png" className="check-image"/>
        : null
      }
    </div>
  )
}

export default NewLayoutResourceItem
