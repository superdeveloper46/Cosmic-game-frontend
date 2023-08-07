import React from 'react'
import { Image } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setInventoryMission } from '../../slices/missionSlice'
import getItemImageFromItem from '../../utils/get-item-image-from-item'
import ExpProgressBar from '../ExpProgressBar/exp-progress-bar'

import './item-details-card.scss'

export const rarityBanners = {
    Common:
        '/images/v2/backgrounds/styling/Common_Items_BG.png',
    Rare: '/images/v2/backgrounds/styling/Rare_Items_BG.png',
    Epic: '/images/v2/backgrounds/styling/Epic_Items_BG.png',
    Uncommon:
        '/images/v2/backgrounds/styling/Uncommon_Items_BG.png',
    Legendary:
        '/images/v2/backgrounds/styling/Legendary_Items_BG.png',
}

export const rarityBackgrounds = {
  Common:
    '/images/v2/backgrounds/styling/Common_Items_BG.png',
  Rare: '/images/v2/backgrounds/styling/Rare_Items_BG.png',
  Epic: '/images/v2/backgrounds/styling/Epic_Items_BG.png',
  Uncommon:
    '/images/v2/backgrounds/styling/Uncommon_Items_BG.png',
  Legendary:
      '/images/v2/backgrounds/styling/Legendary_Items_BG.png',
}

export const rarityIcons = {
    Common:
        '/images/v2/backgrounds/styling/Common_Items_BG.png',
    Rare: '/images/v2/backgrounds/styling/Rare_Items_BG.png',
    Epic: '/images/v2/backgrounds/styling/Epic_Items_BG.png',
    Uncommon:
        '/images/v2/backgrounds/styling/Uncommon_Items_BG.png',
    Legendary:
        '/images/v2/backgrounds/styling/Legendary_Items_BG.png',
}

export const rarityColors = {
  Uncommon: '#098261',
  Common: '#A0A0A0',
  Rare: '#344188',
  Epic: '#503B7E',
  Legendary: '#9C5740',
}

const ItemDetailsCard = ({ item, inventory,recipe, image, apes = [] }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const selectedItem = item

  let ape = apes.find(
    (ape) =>
      !!ape.gameData.default_items.find(
        (dItem) => dItem?.inventory_id === inventory?.id,
      ),
  )

  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()

  return !!selectedItem ? (
    <div className='item-details-card m-1 d-flex flex-column custom-scroll p-3  h-100'>
      <div className='d-flex mt-2 justify-content-between'>
        <Image
          src={
            !!image
              ? image
              : selectedItem.type === 'Equipment'
              ? `/item/reveals/${(
                      item?.icon ||
                  ''
                ).replaceAll(' ', '_')}`
              : `/images/v2/resources/${(selectedItem?.icon || '').replaceAll(
                  ' ',
                  '_',
                )}`
          }
          style={{
            background: `url(${rarityIcons[selectedItem?.rarity || 'Common']})`,
          }}
          className='item-details-image'
        />
        <div className='d-flex flex-column justify-content-between py-2 w-50'>
          <div>
            <p
              style={{ color: rarityColors[selectedItem?.rarity || 'Common'] }}
            >{`${selectedItem?.rarity || 'Uncommon'} ${capitalize(
              selectedItem?.category || '',
            )}`}</p>
            <p style={{lineHeight: '1.5em'}}>{selectedItem.name}</p>
          </div>
          { selectedItem?.efficiency >=0 ? (
            <div className='item-details-stat d-flex align-items-center py-1'>
              <div className='d-flex flex-column align-items-start'>
                <p className='h6'>Efficiency</p>
                <p className='h6 m-0'>
                    <span
                      className={`${
                        (item?.efficiency || 0) <
                        (item?.max_efficiency || 0) * 0.9
                          ? 'text-danger'
                          : ''
                      }`}
                    >
                      {item?.efficiency || 0} /{' '}
                      {item?.max_efficiency || 0}
                    </span>
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className='item-details-description p-3 pe-0 flex-grow-1 d-flex flex-column'>
        {selectedItem?.tier && (
          <div className='d-flex justify-content-start align-items-center mb-2'>
            <Image
              src={`/images/v2/Tier${selectedItem.tier || 0}.png`}
              className='tier-img'
            />
            <p className='tier-font m-0'>Tier {selectedItem.tier || 0}</p>

          </div>
        )}
        {!!item?.effect_type ? (
          <p className='m-0'>
            Effect Type: {capitalize(item?.effect_type)}
          </p>
        ) : null}
        {!!item?.effect ? (
          <p className='item-effect mb-2 align-items-center'>
            {item?.effect} By{' '}
              <span
                  className={`${
                      (item?.efficiency || 0) <
                      (item?.max_efficiency || 0) * 0.9
                          ? 'text-danger'
                          : ''
                  }`}
              >
              {(Math.max(item?.efficiency/item?.max_efficiency,item?.minimum_efficiency) * item?.effect_bonus)?.toPrecision(2)}%
            </span>
          </p>
        ) : null}

        {selectedItem.activation_chance && selectedItem.effect_type ? (
          <p className='item-effect h6 mb-2 d-flex align-items-center'>
            {`${
              selectedItem.activation_chance !== 100
                ? 'A ' + selectedItem.activation_chance + '% '
                : ''
            }${
              selectedItem.activation_chance === 100
                ? selectedItem.description
                : (selectedItem?.description || '').slice(2)
            } By`}{' '}
            <span className='text-danger ms-1'>
              {selectedItem.effect_type === 'static' ? '+' : ''}
              {selectedItem.effect_bonus}
              {selectedItem.effect_type === 'percentage' ? '%' : ''}
            </span>
          </p>
        ) : (
          <p className='item-description h6 mt-2 mb-2 pe-2 overflow-auto custom-scroll'>
            {selectedItem?.description}
            <br />
            {!!selectedItem?.effect_description
              ? selectedItem?.effect_description
              : null}
          </p>
        )}

        {
          !!selectedItem.Mission_Item_Rewards &&
            selectedItem.Mission_Item_Rewards.length > 0 && (
              <div className='item-reward-missions d-flex flex-column p-1 custom-scroll dark'>
                {selectedItem.Mission_Item_Rewards.map(
                  (itemReward) => itemReward.Mission,
                )
                  .filter((mission) => !!mission)
                  .map((mission) => (
                    <div
                      className='item-reward-mission w-100 d-flex justify-content-between align-items-center p-2'
                      style={{
                        backgroundImage:
                          'url(/images/v2/backgrounds/styling/Banner_Pattern[cream]v2.png)',
                      }}
                      key={`item-reward-mission-${mission.id}`}
                    >
                      <p className='h6 m-0'>{`${mission.Map?.name} [${mission.secondary_branch}]`}</p>
                      <div
                        className='item-go-now-button p-2 hover-cursor-pointer hover-opacity-8'
                        onClick={() => {
                          dispatch(setInventoryMission(mission))
                          navigate('/region')
                        }}
                      >
                        <Image src='/images/move-right-white.png' />
                        Go Now
                      </div>
                    </div>
                  ))}
              </div>
            )
        }
        <div className='flex-grow-1' />
        {!!ape ? (
          <div
            className='item-equippers d-flex flex-column mt-2'
            onClick={() =>
              navigate('/characters/list', {
                state: {
                  ape_id: ape?.gameData?.id,
                },
              })
            }
          >
            <div
              className='item-equipper mt-3 d-flex align-items-center'
              key={`item-equipper-${ape.mint}`}
            >
              <div className='item-equipper-name d-flex align-items-center flex-grow-1'>
                <p className='h6 m-0'>Equipped: {ape.gameData.name}</p>
              </div>
              <Image src={ape.gameData?.image || "null.png"} />
            </div>
          </div>
        ) : null}
        {inventory?.ape_name && inventory?.ape_name && inventory?.ape_id ? (
          <div
            className='item-equippers d-flex flex-column mt-2'
            onClick={() =>
              navigate('/characters/list', {
                state: {
                  ape_id: inventory.ape_id,
                },
              })
            }
          >
            <div className='item-equipper mt-3 d-flex align-items-center'>
              <div className='item-equipper-name d-flex align-items-center flex-grow-1'>

                  {!!inventory?.equip &&
                      <>
                          {!inventory?.limit_break  &&  <p className='h6 m-0'>  Equipped:  {inventory?.ape_name}</p>}
                         {!!inventory?.limit_break &&  <p className='h6 m-0'> Will Equip: {inventory?.ape_name}</p>}
                      </>
                  }
                  {!inventory?.equip &&
                      <>
                          {!inventory?.limit_break  &&  <p className='h6 m-0'>  Stored:  {inventory?.ape_name}</p>}
                          {!!inventory?.limit_break &&  <p className='h6 m-0'> Will Store: {inventory?.ape_name}</p>}
                      </>
                  }

              </div>
              <Image src={inventory?.ape_image} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  ) : (
    'No Item Selected'
  )
}

export default ItemDetailsCard
