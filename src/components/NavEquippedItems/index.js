import React from 'react'
import { Image } from 'react-bootstrap'
import Divider from '../Divider'
import { rarityIcons } from '../ItemDetailsCard/item-details-card'
import ItemSlot from '../ItemSlot'

import './index.css'

const NavEquippedItems = ({ items, utilities }) => {
  return (
    <div className='d-flex '>
      <div className='d-flex align-items-center'>
        {(utilities || []).map((utility) => (
          <ItemSlot
            key={utility.id}
            style={{ width: '40px', height: '40px', margin: '3px' }}
            onClick={(e) => {
              if (typeof utility.onClick === 'function') {
                e.stopPropagation()
                utility.onClick()
              }
            }}
            clickable={!!utility.onClick}
          >
            <Image
              src={`/images/v2/resources/${utility.icon.replaceAll(' ', '_')}`}
              style={{
                background: `url(${rarityIcons[utility?.rarity || 'Common']})`,
                borderRadius: '5px'
              }}
              fluid
            />
          </ItemSlot>
        ))}
        {[...Array(2 - (utilities || []).length)].map((v, id) => (
          <ItemSlot
            key={`inactive-item-slot-${id}`}
            style={{ width: '40px', height: '40px', margin: '3px' }}
            inactive
          />
        ))}
      </div>
      <Divider style={{width: '10px', height: '50px'}} />
      <div className='d-flex align-item-center w-full'>
        {(items || []).map((item) => (
          <ItemSlot
            key={item.id}
            style={{ width: '40px', height: '40px', margin: '3px' }}
            onClick={(e) => {
              if (typeof item.onClick === 'function') {
                e.stopPropagation()
                item.onClick()
              }
            }}
            clickable={!!item.onClick}
          >
            <Image
              src={`/item/${item.icon.replaceAll(' ', '_')}`}
              style={{ borderRadius: '5px' }}
              fluid
            />
          </ItemSlot>
        ))}

        {(items || []).length < 3
          ? [...Array(3 - (items || []).length)].map((v, id) => (
              <ItemSlot
                key={`inactive-item-slot-${id}`}
                style={{ width: '40px', height: '40px', margin: '3px' }}
                inactive
              />
            ))
          : null}
      </div>
    </div>
  )
}

export default NavEquippedItems
