import classNames from 'classnames'
import React from 'react'
import { Image } from 'react-bootstrap'
import ApplyButton from '../ApplyButton'
import ResourceItemSlot from '../ResourceItemSlot'
import MaterialsSlot from '../MaterialsSlot/materials-slot'
import TierItemSlot from '../TierItemSlot'
import ExpProgressBar from '../ExpProgressBar/exp-progress-bar'
import './character-forging-details.scss'
import InventoryItem from '../InventoryItem/inventory-item'
import { useDispatch } from 'react-redux'
import forgeInventory from '../../utils/forge-inventory'
import useAudio from '../Audio/audio'
import { AUDIOLIST } from '../../consts/audio-list'

const CharacterForgingDetails = ({
  ape,
  selectedForgeInventory,
  setSelectedForgeInv,
  selectedMaterials,
  setSelectedMaterials,
  reloadApes,
  setMessage,
}) => {
  const dispatch = useDispatch()
  const generalSound = useAudio(AUDIOLIST['GERNERAL_BUTTON'])

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

  return (
    <div className='d-flex justify-content-start w-100 align-items-center flex-column position-relative'>
      <div className='d-flex justify-content-center align-items-center flex-column'>
        <InventoryItem
          key={`ape-profile-main-ingredient`}
          className='m-1'
          style={{ width: '240px', height: '240px', margin: '5px' }}
          inventory={selectedForgeInventory}
          placeholder={<p className='h3 text-center'>Select Item to Craft</p>}
        />
      </div>
      {!!selectedForgeInventory?.Item &&
      (selectedForgeInventory.experience || 0) ===
        (selectedForgeInventory.Item.experience || 0) ? (
        <div className='maxed-level-message text-white text-center w-100 h5 p-2'>
          Item Level Maxed - Craft to Increase Item Tier
        </div>
      ) : null}
      <div className='d-flex justify-content-center align-items-center flex-column'>
        <p className='text-center h5 w-100 mt-2'>Item Experience:</p>
      </div>
      <ExpProgressBar
        total={selectedForgeInventory?.Item?.experience || 0}
        firstValue={selectedForgeInventory?.experience || 0}
        secondValue={(selectedMaterials || [])
          .map((material) => material.Item?.gxp || 0)
          .reduce((a, b) => a + b, 0)}
        maxCheck
      />
      <div className='d-flex justify-content-center align-items-center flex-column'>
        <p className='text-center h5 w-100 mt-2'>Forging Materials:</p>
      </div>
      <div className='forging-material'>
        <div className='w-100 d-flex align-items-center custom-scroll py-1'>
          {selectedMaterials && selectedMaterials.length > 0 ? (
            <div className='d-flex'>
              {selectedMaterials.map((material) =>
                !!material.Item ? (
                  <InventoryItem
                    key={`selected-material-item-${material.id}`}
                    onClick={() => {
                      generalSound()
                      handleClickMaterial(material)
                    }}
                    inventory={material}
                  />
                ) : (
                  <ResourceItemSlot
                    resource={material}
                    key={`selected-resource-${material.id}`}
                    style={{
                      width: '80px',
                      height: '100px',
                      marginLeft: '10px',
                      marginRight: '10px',
                      flexShrink: '0',
                    }}
                  />
                ),
              )}
            </div>
          ) : (
            <p className='m-0 mx-auto text-center h3'>
              Select Forging Materials
            </p>
          )}
        </div>
      </div>
      <ApplyButton
        className='my-3 px-4'
        onClick={() => {
          generalSound()
          if (
            !!selectedForgeInventory &&
            (selectedMaterials || []).length > 0
          ) {
            setMessage({
              type: 'confirm',
              text: `Are you sure forge ${
                selectedForgeInventory.Item?.name || 'this item'
              } by ${(selectedMaterials || []).length} selected materials?`,
              callback: (confirm) => {
                if (confirm === 'yes') {
                  forgeInventory({
                    address: ape.mint,
                    wallet: ape.gameData.owner,
                    inventory: selectedForgeInventory,
                    materials: selectedMaterials || [],
                    callback: async () => {
                      await reloadApes([ape.mint])
                      setSelectedForgeInv(null)
                      setSelectedMaterials([])
                    },
                    setMessage,
                  })
                }
              },
            })
          }
        }}
      >
        Forge
      </ApplyButton>
    </div>
  )
}

export default CharacterForgingDetails
