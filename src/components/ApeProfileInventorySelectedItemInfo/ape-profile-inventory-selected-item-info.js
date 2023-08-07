import React from 'react'
import { Image } from 'react-bootstrap'
import useAudio from '../Audio/audio'
import { AUDIOLIST } from '../../consts/audio-list'
import equip from '../../utils/equip'
import MissionRewardItemRowItem from '../MissionRewardItemRowItem/mission-reward-item-row-item'
import NormalButton from '../NormalButton'

const ApeProfileInventorySelectedItemInfo = ({
  inventory,
  address,
  wallet,
  setSelectedInventory,
  setMessage,
  reloadApes,
}) => {
  const equipSound = useAudio(AUDIOLIST['EQUIP_ITEM_SFX'])
  const unequipSound = useAudio(AUDIOLIST['UNEQUIP_ITEM_SFX'])

  return (
    <div
      className='mission-reward-item-row-container d-flex align-items-center'
      style={{
        background: '#5B6C991A',
        padding: '0.25rem',
        border: '1px solid #00B1FB',
        flexGrow: 1,
      }}
    >
      {!!inventory ? (
        <div className='d-flex flex-column' style={{ flexGrow: 1 }}>
          <div className='d-flex align-items-center m-1'>
            <Image
              src={`/item/${inventory.inventory.Item.icon.replaceAll(
                ' ',
                '_',
              )}`}
              style={{ width: '80px', marginRight: '0.5rem' }}
            />
            <div className='d-flex justify-content-center flex-column'>
              <div
                className='d-flex align-items-center'
                style={{ fontSize: '18px' }}
              >
                {inventory.inventory.Item.name.toUpperCase()}
              </div>
              <div className='d-flex align-items-center'>
                {inventory.inventory.Item.description}
              </div>
            </div>
          </div>
          <div
            className='d-flex'
            style={{ flexDirection: 'column', flexGrow: 1, margin: '0.25rem' }}
          >
            <div className='d-flex align-items-center'>
              <MissionRewardItemRowItem
                label='Tier'
                value={`${inventory.inventory.Item.tier}`}
                image='/images/level.png'
              />
              <MissionRewardItemRowItem
                label='Durability'
                value={`${
                  inventory.inventory.item_durability ||
                  inventory.inventory.Item.durability
                }`}
                image='/images/durability.png'
              />
              <MissionRewardItemRowItem
                label='EXP Value'
                value={`${inventory.inventory.Item.exp || 0}`}
                image='/images/exp.png'
              />
            </div>
          </div>
          <div className='d-flex justify-content-center align-items-center'>
            <NormalButton className='m-1' style={{ flex: 1 }} inactive>
              SELL
            </NormalButton>
            <NormalButton
              className='m-1'
              style={{ flex: 1 }}
              onClick={() => {
                if (inventory.action === 'equip') {
                  equipSound()
                } else {
                  unequipSound()
                }
                equip({
                  address,
                  wallet,
                  itemId: inventory.inventory.Item.id,
                  action: inventory.action,
                  setMessage,
                  callback: () => {
                    reloadApes([address])
                    setSelectedInventory(null)
                  },
                })
              }}
              inactive
            >
              {inventory.action === 'equip' ? 'EQUIP' : 'UNEQUIP'}
            </NormalButton>
          </div>
        </div>
      ) : (
        <div
          className='d-flex justify-content-center align-items-center'
          style={{ height: '120px', margin: '0.5rem', flexGrow: 1 }}
        >
          NO ITEM SELECTED
        </div>
      )}
    </div>
  )
}

export default ApeProfileInventorySelectedItemInfo
