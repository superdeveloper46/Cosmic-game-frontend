import React from 'react'
import { Image } from 'react-bootstrap'
import getItemImageFromItem from '../../utils/get-item-image-from-item'
import MissionRowItem from '../MissionRowItem/mission-row-item'

const MissionRewardItemRow = ({ reward }) => {
  return (
    <div className='mission-reward-item-row-container d-flex align-items-center text-white flex-wrap'>
      <div className='d-flex align-items-left'>
        <div>
          <div className='item-image'>
            <Image src={`/images/v2/game-ui/${reward.category || 'random'}-${reward.star}.png`}/>
            <div></div>
          </div>
        </div>
        <div className='item-content justify-content-center'>
          <div
            className='d-flex align-items-center text-align-center'
            style={{ fontSize: '18px' }}
          >
            {
              !!reward.category
              ? `${reward.star} Star ${reward.category.charAt(0).toUpperCase() + reward.category.slice(1)}`
              : `Random ${reward.star} Star Item`
            }
          </div>
        </div>
      </div>
      {reward.luck !== undefined ? (
        <MissionRowItem
          label='LUCK'
          value={`${reward.luck}%`}
          centerLabel
          image='/images/mission-item-luck.png'
        />
      ) : null}
    </div>
  )
}

export default MissionRewardItemRow
