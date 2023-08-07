import classNames from 'classnames'
import React, { useEffect, useState, useRef } from 'react'
import { Image } from 'react-bootstrap'
import { rarityIcons } from '../ItemDetailsCard/item-details-card'
import Tooltip from '../Tooltip/tooltip'
import './new-layout-inventory-item.scss'

const InventoryItem = ({
  inventory,
  placeholder = '',
  equip,
  onClick,
  onDoubleClick,
  onSearchClick,
  onApeDoubleClick,
  active,
  style,
  notier,
  search,
  lock,
  checked,
}) => {
  const [onMission, setOnMission] = useState(false)

  useEffect(() => {
    setOnMission(!!inventory.mission_equip)
  }, [])

  return (
    <div
      className={classNames('new-layout-inventory-item', {
        'white-border': !!checked,
      })}
      style={{
        ...(style || {}),
        backgroundImage: `url(${rarityIcons[inventory?.rarity || '']})`,
      }}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      {!!inventory ? (
        <Image
          src={`/item/reveals/${(inventory?.icon || '').replaceAll(' ', '_')}`}
          className={`inventory-image custom-active ${active ? 'active' : ''}`}
          style={{ borderRadius: '5px' }}
          fluid
        />
      ) : (
        placeholder
      )}
      {!notier && !!inventory ? (
        <Image
          src={`/images/v2/Tier${inventory?.tier || 0}.png`}
          className='tier-image'
          style={{ borderRadius: '5px' }}
          fluid
        />
      ) : (
        <div />
      )}
      {onMission ? (
        <Tooltip
          isArrow
          className='tooltip-text'
          childrenClassName='mission-image'
          tooltipElement={
            <span>
              Item is in use <br /> on a mission
            </span>
          }
        >
          <img
            src={`/images/onmission.png`}
            alt='Equip'
            className={!!equip && !!inventory.equip ? 'visible' : 'invisible'}
          />
        </Tooltip>
      ) : (
        <Tooltip
          isArrow
          tooltipElement={
            <span>
              Item is equipped <br /> on a character
            </span>
          }
          className='tooltip-text'
          childrenClassName={
            !!equip && !!inventory.equip
              ? 'equip-image visible'
              : 'equip-image invisible'
          }
        >
          <img src={`/images/equip.png`} alt='Equip' />
        </Tooltip>
      )}
      <img
        src={`/images/lock.png`}
        alt='Lock'
        className={lock ? 'visible lock-image' : 'invisible lock-image'}
      />
      <img
        src={`/images/rewardsearch.png`}
        alt='search'
        onClick={!!onSearchClick ? onSearchClick : null}
        className={!!search ? 'search-image visible' : 'search-image invisible'}
      />
      {!!inventory ? (
        <img
          src={inventory.ape_image}
          alt='Equipper Image'
          className={
            !!inventory.ape_image
              ? 'equipper-image visible'
              : 'equipper-image invisible'
          }
          onDoubleClick={(e) => {
            e.stopPropagation()
            if (onApeDoubleClick) onApeDoubleClick()
          }}
        />
      ) : (
        <div />
      )}
      {!!inventory && !!checked ? (
        <img
          src='/images/v2/game-ui/inventory-check.png'
          className='check-image'
        />
      ) : null}
    </div>
  )
}

export default InventoryItem
