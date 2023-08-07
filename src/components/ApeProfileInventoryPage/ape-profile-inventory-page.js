import React from "react"
import { Image } from "react-bootstrap"
import useAudio from '../Audio/audio'
import { AUDIOLIST } from '../../consts/audio-list'
import InventorySlot from "../InventorySlot"

const ApeProfileInventoryPage = ({
  ape,
  craftRecipes,
  onClickInventory,
}) => {
  const generalSound = useAudio(AUDIOLIST['GERNERAL_BUTTON'])
  const slots = ape?.gameData?.Level?.inventory || 0
  const inventories = (ape?.gameData?.Inventories || []).slice(0, slots)
  
  const handleClick = inventory => {
    generalSound()
    if (!!craftRecipes) {
      const recipe = craftRecipes.find(recipe => !!recipe.recipes.find(ingredient => ingredient.ingredient_type === 'item' && ingredient.ingredient.id === inventory.Item.id))
      onClickInventory(recipe)
    } else {
      onClickInventory({
        inventory,
        action: 'equip'
      })
    }
  }

  return (
    !!ape
    ? <div className="inventory-page-container">
      <div style={{ maxHeight: 'calc(100vh - 520px)', overflowY: 'auto', display: 'flex', flexWrap: 'wrap', border: '1px solid #00B1FB', padding: '0.5rem' }} className="justify-content-center align-items-center mt-1">
      {
        inventories.map(
          inventory => (
            <div className="w-12" key={`inventory-${inventory.id}`}>
              <InventorySlot
                key={`inventory-item-${inventory.id}`}
                className="m-1"
                onClick={ () => handleClick(inventory) }
              >
                <Image src={`/item/${inventory.Item.icon.replaceAll(' ', '_')}`} style={{ borderRadius: '20px' }} fluid />
              </InventorySlot>
            </div>
          )
        )
      }
      {
        [...Array(slots - inventories.length)].map(
          (_, id) => (
            <div className="w-12" key={`inventory-active-wrapper-${id}`}>
              <InventorySlot
                key={`inventory-active-${id}`}
                className="m-1"
              >
              </InventorySlot>
            </div>
          )
        )
      }
      {
        [...Array(32 - slots)].map(
          (_, id) => (
            <div className="w-12" key={`inventory-inactive-wrapper-${id}`}>
              <InventorySlot
                key={`inventory-inactive-${id}`}
                className="m-1"
                inactive
              >
              </InventorySlot>
            </div>
          )
        )
      }
      </div>
    </div>
    : null
  )
}

export default ApeProfileInventoryPage