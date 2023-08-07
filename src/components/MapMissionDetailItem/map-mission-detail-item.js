import React from 'react'
import './map-mission-detail-item.scss'

const MapMissionDetailItem = ({
  background,
  image,
  tier,
  value,
  onSearchClick,
}) => {
  return (
    <div className='map-detail-item-wrapper'>
      <div style={{ backgroundImage: `url(${background})` }}>
        <img src={image} alt='reward' style={{ borderRadius: '8px' }} />
        {tier && (
          <img src={`/images/v2/Tier${tier}.png`} alt='tier' className='tier' />
        )}
        {!!onSearchClick && (
          <img
            src='/images/rewardsearch.png'
            alt='search'
            className='search'
            onClick={(e) => {
              e.stopPropagation()
              onSearchClick()
            }}
          />
        )}
      </div>
      <div>
        <p>{value}%</p>
      </div>
    </div>
  )
}

export default MapMissionDetailItem
