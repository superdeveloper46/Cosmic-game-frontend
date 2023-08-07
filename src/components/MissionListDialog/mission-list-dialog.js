import React, { useState } from 'react'
import ApeProfileDialog from '../ApeProfileDialog/ape-profile-dialog'
import CloseButton from '../CloseButton'
import InventoryDialog from '../InventoryDialog/inventory-dialog'
import MissionListMapFilter from '../MissionListMapFilter/mission-list-map-filter'
import MissionListMapInfo from '../MissionListMapInfo/mission-list-map-info'
import MissionListRewardsDialog from '../MissionListRewardsDialog/mission-list-rewards-dialog'
import MissionRow from '../MissionRow/mission-row'
import RewardsDialog from '../RewardsDialog/rewards-dialog'

const MissionListDialog = ({
  open,
  onClose,
  crownedApeId,
  switchCrown,
  apes,
  missions,
  maps,
  resources,
  currencies,
  craftRecipes,
  selectedApes,
  setSelectedApes,
  inventoryMission,
  setInventoryMission,
  rewards,
  setRewards,
  profileApe,
  setProfileApe,
  setMessage,
  reloadApes,
  isFromCenterModal,
  setCharacterListDialogOpen,
}) => {
  const [map, setMap] = useState(null)
  const [selectedRewardMission, setSelectedRewardMission] = useState(null)

  return !!open ? (
    !!selectedRewardMission ? (
      <MissionListRewardsDialog
        open={!!selectedRewardMission}
        onClose={() => setSelectedRewardMission(null)}
        mission={selectedRewardMission}
        resources={resources}
      />
    ) : !!rewards ? (
      <RewardsDialog
        open={!!rewards}
        rewards={rewards}
        resources={resources}
        currencies={currencies}
        crownedApeId={crownedApeId}
        onCloseParentAlso={() => {
          setRewards(null)
          onClose()
        }}
      />
    ) : !!profileApe ? (
      <ApeProfileDialog
        open={!!profileApe}
        crownedApeId={crownedApeId}
        switchCrown={switchCrown}
        apes={apes}
        craftRecipes={craftRecipes}
        ape={profileApe}
        setApe={setProfileApe}
        reloadApes={reloadApes}
        onClose={() => {
          setProfileApe(null)
          if (isFromCenterModal) setCharacterListDialogOpen(true)
        }}
        setMessage={setMessage}
      />
    ) : !!inventoryMission ? (
      <InventoryDialog
        open={!!inventoryMission}
        onClose={() => setInventoryMission(null)}
        onCloseParentAlso={() => {
          setInventoryMission(null)
          onClose()
        }}
        apes={apes}
        selectedApes={selectedApes}
        setSelectedApes={setSelectedApes}
        mission={inventoryMission}
        setMessage={setMessage}
        reloadApes={reloadApes}
      />
    ) : (
      <div className='mission-list-dialog-container'>
        <div className='d-flex justify-content-center align-items-center mt-3'>
          MISSION LIST
          <CloseButton onClick={onClose} />
        </div>
        <MissionListMapInfo map={map} />
        <MissionListMapFilter maps={maps} map={map} setMap={setMap} />
        <div className='mission-list-container'>
          {(missions || [])
            .filter((mission) => !map || mission.Map.id === map?.id)
            .map((mission) => (
              <MissionRow
                key={`mission-${mission.id}`}
                mission={mission}
                setInventoryMission={setInventoryMission}
                setSelectedRewardMission={setSelectedRewardMission}
              />
            ))}
        </div>
      </div>
    )
  ) : null
}

export default MissionListDialog
