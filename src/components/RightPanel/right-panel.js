import React from 'react'
import { useNavigate } from 'react-router-dom'
import CharacterProfileRecipeSelectedItemInfo from '../CharacterProfileCraftingSelectedItemInfo/character-profile-crafting-selected-item-info'
import CharacterProfileInventorySelectedItemInfo from '../CharacterProfileInventorySelectedItemInfo/character-profile-inventory-selected-item-info'
import CharacterProfileStats from '../CharacterProfileStats/character-profile-stats'
import CharacterProfileRepairSelectedItemInfo from '../CharacterProfileRepairSelectedItemInfo/character-profile-repair-selected-item-info'
import CharacterProfileForgingSelectedItemInfo from '../CharacterProfileForgingSelectedItemInfo/character-profile-forging-selected-item-info'

const RightPanel = ({
  ape,
  apes,
  tab,
  setTab,
  selectedInventory,
  setSelectedInventory,
  selectedForgeInventory,
  selectedMaterials,
  reloadApes,
  setVideo,
  setMessage,
  selectedRecipe,
  setSelectedRecipe,
  selectedRepairInventory,
  selectedRepairMaterials,
  setSelectedRepairMaterials,
}) => {
  const navigate = useNavigate()

  return tab === 'Overview' ? (
    <CharacterProfileStats ape={ape} />
  ) : tab === 'Level' ? (
    <CharacterProfileStats
      ape={ape}
      gotoEvolve={() => navigate('/characters/evolution')}
      withEvolve
    />
  ) : tab === 'Ascension' ? (
    <CharacterProfileStats
      ape={ape}
      gotoLevel={() => navigate('/characters/level')}
      withLevel
    />
  ) : tab === 'Equip' ? (
    <CharacterProfileInventorySelectedItemInfo
      ape={ape}
      inventory={selectedInventory}
      apes={apes}
      address={ape?.mint}
      wallet={ape?.gameData?.owner}
      setSelectedInventory={setSelectedInventory}
      reloadApes={reloadApes}
      setMessage={setMessage}
      setVideo={setVideo}
    />
  ) : tab === 'Limit Break' ? (
    <CharacterProfileRecipeSelectedItemInfo
      ape={ape}
      recipe={selectedRecipe}
      apes={apes}
      address={ape?.mint}
      wallet={ape?.gameData?.owner}
      setSelectedRecipe={setSelectedRecipe}
      reloadApes={reloadApes}
      setMessage={setMessage}
    />
  ) : tab === 'Forging' ? (
    <CharacterProfileForgingSelectedItemInfo
      apes={apes}
      forgeItem={selectedForgeInventory}
      selectedMaterials={selectedMaterials}
    />
  ) : tab === 'Repair' ? (
    <CharacterProfileRepairSelectedItemInfo
      selectedRepairMaterials={selectedRepairMaterials}
      setSelectedRepairMaterials={setSelectedRepairMaterials}
    />
  ) : (
    <CharacterProfileStats
      ape={ape}
      withEvolve
      withLevel
      tab={tab}
      gotoLevel={() => navigate('/characters/level')}
      gotoEvolve={() => navigate('/characters/evolution')}
    />
  )
}

export default RightPanel
