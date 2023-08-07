import React from 'react'
import { Image } from 'react-bootstrap'
import {
  rarityBackgrounds,
  rarityBanners,
  rarityIcons,
} from '../ItemDetailsCard/item-details-card'

import './new-layout-item-details-card.scss'

const NewLayoutItemDetailsCard = ({ inventory }) => {
    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
  return !!inventory ? (
    <div className='new-layout-item-details-card m-1 h-100 d-flex flex-column custom-scroll'>
      <div
        className='item-details-header p-3'
        style={{
          backgroundImage: `url(${rarityBanners[inventory.rarity]})`,
        }}
      >
        <p className='h4 m-0'>{inventory.name}</p>
      </div>
      <div
        className='item-details-stats p-3 d-flex justify-content-between align-items-start flex-column'
        style={{
          backgroundImage: `url(${rarityBackgrounds[inventory.rarity]})`,
        }}
      >
        <Image
          src={
            inventory.inv_type === 'item'
              ? `/item/reveals/${(inventory?.icon|| '').replaceAll(' ', '_')}`
              : `/images/v2/resources/${(inventory?.icon || '').replaceAll(
                  ' ',
                  '_',
                )}`
          }
          className='item-details-image'
        />
        <p className='h5 item-details-stat'>{inventory.type || 'Equipment'}</p>
        {inventory.item_efficiency ? (
          <div className='item-details-stat d-flex justify-content-center align-items-center py-1'>
            <Image src='/images/v2/efficiency-icon.png' />
            <div className='d-flex flex-column align-items-start'>
              <p className='h6'>Efficiency</p>
              <p className='h6 m-0'>
                {`${inventory.efficiency || 0} / ${
                  inventory.item_efficiency || 0
                }`}
              </p>
            </div>
          </div>
        ) : null}
      </div>
      <div
        className='item-details-description p-3 flex-grow-1 d-flex flex-column'
        style={{
          backgroundImage:
            'url(/images/v2/backgrounds/styling/Item_Details_Background_with_Bottom_Pattern_[cream].png)',
        }}
      >
        {inventory?.tier && (
          <div className='d-flex justify-content-start align-items-center mb-2'>
            <Image
              src={`/images/v2/Tier${inventory.tier || 0}.png`}
              className='tier-img'
            />
            <p className='h-5 m-0'>Tier {inventory.tier || 0}</p>
          </div>
        )}
        {!!inventory.effect ? (
        <>
            <p className='item-effect h6 mb-2 d-flex align-items-center'>

                Effect Type: {capitalize(inventory?.effect_type)}

            </p>
           <p className='item-effect h6 mb-2 d-flex align-items-center'>
            {inventory.effect} By {inventory.actual_bonus ||inventory.effect_bonus}%
           </p>
            <p className='item-effect h6 mb-2 d-flex align-items-center'>
                {inventory?.item_detail_description}
            </p>
        </>
        ) : (
          <p className='item-effect h6 mb-2 d-flex align-items-center'>
            {inventory?.item_detail_description}
          </p>

        )}
        <div className='flex-grow-1' />
        <div className='item-equippers d-flex flex-column mt-2'>
          {!!inventory.equip ? (
            <div
              className='item-equipper mt-3 d-flex align-items-center'
              key={`item-equipper-${inventory.equip}`}
            >
              <div className='item-equipper-name d-flex align-items-center flex-grow-1'>
                <p className='h6 m-0'>Equipped: {inventory.ape_name}</p>
              </div>
              <Image src={inventory.ape_image} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  ) : (
    <div className='d-flex justify-content-center align-items-center h-100'>
      No Item Selected
    </div>
  )
}

export default NewLayoutItemDetailsCard
