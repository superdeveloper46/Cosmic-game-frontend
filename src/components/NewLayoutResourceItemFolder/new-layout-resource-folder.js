import classNames from 'classnames'
import React from 'react'
import { Image } from 'react-bootstrap'
import { rarityIcons } from '../ItemDetailsCard/item-details-card'

import './new-layout-resource-folder.scss'

const NewLayoutResourceFolder = ({
  style,
  onClick,
  onDoubleClick,
  onSearchClick,
  active,
  search,
  inventory,
  checked
}) => {
  return (
    <div
      className={classNames("new-layout-resource-folder d-flex justify-content-start align-items-center flex-column", {
        'active' : active,
        'white-border': !!checked
      })}
      style={style}
      onClick={onClick}
      onDoubleClick={() => {if (onDoubleClick) onDoubleClick()}}
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
      {
        !!checked
        ? <img src="/images/v2/game-ui/inventory-check.png" className="check-image"/>
        : null
      }
    </div>
  )
}

export default NewLayoutResourceFolder
