import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ApplyButton from '../ApplyButton'
import AccountInventoryPage from '../AccountInventoryPage/account-inventory-page'

import './character-repair.scss'

const CharacterRepair = ({
  setSelectedRepairInv,
  selectedSubType,
  setSelectedSubType,
  selectedRepairInventory,
}) => {
  const navigate = useNavigate()

  return (
    <div
      className='d-flex align-items-center flex-column character-forge-container'
      style={{ width: '28%', minWidth: '28%', maxWidth: '28%' }}
    >
      <div className='w-100 h-100 w-100'>
        <AccountInventoryPage
          onClick={(inventory) => {
            setSelectedRepairInv(inventory)
          }}
          activeInv={selectedRepairInventory}
          selectedSubType={selectedSubType}
          setSelectedSubType={setSelectedSubType}
        />
      </div>
      <div className='d-flex align-items-center gap-4 w-100 mt-3 flex-wrap'>
        <div className='custom-border-bottom w-100' />
        <ApplyButton
          className='px-3 mb-4 mx-3'
          onClick={() =>
            navigate('/characters/limitbreak', {
              state: {
                selectedInv: selectedRepairInventory,
              },
            })
          }
        >
          Limit Break
        </ApplyButton>
      </div>
    </div>
  )
}

export default CharacterRepair
