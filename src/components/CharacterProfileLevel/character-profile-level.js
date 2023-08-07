import { useWallet } from '@solana/wallet-adapter-react'
import React, { useEffect, useState } from 'react'
import { Image, ProgressBar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import useAudio from '../Audio/audio'
import { AUDIOLIST } from '../../consts/audio-list'
import XP_ITEM_PRICES from '../../consts/experience-item-price'
import { getAccount } from '../../slices/accountSlice'
import {
  clearExperienceItem,
  popExperienceItem,
  pushExperienceItem,
} from '../../slices/resourceSlice'
import levelUp from '../../utils/level-up'
import ApplyButton from '../ApplyButton'
import MaterialsSlot from '../MaterialsSlot/materials-slot'
import ExpProgressBar from '../ExpProgressBar/exp-progress-bar'
import levelUpByExperienceItems from '../../utils/level-up-by-experience-items'
import setApeFavorite from '../../utils/set-ape-favorite'
import IconTextButton from '../IconTextButton'
import ResourceItemSlot from '../ResourceItemSlot'
import { fetchMoreInventories } from '../../slices/inventorySlice'

const CharacterProfileLevel = ({
  crownedApeId,
  switchCrown,
  ape,
  reloadApes,
  setMessage,
}) => {
  const cancelSound = useAudio(AUDIOLIST['CANCEL_BUTTON'])
  const inactiveSound = useAudio(AUDIOLIST['INACTIVE_BUTTON'])
  const [favorite, setFavorite] = useState(!!ape?.gameData?.is_favorited)

  const resources = useSelector((state) => state.resources.resources)
  const selectedExperiences = useSelector(
    (state) => state.resources.selectedExperiences,
  )
  const levels = useSelector((state) => state.levels.levels)
  const { publicKey } = useWallet()

  const dispatch = useDispatch()

  const exp = { amount: ape.gameData?.experience }
  const totalSelectedXPCount =
    (selectedExperiences[1] || 0) +
    (selectedExperiences[2] || 0) +
    (selectedExperiences[3] || 0) +
    (selectedExperiences[4] || 0) +
    (selectedExperiences[5] || 0) +
    (selectedExperiences[6] || 0)

  const xpByItems = resources
    .filter((resource) => resource.type === 'Resource: Level-Up Material')
    .map((resource) => {
      return (
        ((typeof resource.effect === 'object'
          ? resource.effect
          : JSON.parse(resource.effect || '{}')
        )?.experience || 0) * (selectedExperiences[resource.star || 0] || 0)
      )
    })
    .reduce((a, b) => a + b, 0)
  const tierMaxLevel = (levels || []).find(
    (level) => level.level === ape?.gameData?.Tier?.max_level,
  )
  const levelByXpItems = (levels || []).findLast(
    (level) => level.experience <= (exp?.amount || 0) + (xpByItems || 0),
  )
  const upgradedLevel =
    (tierMaxLevel?.level || 0) > (levelByXpItems?.level || 0)
      ? levelByXpItems
      : tierMaxLevel
  const upgradedNextLevel = (levels || []).find(
    (level) =>
      level.level ===
      (tierMaxLevel.level > upgradedLevel.level
        ? upgradedLevel.level + 1
        : upgradedLevel.level),
  )

  useEffect(() => {
    if (!!ape) {
      setFavorite(!!ape.gameData?.is_favorited)
    }
  }, [ape])

  return (
    <div className='d-flex justify-content-around p-4 my-3 h-100 custom-scroll overflow-auto'>
      <div className='d-flex justify-content-start align-items-center flex-column'>
        <div className='d-flex item-box-responsiveness'>
          <div className='crown-fav-responsiveness m-3 d-flex flex-column align-items-center'>
            <button
              onClick={() => switchCrown(ape.gameData.id)}
              className='crown-btn my-3'
            >
              {crownedApeId === ape.gameData.id ? (
                <img src='/images/v2/game-ui/Crown-Active.png' alt='crown' />
              ) : (
                <img src='/images/v2/game-ui/Crown-Inactive.png' alt='crown' />
              )}
            </button>
            <button
              className='crown-btn'
              onClick={() => {
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
          <div
            style={{ width: '300px' }}
            className='m-2 d-flex justify-content-center align-items-center character-profile-main-img'
          >
            <Image src={ape?.info?.image} fluid />
          </div>
          <div style={{ width: '90px' }}></div>
        </div>
        <div className='w-100 mt-3 d-flex align-items-center position-relative'>
          <ExpProgressBar
            total={
              upgradedNextLevel?.experience > upgradedLevel?.experience
                ? upgradedNextLevel?.experience - upgradedLevel?.experience
                : 0
            }
            firstValue={
              upgradedLevel?.level === ape?.gameData?.level
                ? (exp?.amount || 0) - upgradedLevel?.experience
                : 0
            }
            secondValue={
              upgradedLevel?.level === ape?.gameData?.level
                ? xpByItems || 0
                : (exp?.amount || 0) +
                  (xpByItems || 0) -
                  upgradedLevel?.experience
            }
            className='mx-auto'
            maxCheck
          />
          {!!upgradedLevel &&
          !!ape?.gameData?.Level &&
          upgradedLevel.level > ape?.gameData?.Level?.level ? (
            <div
              className='text-white h6 m-0 p-1 px-4 rounded-pill position-absolute end-0'
              style={{ background: '#CC791A' }}
            >
              +{upgradedLevel.level - ape?.gameData?.Level?.level}
            </div>
          ) : null}
        </div>
        <div className='d-flex align-items-center justify-content-center w-100 flex-wrap mt-3'>
          {resources
            .filter(
              (resource) => resource.type === 'Resource: Level-Up Material',
            )
            .map((resource) => (
              <MaterialsSlot
                resource={resource}
                onClick={() => {
                  if (!!selectedExperiences[resource.star || 0]) {
                    dispatch(popExperienceItem(resource))
                  }
                }}
                clickable={!!selectedExperiences[resource.star || 0]}
                text={selectedExperiences[resource.star || 0]}
                key={`selected-experience-resource-${resource.id}`}
              />
            ))}
        </div>
        <div className='d-flex mt-3'>
          <IconTextButton
            className='m-1 danger h5'
            onClick={() => {
              cancelSound()
              if (totalSelectedXPCount > 0) {
                dispatch(clearExperienceItem())
              }
            }}
            inactive={!totalSelectedXPCount}
          >
            Empty
          </IconTextButton>
          <IconTextButton
            className='m-1 h5'
            info={[
              {
                id: 'character-profile-level-up-cosmic',
                image: '/images/v2/currencies/Gold.png',
                text:
                  XP_ITEM_PRICES[ape?.gameData?.tier || 0] *
                  (totalSelectedXPCount || 0),
              },
            ]}
            onClick={() =>
              setMessage({
                type: 'confirm',
                text: `Are you sure level up ${ape.data.name} by using these ${totalSelectedXPCount} experience items?`,
                callback: (confirm) => {
                  if (confirm === 'yes') {
                    levelUpByExperienceItems({
                      address: ape.mint,
                      wallet: ape.gameData.owner,
                      counts: selectedExperiences || [],
                      callback: async () => {
                        dispatch(getAccount(publicKey))
                        await reloadApes([ape.mint])

                        dispatch(
                          fetchMoreInventories({
                            address: publicKey,
                            type: 'resource',
                            subType: 'Enhancement Material',
                            after: 0,
                            count: 50,
                          }),
                        )
                        dispatch(clearExperienceItem())
                      },
                      setMessage,
                    })
                  }
                },
              })
            }
            inactive={
              ape.gameData.level >= ape.gameData.Tier.max_level ||
              !totalSelectedXPCount
            }
          >
            Level Up
          </IconTextButton>
        </div>
      </div>
    </div>
  )
}

export default CharacterProfileLevel
