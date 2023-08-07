import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MissionRewardItemRow from '../MissionRewardItemRow/mission-reward-item-row'
import MissionRewardResourceRow from '../MissionRewardResourceRow/mission-reward-resource-row'
import ApplyButton from '../ApplyButton'
import MissionLootbox from '../MissionLootbox/mission-lootbox'

const rewardTab = ['ITEM REWARD POOL', 'LOOT BOX REWARD POOL']
const lootboxes = ['Gold', 'Silver', 'Bronze']

const MissionListRewardsDialog = ({
  open,
  setSelectedRewardMission,
  mission,
  setIsEquip,
  setIsItemOpen,
  selectedInventory,
  setSelectedInventory,
}) => {
  const resources = useSelector((state) => state.resources.resources)
  const [selectedTab, setSelectedTab] = useState(0)

  return !!open ? (
    <div className='mission-list-rewards-dialog-container'>
      <div className='mission-list-rewards-container mb-5 p-2 pb-4'>
        <h2 className='tab-title text-center headerbar mb-2'>REWARDS</h2>
        <div className='custom-border-bottom mb-4'>
          <div className='d-flex justify-content-between align-items-center tap-btns'>
            {rewardTab.map((tab, index) => (
              <button
                key={`rewardtab-${index}`}
                className={
                  index === selectedTab
                    ? 'active w-50 text-sm-center'
                    : 'w-50 text-sm-center'
                }
                onClick={() => setSelectedTab(index)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className='items-wrapper custom-scroll mb-4'>
          {!selectedTab
            ? !!mission?.Mission_Item_Rewards
              ? [...mission?.Mission_Item_Rewards]
                  .sort((reward1, reward2) =>
                    (reward1.name || '').localeCompare(reward2.name || ''),
                  )
                  .map((reward) =>
                    !!reward && (reward.luck || 0) > 0 ? (
                      <MissionRewardItemRow
                        reward={reward}
                        key={`mission-reward-item-${reward.id}`}
                      />
                    ) : null,
                  )
              : null
            : !!mission.Mission_Resource_Rewards
            ? lootboxes.map((lootbox) => (
                <MissionLootbox
                  key={`mission-resource-reward-${lootbox}`}
                  lootbox={lootbox}
                  rewards={mission.Mission_Resource_Rewards.filter(
                    (reward) => reward.name === lootbox,
                  )}
                  setIsEquip={setIsEquip}
                  setIsItemOpen={setIsItemOpen}
                  selectedInventory={selectedInventory}
                  setSelectedInventory={setSelectedInventory}
                />
              ))
            : null}
        </div>
        <div className='custom-border-bottom'></div>
        <ApplyButton
          className='px-4 mx-auto mt-5'
          onClick={() => setSelectedRewardMission(null)}
        >
          OK
        </ApplyButton>
      </div>
    </div>
  ) : null
}

export default MissionListRewardsDialog
