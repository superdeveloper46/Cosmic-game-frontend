import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import MissionRow from '../MissionRow/mission-row'
import MissionListRewardsDialog from '../MissionListRewardsDialog/mission-list-rewards-dialog'
import './mission-select.scss'

const tierList = ['TIER 1', 'TIER 2', 'TIER 3', 'TIER 4']

const MissionSelect = ({
  inventoryMission,
  selectedRegion,
  setInventoryMission,
  setIsEquip,
  setIsItemOpen,
  selectedInventory,
  setSelectedInventory,
}) => {
  const missions = useSelector((state) => state.missions.missions)
  const [selectedTier, setSelectedTier] = useState(1)
  const [selectedRewardMission, setSelectedRewardMission] = useState(null)

  useEffect(() => {
    if (inventoryMission?.tier) {
      setSelectedTier(inventoryMission.tier - 1)
    } else {
      setSelectedTier(0)
    }
  }, [])

  useEffect(() => {
    if (inventoryMission) setSelectedTier(inventoryMission.tier - 1)
  }, [inventoryMission])

  return (
    <div className='mission-select'>
      <div className='d-flex align-items-center justify-content-between flex-wrap mb-2'>
        <h2 className='tab-title'>SELECT MISSION</h2>
      </div>
      <div className='custom-border-bottom mb-4'>
        <div className='d-flex justify-content-between align-items-center tap-btns'>
          {tierList.map((tier, index) => (
            <button
              key={`tier-${index}`}
              className={index === selectedTier ? 'active' : ''}
              onClick={() => setSelectedTier(index)}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>
      <div className='mission-items custom-scroll'>
        {(missions || [])
          .filter((mission) => mission.tier === selectedTier + 1)
          .map((mission) => (
            <div key={`mission-${mission.id}`}>
              <MissionRow
                inventoryMission={inventoryMission}
                mission={mission}
                setInventoryMission={setInventoryMission}
                setSelectedRewardMission={(e) => {
                  e === selectedRewardMission
                    ? setSelectedRewardMission(null)
                    : setSelectedRewardMission(e)
                }}
              />
              <MissionListRewardsDialog
                open={mission === selectedRewardMission}
                mission={mission}
                setSelectedRewardMission={setSelectedRewardMission}
                setIsEquip={setIsEquip}
                setIsItemOpen={setIsItemOpen}
                selectedInventory={selectedInventory}
                setSelectedInventory={setSelectedInventory}
              />
            </div>
          ))}
      </div>
    </div>
  )
}

export default MissionSelect
