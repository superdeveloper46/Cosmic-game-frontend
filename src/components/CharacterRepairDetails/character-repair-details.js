import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import ReactSlider from 'react-slider'
import ApplyButton from '../ApplyButton'
import ResourceItemSlot from '../ResourceItemSlot'
import IconTextButton from '../IconTextButton'
import MaterialsSlot from '../MaterialsSlot/materials-slot'
import TierItemSlot from '../TierItemSlot'
import ExpProgressBar from '../ExpProgressBar/exp-progress-bar'
import './character-repair-details.scss'
import { useDispatch, useSelector } from 'react-redux'
import repairInventory from '../../utils/repair-inventory'
import InventoryItem from '../InventoryItem/inventory-item'
import { refetchInventory } from '../../slices/inventorySlice'
import { getAccountResources } from '../../slices/resourceSlice'
import { useWallet } from '@solana/wallet-adapter-react'
import { setIsHammersClickable } from '../../slices/repairSlice'

const CharacterRepairDetails = ({
  ape,
  selectedRepairInventory,
  setSelectedRepairInv,
  selectedRepairMaterials,
  setSelectedRepairMaterials,
  reloadApes,
  reloadAccount,
  setMessage,
  setSelectedItem,
}) => {
  const [efficiencyValues, setEfficiencyValues] = useState([0, 0, 0])
  const repairCosts = useSelector((state) => state.inventories.repairCosts)
  const inventories = useSelector((state) => state.inventories.inventories)
  const resources = useSelector((state) => state.resources.resources)
  const accountResources = useSelector(
    (state) => state.resources.accountResources,
  )
  const { publicKey, disconnecting } = useWallet()
  const location = useLocation()

  const dispatch = useDispatch()

  const reloadInventory = (inventory) => dispatch(refetchInventory(inventory))

  const reloadResourceAccountSummary = () =>
    dispatch(getAccountResources(publicKey))

  useEffect(() => {
    if (!!selectedRepairInventory) {
      const invEfficiency = selectedRepairInventory.efficiency || 0
      const maxEfficiency = selectedRepairInventory.item_efficiency || 0
      const efficiencyFromMaterials =
        ((selectedRepairMaterials || [])
          .map((material) => {
            const effect = material.resource?.effect || {}

            return (
              (typeof effect === 'object'
                ? effect?.efficiency || 0
                : JSON.parse(effect || '{}')?.efficiency || 0) *
              (material.count || 0)
            )
          })
          .reduce((a, b) => a + b, 0) *
          maxEfficiency) /
        100

      setEfficiencyValues([
        invEfficiency,
        Math.min(maxEfficiency, invEfficiency + efficiencyFromMaterials),
        Math.min(maxEfficiency, invEfficiency + efficiencyFromMaterials),
      ])
    } else {
      setEfficiencyValues([0, 0, 0])
    }
  }, [selectedRepairInventory, selectedRepairMaterials])

  useEffect(() => {
    if (selectedRepairInventory) {
      let temp = selectedRepairInventory
      setSelectedRepairInv(
        inventories.filter((inv) => inv.inv_id === temp?.inv_id)[0],
      )
    } else {
      if (location?.state?.selectedInv) {
        setSelectedRepairInv(location?.state?.selectedInv)
      }
    }
  }, [inventories, location])

  useEffect(() => {
    if (!!efficiencyValues) {
      dispatch(
        setIsHammersClickable(
          efficiencyValues[2] !== selectedRepairInventory?.item_efficiency,
        ),
      )
    }
  }, [efficiencyValues])

  const handleClickMaterial = (resource) => {
    const materialIndex = (selectedRepairMaterials || []).findIndex(
      (material) => material.id === resource.id,
    )
    const material = (selectedRepairMaterials || [])[materialIndex]

    if ((material?.count || 0) > 0) {
      setSelectedRepairMaterials(
        [
          ...selectedRepairMaterials.filter((m) => m.id !== material.id),
          {
            id: resource.id,
            resource,
            count: (material.count || 0) - 1,
          },
        ].sort((m1, m2) => m1.id - m2.id),
      )
    }
  }

  return (
    <div className="d-flex justify-content-start w-100 align-items-center flex-column">
      <div className="d-flex justify-content-center align-items-center">
        <div>
          <p className="repair-description">
            Repair Bar: Using the repair bar to repair items costs Gold and
            Ascension
          </p>
          <InventoryItem
            key={`ape-profile-main-ingredient`}
            style={{ width: '240px', height: '240px', margin: '5px' }}
            inventory={selectedRepairInventory}
            placeholder={
              <p className="h3 text-center">Select Item to Repair</p>
            }
            onSearchClick={(e) => {
              e.stopPropagation()
              setSelectedItem(selectedRepairInventory)
            }}
          />
        </div>
        <div className="h-full">
          <p className="repair-description text-center m-3">
            Efficiency: <br />
            {selectedRepairInventory?.efficiency || 0} /{' '}
            {selectedRepairInventory?.item_efficiency || 0} (+
            {efficiencyValues[2] - efficiencyValues[0]})
          </p>
          <ReactSlider
            className="vertical-slider"
            thumbClassName="repair-thumb"
            trackClassName="repair-track"
            value={efficiencyValues}
            max={selectedRepairInventory?.item_efficiency || 0}
            onChange={(values, index) => {
              if (
                values[0] === efficiencyValues[0] &&
                values[1] === efficiencyValues[1]
              ) {
                setEfficiencyValues(values)
              }
            }}
            ariaLabel={['Lowest thumb', 'Middle thumb', 'Top thumb']}
            orientation="vertical"
            invert
          />
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center flex-column">
        <p className="text-center repair-description w-100 mt-2">
          Repair items by Repair Hammers is free.
        </p>
      </div>
      <div className="d-flex justify-content-center">
        {resources
          .filter((resource) => resource.type === 'Resource: Repair Item')
          .map((resource) => (
            <MaterialsSlot
              key={`repair-selected-material-${resource.id}`}
              resource={resource}
              onClick={() => handleClickMaterial(resource)}
              text={
                (selectedRepairMaterials || []).find(
                  (material) => material?.resource?.id === resource.id,
                )?.count || 0
              }
              clickable={
                ((selectedRepairMaterials || []).find(
                  (material) => material?.resource?.id === resource.id,
                )?.count || 0) > 0
              }
            />
          ))}
      </div>
      <div className="d-flex justify-content-center align-items-center flex-column">
        <p className="text-center h5 w-100 mt-2">Currency Required:</p>
      </div>
      <IconTextButton
        className="repair-currency-required"
        info={[
          {
            id: 'character-profile-evolve-gold-ascension',
            image: '/images/v2/currencies/Gold.png',
            text: (
              (repairCosts.find(
                (cost) => cost.tier === selectedRepairInventory?.tier,
              )?.gold || 0) *
              (efficiencyValues[2] - efficiencyValues[1])
            ).toFixed(2),
          },
          {
            id: 'character-profile-evolve-pink-ascension',
            image: '/images/v2/currencies/Ascension.png',
            text: (
              (repairCosts.find(
                (cost) => cost.tier === selectedRepairInventory?.tier,
              )?.ascension || 0) *
              (efficiencyValues[2] - efficiencyValues[1])
            ).toFixed(2),
          },
        ]}
      />
      <ApplyButton
        className="my-3 px-4"
        onClick={() => {
          if (
            !!selectedRepairInventory &&
            efficiencyValues[0] !== efficiencyValues[2]
          ) {
            setMessage({
              type: 'confirm',
              text: `Are you sure to repair ${
                selectedRepairInventory.name || 'this item'
              } to ${efficiencyValues[2]}?`,
              callback: (confirm) => {
                if (confirm === 'yes') {
                  repairInventory({
                    wallet: ape.gameData.owner,
                    inventory: selectedRepairInventory,
                    materials: selectedRepairMaterials || [],
                    efficiency: efficiencyValues[2],
                    callback: async () => {
                      await reloadApes([ape.mint])
                      await reloadAccount(ape.gameData.owner)
                      await reloadInventory(selectedRepairInventory)
                      await reloadResourceAccountSummary()
                      setSelectedRepairMaterials([])
                    },
                    setMessage,
                  })
                }
              },
            })
          }
        }}
      >
        Repair
      </ApplyButton>
    </div>
  )
}

export default CharacterRepairDetails
