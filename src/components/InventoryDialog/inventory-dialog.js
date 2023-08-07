import { useWallet } from "@solana/wallet-adapter-react"
import React, { useEffect, useState } from "react"
import getApeDefaultEquippedInventories from "../../utils/get-ape-default-equipped-inventories"
import startMissionForMultipleApes from "../../utils/start-mission-for-multiple-apes"
import CharacterRow from "../CharacterRow/character-row"
import CloseButton from "../CloseButton"
import InventoryPage from "../InventoryPage/inventory-page"
import NormalButton from "../NormalButton"
import ToggleWithLabel from "../ToggleWithLabel/toggle-with-label"

const InventoryDialog = ({
  open,
  onClose,
  onCloseParentAlso,
  apes,
  selectedApes,
  setSelectedApes,
  mission,
  setMessage,
  reloadApes,
}) => {
  const { publicKey } = useWallet()
  
  const [ multiSelect, setMultiSelect ] = useState(false)
  const [ selectAll, setSelectAll ] = useState(false)
  const [ inventoryEquips, setInventoryEquips ] = useState(getApeDefaultEquippedInventories(apes))

  useEffect(() => {
    if (!!selectAll) {
      setMultiSelect(true)
      if (selectedApes.length !== apes.length) {
        setSelectedApes(apes)
      }
    }
  }, [ selectAll ])

  useEffect(() => {
    if (!multiSelect) {
      if (selectedApes.length > 0) {
        setSelectedApes([selectedApes[0]])
      }
    }
  }, [ multiSelect ])
  
  useEffect(() => {
    if (selectedApes.length === apes.length) {
      setMultiSelect(true)
      setSelectAll(true)
    } else {
      setSelectAll(false)
    }
  }, [ selectedApes, apes ])

  useEffect(() => {
    if (!open) {
      setInventoryEquips(getApeDefaultEquippedInventories(apes))
    }
  }, [ apes ])

  const toggleApe = selectedApe => {
    if (multiSelect) {
      if (selectedApes.map(ape => ape.mint).includes(selectedApe.mint)) {
        if (selectedApes.length > 1) {
          setSelectedApes(
            selectedApes.filter(ape => ape.mint !== selectedApe.mint)
          )
        }
      } else {
        setSelectedApes([
          ...selectedApes,
          selectedApe,
        ])
      }
    } else {
      setSelectedApes([
        selectedApe
      ])
    }
  }

  const toggleInventory = ape => inventory => {
    if (!ape) return

    const inventories = inventoryEquips[ape.mint] || []

    if (!!inventories.find(inv => inv.id === inventory.id)) {
      setInventoryEquips({
        ...inventoryEquips,
        [ ape.mint ]: inventories.filter(inv => inv.id !== inventory.id)
      })
    } else if (inventories.length < 3) {
      setInventoryEquips({
        ...inventoryEquips,
        [ ape.mint ]: [
          ...inventories,
          inventory
        ]
      })
    }
  }

  return (
    !!open
    ? <div className="inventory-dialog-container">
      <div className="d-flex justify-content-center align-items-center mt-2">
        MISSIONS: CHARACTER SELECT
        <CloseButton onClick={ onClose }/>
      </div>
      <div className="d-flex justify-content-center">
        <div className="inventory-container m-1" style={{ flex: 1 }}>
          <div className="d-flex justify-content-center align-items-center mt-3 mb-2">
            CHARACTERS
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <ToggleWithLabel id="multi-select-switch" label="MULTI-SELECT" checked={ multiSelect } setChecked={ setMultiSelect } />
            <ToggleWithLabel id="select-all-switch" label="SELECT ALL" checked={ selectAll } setChecked={ setSelectAll } />
          </div>
          <div style={{ maxHeight: 'calc(100vh - 460px)', minHeight: 'calc(100vh - 460px)', overflowY: 'auto', border: '1px solid #00B1FB', flexGrow: 1 }}>
          {
            apes.map(
              ape => (
                <CharacterRow 
                  key={`inventory-ape-${ape.mint}`} 
                  ape={ ape } 
                  selected={ selectedApes.map(ape => ape.mint).includes(ape.mint) } 
                  onClick={ toggleApe } 
                  inventories={ inventoryEquips[ape.mint] } 
                  toggleInventory={ toggleInventory(ape) }
                />
              )
            )
          }
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <NormalButton 
              style={{ margin: '2px' }} 
              onClick={ onClose }
              inactive
              key="inventory-modal-cancel-button"
            >
              CANCEL
            </NormalButton>

            <NormalButton 
              style={{ margin: '0.5rem', padding: '0.5rem' }} 
              onClick={ () => startMissionForMultipleApes({ 
                apes: selectedApes,
                inventoryEquips,
                mission,
                wallet: publicKey,
                setMessage,
                cb: () => {
                  onCloseParentAlso()
                  reloadApes(selectedApes.map(ape => ape.mint))
                },
              }) }
              inactive
              key="inventory-modal-start-button"
            >
              START MISSION
            </NormalButton>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center m-1" style={{ flex: 1, width: '' }}>
          <InventoryPage 
            ape={ selectedApes.length > 0 ? selectedApes[ selectedApes.length - 1 ] : null }
            toggleInventory={ toggleInventory }
          />
        </div>
      </div>
    </div>
    : null
  )
}

export default InventoryDialog