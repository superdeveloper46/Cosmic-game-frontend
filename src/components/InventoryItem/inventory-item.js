import React from 'react'
import { Image } from 'react-bootstrap'
import { rarityIcons } from '../ItemDetailsCard/item-details-card'
import './inventory-item.scss'

const InventoryItem = ({
  inventory,
  placeholder = '',
  equip,
  onClick,
  onSearchClick,
  active,
  style,
  notier,
}) => {
  return (
    <div
      className='inventory-item d-flex align-items-center'
      style={{ ...(style || {}), backgroundImage: !!(inventory?.Item?.rarity || inventory?.rarity) ? `url(${rarityIcons[inventory?.Item_Detail?.rarity || inventory?.Item?.rarity || inventory?.rarity || '']})` : undefined }}
    >
      {
        !!inventory
        ? <Image
          src={`/item/reveals/${(inventory?.Item_Detail?.image || inventory?.icon || '').replaceAll(' ', '_')}`}
          className={`custom-active ${active ? 'active' : ''}`}
          style={{ borderRadius: '5px' }}
          onClick={onClick}
          fluid
        />
        : placeholder
      }
      {
        !notier && !!inventory
        ? <Image
          src={`/images/v2/Tier${(inventory?.Item?.tier || inventory?.tier || 0)}.png`}
          style={{ borderRadius: '5px' }}
          fluid
        />
        : <div />
      }
      <img
        src={`/images/equip.png`}
        alt='Equip'
        className={equip ? 'visible' : 'invisible'}
      />
      <img src={`/images/lock.png`} alt='Lock' className='invisible' />
      <img
        src={`/images/rewardsearch.png`}
        alt='search'
        className={!!inventory ? 'visible' : 'invisible'}
        onClick={!!onSearchClick ? onSearchClick : null}
      />
    </div>
  )
}

export default InventoryItem
