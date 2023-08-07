import React, { useState } from 'react'
import CloseButton from '../CloseButton'
import RewardRow from '../RewardRow/reward-row'

const RewardsDialog = ({
  open,
  rewards = [],
  resources,
  currencies,
  crownedApeId,
  onCloseParentAlso,
  onClick,
  setIsItemOpen,
  isEquip,
  setIsEquip,
  setSelectedInventory,
}) => {
  return !!open ? (
    <div
      className='mission-list-rewards-dialog-container'
      style={{ top: '100px' }}
    >
      <div className='d-flex justify-content-center align-items-center mt-3'>
        REWARDS
        <CloseButton onClick={onCloseParentAlso} />
      </div>
      <div
        className='mission-list-rewards-container flex flex-column align-items-center p-2 custom-scroll'
        style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 300px)' }}
      >
        {!!rewards
          ? rewards.map((reward) => (
              <RewardRow
                reward={reward}
                resources={resources}
                currencies={currencies}
                crownedApeId={crownedApeId}
                key={`reward-row-${reward.ape.id}`}
                onClick={onClick}
                setIsItemOpen={setIsItemOpen}
                isEquip={isEquip}
                setIsEquip={setIsEquip}
                setSelectedInventory={setSelectedInventory}
              />
            ))
          : null}
      </div>
    </div>
  ) : null
}

export default RewardsDialog
