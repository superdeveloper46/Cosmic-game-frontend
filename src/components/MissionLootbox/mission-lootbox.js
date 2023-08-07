import React from 'react'
import { Image } from 'react-bootstrap'
import { setDetailImage, setSelectedItem } from '../../slices/ItemDialogSlice'
import { useDispatch } from 'react-redux'
import humanizeRange from '../../utils/humanize-range'
import MissionRewardResourceRow from '../MissionRewardResourceRow/mission-reward-resource-row'

import './mission-lootbox.scss'

const MissionLootbox = ({
  lootbox,
  rewards,
  setIsEquip,
  setIsItemOpen,
  selectedInventory,
  setSelectedInventory,
}) => {
  const dispatch = useDispatch()

  return !!lootbox && !!rewards && rewards.length > 0 ? (
    <div className='mission-lootbox d-flex flex-column text-white'>
      <div className='d-flex align-items-center'>
        <Image src='/images/lootbox.png' className='lootbox-img' />
        {`${lootbox.toUpperCase()} LOOTBOX: ${rewards[0].luck || 0}%`}
      </div>
      <div className='d-flex flex-grow flex-column'>
        {rewards.map((reward) => {
          return !reward.reward_id ? (
            <MissionRewardResourceRow
              key={`mission-reward-resource-row-${reward.id}`}
              resource={{
                icon: 'Mysterious_Key1.png',
                name: 'Random Mysterious Legendary Key',
                description: 'Random Mysterious Legendary Key 1 - 4',
              }}
              quantity={humanizeRange(
                reward.lowest_amount,
                reward.highest_amount,
              )}
            />
          ) : (
            <MissionRewardResourceRow
              key={`mission-reward-resource-row-${reward.id}`}
              resource={reward.Resource}
              quantity={humanizeRange(
                reward.lowest_amount,
                reward.highest_amount,
              )}
              category={reward?.category}
              onSearchClick={() => {
                if (setIsItemOpen) setIsItemOpen(true)
                if (setIsEquip) setIsEquip(true)
                if (setSelectedInventory)
                  setSelectedInventory({
                    selected: { ...reward, type: 'Resource' },
                  })
                dispatch(setDetailImage(null))
                dispatch(setSelectedItem({ ...reward, type: 'Resource' }))
              }}
            />
          )
        })}
      </div>
    </div>
  ) : null
}

export default MissionLootbox
