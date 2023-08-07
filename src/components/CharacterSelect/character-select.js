import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ToggleWithLabel from '../ToggleWithLabel/toggle-with-label'
import CharacterRow from '../CharacterRow/character-row'
import { setSelectedApes, setFocusedApe } from '../../slices/apeSlice'
import './character-select.scss'

const CharacterSelect = ({
  inventoryMission,
  selectedInventory,
  setSelectedInventory,
  setIsItemOpen,
  setIsEquip,
  crownedApeId,
}) => {
  const apes = useSelector((state) => state.apes.apes)
  const selectedApes = useSelector((state) => state.apes.selectedApes)
  const focusedApe = useSelector((state) => state.apes.focusedApe)
  const dispatch = useDispatch()
  const [multiSelect, setMultiSelect] = useState(false)
  const [selectAll, setSelectAll] = useState(false)


  useEffect(() => {
    if (!!selectAll) {
      setMultiSelect(true)
      if (
        selectedApes.length !==
        apes.filter((ape) => !ape.gameData?.active_mission).length
      ) {
        dispatch(
          setSelectedApes(apes.filter((ape) => !ape.gameData?.active_mission)),
        )
      }
    }
  }, [selectAll])

  useEffect(() => {
    if (!multiSelect) {
      if (selectedApes.length > 0) {
        dispatch(setSelectedApes([focusedApe]))
      }
    }
  }, [multiSelect])

  useEffect(() => {
    if (
      selectedApes.length ===
      apes.filter((ape) => !ape.gameData?.active_mission).length
    ) {
      setMultiSelect(true)
      setSelectAll(true)
    } else {
      setSelectAll(false)
    }
  }, [selectedApes, apes])

  const resetSelected = () => {

    dispatch(setSelectedApes([]))
    dispatch(setFocusedApe([]))
  }

  useEffect(() => {
    resetSelected()
  },[])

  const toggleApe = (selectedApe) => {
    dispatch(setFocusedApe(selectedApe))
    if (multiSelect) {
      if (!selectedApes.map((ape) => ape.mint).includes(selectedApe.mint)) {
        dispatch(setSelectedApes([...selectedApes, selectedApe]))
      }
    } else {
      dispatch(setSelectedApes([selectedApe]))
    }
  }

  const toggleApeDoubleClick = (selectedApe) => {
    if (multiSelect) {

      if (selectedApes.map((ape) => ape.mint).includes(selectedApe.mint)) {
        if (selectedApes.length >= 1) {
          dispatch(
            setSelectedApes(
              selectedApes.filter((ape) => ape.mint !== selectedApe.mint),
            ),
          )
          dispatch(setFocusedApe({}))
        }
      } else {
        dispatch(setSelectedApes([...selectedApes, selectedApe]))
        dispatch(setFocusedApe(selectedApe))
      }
    } else {
      dispatch(setSelectedApes([selectedApe]))
      dispatch(setFocusedApe(selectedApe))
    }
  }

  return (
    <div className='character-select'>
      <h2 className='tab-title mb-2'>SELECT CHARACTERS</h2>
      {inventoryMission ? (
        <>
          <div className='d-flex justify-content-around align-items-center flex-wrap custom-border-bottom mb-4 pb-2'>
            <ToggleWithLabel
              id='multi-select-switch'
              label='MULTI-SELECT'
              checked={multiSelect}
              setChecked={setMultiSelect}
            />
            <ToggleWithLabel
              id='select-all-switch'
              label='SELECT ALL'
              checked={selectAll}
              setChecked={setSelectAll}
            />
          </div>
          <div className='character-items custom-scroll'>
            {apes
              .filter((ape) => !ape.gameData?.active_mission)
              .map((ape) => (
                <CharacterRow
                  key={`inventory-ape-${ape.mint}`}
                  ape={ape}
                  inventoryMission={inventoryMission}
                  crownedApeId={crownedApeId}
                  selected={selectedApes
                    .map((ape) => ape.mint)
                    .includes(ape.mint)}
                  focused={ape.mint === focusedApe.mint}
                  setIsItemOpen={setIsItemOpen}
                  setIsEquip={setIsEquip}
                  onItemCallback
                  itemDoubleClick
                  onClick={toggleApe}
                  onDoubleClick={toggleApeDoubleClick}
                  inventories={(ape?.gameData?.default_items || [])
                    .map((dItem) => dItem.Inventory)
                    .filter((inv) => !!inv)}
                  selectedInventory={selectedInventory}
                  setSelectedInventory={setSelectedInventory}
                />
              ))}
          </div>
        </>
      ) : (
        <div className='character-items d-flex justify-content-center align-items-center overflow-hidden'>
          <h2 className='tab-title'>SELECT A MISSION TO CONTINUE</h2>
        </div>
      )}
    </div>
  )
}

export default CharacterSelect
