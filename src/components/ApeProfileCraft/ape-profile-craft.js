import classNames from "classnames"
import React, { useState } from "react"
import { Image } from "react-bootstrap"
import useAudio from '../Audio/audio'
import { AUDIOLIST } from '../../consts/audio-list'
import ApeProfileCraftRecipesPage from "../ApeProfileCraftRecipesPage/ape-profile-craft-recipes-page"
import ApeProfileCraftSelectedItemInfo from "../ApeProfileCraftSelectedItemInfo/ape-profile-craft-selected-item-info"
import ApeProfileInventoryPage from "../ApeProfileInventoryPage/ape-profile-inventory-page"
import InventorySlot from "../InventorySlot"
import ItemSlot from "../ItemSlot"
import NormalButton from "../NormalButton"

const ApeProfileCraft = ({
  ape,
  craftRecipes,
  reloadApes,
  setMessage,
}) => {
  const generalSound = useAudio(AUDIOLIST['GERNERAL_BUTTON'])
  const [ view, setView ] = useState('inventory')
  const [ selectedRecipe, setSelectedRecipe ] = useState(null)
  const mainRecipe = (selectedRecipe?.recipes || []).find(recipe => recipe.ingredient_type === 'item')
  const mainInventory = (ape?.gameData?.Inventories || []).find(inv => inv.Item.id === mainRecipe?.ingredient?.id)

  return (
    <div className="d-flex justify-content-around flex-column p-2" style={{ border: '1px solid #3980DA', background: '#16305F' }}>
      <div className="d-flex justify-content-center align-items-center flex-column">
        <div className="d-flex justify-content-center align-items-center w-100">
          <div className="d-flex justify-content-center align-items-center flex-column">
            <div className="m-1 text-center" style={{ fontSize: '12px', maxWidth: '80px' }}>
              SELECT MAIN INGREDIENT
            </div>
            <InventorySlot
              key={`ape-profile-main-ingredient`}
              className="m-1"
              style={{ width: '60px', height: '60px', margin: '5px'}}
              inactive={ !mainInventory }
            >
              {
                !!selectedRecipe && !!mainInventory
                ? <Image src={`/item/${mainRecipe.ingredient.icon.replaceAll(' ', '_')}`} style={{ borderRadius: '20px' }} fluid />
                : null
              }
            </InventorySlot>
          </div>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <div className="text-center w-100" style={{ fontSize: '12px', margin: '0.75rem' }}>
              COST TO CRAFT
            </div>
            <div className="d-flex justify-content-center">
              {
                (selectedRecipe?.recipes || []).filter(recipe => recipe.ingredient_type === 'resource').map(
                  recipe => {
                    const remaining = recipe.ingredient.name === 'Cosmic Particles' 
                                      ? ape.gameData.cp 
                                      : (ape.gameData.Resource_Inventories.find(rInv => rInv.resource_id === recipe.ingredient.id)?.resource_quantity || 0)
                    return <div className="d-flex flex-column" key={ `ape-profile-craft-cost-${recipe.id}` } >
                      <InventorySlot 
                        style={{ width: '40px', height: '40px', margin: '5px'}}
                      >
                        <Image src={`/resources/bg/${(recipe.ingredient.icon || '').replaceAll(' ', '_')}`} style={{ borderRadius: '5px' }} fluid />
                      </InventorySlot>
                      <div 
                        className={ classNames("text-center", {'text-success': remaining >= recipe.ingredient_quantity, 'text-danger': remaining < recipe.ingredient_quantity}) } 
                        style={{ fontSize: '12px' }}
                      >
                        {remaining}/{recipe.ingredient_quantity || 0}
                      </div>
                    </div>
                  }
                )
              }
              {
                (selectedRecipe?.recipes || []).filter(recipe => recipe.ingredient_type === 'resource').length < 3
                ? [...Array(3 - (selectedRecipe?.recipes || []).filter(recipe => recipe.ingredient_type === 'resource').length)].map((v, id) => <ItemSlot key={ `ape-profile-inactive-item-slot-${id}` } style={{ width: '40px', height: '40px', margin: '5px' }} inactive />)
                : null
              }
            </div>
          </div>
          <ApeProfileCraftSelectedItemInfo 
            recipe={ selectedRecipe }
            address={ ape?.mint }
            wallet={ ape?.gameData?.owner }
            setSelectedRecipe={ setSelectedRecipe }
            reloadApes={ reloadApes }
            setMessage={ setMessage }
          />
        </div>
      </div>
      {
        view === 'inventory'
        ? <div className="mt-1">
          <div className="d-flex justify-content-end align-items-center">
            <NormalButton 
              className="m-1" 
                onClick={() => {
                  generalSound()
                  setView('crafting list')
                }}
              inactive
            >
              CRAFTING LIST VIEW
            </NormalButton>
          </div>
          <ApeProfileInventoryPage
            ape={ ape }
            craftRecipes={ craftRecipes }
            onClickInventory={ setSelectedRecipe }
          /> 
        </div>
        : <div className="mt-1">
          <div className="d-flex justify-content-end align-items-center">
            <NormalButton 
              className="m-1" 
                onClick={() => {
                  generalSound()
                  setView('inventory')
                }}
              inactive
            >
              INVENTORY VIEW
            </NormalButton>
          </div>
          <ApeProfileCraftRecipesPage
            craftRecipes={ craftRecipes }
              onClick={() => {
                generalSound()
                setSelectedRecipe()
              }}
          /> 
        </div>
      }
    </div>
  )
}

export default ApeProfileCraft