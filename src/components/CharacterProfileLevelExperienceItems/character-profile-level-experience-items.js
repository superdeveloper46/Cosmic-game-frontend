import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ApplyButton from '../ApplyButton'
import {
  clearExperienceItem,
  pushExperienceItem,
} from '../../slices/resourceSlice'
import ExperienceItemRow from '../ExperienceItemRow/experience-item-row'
import IconTextButton from '../IconTextButton'
import { fetchMoreInventories } from '../../slices/inventorySlice'
import { useWallet } from '@solana/wallet-adapter-react'

const CharacterProfileLevelExperienceItems = ({ ape }) => {
  const { publicKey } = useWallet()

  const resources = useSelector((state) => state.resources.resources)
  const selectedExperiences = useSelector(
    (state) => state.resources.selectedExperiences,
  )
  const levels = useSelector((state) => state.levels.levels)
  const inventories = useSelector((state) => state.inventories.inventories)

  const dispatch = useDispatch()

  const exp = { amount: ape.gameData?.experience }

  const tierMaxLevel = (levels || []).find(
    (level) => level.level === ape?.gameData?.Tier?.max_level,
  )
  const nextTierLevel = tierMaxLevel

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

  useEffect(() => {
    dispatch(fetchMoreInventories({
      address: publicKey,
      type: 'resource',
      subType: 'Enhancement Material',
      after: 0,
      count: 50
    }))
  }, [])

  useEffect(() => {
    if (!!ape) {
      dispatch(clearExperienceItem())
    }
  }, [ape])

  const onClickExperienceItemRow = resource => {
    const targetExperience = nextTierLevel.experience
    const currentExperience = exp?.amount || 0
    let remainingExperience = targetExperience - currentExperience - xpByItems

    if (remainingExperience > 0) {
      dispatch(pushExperienceItem(resource))
    }
  }

  const autoSelect = () => {
    dispatch(clearExperienceItem())
    if (
      !nextTierLevel ||
      !ape?.gameData?.Level ||
      nextTierLevel.experience <= (exp?.amount || 0)
    )
      return

    const targetExperience = nextTierLevel.experience
    const currentExperience = exp?.amount || 0
    let remainingExperience = targetExperience - currentExperience
    let star = 4

    while (remainingExperience > 0 && star > 0) {
      const tierExperienceItem = resources.find(
        (resource) =>
          resource.type === 'Resource: Level-Up Material' &&
          resource.star === star,
      )

      if (!!tierExperienceItem) {
        const itemExperience =
          (typeof tierExperienceItem?.effect === 'object'
            ? tierExperienceItem?.effect
            : JSON.parse(tierExperienceItem?.effect || '{}')
          )?.experience || 0

        if (!!itemExperience) {
          const neededCount = Math.ceil(remainingExperience / itemExperience)
          const existingCount =
            (inventories || []).find(
              (inv) => inv.id === tierExperienceItem?.id,
            )?.quantity || 0
          const finalCount = Math.min(neededCount, existingCount)

          if (finalCount > 0) {
            remainingExperience -= finalCount * itemExperience
            dispatch(pushExperienceItem(tierExperienceItem, finalCount))
          }
        }
      }

      star--
    }
  }

  return (
    <div
      className='d-flex align-items-center flex-column'
      style={{ width: '28%', minWidth: '28%', maxWidth: '28%' }}
    >
      <div className='panel-header w-100 d-flex justify-content-start align-items-start flex-column custom-border-bottom mb-3 pb-3'>
        <div className='mt-5 d-flex align-items-center w-100 mb-2'>
          EXPERIENCE ITEMS
          <div className='d-flex justify-content-center flex-grow-1'>
            <ApplyButton className='m-1' onClick={autoSelect}>
              Auto Select
            </ApplyButton>
          </div>
        </div>
      </div>
      <div className='w-100 mt-2 h-100 custom-scroll overflow-auto mb-3'>
        <div className='d-flex flex-column justify-content-center'>
          {resources
            .filter(
              (resource) => resource.type === 'Resource: Level-Up Material',
            )
            .map((resource) => (
              <ExperienceItemRow
                resource={resource}
                inventory={(inventories || []).find(
                  (inv) => inv.id === resource.id,
                )}
                selectedCount={selectedExperiences[resource.star || 0] || 0}
                key={`experience-item-${resource.id}`}
                onClick={() => onClickExperienceItemRow(resource)}
                clickable
              />
            ))}
        </div>
      </div>
    </div>
  )
}

export default CharacterProfileLevelExperienceItems
