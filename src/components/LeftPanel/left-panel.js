import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CharacterInventory from '../CharacterProfileInventory/character-profile-inventory'
import CharacterMenu from '../CharacterMenu/character-menu'
import CharacterProfileCrafting from '../CharacterProfileCrafting/character-profile-crafting'
import { tabList } from '../TapButtons/tabButtons'
import CharacterListDialog from '../CharacterListDialog/CharacterListDialog'
import CharacterForging from '../CharacterForging/character-forging'
import CharacterRepair from '../CharacterRepair/character-repair'
import { setSelectedApes } from '../../slices/apeSlice'
import CharacterProfileLevelExperienceItems from '../CharacterProfileLevelExperienceItems/character-profile-level-experience-items'

const LeftPanel = ({
  ape,
  tab,
  setTab,
  selected,
  setSelected,
  selectedInventory,
  setSelectedInventory,
  crownedApeId,
  limitBreeakRecipes,
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
  setSelectedResource,
  selectedSubType,
  setSelectedSubType,
}) => {
  const dispatch = useDispatch()
  const apes = useSelector((state) => state.apes.apes)

  return tab === 'Overview' ||
    (tab === 'Inventory' && selected === tabList[0]) ||
    (tab === 'Crafting' && selected === tabList[0]) ||
    (tab === 'Level' && selected === tabList[0]) ||
    (tab === 'Forging' && selected === tabList[0]) ||
    (tab === 'Repair' && selected === tabList[0]) ? (
    <CharacterMenu tab={tab} setTab={setTab} setSelected={setSelected} />
  ) : tab === 'Level' ? (
    <CharacterProfileLevelExperienceItems
      ape={ape}
      tab={tab}
      // setTab={setTab}
      selectedInventory={selectedInventory}
      setSelectedInventory={setSelectedInventory}
    />
  ) : tab === 'Equip' ? (
    <CharacterInventory
      ape={ape}
      tab={tab}
      // setTab={setTab}
      selectedSubType={selectedSubType}
      setSelectedSubType={setSelectedSubType}
      selectedInventory={selectedInventory}
      setSelectedInventory={setSelectedInventory}
      setSelectedResource={setSelectedResource}
    />
  ) : tab === 'Limit Break' ? (
    <CharacterProfileCrafting
      ape={ape}
      tab={tab}
      // setTab={setTab}
      setSelectedInventory={setSelectedInventory}
      limitBreeakRecipes={limitBreeakRecipes}
      selectedRecipe={selectedRecipe}
      setSelectedRecipe={setSelectedRecipe}
      selectedSubType={selectedSubType}
      selectedInventory={selectedInventory}
      setSelectedSubType={setSelectedSubType}
    />
  ) : tab === 'Character' || tab === 'Ascension' ? (
    <CharacterListDialog
      crownedApeId={crownedApeId}
      open={true}
      apes={apes}
      onClose={() => true}
      setProfileApe={(ape) => {
        dispatch(setSelectedApes([ape]))
      }}
    />
  ) : tab === 'Forging' ? (
    <CharacterForging
      ape={ape}
      selectedForgeInventory={selectedForgeInventory}
      setSelectedForgeInv={setSelectedForgeInv}
      selectedMaterials={selectedMaterials}
      setSelectedMaterials={setSelectedMaterials}
    />
  ) : tab === 'Repair' ? (
    <CharacterRepair
      ape={ape}
      selectedRepairInventory={selectedRepairInventory}
      setSelectedRepairInv={setSelectedRepairInv}
      selectedRepairMaterials={selectedRepairMaterials}
      setSelectedRepairMaterials={setSelectedRepairMaterials}
      selectedSubType={selectedSubType}
      selectedInventory={selectedInventory}
      setSelectedSubType={setSelectedSubType}
    />
  ) : (
    <CharacterMenu
      tab={tab}
      // setTab={setTab}
      setSelected={setSelected}
    />
  )
}

export default LeftPanel
