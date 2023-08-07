import React from "react"
import { Image } from "react-bootstrap"
import useAudio from '../Audio/audio'
import { AUDIOLIST } from '../../consts/audio-list'
import InventorySlot from "../InventorySlot"

const ApeProfileCraftRecipesPage = ({
  craftRecipes,
  onClick,
}) => {
  const generalSound = useAudio(AUDIOLIST['GERNERAL_BUTTON'])
  const handleClick = recipe => {
    generalSound()
    onClick(recipe)
  }

  return (
    <div className="craft-recipe-page-container">
      <div style={{ maxHeight: 'calc(100vh - 520px)', overflowY: 'auto', display: 'flex', flexWrap: 'wrap', border: '1px solid #00B1FB', padding: '0.5rem' }} className="justify-content-center align-items-center mt-1">
      {
        craftRecipes.map(
          recipe => (
            <div className="w-12" key={`craft-recipe-${recipe.id}`}>
              <InventorySlot
                key={`craft-recipe-item-${recipe.id}`}
                className="m-1"
                onClick={ () => handleClick(recipe) }
              >
                <Image src={`/item/${recipe.icon.replaceAll(' ', '_')}`} style={{ borderRadius: '20px' }} fluid />
              </InventorySlot>
            </div>
          )
        )
      }
      {
        [...Array(32 - craftRecipes.length)].map(
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
  )
}

export default ApeProfileCraftRecipesPage