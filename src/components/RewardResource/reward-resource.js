import React from "react"
import { Image } from "react-bootstrap"
import { rarityIcons } from "../ItemDetailsCard/item-details-card"

const RewardResource = ({
  resource,
  quantity,
  className,
  style,
  onClick,
}) => {
  return (
    <div className={className} style={style} onClick={(e) => {
      if (onClick) {
        e.stopPropagation()
        onClick()
      }
    }}>
      {
        !!resource
        ? <div className='item-image item-reward'>
          <Image 
            src={`/images/v2/resources/${resource?.icon?.replaceAll(' ', '_')}`} 
            style={{
              background: `url(${rarityIcons[resource?.rarity || 'Common']})`,
            }}
          />
          {
            !!resource.tier
            ? <Image src={`/images/v2/Tier${resource.tier}.png`} />
            : <div />
          }
          <div className="text-white">{ quantity }</div>
          <Image src='/images/mission-reward-search.png' />
        </div>
        : <div className='item-image item-reward'></div>
      }
    </div>
  )
}

export default RewardResource