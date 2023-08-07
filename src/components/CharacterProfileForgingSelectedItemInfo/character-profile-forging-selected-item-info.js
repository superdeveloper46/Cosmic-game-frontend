import React from 'react'
import { Image } from 'react-bootstrap'
import ApplyButton from '../ApplyButton'
import ApeProfileCraftSelectedItemInfo from '../ApeProfileCraftSelectedItemInfo/ape-profile-craft-selected-item-info'
import ItemDetailsCard from '../ItemDetailsCard/item-details-card'

const CharacterProfileForgingSelectedItemInfo = ({
  forgeItem,
  selectedMaterials,
  apes,
}) => {
  return (
    <div className='d-flex justify-content-start align-items-center flex-column flex-grow-1'>
      <div className='panel-header w-100 d-flex justify-content-start align-items-start flex-column custom-border-bottom'>
        <div className='mt-4 mb-3'>ITEM FORGE DETAILS</div>
        <div className='w-100 mb-3 d-flex justify-content-evenly align-items-center text-center'>
          <p className='h5 m-0'>Selected Item</p>
          <Image src='/images/move_right.png' className='right-arrow' />
          <p className='h5 m-0'>Post-Forge Item</p>
        </div>
      </div>
      <div className='d-flex justify-content-evenly align-items-center m-1 mt-2 w-100 h-100 custom-scroll'>
        {!!forgeItem ? (
          <div className='flex-fill align-self-stretch w-50'>
            <ItemDetailsCard inventory={forgeItem} apes={apes} />
          </div>
        ) : (
          <div className='d-flex align-items-center justify-content-center m-1 flex-fill'>
            <p className='h4'>No Item Selected</p>
          </div>
        )}
        {!!forgeItem ? (
          <div className='flex-fill align-self-stretch w-50'>
            <ItemDetailsCard 
              inventory={{
                ...(forgeItem || {}),
                experience: Math.min(
                  forgeItem?.Item?.experience || 0, 
                  (selectedMaterials || []).map(material => material.Item?.gxp || 0).reduce((a, b) => a + b, forgeItem?.experience || 0)
                )
              }} 
              apes={apes} 
            />
          </div>
        ) : (
          <div className='d-flex align-items-center justify-content-center m-1 flex-fill'>
            <p className='h4'>No Item Selected</p>
          </div>
        )}
      </div>
      <div className='custom-border-bottom w-100 my-4'></div>
      <div className='d-flex align-items-center w-100 justify-content-between px-4'>
        <div>
          <h4 className='text-warning'>
            Item Max Level: {!!forgeItem?.experience && forgeItem?.experience >= forgeItem?.Item?.experience ? 'Reached' : 'Not Reached'}
          </h4>
          <p>
            Once an item has reached max level, it can be crafted to increase item Tier.
          </p>
        </div>
        <ApplyButton className='px-4 h6'>Craft</ApplyButton>
      </div>
    </div>
  )
}

export default CharacterProfileForgingSelectedItemInfo
