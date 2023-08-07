import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import InventoryItem from '../InventoryItem/inventory-item'
import ResourceItemSlot from '../ResourceItemSlot'
import ApplyButton from '../ApplyButton'
import useAudio from '../Audio/audio'
import { AUDIOLIST } from '../../consts/audio-list'
import './character-forging.scss'

const inventoryList = ['Equip Items']
const materialList = ['Resource Items', 'Equip Items', 'Legendary Equip Items']

const CharacterForging = ({
  ape,
  selectedForgeInventory,
  setSelectedForgeInv,
  selectedMaterials,
  setSelectedMaterials,
}) => {
  const generalSound = useAudio(AUDIOLIST['GERNERAL_BUTTON'])
  const [selectedForge, setSelectedForge] = useState(0)
  const [selectedMaterial, setSelectedMaterial] = useState(0)

  const handleClickMaterial = (inventory) => {
    if (
      !!(selectedMaterials || []).find(
        (material) => material.id === inventory.id,
      )
    ) {
      setSelectedMaterials(
        (selectedMaterials || []).filter(
          (material) => material.id !== inventory.id,
        ),
      )
    } else {
      setSelectedMaterials([...selectedMaterials, inventory])
    }
  }

  const handleAutoSelect = () => {
    generalSound()
    const normalInventories = (ape?.gameData?.Inventories || []).filter(
      (inv) =>
        inv.Item?.type === 'Equipment' && inv.id !== selectedForgeInventory?.id,
    )
    const legendaryInventories = (ape?.gameData?.Inventories || []).filter(
      (inv) =>
        inv.Item?.type === 'Legendary Equipment' &&
        inv.id !== selectedForgeInventory?.id,
    )
    const maxExp = selectedForgeInventory?.Item?.experience || 0
    const currentExp = selectedForgeInventory?.experience || 0

    let forgingExp = 0
    let materials = []
    normalInventories.forEach((inventory) => {
      if (currentExp + forgingExp < maxExp) {
        forgingExp += inventory.Item.gxp || 0
        materials.push(inventory)
      }
    })
    legendaryInventories.forEach((inventory) => {
      if (currentExp + forgingExp < maxExp) {
        forgingExp += inventory.Item.gxp || 0
        materials.push(inventory)
      }
    })

    setSelectedMaterials(materials)
  }

  return (
    <div
      className='d-flex align-items-center flex-column character-forge-container'
      style={{ width: '28%', minWidth: '28%', maxWidth: '28%' }}
    >
      <div className='character-forge-title w-100 d-flex justify-content-start align-items-start flex-column'>
        <div className='mt-4'>FORGE INVENTORY</div>
      </div>
      <div className='custom-border-bottom mb-4 w-100'>
        <div className='d-flex justify-content-between align-items-center character-forge-tab-btns'>
          {inventoryList.map((inventoryItem, index) => (
            <button
              key={`inventory-list-item-${index}`}
              className={index === selectedForge ? 'active' : ''}
              onClick={() => {
                generalSound()
                setSelectedForge(index)
              }}
            >
              {inventoryItem}
            </button>
          ))}
        </div>
      </div>
      <div
        className='d-flex flex-column justify-content-between custom-scroll overflow-auto px-2'
        style={{ height: '180px' }}
      >
        <div className='d-flex flex-wrap'>
          {(ape?.gameData?.Inventories || []).map((inventory) => (
            <InventoryItem
              key={`inventory-item-${inventory.id}`}
              onClick={() => {
                setSelectedForgeInv(inventory)
                setSelectedMaterials([])
              }}
              inventory={inventory}
              active={inventory?.id === selectedForgeInventory?.id}
            />
          ))}
        </div>
      </div>
      <div className='custom-border-bottom w-100 my-4'></div>
      <div className='character-forge-title w-100 d-flex justify-content-between align-items-start'>
        <div>MATERIAL INVENTORY</div>
        <ApplyButton onClick={handleAutoSelect}>Auto Select</ApplyButton>
      </div>
      <div className='custom-border-bottom mb-4 w-100'>
        <div className='d-flex justify-content-between character-forge-tab-btns'>
          {materialList.map((inventoryItem, index) => (
            <button
              key={`inventory-list-item-${index}`}
              className={`h-100 ${index === selectedMaterial ? 'active' : ''}`}
              onClick={() => {
                generalSound()
                setSelectedMaterial(index)
              }}
            >
              {inventoryItem}
            </button>
          ))}
        </div>
      </div>
      <div
        className='d-flex flex-column justify-content-between custom-scroll overflow-auto px-2'
        style={{ height: '180px' }}
      >
        <div className='d-flex justify-content-center flex-wrap'>
          {selectedMaterial === 0 //Resources
            ? (ape?.gameData?.Resource_Inventories || [])
                .filter((inv) => inv.Resource?.type === 'Forge')
                .map((inv) => (
                  <ResourceItemSlot
                    resource={inv}
                    onClick={() => {
                      generalSound()
                      handleClickMaterial(inv)
                    }}
                    key={`material-resource-${inv.id}`}
                    style={{ width: '80px', height: '100px', margin: '10px' }}
                  />
                ))
            : selectedMaterial === 1 //Equip Items
            ? (ape?.gameData?.Inventories || [])
                .filter(
                  (inv) =>
                    inv.Item?.type === 'Equipment' &&
                    inv.id !== selectedForgeInventory?.id,
                )
                .map((inventory) => (
                  <InventoryItem
                    key={`material-equip-item-${inventory.id}`}
                    onClick={() => {
                      generalSound()
                      handleClickMaterial(inventory)
                    }}
                    inventory={inventory}
                    active={
                      !!(selectedMaterials || []).find(
                        (material) => material.id === inventory.id,
                      )
                    }
                  />
                ))
            : selectedMaterial === 2 //Legendary Equip Items
            ? (ape?.gameData?.Inventories || [])
                .filter(
                  (inv) =>
                    inv.Item?.type === 'Legendary Equipment' &&
                    inv.id !== selectedForgeInventory?.id,
                )
                .map((inventory) => (
                  <InventoryItem
                    key={`material-legendary-item-${inventory.id}`}
                    onClick={() => {
                      generalSound()
                      handleClickMaterial(inventory)
                    }}
                    inventory={inventory}
                    active={
                      !!(selectedMaterials || []).find(
                        (material) => material.id === inventory.id,
                      )
                    }
                  />
                ))
            : (ape?.gameData?.Inventories || [])
                .filter(
                  (inv) =>
                    inv.Item?.type === 'Equipment' &&
                    inv.id !== selectedForgeInventory?.id,
                )
                .map((inventory) => (
                  <InventoryItem
                    key={`material-equip-item-${inventory.id}`}
                    onClick={() => {
                      generalSound()
                      handleClickMaterial(inventory)
                    }}
                    inventory={inventory}
                    active={
                      !!(selectedMaterials || []).find(
                        (material) => material.id === inventory.id,
                      )
                    }
                  />
                ))}
        </div>
      </div>
    </div>
  )
}

export default CharacterForging
