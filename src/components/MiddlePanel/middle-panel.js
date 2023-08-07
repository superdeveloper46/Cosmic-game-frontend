import React from 'react'
import { Image } from 'react-bootstrap'
import CharacterProfile from '../CharacterProfile/character-profile'
import CharacterProfileCraftingRecipeDetails from '../CharacterProfileCraftingRecipeDetails/character-profile-crafting-recipe-details'
import CharacterProfileEvolution from '../CharacterProfileEvolution/character-profile-evolution'
import CharacterProfileLevel from '../CharacterProfileLevel/character-profile-level'
import CharacterForgingDetails from '../CharacterForgingDetails/character-forging-details'
import CharacterRepairDetails from '../CharacterRepairDetails/character-repair-details'
import LeftButton from '../LeftButton/left-button'
import RightButton from '../RightButton/right-button'

const MiddlePanel = ({
  ape,
  gotoLeftApe,
  gotoRightApe,
  crownedApeId,
  switchCrown,
  reloadApes,
  reloadAccount,
  tab,
  setMessage,
  setSelectedItem,
  selectedInventory,
  setSelectedInventory,
  selectedRecipe,
  setSelectedRecipe,
  selectedForgeInventory,
  setSelectedForgeInv,
  selectedMaterials,
  setSelectedMaterials,
  selectedRepairInventory,
  setSelectedRepairInv,
  selectedRepairMaterials,
  setSelectedRepairMaterials,
}) => {
  return (
    <div
      className='d-flex justify-content-start align-items-center flex-column'
      style={{ width: '35%', minWidth: '35%', maxWidth: '35%' }}
    >
      {tab !== 'Limit Break' && tab !== 'Repair' ? (
        <div className='panel-header w-100 custom-border-bottom'>
          <div className='d-flex justify-content-around align-items-center w-100'>
            <LeftButton onClick={gotoLeftApe} />
            <div
              className='d-flex justify-content-center align-items-center'
              style={{ minWidth: '200px' }}
            >
              <div className='text-white'>{ape?.info?.name || ''}</div>
            </div>
            <RightButton onClick={gotoRightApe} />
          </div>
        </div>
      ) : (
        <div style={{ paddingBottom: '80px' }} />
      )}
      {tab === 'Overview' ? (
        <CharacterProfile
          ape={ape}
          crownedApeId={crownedApeId}
          switchCrown={switchCrown}
          reloadApes={reloadApes}
        />
      ) : tab === 'Level' ? (
        <CharacterProfileLevel
          ape={ape}
          crownedApeId={crownedApeId}
          switchCrown={switchCrown}
          reloadApes={reloadApes}
          setMessage={setMessage}
        />
      ) : tab === 'Ascension' ? (
        <CharacterProfileEvolution
          ape={ape}
          crownedApeId={crownedApeId}
          switchCrown={switchCrown}
          reloadApes={reloadApes}
          setMessage={setMessage}
        />
      ) : tab === 'Inventory' ? (
        <CharacterProfile
          ape={ape}
          crownedApeId={crownedApeId}
          switchCrown={switchCrown}
          reloadApes={reloadApes}
          selectedInventory={selectedInventory}
          setSelectedInventory={setSelectedInventory}
        />
      ) : tab === 'Limit Break' ? (
        <CharacterProfileCraftingRecipeDetails
          ape={ape}
          selectedRecipe={selectedRecipe}
          setSelectedRecipe={setSelectedRecipe}
          reloadApes={reloadApes}
          setMessage={setMessage}
        />
      ) : tab === 'Forging' ? (
        <CharacterForgingDetails
          ape={ape}
          selectedForgeInventory={selectedForgeInventory}
          setSelectedForgeInv={setSelectedForgeInv}
          selectedMaterials={selectedMaterials}
          setSelectedMaterials={setSelectedMaterials}
          reloadApes={reloadApes}
          setMessage={setMessage}
        />
      ) : tab === 'Repair' ? (
        <CharacterRepairDetails
          ape={ape}
          selectedRepairInventory={selectedRepairInventory}
          setSelectedRepairInv={setSelectedRepairInv}
          selectedRepairMaterials={selectedRepairMaterials}
          setSelectedRepairMaterials={setSelectedRepairMaterials}
          reloadApes={reloadApes}
          reloadAccount={reloadAccount}
          setMessage={setMessage}
          setSelectedItem={setSelectedItem}
        />
      ) : tab === 'Equip' ? (
        <CharacterProfile
          ape={ape}
          crownedApeId={crownedApeId}
          switchCrown={switchCrown}
          reloadApes={reloadApes}
          selectedInventory={selectedInventory}
          setSelectedInventory={setSelectedInventory}
        />
      ) : (
        <CharacterProfile
          ape={ape}
          crownedApeId={crownedApeId}
          switchCrown={switchCrown}
          reloadApes={reloadApes}
        />
      )}
    </div>
  )
}

export default MiddlePanel
