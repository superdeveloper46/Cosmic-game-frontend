import classNames from 'classnames'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Image } from 'react-bootstrap'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useSelector, useDispatch } from 'react-redux'
import { setDetailImage, setSelectedItem } from '../../slices/ItemDialogSlice'
import humanizeMinutes from '../../utils/humanize-minutes'
import ApeInfoEqiuppedItems from '../ApeInfoEqiuppedItems'
import CharacterDetailsDivider from '../CharacterDetailsDivider'
import CharacterItem from '../CharacterItem/character-item'

const renderTime = ({ remainingTime }) => {
  return (
    <div className='timer'>
      {/* <div className='value'>{Math.floor(remainingTime % 60)}</div> */}
    </div>
  )
}

const CharacterRow = ({
  ape,
  crownedApeId,
  inventoryMission,
  selected,
  focused,
  onClick,
  itemDoubleClick = false,
  onDoubleClick,
  inventories,
  setIsItemOpen,
  setIsEquip,
  selectedInventory,
  onItemCallback = false,
  setSelectedInventory,
  reloadApes,
  characterHover = false,
  disableEntirehover = false,
  onCharacterClick,
}) => {
  const dispatch = useDispatch()
  const difficulties = useSelector((state) => state.missions.difficulties)
  const missions = useSelector((state) => state.missions.missions)
  const [remainTime, setRemainTime] = useState(0)
  const powers = useSelector((state) => state.apes.powers)
  let timeout = null

  const handleOnClick = (e) => {
    e.preventDefault()
    if (timeout === null) {
      timeout = setTimeout(() => {
        if (onClick) {
          onClick(ape)
          if (!!setSelectedInventory) setSelectedInventory(null)
        }
      }, 200)
    }
  }

  const handleDoubleClick = (e) => {
    e.preventDefault()
    clearTimeout(timeout)
    timeout = null
    if (onDoubleClick) {
      onDoubleClick(ape)
      if (!!setSelectedInventory) setSelectedInventory(null)
    }
  }

  return (
    <div
      className={`character-select-item my-2 me-2 ms-1 ${
        !disableEntirehover ? 'custom-active' : 'normal-border'
      } character-row-active ${!!selected ? 'active' : ''} ${
        !!focused ? 'focus' : ''
      }`}
      onClick={handleOnClick}
      onDoubleClick={handleDoubleClick}
    >
      <CharacterItem
        image={ape.info.image}
        favorite={!!ape?.gameData?.is_favorited}
        crowned={crownedApeId === ape.gameData.id}
        tier={ape.gameData.tier}
        level={ape.gameData.level}
        power={powers.find((power) => power.slug === ape.gameData.power)}
        activehover={characterHover}
        handleClick={() => {
          if (characterHover && onCharacterClick) onCharacterClick(ape)
        }}
      />
      <div className='character-item-detail'>
        {ape.gameData?.activeMissionEffect?.remainingMinutes > 0 ? (
          remainTime > 60 ? (
            <div className='timer-image'>
              {humanizeMinutes(Math.floor(remainTime / 60))}
            </div>
          ) : null
        ) : ape.gameData?.activeMissionEffect?.remainingMinutes <= 0 ? (
          <div className='mission-complete'>Mission Complete!</div>
        ) : null}
      </div>
      {ape.gameData?.activeMissionEffect?.remainingMinutes > 0 ? (
        <>
          <div className='d-flex justify-content-center align-items-end pb-2 ps-2'>
            <CountdownCircleTimer
              isPlaying
              initialRemainingTime={
                ape.gameData?.activeMissionEffect?.remainingMinutes * 60
              }
              duration={ape.gameData?.active_mission?.duration * 3600}
              size={80}
              colors={['#0C6AA1']}
              onComplete={reloadApes}
              onUpdate={(remainingTime) => setRemainTime(remainingTime)}
            >
              {renderTime}
            </CountdownCircleTimer>
          </div>
          <div className='mx-2'>
            <CharacterDetailsDivider />
          </div>
        </>
      ) : null}
      <div className='d-flex justify-content-around align-items-center w-100 gap-2 ps-2'>
        <ApeInfoEqiuppedItems
          inventories={
            !!inventories
              ? inventories.map((inv) => ({
                  ...inv,
                  itemDoubleClick,
                  onClick: (e) => {

                    if (onItemCallback && onClick) {
                      onClick(ape)
                      if (!!setSelectedInventory) setSelectedInventory(null)
                    }
                    if (!!setSelectedInventory) {
                      setSelectedInventory({
                        ...(selectedInventory || {}),
                        equipped: {...inv, type:"Equipment" },

                      })
                      setIsEquip(false)
                    }
                  },
                  onDoubleClick: () => {
                    setIsItemOpen(true)
                    dispatch(setDetailImage(null))
                    dispatch(setSelectedItem({...inv, type:"Equipment" }))
                  },
                }))
              : (ape.gameData?.default_items || []).map(
                  (defaultItem) => defaultItem.Inventory,
                )
          }
        />
        {difficulties && inventoryMission ? (
          <div className={classNames('difficulty', {
            'bonus-easy': difficulties?.duration_complexity.filter(
              (complexity) => complexity.mission_tier === inventoryMission.tier,
            )[0][`tier${ape.gameData.tier}`] < 1
          })}>
            {difficulties?.duration_complexity.filter(
              (complexity) => complexity.mission_tier === inventoryMission.tier,
            )[0][`tier${ape.gameData.tier}`] === 1 &&
            difficulties?.success_complexity.filter(
              (complexity) => complexity.mission_tier === inventoryMission.tier,
            )[0][`tier${ape.gameData.tier}`] === 100 ? null : (
              <h6>Difficulty Modifiers:</h6>
            )}
            {difficulties?.duration_complexity.filter(
              (complexity) => complexity.mission_tier === inventoryMission.tier,
            )[0][`tier${ape.gameData.tier}`] !== 1 ? (
              <h6>
                Mission Time:{' '}
                {Number(
                  (
                    difficulties?.duration_complexity.filter(
                      (complexity) =>
                        complexity.mission_tier === inventoryMission.tier,
                    )[0][`tier${ape.gameData.tier}`] * inventoryMission.time
                  ).toFixed(2),
                )}
                H
              </h6>
            ) : null}
            {difficulties?.success_complexity.filter(
              (complexity) => complexity.mission_tier === inventoryMission.tier,
            )[0][`tier${ape.gameData.tier}`] !== 100 ? (
              <h6>
                Success rate:{' '}
                {
                  difficulties?.success_complexity.filter(
                    (complexity) =>
                      complexity.mission_tier === inventoryMission.tier,
                  )[0][`tier${ape.gameData.tier}`]
                }
                %
              </h6>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default CharacterRow
