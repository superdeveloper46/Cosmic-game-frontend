import React from "react"
import { Image } from "react-bootstrap"
import MissionRewardItemRowItem from "../MissionRewardItemRowItem/mission-reward-item-row-item"
import { rarityIcons } from "../ItemDetailsCard/item-details-card"
import MissionRowItem from "../MissionRowItem/mission-row-item"

const MissionRewardResourceRow = ({
    category,
  resource,
  quantity,
  onSearchClick,
}) => {
  return (
    <div className="mission-reward-item-row-container justify-content-around d-flex align-items-center text-white" style={{ background: '#5B6C991A', padding: '0.5rem', border: '2px solid #3980DA', margin: '0.5rem' }}>
      <div className="item-image" style={{background: `url(${rarityIcons[resource?.rarity]})`}}>
          {!category &&
          <Image
              src={`/images/v2/resources/${resource.icon.replaceAll(' ', '_')}`}
              style={{
                width: '120px',
                background: `url(${rarityIcons[resource?.rarity || 'Common']})`,
              }}

            />
          }
          {!!category &&
              <Image
                  src={`/images/v2/resources/${category.replaceAll(' ', '_')}_Icon.png`}
                  style={{
                      width: '120px',
                      background: `url(${rarityIcons[resource?.rarity || 'Common']})`,
                  }}

              />
          }
        {
          !!resource.tier
          ? <Image src={`/images/v2/Tier${(resource.tier || 0)}.png`} />
          : <div />
        }
          {!category &&
        <Image src="/images/mission-reward-search.png" onClick={(e) => {
          e.stopPropagation()
          if (onSearchClick) {
            onSearchClick()
          }
        }}/>
          }
      </div>
      <div className="item-content">
        <div className="d-flex align-items-center" style={{ fontSize: '18px' }}>
          { !category ? resource.name :category}
        </div>
        <div className="d-flex align-items-center">
          { !category ? resource.description : "" }
        </div>
        {
            (!!resource.exp && !category)
          ? <div className="d-flex align-items-center">
            <MissionRewardItemRowItem
              label="EXP Value"
              value={`${resource.exp || 0}`}
              image="/images/exp.png"
            />
          </div>
          : <div />
        }
      </div>

      <MissionRowItem
        label="REWARD"
        value={`${quantity}`}
        centerLabel
        image="/images/mission-item-reward.png"
      />

    </div>
  )
}

export default MissionRewardResourceRow