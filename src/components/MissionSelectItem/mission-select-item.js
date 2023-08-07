import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import GoButton from '../GoButton/go-button'
import { rarityIcons } from '../ItemDetailsCard/item-details-card'
import MapMissionDetailItem from '../MapMissionDetailItem/map-mission-detail-item'
import { divIcon } from 'leaflet'
import { renderToStaticMarkup } from 'react-dom/server'
import { Marker, Popup } from 'react-leaflet'
import { Image } from 'react-bootstrap'
import useAudio from '../Audio/audio'
import { AUDIOLIST } from '../../consts/audio-list'
import './mission-select-item.scss'
import Tooltip from '../Tooltip/tooltip'
import getRarityFromStar from '../../utils/get-rarity-from-star'
import {
  toggleDialog,
  setSelectedItem,
  setDetailImage,
} from '../../slices/ItemDialogSlice'
import { useSelector, useDispatch } from 'react-redux'

const tierList = ['TIER 1', 'TIER 2', 'TIER 3', 'TIER 4']
const rarityBGforTier = ['Common', 'Uncommon', 'Rare', 'Epic']
const resourceName = {
  'Plant Resource': 'Plant Type Resource Material',
  'Animal Resource': 'Animal Type Resource Material',
  'Mineral Resource': 'Mineral Type Resource Material',
}

const MissionSelectItem = ({ mission, position }) => {
  const navigate = useNavigate()
  const detailRef = useRef(null)
  const wrapperRef = useRef(null)
  const [tooltip, showTooltip] = useState(false)
  const [selectedTier, setSelectedTier] = useState(0)
  const [selectedMission, setSelectedMission] = useState(
    mission.filter((item) => item.tier === 1)[0],
  )
  const dispatch = useDispatch()
  const generalSound = useAudio(AUDIOLIST['GERNERAL_BUTTON'])
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()

  return (
    <>
      <Marker
        position={position}
        icon={divIcon({
          html: renderToStaticMarkup(
            <div className='mission-select-item-btn'>
              <div
                onClick={(e) => {
                  generalSound()
                  !detailRef.current.contains(e.target) && showTooltip(!tooltip)
                }}
                ref={wrapperRef}
              >
                <div>
                  <h2>
                    {mission[0].secondary_branch}
                    {mission[0].Mission_Resource_Rewards.some(
                      (mr) => mr.reward_type === 'cost' && mr.name === 'Key',
                    ) ? (
                      <span> (Key)</span>
                    ) : (
                      ''
                    )}
                  </h2>
                  <p>Click to view details</p>
                </div>
                {mission[0].Mission_Resource_Rewards.some(
                  (mr) => mr.reward_type === 'cost' && mr.name === 'Key',
                ) ? (
                  <div className='mission-key'>
                    <h2>Requires:</h2>
                    <Image src='/images/v2/resources/Key.png' alt='Key' />
                  </div>
                ) : null}
              </div>
            </div>,
          ),
        })}
      >
        <Popup maxWidth={500} className='map-details-popup'>
          <div className='map-details'>
            <div className='d-flex justify-content-between align-items-center tier-btns'>
              {tierList.map((tier, index) => (
                <button
                  key={`tier-${index}`}
                  className={index === selectedTier ? 'active' : ''}
                  onClick={() => {
                    generalSound()
                    setSelectedTier(index)
                    setSelectedMission(
                      mission.filter((item) => item.tier === index + 1)[0],
                    )
                  }}
                >
                  {tier}
                </button>
              ))}
            </div>
            {!!selectedMission ? (
              <div className='content'>
                <div>
                  <h3>Currency Rewards</h3>
                  <div className='cosmic'>
                    <Image src='/images/v2/currencies/Cosmic.png' />
                    {selectedMission.Mission_Currencies[4].lowest_amount
                      ? selectedMission.Mission_Currencies[4].lowest_amount
                      : 0}
                  </div>
                  <div className='ascension'>
                    {selectedMission.Mission_Currencies[3].lowest_amount
                      ? selectedMission.Mission_Currencies[3].lowest_amount
                      : 0}
                    {selectedMission.Mission_Currencies[3].highest_amount
                      ? ` - ${selectedMission.Mission_Currencies[3].highest_amount}`
                      : null}
                  </div>
                  <div className='gold'>
                    <Image src='/images/v2/currencies/Gold.png' />
                    {selectedMission.Mission_Currencies[2].lowest_amount
                      ? selectedMission.Mission_Currencies[2].lowest_amount
                      : 0}
                    {selectedMission.Mission_Currencies[2].highest_amount
                      ? ` - ${selectedMission.Mission_Currencies[2].highest_amount}`
                      : null}
                  </div>
                  <div className='exp'>
                    {selectedMission.Mission_Currencies[1].lowest_amount
                      ? selectedMission.Mission_Currencies[1].lowest_amount
                      : 0}
                    {selectedMission.Mission_Currencies[1].highest_amount
                      ? ` - ${selectedMission.Mission_Currencies[1].highest_amount}`
                      : null}
                  </div>
                  <h3>Mission Info</h3>
                  <div className='duration'>{selectedMission?.time} Hours</div>
                  <div className='stamina mb-2'>
                    {selectedMission.Mission_Currencies[0].lowest_amount
                      ? selectedMission.Mission_Currencies[0].lowest_amount
                      : 0}
                  </div>
                  {selectedMission.Mission_Resource_Rewards.some(
                    (mr) => mr.reward_type === 'cost' && mr.name === 'Key',
                  ) ? (
                    <div className='key mb-2'>
                      <div
                        className='key-image'
                        style={{
                          backgroundImage: `url(${
                            rarityIcons[rarityBGforTier[selectedTier]]
                          })`,
                        }}
                      >
                        <Image src='/images/v2/resources/Key.png' />
                      </div>
                      {selectedMission.Mission_Resource_Rewards.filter(
                        (mr) => mr.name === 'Key' && mr.reward_type === 'cost',
                      )[0].lowest_amount
                        ? selectedMission.Mission_Resource_Rewards.filter(
                            (mr) =>
                              mr.name === 'Key' && mr.reward_type === 'cost',
                          )[0].lowest_amount
                        : 0}
                    </div>
                  ) : null}
                  <GoButton
                    onClick={() => {
                      generalSound()
                      navigate('/region', {
                        state: {
                          mission: mission.filter(
                            (item) => item.tier === selectedTier + 1,
                          ),
                        },
                      })
                    }}
                  />
                </div>
                <div>
                  <div className='title'>
                    <Tooltip
                      isArrow
                      className='help-tooltip'
                      tooltipElement={
                        <span>
                          You are guaranteed to get at least one item from the
                          Lootbox Rewards and if you are lucky you may even get
                          more. However, the Lootbox Rewards drop rates are not
                          affected by the Luck Bonus stat.
                        </span>
                      }
                    >
                      <img src='/images/help.png' alt='help' />
                    </Tooltip>
                    <h4>Lootbox Rewards Chance: 100%</h4>
                  </div>
                  <div className='items'>
                    {selectedMission.Mission_Resource_Rewards.filter(
                      (reward) => reward.reward_type === 'reward',
                    ).map(
                      (item, index) =>
                        (item?.Resource || item?.Utility) &&
                        (!item?.category ? (
                          <MapMissionDetailItem
                            key={`map-mission-reward-item-${index}`}
                            background={
                              rarityIcons[item.Resource.rarity] ||
                              rarityIcons['Common']
                            }
                            image={`/images/v2/resources/${
                              (item?.Resource?.icon || '').replaceAll(
                                ' ',
                                '_',
                              ) === ''
                                ? (item?.Utility?.icon || '').replaceAll(
                                    ' ',
                                    '_',
                                  )
                                : (item?.Resource?.icon || '').replaceAll(
                                    ' ',
                                    '_',
                                  )
                            }`}
                            tier={item.tier}
                            value={item.luck}
                            onSearchClick={() => {
                              generalSound()
                              dispatch(setDetailImage(null))
                              dispatch(
                                setSelectedItem({ ...item, type: 'Resource' }),
                              )
                              dispatch(toggleDialog(true))
                            }}
                          />
                        ) : (
                          <MapMissionDetailItem
                            key={`map-mission-reward-item-${index}`}
                            background={rarityIcons['Common']}
                            image={`/images/v2/resources/${item.category.replaceAll(
                              ' ',
                              '_',
                            )}_Icon.png`}
                            tier={item.tier}
                            value={item.luck}
                            onSearchClick={() => {
                              generalSound()
                              dispatch(setDetailImage(null))
                              dispatch(
                                setSelectedItem({
                                  rarity: item.Resource.rarity,
                                  Resource: {
                                    rarity: item.Resource.rarity,
                                    name: `Random ${
                                      resourceName[item.category]
                                    }`,
                                    icon: `${item.category.replaceAll(
                                      ' ',
                                      '_',
                                    )}_Icon.png`,
                                    // description: `Chance to obtain a random ${item?.Resource?.rarity} (${item?.Resource?.star} Star) ${equipType[item.category]} equipment.`
                                    description: `Chance to obtain a random ${
                                      resourceName[item.category]
                                    }`,
                                  },
                                  type: 'Resource',
                                }),
                              )
                              dispatch(toggleDialog(true))
                            }}
                          />
                        )),
                    )}
                  </div>
                  <div className='title'>
                    <Tooltip
                      isArrow
                      className='help-tooltip'
                      tooltipElement={
                        <span>
                          Each item in the Item Rewards system has its own drop
                          rate and the drop rates are affected by the Luck Bonus
                          stat. However, you are not guaranteed to get an item
                          from the Item Rewards system.
                        </span>
                      }
                    >
                      <img src='/images/help.png' alt='help' />
                    </Tooltip>
                    <h4>
                      Item Rewards Chance:{' '}
                      {selectedMission.Mission_Item_Rewards.map(
                        (item) => item.luck || 0,
                      )
                        .reduce((a, b) => a + b, 0)
                        .toFixed(0)}
                      %
                    </h4>
                  </div>
                  <div className='items'>
                    {selectedMission.Mission_Item_Rewards.map((item, index) => (
                      <MapMissionDetailItem
                        key={`map-mission-reward-item-${index}`}
                        background={
                          rarityIcons[getRarityFromStar(item.star)] ||
                          rarityIcons['Common']
                        }
                        image={`/images/v2/game-ui/${
                          item.category || 'random'
                        }-${item.star}.png`}
                        tier='1'
                        value={item?.luck || 0}
                        onSearchClick={() => {
                          dispatch(
                            setDetailImage(
                              `/images/v2/game-ui/${
                                item.category || 'random'
                              }-${item.star}.png`,
                            ),
                          )
                          dispatch(
                            setSelectedItem({
                              rarity: getRarityFromStar(item.star),
                              Resource: {
                                rarity: getRarityFromStar(item.star),
                                name: `Random ${getRarityFromStar(
                                  item.star,
                                )} (${item.star} Star) ${capitalize(
                                  item.category || 'Equipment',
                                )}`,
                                icon: `${item.category || 'random'}-${
                                  item.star
                                }.png`,
                                description: `Chance to obtain a random ${getRarityFromStar(
                                  item.star,
                                )} (${item?.star} Star) ${capitalize(
                                  item.category || '',
                                )} ${
                                  item.category
                                    ? 'equipment'
                                    : 'equipment (Trinket, Jewelry, or Footwear)'
                                }`,
                                // description: `Chance to obtain a random ${resourceName[item.category]}`
                              },
                              type: 'Resource',
                            }),
                          )
                          dispatch(toggleDialog(true))
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </Popup>
      </Marker>
    </>
  )
}

export default MissionSelectItem
