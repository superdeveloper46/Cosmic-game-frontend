import React from 'react'
import { useNavigate } from 'react-router-dom'
import ApplyButton from '../ApplyButton'
import AccountInventoryPage from '../AccountInventoryPage/account-inventory-page'

const CharacterInventory = ({
  selectedInventory,
  setSelectedInventory,
  selectedSubType,
  setSelectedSubType,
}) => {
  const navigate = useNavigate()

  return (
    <div
      className='d-flex align-items-center flex-column'
      style={{ width: '28%', minWidth: '28%', maxWidth: '28%' }}
    >
      <div className='w-100 h-100'>
        <AccountInventoryPage
          onClick={(inventory) => {
            !!setSelectedInventory &&
              setSelectedInventory({
                ...(selectedInventory || {}),
                selected: inventory,
              })
          }}
          selectedSubType={selectedSubType}
          setSelectedSubType={setSelectedSubType}
        />
      </div>
      <div className='d-flex align-items-center gap-4 w-100 mt-3 flex-wrap'>
        <div className='custom-border-bottom w-100' />
        <ApplyButton
          className='px-3 mb-4 mx-3'
          onClick={() =>
            navigate('/characters/repair', {
              state: {
                selectedInv: selectedInventory?.selected,
              },
            })
          }
        >
          Repair
        </ApplyButton>
        <ApplyButton
          className='px-3 mb-4 mx-3'
          onClick={() =>
            navigate('/characters/limitbreak', {
              state: {
                selectedInv: selectedInventory?.selected,
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

export default CharacterInventory
