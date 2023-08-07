import React from 'react'
import { Image } from 'react-bootstrap'
import useAudio from '../Audio/audio'
import { AUDIOLIST } from '../../consts/audio-list'
import ItemSlot from '../ItemSlot'

import './index.css'
import { rarityIcons } from '../ItemDetailsCard/item-details-card'

const ApeInfoEqiuppedItems = ({ inventories }) => {
  const generalSound = useAudio(AUDIOLIST['GERNERAL_BUTTON'])

  return (
    <div className='ape-info-equipped-items-container'>
      <div className='d-flex gap-2 w-full flex-wrap'>
        {(inventories || []).map((inventory) => (
          <ItemSlot
            key={inventory.id}
            style={{ width: '40px', height: '40px' }}
            onClick={(e) => {
              if (typeof inventory.onClick === 'function') {
                generalSound()
                e.stopPropagation()
                inventory.onClick()
                if (!inventory.itemDoubleClick) inventory.onDoubleClick()
              }
            }}
            onDoubleClick={(e) => {
              e.stopPropagation()
              inventory.onDoubleClick()
            }}
            clickable={!!inventory.onClick}
          >
            <Image
              src={`/item/reveals/${(
                inventory?.Item_Detail?.image || ''
              ).replaceAll(' ', '_')}`}
              style={{
                background: `url(${rarityIcons[inventory?.Item_Detail?.rarity || 'Common']})`,
                borderRadius: '5px'
              }}
              fluid
            />
          </ItemSlot>
        ))}

        {(inventories || []).length < 3
          ? [...Array(3 - (inventories || []).length)].map((v, id) => (
              <ItemSlot
                key={`inactive-item-slot-${id}`}
                style={{ width: '40px', height: '40px' }}
                inactive
              />
            ))
          : null}
      </div>
    </div>
  )
}

export default ApeInfoEqiuppedItems
