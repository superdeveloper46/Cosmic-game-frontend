import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import ApplyButton from '../ApplyButton'
import AccountInventoryPage from '../AccountInventoryPage/account-inventory-page'

const CharacterProfileCrafting = ({
  setSelectedInventory,
  limitBreeakRecipes,
  setSelectedRecipe,
  selectedSubType,
  setSelectedSubType,
  selectedInventory,
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [inventory, setInventory] = useState(null)

  useEffect(() => {
    if (!!inventory) {
      const recipe = limitBreeakRecipes.find((r) => {
        return (
          r.Category.toLowerCase() === inventory.category.toLowerCase() &&
          parseInt(r.Star) === inventory.star &&
          parseInt(r.Tier) === inventory.tier + 1
        )
      })

      if (!!setSelectedRecipe && !!recipe) {
        setSelectedRecipe(recipe)
        setSelectedInventory(inventory)
      }
    }
  }, [inventory])

  useEffect(()=>{
    setSelectedRecipe(null)
    setSelectedInventory(null)
  }, [])
  
  useEffect(() => {
    if (location?.state?.selectedInv) {
      setInventory(location?.state?.selectedInv)
    }
  }, [location])

  return (
    <div
      className='d-flex align-items-center flex-column'
      style={{ width: '28%', minWidth: '28%', maxWidth: '28%' }}
    >
      <div className='w-100 h-100'>
        <AccountInventoryPage
          onClick={(inv) => setInventory(inv)}
          activeInv={inventory}
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
                selectedInv: inventory,
              },
            })
          }
        >
          Repair
        </ApplyButton>
      </div>
    </div>
  )
}

export default CharacterProfileCrafting
