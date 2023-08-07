import React from 'react'
import { Image } from 'react-bootstrap'
import { rarityIcons } from '../ItemDetailsCard/item-details-card'

const RewardItem = ({ item, className, style, onClick }) => {
  return (
    <div
      className={className}
      style={style}
      onClick={(e) => {
        e.stopPropagation()
        if (onClick) onClick()
      }}
    >
      {!!item?.inventory ? (
        <div className='item-image item-reward'>
          {
            <Image
              src={`/item/reveals/${(item?.itemImage?.image || '').replaceAll(
                ' ',
                '_',
              )}`}
              style={{
                background: `url(${rarityIcons[item?.rarity || 'Common']})`,
              }}
            />
          }
          {!!item.tier ? (
            <Image src={`/images/v2/Tier${item.tier}.png`} />
          ) : (
            <div />
          )}
          <Image src='/images/mission-reward-search.png' />
        </div>
      ) : (
        <div className='item-image item-reward'></div>
      )}
    </div>
  )
}

export default RewardItem
