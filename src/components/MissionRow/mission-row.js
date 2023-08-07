import React from 'react'
import { Image } from 'react-bootstrap'
import MissionRowItem from '../MissionRowItem/mission-row-item'
import { useSelector } from 'react-redux'
import { setSelectedApes, setFocusedApe } from '../../slices/apeSlice'
import { rarityIcons } from '../ItemDetailsCard/item-details-card'
const MissionRow = ({
  inventoryMission,
  mission,
  setInventoryMission,
  setSelectedRewardMission,
}) => {
  const missionStamina = mission.Mission_Currencies.find(
    (currency) => currency.Currency.name === 'Stamina',
  )
  const missionExperience = mission.Mission_Currencies.find(
    (currency) => currency.Currency.name === 'Experience',
  )
  const missionGold = mission.Mission_Currencies.find(
    (currency) => currency.Currency.name === 'Gold',
  )
  const missionCosmic = mission.Mission_Currencies.find(
    (currency) => currency.Currency.name === 'Cosmic',
  )
  const ascension = mission.Mission_Currencies.find(
    (currency) => currency.Currency.name === 'Ascension',
  )

  return (
    <div
      role='button'
      className={`mission-row-container d-flex align-items-center text-white cursor-pointer custom-active ${
        inventoryMission.id === mission.id ? 'active' : ''
      }`}
      onClick={() => {
        setInventoryMission(mission)
      }}
    >
      <div className='d-flex' style={{ flexDirection: 'column', flexGrow: 1 }}>
        <div className='d-flex align-items-center mission-title px-3 py-1 text-uppercase'>
          {mission.secondary_branch}
          
          {mission.Mission_Resource_Rewards.filter(
            (mr) => mr.reward_type === 'cost' && mr.name == 'Key',
          ).map((mr) => (
            <span className={'d-block ms-2'} key={mr.id}>
              {' '}
              {mr.Resource.name}{' '}
              <img
                src={`/images/v2/resources/${mr.Resource.icon.replaceAll(
                  ' ',
                  '_',
                )}`}
                style={{
                  width: '20px',
                  background: `url(${rarityIcons[mr.Resource?.rarity || 'Common']})`,
                }}
              />
            </span>
          ))}
          <div className='mission-duration'>
            {mission.time}H
            <Image src='/images/durationIcon.png' />
          </div>
        </div>
        <div className='items-wrapper py-2'>
          <div className='items-content'>
            <MissionRowItem
              label='Stamina'
              value={`${missionStamina?.lowest_amount || 0}`}
              image='/images/mission-item-stamina.png'
            />
            <MissionRowItem
              label='Character XP'
              value={`${missionExperience?.lowest_amount || 0}`}
              image='/images/mission-item-cxp.png'
            />
            <MissionRowItem
              label='Gold'
              value={`${missionGold?.lowest_amount || 0}`}
              image='/images/mission-item-gold.png'
            />
          </div>
          <div className='items-content'>
            <MissionRowItem
              label='$COSMIC'
              value={`${missionCosmic?.lowest_amount || 0}`}
              image='/images/mission-item-cosmic.png'
            />
            <MissionRowItem
              label='Ascension'
              value={`${ascension?.lowest_amount || 0} - ${
                ascension?.highest_amount || 0
              }`}
              image='/images/Ascension.png'
            />
            <div
              className='mission-row-reward-container'
              onClick={(e) => {
                e.stopPropagation()
                setSelectedRewardMission(mission)
              }}
            >
              <Image
                src='/images/rewardsearch.png'
                className='mission-reward-search'
              />
              <Image
                src='/images/reward-box.png'
                className='mission-row-reward'
              />
              <p className='label'>Rewards</p>   
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MissionRow
