import classNames from "classnames"
import React from "react"
import { Image } from "react-bootstrap"
import getItemImageFromItem from "../../utils/get-item-image-from-item"
import { rarityIcons } from "../ItemDetailsCard/item-details-card"

import './index.css'

const TierItemSlot = ({
  style,
  onClick,
  clickable,
  inactive = false,
  placeholder = '',
  item,
  inventory,
  type = 'item',
  notier,
}) => {
  return (
    <div className={classNames("tier-item-slot d-flex justify-content-center align-items-center", {'inactive': inactive}, { 'hover-opacity-8 hover-cursor-pointer': !!clickable })} style={ style } onClick={ onClick }>
      {
        !!inventory
        ? <Image
          src={`/item/reveals/${( inventory?.Item_Detail?.image || item?.icon ||'').replaceAll(' ', '_')}`}
          style={{
            background: `url(${rarityIcons[inventory?.Item_Detail?.rarity || inventory?.rarity || 'Common']})`,
            borderRadius: '5px'
          }}
          fluid
        />
        : !!placeholder
        ? placeholder
        : null
      }
      {
        !notier && !!inventory
        ? <div className="tier-item-slot-overlay">
          <Image
            src={`/images/v2/Tier${(inventory?.tier || inventory?.Item?.tier||  0)}.png`}
            style={{ borderRadius: '5px' }}
            fluid
          />
        </div>
        : null
      }
    </div>
  )
}

export default TierItemSlot