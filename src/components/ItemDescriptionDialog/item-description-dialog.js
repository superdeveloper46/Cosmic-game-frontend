import React, { useEffect, useRef, useState } from 'react'
import useAudio from '../Audio/audio'
import { AUDIOLIST } from '../../consts/audio-list'
import ItemDetailsCard from '../ItemDetailsCard/item-details-card'
import ApplyButton from '../ApplyButton'
import CloseButton from '../CloseButton'
import PanelDivider from '../PanelDivider/panel-divider'
import Loading from '../Loading/loading'
import './item-description-dialog.scss'
import { toggleDialog } from '../../slices/ItemDialogSlice'
import { useDispatch, useSelector } from 'react-redux'

const ItemDescriptionDialog = ({
  item,
  apes,
  selectedApe,
  isEquip,
  setIsEquip,
  setClosed,
  setSelectedInventory,
  equipLoading,
  equip,
  open,
  setIsItemOpen,
  setDetailImage,
}) => {
  const itemModalRef = useRef(null)
  const equipSound = useAudio(AUDIOLIST['EQUIP_ITEM_SFX'])
  const unequipSound = useAudio(AUDIOLIST['UNEQUIP_ITEM_SFX'])
  const generalSound = useAudio(AUDIOLIST['GERNERAL_BUTTON'])
  const backSound = useAudio(AUDIOLIST['EXIT_BACK_BUTTON'])
  const [hasMounted, setHasMounted] = useState(false)
  const inventory = useSelector((state) => state.dialog.selectedItem)
  const image = useSelector((state) => state.dialog.image)
  const dialogStatus = useSelector((state) => state.dialog.status)
  const dispatch = useDispatch()

  let ape = apes?.find(
    (ape) =>
      !!ape.gameData.default_items.find(
        (dItem) => dItem?.inventory_id === inventory?.id,
      ),
  )

  const handleClickOutside = (event) => {
    if (itemModalRef.current && !itemModalRef.current.contains(event.target)) {
      dispatch(toggleDialog(false))
      if (setIsItemOpen) setIsItemOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false)

    return () => {
      document.removeEventListener('click', handleClickOutside, false)
    }
  })

  useEffect(() => {
    if (hasMounted) {
      if (!open) {
        backSound()
      }
    } else {
      setHasMounted(true)
    }
  }, [open || dialogStatus])

  return open || dialogStatus ? (
    <div className='item-description-wrapper' ref={itemModalRef}>
      {!isEquip && inventory?.type === 'Equipment' && (
        <ItemDetailsCard
          item={{
            icon: inventory?.Item_Detail?.image,
            name: inventory.Item_Detail?.name,
            rarity: inventory?.Item?.rarity,
            efficiency: inventory?.efficiency,
            max_efficiency: inventory?.Item?.efficiency,
            minimum_efficiency: inventory?.Effect?.minimum_efficiency,
            effect: inventory?.Effect?.effect,
            effect_bonus: inventory?.Effect?.bonus,
            tier: inventory?.Item?.tier,
            description: inventory?.Item_Detail?.description,
            type: 'Equipment',
          }}
          image={image}
          inventory={inventory}
          apes={apes}
        />
      )}
      {!!isEquip && inventory?.type === 'Equipment' && (
        <ItemDetailsCard
          item={{
            icon: inventory?.icon,
            name: inventory?.name,
            rarity: inventory?.rarity,
            efficiency: inventory?.efficiency,
            max_efficiency: inventory?.item_efficiency,
            minimum_efficiency: inventory?.minimum_efficiency,
            effect: inventory?.effect,
            effect_bonus: inventory?.effect_bonus,
            tier: inventory.tier,
            description: inventory?.item_detail_description,
            type: 'Equipment',
          }}
          image={image}
          inventory={inventory}
          apes={apes}
        />
      )}
      {inventory?.type === 'Resource' && (
        <ItemDetailsCard
          inventory={inventory}
          item={{
            icon: inventory?.Resource?.icon,
            name: inventory?.Resource?.name,
            rarity: inventory?.Resource?.rarity,
            tier: inventory?.Resource?.tier,
            description: inventory?.Resource?.description,
            type: 'Resource',
          }}
          image={image}
          apes={apes}
        />
      )}

      {/* <CloseButton
        onClick={() => {
          setIsItemOpen(false)
          if (setClosed) {
            setClosed(true)
            setTimeout(() => {
              setClosed(false)
            }, [300])
          }
          if (setIsEquip) setIsEquip(true)
          if (setSelectedInventory) setSelectedInventory(null)
        }}
      /> */}
      {/* {inventory && (inventory?.ape_image || ape?.gameData?.image) ? (
        <div className='side-bar'>
          <div>
            <div className='equip-apes'>
              <img
                src={inventory?.ape_image || ape?.gameData?.image}
                alt='avatar'
              />
              <h4>
                Equipped By: <br /> {inventory?.ape_name || ape?.gameData?.name}
              </h4>
            </div>
          </div>
          <div className='d-flex flex-wrap gap-2 justify-content-center'>
            <ApplyButton className='detail-btns unequip-btn'>Sell</ApplyButton>
            <ApplyButton className='detail-btns'>Salvage</ApplyButton>
            <ApplyButton
              className={`detail-btns ${isEquip ? '' : 'unequip-btn'}`}
              onClick={() => {
                if (isEquip) {
                  equipSound()
                } else {
                  unequipSound()
                }
                equip()
              }}
              inactive={!!inventory?.mission_equip || !equip}
            >
              {equipLoading ? (
                <Loading isLoading={equipLoading} sm />
              ) : isEquip ? (
                'Equip'
              ) : (
                'Unequip'
              )}
            </ApplyButton>
            <ApplyButton className='detail-btns'>Repair</ApplyButton>
            <ApplyButton className='detail-btns unequip-btn'>
              Unlock
            </ApplyButton>
            <ApplyButton className='detail-btns'>Limit Break</ApplyButton>
          </div>
        </div>
      ) : null} */}
    </div>
  ) : null
}

export default ItemDescriptionDialog
