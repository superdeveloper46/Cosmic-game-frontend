import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import setApeFavorite from '../../utils/set-ape-favorite'
import useAudio from '../Audio/audio'
import { AUDIOLIST } from '../../consts/audio-list'
import InventoryItem from '../InventoryItem/inventory-item'
import { rarityIcons } from '../ItemDetailsCard/item-details-card'
import TierItemSlot from '../TierItemSlot'

const itemCategories = ['trinket', 'jewelry', 'footwear']

const ApeProfileCharacterOverview = ({
  crownedApeId,
  switchCrown,
  ape,
  reloadApes,
  selectedInventory,
  setSelectedInventory,
}) => {
  const generalSound = useAudio(AUDIOLIST['GERNERAL_BUTTON'])
  const [favorite, setFavorite] = useState(!!ape?.gameData?.is_favorited)
  const navigate = useNavigate()

  useEffect(() => {
    if (!!ape) {
      setFavorite(!!ape.gameData?.is_favorited)
    }
  }, [ape])

  return (
    <div className='d-flex justify-content-around p-4'>
      <div className='d-flex justify-content-center align-items-center flex-column'>
        <div className='d-flex item-box-responsiveness'>
          <div className='crown-fav-responsiveness m-3 d-flex flex-column align-items-center'>
            <button
              onClick={() => {
                generalSound()
                switchCrown(ape?.gameData?.id)
              }}
              className='crown-btn my-3'
            >
              {crownedApeId === ape?.gameData?.id ? (
                <img src='/images/v2/game-ui/Crown-Active.png' alt='crown' />
              ) : (
                <img src='/images/v2/game-ui/Crown-Inactive.png' alt='crown' />
              )}
            </button>
            <button
              className='crown-btn'
              onClick={() => {
                generalSound()
                setApeFavorite({
                  address: ape.mint,
                  wallet: ape.gameData.owner,
                  favorite: !favorite,
                  rollback: () => setFavorite(favorite),
                  callback: () => reloadApes([ape.mint]),
                })
                setFavorite(!favorite)
              }}
            >
              {favorite ? (
                <img
                  src='/images/v2/game-ui/Favourite-Active.png'
                  alt='favorite'
                />
              ) : (
                <img
                  src='/images/v2/game-ui/Favourite-Inactive.png'
                  alt='favorite'
                />
              )}
            </button>
          </div>
          <div>
            <div
              style={{ width: '300px' }}
              className='m-2 d-flex justify-content-center align-items-center character-profile-main-img'
            >
              <Image src={ape?.info?.image} fluid />
            </div>
            <div className='m-2 d-flex justify-content-center align-items-center flex-column'>
              <div className='d-flex justify-content-center align-items-center'>
                {itemCategories.map((category) => {
                  const dItem = (ape?.gameData?.default_items || []).find(
                    (dItem) => dItem?.Inventory?.Item?.category === category,
                  )



                  return !!dItem ? (
                    <TierItemSlot
                      inventory={{
                        ...(dItem.Inventory|| {}),
                        icon: dItem.Inventory?.icon || dItem.Inventory?.Item_Detail?.image,
                      }}
                      key={`ape-profile-item-slot-${category}`}
                      style={{
                        width: '80px',
                        height: '80px',
                        margin: '5px',
                        cursor: 'pointer',
                        backgroundImage: `url(${
                          rarityIcons[dItem.Inventory?.Item?.rarity || '']
                        })`,
                      }}
                      onClick={() => {
                        generalSound()
                        if (!!setSelectedInventory) {
                          setSelectedInventory({
                            ...(selectedInventory || {}),
                            equipped: {...dItem.Inventory,equip:dItem?.id}
                          })
                        } else {
                          navigate('/characters/equip', {
                            state: {
                              inventory: {
                                ...(selectedInventory || {}),
                                equipped: {...dItem.Inventory,equip:dItem.id},
                              },
                            },
                          })
                        }
                      }}
                      clickable={!!setSelectedInventory}
                    />
                  ) : (
                    <TierItemSlot
                      key={`ape-profile-item-slot-${category}`}
                      placeholder={
                        <Image
                          src={`/images/v2/game-ui/empty-${category}.png`}
                          style={{ borderRadius: '5px', padding: '15px' }}
                          fluid
                        />
                      }
                      style={{
                        width: '80px',
                        height: '80px',
                        margin: '5px',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        generalSound()
                        navigate('/characters/equip', {
                          state: {
                            category: category,
                          },
                        })
                      }}
                      inactive
                      notier
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApeProfileCharacterOverview
