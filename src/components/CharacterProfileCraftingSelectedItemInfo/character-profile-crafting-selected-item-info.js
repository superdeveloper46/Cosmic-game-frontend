import React from 'react'
import { Image } from 'react-bootstrap'
import ApplyButton from '../ApplyButton'
import ApeProfileCraftSelectedItemInfo from '../ApeProfileCraftSelectedItemInfo/ape-profile-craft-selected-item-info'
import ItemDetailsCard from '../ItemDetailsCard/item-details-card'
import {useSelector} from "react-redux";

const CharacterProfileRecipeSelectedItemInfo = ({
  ape,
  recipe,
  apes,
}) => {


    const mainInventory = useSelector(
        (state) => state.inventories.selectedInventory,
    )


    let effect = recipe?.Effects?.find(ef => ef.type === mainInventory?.effect_type)

  return (
    <div className='d-flex justify-content-start align-items-center flex-column flex-grow-1'>
      <div className='panel-header w-100 d-flex justify-content-start align-items-start flex-column custom-border-bottom mb-3'>
        <div className='mt-3 mb-3'>LIMIT BREAK ITEM DETAILS</div>
        <div className='w-100 mb-2 d-flex justify-content-evenly align-items-center text-center'>
          <p className='h5 m-0'>Pre Limit Break Item</p>
          <Image src='/images/move_right.png' className='right-arrow' />
          <p className='h5 m-0'>Post Limit Break Item</p>
        </div>
      </div>
      <div className='d-flex justify-content-evenly align-items-start m-1 mt-2 w-100 h-100 custom-scroll overflow-auto'>
        {!!mainInventory ? (
          <div className='flex-fill align-self-stretch w-50'>
            <ItemDetailsCard
                item = { {icon:mainInventory?.icon, name:mainInventory?.name,rarity:(mainInventory?.Item_Detail?.rarity || mainInventory?.rarity),efficiency:mainInventory?.efficiency,max_efficiency:mainInventory?.item_efficiency,minimum_efficiency:mainInventory?.minimum_efficiency,effect:mainInventory?.effect,effect_bonus:mainInventory?.effect_bonus,tier:mainInventory.tier,description:mainInventory.item_detail_description}}
              inventory={mainInventory}
              image={ 
                !!mainInventory
                ? `/item/reveals/${(mainInventory?.Item_Detail?.image || mainInventory?.icon || '').replaceAll(' ', '_')}`
                : null
              } 
              apes={apes} 
            />
          </div>
        ) : (
          <div className='d-flex align-items-center justify-content-center m-1 flex-fill'>
            <p className='h4 mt-5'>No Item Selected</p>
          </div>
        )}
        {!!recipe && !!mainInventory? (
          <div className='flex-fill align-self-stretch w-50'>
            <ItemDetailsCard
                item = {{icon:mainInventory.icon, name:mainInventory.name,rarity:(mainInventory?.Item_Detail?.rarity || mainInventory?.rarity),efficiency:recipe.Item.efficiency,max_efficiency:recipe.Item.efficiency,minimum_efficiency:effect?.minimum_efficiency,tier:recipe.Tier,description:mainInventory.item_detail_description,effect_bonus:effect?.bonus,effect:effect?.effect}}

              inventory={{...mainInventory,limit_break:true, actual_bonus:effect?.bonus}}
              image={ 
                !!mainInventory
                ? `/item/reveals/${(mainInventory?.Item_Detail?.image || mainInventory?.icon ||  '').replaceAll(' ', '_')}`
                : null
              } 
            />
          </div>
        ) : (
          <div className='d-flex align-items-center justify-content-center m-1 flex-fill'>
            <p className='h4 mt-5'>No Item Selected</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CharacterProfileRecipeSelectedItemInfo
