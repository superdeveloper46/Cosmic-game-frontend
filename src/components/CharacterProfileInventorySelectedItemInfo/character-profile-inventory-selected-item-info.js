import React, { useState } from 'react'
import useAudio from '../Audio/audio'
import { AUDIOLIST } from '../../consts/audio-list'
import IconTextButton from '../IconTextButton'
import ItemDetailsCard from '../ItemDetailsCard/item-details-card'
import equip from '../../utils/equip'
import Loading from '../Loading/loading'
import NewLayoutItemDetailsCard from '../NewLayoutItemDetailsCard/new-layout-item-details-card'
import { useDispatch } from 'react-redux'
import { refetchInventory } from '../../slices/inventorySlice'

const CharacterProfileCraftingSelectedItemInfo = ({
  ape,
  inventory,
  apes,
  address,
  wallet,
  setSelectedInventory,
  reloadApes,
  setMessage,
}) => {
  const equipSound = useAudio(AUDIOLIST['EQUIP_ITEM_SFX'])
  const unequipSound = useAudio(AUDIOLIST['UNEQUIP_ITEM_SFX'])
  const inactiveSound = useAudio(AUDIOLIST['INACTIVE_BUTTON'])

  const dispatch = useDispatch()
  const reloadInventory = (inventory) => dispatch(refetchInventory(inventory))
  const reloadInventories = (inventories) => {
    inventories.forEach((inventory) => dispatch(refetchInventory(inventory)))
  }


  const [equipLoading, setEquipLoading] = useState(false)
  const [unequipLoading, setUnEquipLoading] = useState(false)
  return (
    <div className='d-flex justify-content-start align-items-center flex-column flex-grow-1 responsive-item-boxes'>
      <div className='panel-header w-100 d-flex justify-content-start align-items-start flex-column custom-border-bottom mb-2'>
        <div className='mt-4 mb-3'>ITEM DETAILS</div>
        <div className='w-100 mb-4 d-flex justify-content-evenly align-items-center text-center flex-grow-1'>
          <p className='h5 m-0 flex-grow-1'>Selected Item</p>
          <p className='h5 m-0 flex-grow-1'>Equipped Item</p>
        </div>
      </div>
      <div className='d-flex justify-content-evenly align-items-start m-1 my-2 w-100 h-100 custom-scroll overflow-auto'>
        {!!inventory?.selected ? (
          <div className='flex-fill align-self-stretch w-50 h-100'>

            <ItemDetailsCard item = {{icon:inventory.selected.icon, name:inventory.selected.name,rarity:inventory.selected.rarity,effect:inventory.selected?.effect,effect_bonus:inventory.selected?.effect_bonus,efficiency:inventory.selected.efficiency,max_efficiency:inventory.selected.item_efficiency,actual_bonus:inventory.selected?.actual_bonus, minimum_efficiency:inventory.selected?.minimum_efficiency,tier:inventory.selected.tier,description:inventory.selected.item_detail_description, type:"Equipment"}}
              inventory={inventory?.selected}
              apes={apes}
            />
          </div>
        ) : (
          <div className='d-flex align-items-center justify-content-center m-1 w-50 h-100'>
            <p className='h4 mt-5'>No Item Selected</p>
          </div>
        )}
        {!!inventory?.equipped ? (
          <div className='flex-fill align-self-stretch w-50 h-100'>
            {!inventory?.equipped?.Item &&
              <ItemDetailsCard
                  item = {{icon:inventory?.equipped?.icon, name:inventory?.equipped?.name,rarity:inventory?.equipped?.rarity,effect:inventory.equipped?.effect,effect_bonus:inventory.equipped?.effect_bonus,efficiency:inventory?.equipped?.efficiency,max_efficiency:inventory?.equipped.item_efficiency,actual_bonus:inventory.selected?.actual_bonus, minimum_efficiency:inventory.selected?.minimum_efficiency,tier:inventory?.equipped?.tier,description:inventory?.equipped?.item_detail_description, type:"Equipment"}}
                  inventory={inventory?.equipped}
                apes={apes}
              />
            }
            {!!inventory?.equipped?.Item &&
                <ItemDetailsCard
                    item = {{icon:inventory?.equipped?.Item_Detail.image, name:inventory?.equipped?.Item_Detail?.name,rarity:inventory?.equipped?.Item_Detail?.rarity || inventory?.equipped?.Item.rarity,effect_bonus:inventory.equipped.Effect?.bonus,efficiency:inventory?.equipped?.efficiency,max_efficiency:inventory?.equipped?.Item?.efficiency,minimum_efficiency:inventory.equipped.Effect?.minimum_efficiency,effect:inventory.equipped?.Effect?.effect, tier:inventory?.equipped?.Item?.tier,description:inventory?.equipped?.Item_Detail?.description, type:"Equipment"}}
                    inventory={inventory?.equipped}
                    apes={apes}
                />
            }
          </div>
        ) : (
          <div className='d-flex align-items-center justify-content-center m-1 w-50 h-100'>
            <p className='h4 mt-5'>No Item Selected</p>
          </div>
        )}
      </div>
      <div className='custom-border-bottom w-100 mb-3' />
      {!!inventory?.equipped || !!inventory?.selected ? (
        <div className='d-flex w-100 align-items-center justify-content-center m-2'>
          <div className='d-flex justify-content-center w-50'>
            <IconTextButton
              className={
                equipLoading
                  ? 'p-1 equip-button cursor-no-drop'
                  : 'p-1 equip-button'
              }
              onClick={() => {
                if (!equipLoading) {
                  equipSound()
                  equip({
                    address,
                    wallet,
                    inventoryId: inventory.selected.inv_id,
                    action: 'equip',
                    setMessage,
                    setLoading: setEquipLoading,
                    callback: () => {
                      reloadInventory(inventory.selected)
                      reloadInventories(
                        (ape?.gameData?.default_items || [])
                          .map((dItem) => dItem.Inventory)
                          .filter((inv) => !!inv),
                      )

                      reloadApes([address, inventory.selected.ape_address])
                      setSelectedInventory({
                        ...inventory,
                        selected: null,
                      })
                    },
                  })
                } else {
                  inactiveSound()
                }
              }}
              inactive={!inventory?.selected}
            >
              {equipLoading ? <Loading isLoading={equipLoading} sm /> : 'Equip'}
            </IconTextButton>
          </div>
          <div className='d-flex justify-content-center w-50'>
            <IconTextButton
              className={
                unequipLoading
                  ? 'danger p-1 equip-button cursor-no-drop'
                  : 'danger p-1 equip-button'
              }
              onClick={() => {
                if (!unequipLoading) {
                  unequipSound()
                  equip({
                    address,
                    wallet,
                    inventoryId: inventory.equipped.id,
                    action: 'unequip',
                    setMessage,
                    setLoading: setUnEquipLoading,
                    callback: () => {
                      reloadInventory({ inv_id: inventory.equipped.id })
                      reloadApes([address])
                      setSelectedInventory({
                        ...inventory,
                        equipped: null,
                      })
                    },
                  })
                } else {
                  inactiveSound()
                }
              }}
              inactive={!inventory?.equipped}
            >
              {unequipLoading ? (
                <Loading isLoading={unequipLoading} sm />
              ) : (
                'Unequip'
              )}
            </IconTextButton>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default CharacterProfileCraftingSelectedItemInfo
